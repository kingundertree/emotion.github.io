// 情绪可视化图表模块

class EmotionVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.ctx = null;
    }
    
    // 创建雷达图
    createRadarChart(emotionData, title = "情绪雷达图") {
        const width = 400;
        const height = 400;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 150;
        
        // 创建 canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        
        // 绘制背景
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0, 0, width, height);
        
        // 绘制标题
        this.ctx.font = 'bold 16px sans-serif';
        this.ctx.fillStyle = '#333';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(title, centerX, 25);
        
        // 绘制雷达网格
        this.drawRadarGrid(centerX, centerY, radius, 5);
        
        // 绘制数据
        if (emotionData) {
            this.drawRadarData(centerX, centerY, radius, emotionData);
        }
        
        // 绘制标签
        this.drawRadarLabels(centerX, centerY, radius, 
            ['强度', '愉悦度', '唤醒度', '持久性', '社交性']);
        
        return this.canvas;
    }
    
    drawRadarGrid(cx, cy, r, levels) {
        const sides = 5;
        const angle = (Math.PI * 2) / sides;
        
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 1;
        
        // 绘制同心多边形
        for (let level = 1; level <= levels; level++) {
            const currentR = (r / levels) * level;
            this.ctx.beginPath();
            for (let i = 0; i <= sides; i++) {
                const x = cx + currentR * Math.cos(angle * i - Math.PI / 2);
                const y = cy + currentR * Math.sin(angle * i - Math.PI / 2);
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        }
        
        // 绘制轴线
        for (let i = 0; i < sides; i++) {
            const x = cx + r * Math.cos(angle * i - Math.PI / 2);
            const y = cy + r * Math.sin(angle * i - Math.PI / 2);
            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }
    
    drawRadarData(cx, cy, r, data) {
        const sides = 5;
        const angle = (Math.PI * 2) / sides;
        
        // 数据归一化到 0-1
        const normalizedData = [
            (data.intensity || 5) / 10,
            ((data.valence || 0) + 1) / 2,  // -1 到 1 转换为 0 到 1
            data.arousal || 0.5,
            data.duration === '持久' ? 0.8 : data.duration === '短暂' ? 0.2 : 0.5,
            data.social || 0.5
        ];
        
        // 绘制数据多边形
        this.ctx.fillStyle = 'rgba(194, 58, 58, 0.3)';
        this.ctx.strokeStyle = '#c23a3a';
        this.ctx.lineWidth = 2;
        
        this.ctx.beginPath();
        for (let i = 0; i <= sides; i++) {
            const index = i % sides;
            const currentR = r * normalizedData[index];
            const x = cx + currentR * Math.cos(angle * index - Math.PI / 2);
            const y = cy + currentR * Math.sin(angle * index - Math.PI / 2);
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.fill();
        this.ctx.stroke();
        
        // 绘制数据点
        this.ctx.fillStyle = '#c23a3a';
        for (let i = 0; i < sides; i++) {
            const currentR = r * normalizedData[i];
            const x = cx + currentR * Math.cos(angle * i - Math.PI / 2);
            const y = cy + currentR * Math.sin(angle * i - Math.PI / 2);
            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    drawRadarLabels(cx, cy, r, labels) {
        const sides = labels.length;
        const angle = (Math.PI * 2) / sides;
        
        this.ctx.font = '12px sans-serif';
        this.ctx.fillStyle = '#666';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        for (let i = 0; i < sides; i++) {
            const labelR = r + 20;
            const x = cx + labelR * Math.cos(angle * i - Math.PI / 2);
            const y = cy + labelR * Math.sin(angle * i - Math.PI / 2);
            this.ctx.fillText(labels[i], x, y);
        }
    }
    
    // 创建情绪轮盘图
    createEmotionWheel(categories) {
        const width = 500;
        const height = 500;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 200;
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        
        // 绘制背景
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0, 0, width, height);
        
        // 绘制标题
        this.ctx.font = 'bold 16px sans-serif';
        this.ctx.fillStyle = '#333';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('情绪轮盘', centerX, 25);
        
        // 颜色映射
        const colors = {
            'joy': '#FFD700',
            'anger': '#FF6B6B',
            'sorrow': '#4ECDC4',
            'amusement': '#95E1D3',
            'fear': '#DDA0DD',
            'love': '#FFB6C1',
            'disgust': '#98D8C8',
            'desire': '#F7DC6F'
        };
        
        // 绘制扇形
        const totalCategories = categories.length;
        const anglePerCategory = (Math.PI * 2) / totalCategories;
        
        categories.forEach((category, index) => {
            const startAngle = index * anglePerCategory - Math.PI / 2;
            const endAngle = startAngle + anglePerCategory;
            
            // 绘制扇形
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();
            
            this.ctx.fillStyle = colors[category.id] || '#ccc';
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // 绘制标签
            const labelAngle = startAngle + anglePerCategory / 2;
            const labelR = radius * 0.7;
            const labelX = centerX + labelR * Math.cos(labelAngle);
            const labelY = centerY + labelR * Math.sin(labelAngle);
            
            this.ctx.font = '14px sans-serif';
            this.ctx.fillStyle = '#333';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(category.title.replace(/[【】]/g, ''), labelX, labelY);
        });
        
        // 绘制中心圆
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.strokeStyle = '#c23a3a';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        this.ctx.font = 'bold 12px sans-serif';
        this.ctx.fillStyle = '#c23a3a';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('情绪', centerX, centerY);
        
        return this.canvas;
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmotionVisualizer;
}
