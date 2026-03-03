/**
 * 情绪搜索模块
 * 支持全文搜索、拼音搜索、同义词搜索
 */

class EmotionSearch {
    constructor(searchIndex) {
        this.index = searchIndex;
        this.buildIndex();
    }

    // 构建搜索索引
    buildIndex() {
        this.invertedIndex = new Map();
        
        this.index.forEach(item => {
            const tokens = this.tokenize(item.searchText);
            tokens.forEach(token => {
                if (!this.invertedIndex.has(token)) {
                    this.invertedIndex.set(token, []);
                }
                this.invertedIndex.get(token).push(item);
            });
        });
    }

    // 分词
    tokenize(text) {
        const tokens = new Set();
        
        // 中文分词（简单版：提取2-4字词组）
        const chineseWords = text.match(/[\u4e00-\u9fa5]{2,4}/g) || [];
        chineseWords.forEach(word => tokens.add(word));
        
        // 英文单词
        const englishWords = text.match(/[a-z]+/g) || [];
        englishWords.forEach(word => tokens.add(word.toLowerCase()));
        
        // 单字
        const chars = text.match(/[\u4e00-\u9fa5]/g) || [];
        chars.forEach(char => tokens.add(char));
        
        return Array.from(tokens);
    }

    // 搜索
    search(query, options = {}) {
        const {
            limit = 10,
            fuzzy = true,
            category = null
        } = options;

        const queryTokens = this.tokenize(query.toLowerCase());
        const scores = new Map();

        // 计算相关性分数
        queryTokens.forEach(token => {
            if (this.invertedIndex.has(token)) {
                this.invertedIndex.get(token).forEach(item => {
                    // 类别过滤
                    if (category && item.category !== category) return;
                    
                    const currentScore = scores.get(item.id) || 0;
                    scores.set(item.id, currentScore + 1);
                });
            }
        });

        // 模糊匹配
        if (fuzzy) {
            this.index.forEach(item => {
                if (category && item.category !== category) return;
                
                // 包含匹配
                if (item.searchText.includes(query)) {
                    const currentScore = scores.get(item.id) || 0;
                    scores.set(item.id, currentScore + 2);
                }
                
                // 开头匹配加分
                if (item.name.startsWith(query) || item.en.toLowerCase().startsWith(query)) {
                    const currentScore = scores.get(item.id) || 0;
                    scores.set(item.id, currentScore + 3);
                }
            });
        }

        // 排序并返回结果
        const results = Array.from(scores.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([id]) => this.index.find(item => item.id === id));

        return results;
    }

    // 按类别筛选
    filterByCategory(categoryId) {
        return this.index.filter(item => item.category === categoryId);
    }

    // 获取相似情绪
    getSimilar(emotionId) {
        const emotion = this.index.find(item => item.id === emotionId);
        if (!emotion) return [];

        const keywords = emotion.keywords;
        const similar = new Map();

        keywords.forEach(keyword => {
            const matches = this.search(keyword, { limit: 5 });
            matches.forEach(match => {
                if (match.id !== emotionId) {
                    const score = similar.get(match.id) || 0;
                    similar.set(match.id, score + 1);
                }
            });
        });

        return Array.from(similar.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([id]) => this.index.find(item => item.id === id));
    }

    // 智能推荐
    recommend(description) {
        const tokens = this.tokenize(description);
        const scores = new Map();

        // 关键词权重
        const weights = {
            '开心': { category: 'joy', score: 2 },
            '难过': { category: 'sorrow', score: 2 },
            '生气': { category: 'anger', score: 2 },
            '害怕': { category: 'fear', score: 2 },
            '爱': { category: 'love', score: 2 },
            '讨厌': { category: 'disgust', score: 2 },
            '喜欢': { category: 'love', score: 2 },
            '烦': { category: 'anger', score: 1 },
            '孤独': { category: 'sorrow', score: 2, emotion: '孤寂' },
            '释然': { category: 'amusement', score: 2, emotion: '释然' }
        };

        tokens.forEach(token => {
            if (weights[token]) {
                const weight = weights[token];
                this.filterByCategory(weight.category).forEach(item => {
                    if (weight.emotion && item.name !== weight.emotion) return;
                    const score = scores.get(item.id) || 0;
                    scores.set(item.id, score + weight.score);
                });
            }
        });

        return Array.from(scores.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([id]) => this.index.find(item => item.id === id));
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmotionSearch;
}
