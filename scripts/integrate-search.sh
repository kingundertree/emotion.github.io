#!/bin/bash
# 情绪网站 - 搜索功能集成脚本（安全版本）
# 确保不破坏现有功能

set -e

echo "=== 开始集成搜索功能 ==="

# 1. 检查当前状态
echo "1️⃣ 检查当前文件..."
if [ ! -f "index.html" ] || [ ! -f "data.js" ]; then
    echo "❌ 关键文件缺失"
    exit 1
fi

# 2. 备份当前文件
echo "2️⃣ 备份当前文件..."
cp index.html index.html.backup
cp app.js app.js.backup

# 3. 在 app.js 中添加搜索函数
echo "3️⃣ 添加搜索函数..."

if ! grep -q "function toggleSearch" app.js; then
    cat >> app.js << 'SEARCH_FUNCTIONS'

// === 搜索功能 ===
function toggleSearch() {
    const modal = document.getElementById('searchModal');
    if (!modal) {
        console.error('搜索模态框不存在');
        return;
    }
    
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        const input = document.getElementById('searchInput');
        if (input) input.focus();
    }
}

function closeSearch() {
    const modal = document.getElementById('searchModal');
    if (modal) modal.style.display = 'none';
}

function performSearch() {
    const query = document.getElementById('searchInput')?.value.trim() || '';
    if (!query) return;
    
    const results = [];
    const searchLower = query.toLowerCase();
    
    // 搜索情绪数据
    emotionData.forEach(category => {
        category.items.forEach(item => {
            if (item.name.includes(query) || 
                item.en.toLowerCase().includes(searchLower) ||
                item.desc.includes(query)) {
                results.push({
                    ...item,
                    category: category.id,
                    categoryTitle: category.title
                });
            }
        });
    });
    
    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const container = document.getElementById('searchResults');
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = `
            <div style="padding:20px; text-align:center;">
                <p>未找到与"${query}"相关的情绪</p>
            </div>
        `;
        return;
    }
    
    const html = results.map(item => `
        <div class="search-result-item" onclick="scrollToEmotion('${item.name}')">
            <h4>${item.name} <small>| ${item.en}</small></h4>
            <span class="category-tag ${item.category}">${item.categoryTitle}</span>
            <p>${item.desc.substring(0, 50)}...</p>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

function scrollToEmotion(name) {
    closeSearch();
    // 滚动到对应的情绪卡片
    const cards = document.querySelectorAll('.emotion-card');
    for (const card of cards) {
        const title = card.querySelector('h3');
        if (title && title.textContent.includes(name)) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.animation = 'highlight 2s ease-out';
            break;
        }
    }
}
SEARCH_FUNCTIONS
    echo "✅ 搜索函数已添加"
fi

# 4. 在 index.html 中添加搜索模态框（在现有模态框之前）
echo "4️⃣ 添加搜索模态框..."

if ! grep -q "searchModal" index.html; then
    # 找到第一个模态框的位置
    insert_line=$(grep -n "<!-- Daily Sign Modal -->" index.html | head -1 | cut -d: -f1)
    
    if [ -n "$insert_line" ]; then
        # 在该行之前插入搜索模态框
        sed -i.bak "${insert_line}i\\
    <!-- Search Modal -->\\
    <div id=\"searchModal\" class=\"modal\" style=\"display:none;\">\\
        <div class=\"modal-content\" style=\"max-width:600px; max-height:80vh; overflow-y:auto;\">\\
            <span class=\"close-modal\" onclick=\"closeSearch()\">&times;</span>\\
            <h2 style=\"text-align:center; margin-bottom:20px;\">🔍 情绪搜索</h2>\\
            <input type=\"text\" id=\"searchInput\" placeholder=\"搜索情绪（如：欣喜、孤独...）\" \\
                style=\"width:100%; padding:12px; font-size:1rem; border:2px solid #e0e0e0; border-radius:8px; box-sizing:border-box; margin-bottom:15px;\">\\
            <div id=\"searchResults\" style=\"max-height:400px; overflow-y:auto;\"></div>\\
        </div>\\
    </div>\\
\\
" index.html
        echo "✅ 搜索模态框已添加"
    fi
fi

# 5. 在导航栏添加搜索按钮
echo "5️⃣ 添加搜索按钮..."

if ! grep -q "toggleSearch()" index.html; then
    # 在导航栏的第一个链接后添加搜索按钮
    sed -i.bak 's|<a href="#categories">情绪分类</a>|<a href="#categories">情绪分类</a>\n            <a href="#" onclick="toggleSearch()" style="color:var(--primary-red)">🔍 搜索</a>|' index.html
    echo "✅ 搜索按钮已添加"
fi

# 6. 验证文件完整性
echo "6️⃣ 验证文件完整性..."

# 检查 HTML 标签匹配
open_tags=$(grep -c "<script" index.html)
close_tags=$(grep -c "</script>" index.html)
if [ "$open_tags" -ne "$close_tags" ]; then
    echo "❌ HTML 标签不匹配"
    cp index.html.backup index.html
    cp app.js.backup app.js
    echo "已恢复备份"
    exit 1
fi

# 检查 data.js 是否仍然存在
if [ ! -f "data.js" ]; then
    echo "❌ data.js 被删除了"
    cp index.html.backup index.html
    cp app.js.backup app.js
    echo "已恢复备份"
    exit 1
fi

echo "✅ 文件完整性验证通过"

# 7. 清理备份
rm -f index.html.bak app.js.backup

echo ""
echo "✅ 搜索功能集成完成！"
echo ""
echo "请运行以下命令测试："
echo "  python3 -m http.server 8000"
echo "  open http://localhost:8000"
EOF

chmod +x scripts/integrate-search.sh
echo "✅ 已创建集成脚本"