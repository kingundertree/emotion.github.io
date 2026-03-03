/**
 * 情绪搜索 UI 组件
 */

// 搜索组件 HTML
const searchComponentHTML = `
<div id="emotion-search" class="search-container">
    <div class="search-box">
        <input type="text" id="search-input" placeholder="搜索情绪（如：欣喜、孤独、惊喜...）" autocomplete="off">
        <button id="search-btn" class="btn-search">
            <span>🔍</span>
        </button>
    </div>
    <div class="search-filters">
        <button class="filter-chip active" data-category="all">全部</button>
        <button class="filter-chip" data-category="joy">喜</button>
        <button class="filter-chip" data-category="anger">怒</button>
        <button class="filter-chip" data-category="sorrow">哀</button>
        <button class="filter-chip" data-category="amusement">乐</button>
        <button class="filter-chip" data-category="fear">惧</button>
        <button class="filter-chip" data-category="love">爱</button>
        <button class="filter-chip" data-category="disgust">恶</button>
        <button class="filter-chip" data-category="desire">欲</button>
    </div>
    <div id="search-results" class="search-results"></div>
    <div id="search-suggestions" class="search-suggestions"></div>
</div>

<style>
.search-container {
    margin: 20px 0;
    padding: 20px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.search-box {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

#search-input {
    flex: 1;
    padding: 12px 16px;
    font-size: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    transition: border-color 0.3s;
}

#search-input:focus {
    outline: none;
    border-color: var(--primary-red, #c23a3a);
}

.btn-search {
    padding: 12px 20px;
    background: var(--primary-red, #c23a3a);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background 0.3s;
}

.btn-search:hover {
    background: #a82e2e;
}

.search-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 15px;
}

.filter-chip {
    padding: 6px 14px;
    border: 1px solid #ddd;
    border-radius: 20px;
    background: white;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.3s;
}

.filter-chip:hover {
    background: #f5f5f5;
}

.filter-chip.active {
    background: var(--primary-red, #c23a3a);
    color: white;
    border-color: var(--primary-red, #c23a3a);
}

.search-results {
    max-height: 400px;
    overflow-y: auto;
}

.search-result-item {
    padding: 15px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background 0.2s;
}

.search-result-item:hover {
    background: #f9f9f9;
}

.search-result-item h4 {
    margin: 0 0 5px 0;
    color: #333;
}

.search-result-item h4 small {
    font-weight: normal;
    color: #888;
    font-size: 0.8rem;
}

.search-result-item p {
    margin: 5px 0;
    color: #666;
    font-size: 0.9rem;
}

.search-result-item .category-tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.75rem;
    margin-right: 5px;
}

.category-tag.joy { background: #fff3cd; color: #856404; }
.category-tag.anger { background: #f8d7da; color: #721c24; }
.category-tag.sorrow { background: #d1ecf1; color: #0c5460; }
.category-tag.amusement { background: #d4edda; color: #155724; }
.category-tag.fear { background: #e2e3e5; color: #383d41; }
.category-tag.love { background: #fce4ec; color: #880e4f; }
.category-tag.disgust { background: #d6d6d6; color: #333; }
.category-tag.desire { background: #fff8e1; color: #ff6f00; }

.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    display: none;
}

.search-suggestions.active {
    display: block;
}

.suggestion-item {
    padding: 10px 15px;
    cursor: pointer;
    transition: background 0.2s;
}

.suggestion-item:hover {
    background: #f5f5f5;
}

.no-results {
    padding: 30px;
    text-align: center;
    color: #888;
}

/* 响应式 */
@media (max-width: 600px) {
    .search-box {
        flex-direction: column;
    }
    
    .search-filters {
        justify-content: center;
    }
}
</style>
`;

// 搜索组件 JavaScript
class EmotionSearchUI {
    constructor(containerId, searchIndex) {
        this.container = document.getElementById(containerId);
        this.searchEngine = new EmotionSearch(searchIndex);
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        // 插入 HTML
        this.container.innerHTML = searchComponentHTML;

        // 绑定事件
        this.bindEvents();
    }

    bindEvents() {
        const input = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const filters = document.querySelectorAll('.filter-chip');

        // 输入事件
        let debounceTimer;
        input.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, 300);
        });

        // 搜索按钮
        searchBtn.addEventListener('click', () => {
            this.handleSearch(input.value);
        });

        // 回车搜索
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch(input.value);
            }
        });

        // 类别筛选
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                this.currentCategory = filter.dataset.category;
                this.handleSearch(input.value);
            });
        });
    }

    handleSearch(query) {
        const resultsContainer = document.getElementById('search-results');

        if (!query.trim()) {
            resultsContainer.innerHTML = '';
            return;
        }

        const options = {
            limit: 20,
            fuzzy: true,
            category: this.currentCategory === 'all' ? null : this.currentCategory
        };

        const results = this.searchEngine.search(query, options);
        this.renderResults(results, query);
    }

    renderResults(results, query) {
        const container = document.getElementById('search-results');

        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <p>未找到与"${query}"相关的情绪</p>
                    <p style="font-size: 0.85rem; margin-top: 10px;">
                        试试其他关键词，或浏览<a href="#categories">情绪分类</a>
                    </p>
                </div>
            `;
            return;
        }

        const html = results.map(item => `
            <div class="search-result-item" onclick="scrollToEmotion('${item.id}')">
                <h4>
                    ${item.name} 
                    <small>| ${item.en}</small>
                </h4>
                <span class="category-tag ${item.category}">${item.categoryTitle.replace(/[【】]/g, '')}</span>
                <p>${this.highlightText(item.desc, query)}</p>
                <p style="font-size: 0.8rem; color: #999;">
                    📖 ${item.source}
                </p>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background: #fff3cd; padding: 0 2px;">$1</mark>');
    }
}

// 滚动到指定情绪
function scrollToEmotion(emotionId) {
    const element = document.getElementById(emotionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.animation = 'highlight 2s ease-out';
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EmotionSearchUI, EmotionSearch };
}
