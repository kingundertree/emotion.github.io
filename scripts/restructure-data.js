#!/usr/bin/env node
/**
 * 数据结构重构脚本
 * 将 data.js 转换为结构化 JSON 文件
 */

const fs = require('fs');
const path = require('path');

// 读取原始数据
const dataJsPath = path.join(__dirname, '../data.js');
const dataJsContent = fs.readFileSync(dataJsPath, 'utf-8');

// 提取 emotionData
const match = dataJsContent.match(/const emotionData = (\[[\s\S]*\]);/);
if (!match) {
    console.error('无法解析 data.js');
    process.exit(1);
}

const emotionData = eval(match[1]);

// 创建输出目录
const outputDir = path.join(__dirname, '../data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 1. 按类别拆分
const categoriesDir = path.join(outputDir, 'categories');
if (!fs.existsSync(categoriesDir)) {
    fs.mkdirSync(categoriesDir, { recursive: true });
}

emotionData.forEach(category => {
    const categoryFile = path.join(categoriesDir, `${category.id}.json`);
    fs.writeFileSync(categoryFile, JSON.stringify(category, null, 2), 'utf-8');
    console.log(`✅ 创建: categories/${category.id}.json`);
});

// 2. 创建增强版模板
const enhancedDir = path.join(outputDir, 'enhanced');
if (!fs.existsSync(enhancedDir)) {
    fs.mkdirSync(enhancedDir, { recursive: true });
}

emotionData.forEach(category => {
    const enhancedCategory = {
        ...category,
        items: category.items.map(item => enhanceEmotionItem(item, category.id))
    };
    
    const enhancedFile = path.join(enhancedDir, `${category.id}.enhanced.json`);
    fs.writeFileSync(enhancedFile, JSON.stringify(enhancedCategory, null, 2), 'utf-8');
    console.log(`✅ 创建: enhanced/${category.id}.enhanced.json`);
});

// 3. 创建索引文件
const indexData = {
    version: '2.0.0',
    lastUpdated: new Date().toISOString(),
    categories: emotionData.map(cat => ({
        id: cat.id,
        title: cat.title,
        en: cat.en,
        count: cat.items.length,
        emotions: cat.items.map(item => ({
            name: item.name,
            en: item.en
        }))
    })),
    stats: {
        totalEmotions: emotionData.reduce((sum, cat) => sum + cat.items.length, 0),
        totalCategories: emotionData.length
    }
};

fs.writeFileSync(
    path.join(outputDir, 'index.json'),
    JSON.stringify(indexData, null, 2),
    'utf-8'
);
console.log('✅ 创建: index.json');

// 4. 创建搜索索引
const searchIndex = [];
emotionData.forEach(category => {
    category.items.forEach(item => {
        searchIndex.push({
            id: `${category.id}-${item.name}`,
            category: category.id,
            categoryTitle: category.title,
            name: item.name,
            en: item.en,
            desc: item.desc,
            source: item.source,
            keywords: extractKeywords(item),
            searchText: `${item.name} ${item.en} ${item.desc} ${item.source}`.toLowerCase()
        });
    });
});

fs.writeFileSync(
    path.join(outputDir, 'search-index.json'),
    JSON.stringify(searchIndex, null, 2),
    'utf-8'
);
console.log('✅ 创建: search-index.json');

// 5. 创建名著索引
const classicsIndex = buildClassicsIndex(emotionData);
fs.writeFileSync(
    path.join(outputDir, 'classics-index.json'),
    JSON.stringify(classicsIndex, null, 2),
    'utf-8'
);
console.log('✅ 创建: classics-index.json');

console.log('\n🎉 数据重构完成！');
console.log(`📁 输出目录: ${outputDir}`);

// ============ 辅助函数 ============

function enhanceEmotionItem(item, categoryId) {
    return {
        // 原始字段
        name: item.name,
        en: item.en,
        desc: item.desc,
        source: item.source,
        
        // 名著情节
        classics: {
            honglou: item.honglou || null,
            xiyou: item.xiyou || null,
            shuihu: item.shuihu || null,
            sanguo: item.sanguo || null
        },
        
        // 多媒体资源
        media: {
            music: {
                id: item.musicId || null,
                title: item.musicTitle || null,
                url: item.musicId 
                    ? `https://music.163.com/#/song?id=${item.musicId}`
                    : null
            },
            video: {
                keyword: item.video || null,
                searchUrl: `https://search.bilibili.com/all?keyword=${encodeURIComponent(item.video || item.name)}`
            }
        },
        
        // 【新增】情绪光谱
        spectrum: {
            intensity: estimateIntensity(item.name),
            polarity: estimatePolarity(categoryId),
            duration: estimateDuration(item.name),
            trigger: ''
        },
        
        // 【新增】心理学维度
        psychology: {
            ekman: mapToEkman(categoryId),
            dimension: {
                valence: estimateValence(categoryId),
                arousal: estimateArousal(item.name)
            }
        },
        
        // 【新增】相关情绪
        relations: {
            similar: [],
            opposite: [],
            oftenWith: []
        },
        
        // 【新增】现代场景
        modernScenarios: [],
        
        // 【新增】应对策略
        coping: {
            enhance: '',
            balance: ''
        }
    };
}

function extractKeywords(item) {
    const keywords = [item.name, item.en];
    
    // 从描述中提取关键词
    const descWords = item.desc.match(/[\u4e00-\u9fa5]{2,}/g) || [];
    keywords.push(...descWords.slice(0, 3));
    
    return [...new Set(keywords)];
}

function buildClassicsIndex(emotionData) {
    const classics = {
        honglou: { name: '红楼梦', emotions: [] },
        xiyou: { name: '西游记', emotions: [] },
        shuihu: { name: '水浒传', emotions: [] },
        sanguo: { name: '三国演义', emotions: [] }
    };
    
    emotionData.forEach(category => {
        category.items.forEach(item => {
            Object.keys(classics).forEach(bookId => {
                if (item[bookId]) {
                    classics[bookId].emotions.push({
                        name: item.name,
                        en: item.en,
                        scene: item[bookId],
                        categoryId: category.id
                    });
                }
            });
        });
    });
    
    return classics;
}

function estimateIntensity(name) {
    const highIntensity = ['狂喜', '暴怒', '悲痛', '惊恐', '绝望'];
    const lowIntensity = ['恬淡', '愠怒', '惋惜', '怯懦', '欣慰'];
    
    if (highIntensity.includes(name)) return 8;
    if (lowIntensity.includes(name)) return 3;
    return 5;
}

function estimatePolarity(categoryId) {
    const positive = ['joy', 'amusement', 'love'];
    const negative = ['anger', 'sorrow', 'fear', 'disgust'];
    
    if (positive.includes(categoryId)) return '+';
    if (negative.includes(categoryId)) return '-';
    return '±';
}

function estimateDuration(name) {
    const brief = ['欣喜', '惊恐', '惊喜', '战栗'];
    const lasting = ['孤寂', '哀愁', '恬淡', '释然'];
    
    if (brief.includes(name)) return '短暂';
    if (lasting.includes(name)) return '持久';
    return '中等';
}

function mapToEkman(categoryId) {
    const mapping = {
        'joy': 'joy',
        'anger': 'anger',
        'sorrow': 'sadness',
        'amusement': 'joy',
        'fear': 'fear',
        'love': 'joy',
        'disgust': 'disgust',
        'desire': 'surprise'
    };
    return mapping[categoryId] || 'neutral';
}

function estimateValence(categoryId) {
    const mapping = {
        'joy': 0.8, 'amusement': 0.7, 'love': 0.8,
        'anger': -0.6, 'sorrow': -0.7, 'fear': -0.8,
        'disgust': -0.5, 'desire': 0.3
    };
    return mapping[categoryId] || 0;
}

function estimateArousal(name) {
    const highArousal = ['狂喜', '暴怒', '惊恐', '战栗', '愤慨'];
    const lowArousal = ['恬淡', '孤寂', '缅怀', '释然'];
    
    if (highArousal.includes(name)) return 0.8;
    if (lowArousal.includes(name)) return 0.3;
    return 0.5;
}
