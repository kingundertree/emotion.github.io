// 搜索相关函数
function toggleSearch() {
    const modal = document.getElementById('searchModal');
    const resultsContainer = document.getElementById('searchResults');
    
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
        resultsContainer.innerHTML = '';
    } else {
        modal.style.display = 'block';
        // 聚焦到搜索输入框
        setTimeout(() => {
            document.getElementById('searchInput').focus();
        }, 100);
    }
}

function closeSearch() {
    const modal = document.getElementById('searchModal');
    modal.style.display = 'none';
}

// 搜索执行函数
function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    const category = document.querySelector('.filter-chip.active')?.dataset.category || 'all';
    
    if (!query) return;
    
    // 这里可以添加实际的搜索逻辑
    console.log('搜索:', query, '类别:', category);
    
    // 模拟搜索结果（实际应该从 search-index.json 读取）
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = `
        <div style="padding:20px;">
            <p>🔍 正在搜索：<strong>${query}</strong></p>
            <p>📊 找到相关情绪...</p>
        </div>
    `;
}