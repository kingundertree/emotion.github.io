/**
 * 情绪可视化页面组件
 */

// 添加可视化模态框
function showVisualization() {
    const modal = document.getElementById('vizModal');
    if (!modal) {
        createVisualizationModal();
    } else {
        modal.style.display = 'block';
    }
}

function closeVisualization() {
    const modal = document.getElementById('vizModal');
    if (modal) modal.style.display = 'none';
}

function createVisualizationModal() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.id = 'vizModal';
    modal.className = 'modal';
    modal.style.cssText = 'display:block;';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width:800px; max-height:90vh; overflow-y:auto; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); margin:0;">
            <span class="close-modal" onclick="closeVisualization()" style="position:absolute; top:15px; right:20px;">&times;</span>
            <h2 style="text-align:center; margin:20px 0;">📊 情绪可视化</h2>
            
            <div style="display:flex; flex-wrap:wrap; gap:20px; justify-content:center; padding:20px;">
                <div>
                    <h3 style="text-align:center; margin-bottom:10px;">情绪轮盘</h3>
                    <div id="emotionWheel"></div>
                </div>
                <div>
                    <h3 style="text-align:center; margin-bottom:10px;">情绪分布</h3>
                    <div id="emotionDistribution"></div>
                </div>
            </div>
            
            <div style="padding:20px; text-align:center;">
                <h3 style="margin-bottom:15px;">选择情绪查看雷达图</h3>
                <select id="emotionSelect" style="padding:10px; font-size:1rem; border-radius:8px; border:2px solid #e0e0e0; min-width:200px;">
                    <option value="">选择情绪...</option>
                </select>
                <div id="emotionRadar" style="margin-top:20px;"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 初始化可视化
    initVisualization();
}

function initVisualization() {
    // 创建可视化器
    const visualizer = new EmotionVisualizer('emotionWheel');
    
    // 绘制情绪轮盘
    const wheelCanvas = visualizer.createEmotionWheel(emotionData);
    document.getElementById('emotionWheel').appendChild(wheelCanvas);
    
    // 填充情绪选择器
    const select = document.getElementById('emotionSelect');
    emotionData.forEach(category => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category.title;
        
        category.items.forEach(item => {
            const option = document.createElement('option');
            option.value = `${category.id}-${item.name}`;
            option.textContent = item.name;
            optgroup.appendChild(option);
        });
        
        select.appendChild(optgroup);
    });
    
    // 监听选择事件
    select.addEventListener('change', function() {
        if (!this.value) return;
        
        const [categoryId, emotionName] = this.value.split('-');
        const category = emotionData.find(c => c.id === categoryId);
        const emotion = category?.items.find(e => e.name === emotionName);
        
        if (emotion) {
            showEmotionRadar(emotion, emotionName);
        }
    });
    
    // 绘制情绪分布
    drawDistributionChart();
}

function showEmotionRadar(emotion, name) {
    const container = document.getElementById('emotionRadar');
    container.innerHTML = '';
    
    const visualizer = new EmotionVisualizer('emotionRadar');
    
    // 模拟情绪数据（实际应从扩展数据中获取）
    const emotionData = {
        intensity: 5,
        valence: 0,
        arousal: 0.5,
        duration: '中等',
        social: 0.5
    };
    
    // 根据情绪名称设置不同的数据
    if (name.includes('喜') || name.includes('乐')) {
        emotionData.valence = 0.8;
        emotionData.arousal = 0.7;
    } else if (name.includes('怒') || name.includes('愤')) {
        emotionData.valence = -0.7;
        emotionData.arousal = 0.9;
    } else if (name.includes('哀') || name.includes('悲')) {
        emotionData.valence = -0.6;
        emotionData.arousal = 0.3;
    } else if (name.includes('惧') || name.includes('恐')) {
        emotionData.valence = -0.8;
        emotionData.arousal = 0.8;
    }
    
    const radarCanvas = visualizer.createRadarChart(emotionData, `${name} - 情绪雷达图`);
    container.appendChild(radarCanvas);
}

function drawDistributionChart() {
    const container = document.getElementById('emotionDistribution');
    
    // 统计每个类别的情绪数量
    const distribution = emotionData.map(cat => ({
        name: cat.title.replace(/[【】]/g, ''),
        count: cat.items.length
    }));
    
    // 创建简单的条形图
    const maxCount = Math.max(...distribution.map(d => d.count));
    const barWidth = 30;
    const gap = 10;
    
    let html = '<div style="display:flex; align-items:flex-end; gap:' + gap + 'px; height:150px; padding:10px;">';
    
    distribution.forEach(item => {
        const height = (item.count / maxCount) * 120;
        html += `
            <div style="text-align:center;">
                <div style="background:var(--primary-red); width:${barWidth}px; height:${height}px; border-radius:4px 4px 0 0;"></div>
                <div style="font-size:0.7rem; margin-top:5px;">${item.name}</div>
                <div style="font-size:0.6rem; color:#999;">${item.count}</div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// 在页面加载后添加可视化按钮
document.addEventListener('DOMContentLoaded', function() {
    // 在导航栏添加可视化按钮
    const nav = document.querySelector('.nav-links');
    if (nav) {
        const vizLink = document.createElement('a');
        vizLink.href = '#';
        vizLink.onclick = showVisualization;
        vizLink.textContent = '📊 可视化';
        nav.appendChild(vizLink);
    }
});
