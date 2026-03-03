// --- Render Functions ---
function renderSidebar() {
    const container = document.getElementById('regular-menu-container');
    if (!container) return;
    let html = '';
    emotionData.forEach((cat, index) => {
        html += `
            <div class="menu-category">
                <div class="menu-title" onclick="toggleMenu(${index})">${cat.title}</div>
                <ul class="submenu" id="submenu-${index}">
                    ${cat.items.map((item, i) => `
                        <li><a href="#${cat.id}-${i}" onclick="closeMobileSidebar()">${item.name} <small style="color:#999">(${item.en})</small></a></li>
                    `).join('')}
                </ul>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderContent() {
    const container = document.getElementById('categories-container');
    const classicsContainer = document.getElementById('classics-container');
    if (!container || !classicsContainer) return;
    
    let contentHtml = '';
    const books = [
        { id: 'honglou', name: '红楼梦', tagClass: 'tag-hl', color: 'var(--hl-pink)', icon: '📖' },
        { id: 'xiyou', name: '西游记', tagClass: 'tag-xy', color: 'var(--xy-gold)', icon: '🐒' },
        { id: 'shuihu', name: '水浒传', tagClass: 'tag-sh', color: 'var(--sh-blue)', icon: '🍶' },
        { id: 'sanguo', name: '三国演义', tagClass: 'tag-sg', color: 'var(--sg-red)', icon: '⚔️' }
    ];

    emotionData.forEach((cat, cIndex) => {
        let itemsHtml = cat.items.map((item, iIndex) => {
            // 1. 生成名著情节标签 (保持不变)
            let bookExamples = '';
            books.forEach(book => {
                if(item[book.id]) {
                    bookExamples += `
                        <div style="margin-top:8px; font-size:0.85rem; padding:5px; background:rgba(0,0,0,0.02); border-left:3px solid ${book.color};">
                            <span class="book-tag ${book.tagClass}">${book.icon} ${book.name}</span>
                            <span style="margin-left:5px; color:#555;">${item[book.id]}</span>
                        </div>
                    `;
                }
            });

            // 【核心修复】生成精准的 ID 直链
            // 网易云音乐 ID 直链格式：https://music.163.com/#/song?id=ID
            // 这种链接通常无需登录即可播放或查看详情
            const musicUrl = item.musicId 
                ? `https://music.163.com/#/song?id=${item.musicId}` 
                : `https://music.163.com/#/search/m?s=${encodeURIComponent(item.musicTitle || item.name)}`;
             
            // 影视：使用 B 站搜索链接
            // 格式：https://search.bilibili.com/all?keyword=关键词
            const videoSearchUrl = `https://search.bilibili.com/all?keyword=${encodeURIComponent(item.video)}`;

            return `
                <div id="${cat.id}-${iIndex}" style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px dashed #eee;">
                    <h3>${item.name} <small style="font-weight:normal; color:#666; font-size:0.85rem">| ${item.en}</small></h3>
                    <p><strong>定义：</strong>${item.desc}</p>
                    <p><strong>典故：</strong>${item.source}</p>
                    ${bookExamples ? `<div style="margin-top:10px;"><strong>名著情节：</strong>${bookExamples}</div>` : ''}
                    
                    <div class="resource-grid">
                        <div class="resource-card">
                            <h4>🎵 ${item.musicTitle}</h4>
                            <p style="font-size:0.75rem; color:#999; margin-bottom:5px;">点击直达网易云音乐 (免登录)</p>
                            <a href="${musicUrl}" target="_blank" class="btn-link">立即试听</a>
                        </div>
                        <div class="resource-card">
                            <h4>🎬 ${item.video}</h4>
                            <p style="font-size:0.75rem; color:#999; margin-bottom:5px;">点击跳转 B 站搜索结果</p>
                            <a href="${videoSearchUrl}" target="_blank" class="btn-link">观看片段</a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        contentHtml += `<section id="${cat.id}"><h1>${cat.title}</h1><h2>${cat.en}</h2>${itemsHtml}</section>`;
    });

    // 渲染名著专题部分 (简略版，如需升级同理)
    books.forEach(book => {
        let casesHtml = '';
        emotionData.forEach(cat => {
            cat.items.forEach(item => {
                if(item[book.id]) {
                    // 这里也可以加上具体的 link，逻辑同上
                    const videoLink = `https://search.bilibili.com/all?keyword=${encodeURIComponent(item.videoKeyword || (item.name + ' ' + book.name))}`;
                    
                    casesHtml += `
                        <div class="resource-card" style="border-left: 4px solid ${book.color}; margin-bottom:15px;">
                            <h4>${item.name} <span style="font-weight:normal; font-size:0.75rem">(${item.en})</span></h4>
                            <p style="font-size:0.85rem; margin: 5px 0; color:#333;">${item[book.id]}</p>
                            <div style="margin-top:8px;">
                                <a href="${videoLink}" target="_blank" class="btn-link" style="background:transparent; color:${book.color}; border:1px solid ${book.color}; padding:2px 6px; font-size:0.75rem;">🎬 观看片段</a>
                                <a href="#${cat.id}-${cat.items.indexOf(item)}" onclick="closeMobileSidebar()" class="btn-link" style="background:transparent; color:#666; border:1px solid #ccc; padding:2px 6px; font-size:0.75rem; margin-left:5px;">📖 查看详解</a>
                            </div>
                        </div>
                    `;
                }
            });
        });

        classicsContainer.innerHTML += `
            <section id="${book.id}-special" style="border-top: 4px solid ${book.color};">
                <h1 style="color:${book.color}">${book.icon} ${book.name} · 情绪专题</h1>
                <p>《${book.name}》中的经典情绪瞬间。</p>
                <div class="resource-grid" style="grid-template-columns: 1fr;">
                    ${casesHtml}
                </div>
            </section>
        `;
    });

    container.innerHTML = contentHtml;
}

function renderQuiz() {
    const form = document.getElementById('quiz-box');
    if (!form) return;
    let html = '';
    quizQuestions.forEach((q, idx) => {
        html += `
            <div class="quiz-question">
                <p><strong>${idx+1}. ${q.q}</strong></p>
                <div class="quiz-options">
                    ${q.options.map((opt, i) => `
                        <label><input type="radio" name="q${idx}" value="${q.scores[i]}"> ${opt}</label>
                    `).join('')}
                </div>
            </div>
        `;
    });
    html += `<button class="btn-primary" onclick="calculateRadar()">生成情绪雷达图</button>`;
    form.innerHTML = html;
}

// --- Interaction Functions ---
function toggleMenu(index) {
    const submenu = document.getElementById(`submenu-${index}`);
    const title = submenu.previousElementSibling;
    document.querySelectorAll('#regular-menu-container .submenu').forEach((el, i) => {
        if(i !== index) { el.classList.remove('show'); el.previousElementSibling.classList.remove('active'); }
    });
    submenu.classList.toggle('show');
    title.classList.toggle('active');
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

function closeMobileSidebar() {
    if(window.innerWidth <= 768) {
        toggleSidebar();
    }
}

// --- Daily Sign Logic ---
function openDailySign() {
    const modal = document.getElementById('dailyModal');
    if(modal) {
        modal.style.display = 'flex';
        drawDailySign();
    }
}
function closeDailySign() {
    const modal = document.getElementById('dailyModal');
    if(modal) modal.style.display = 'none';
}
function drawDailySign() {
    if (!emotionData.length) return;
    const randomCat = emotionData[Math.floor(Math.random() * emotionData.length)];
    const randomItem = randomCat.items[Math.floor(Math.random() * randomCat.items.length)];
    
    document.getElementById('signTitle').innerText = randomItem.name;
    document.getElementById('signEn').innerText = randomItem.en;
    document.getElementById('signPoem').innerText = `"${randomItem.source.split(' ')[0]}"`; 
    document.getElementById('signDesc').innerText = randomItem.desc;
    
    const advices = ["接纳它，如同接纳天气的变化。", "读一段相关的历史，你会发现并不孤独。", "听一首推荐的曲子，让情绪流动。", "试着像古人一样，将情绪化为文字。", "深呼吸，这只是漫长人生中的一个片段。"];
    document.getElementById('signAdvice').innerText = advices[Math.floor(Math.random() * advices.length)];
}

// --- Radar Chart Logic ---
let radarChart = null;
function calculateRadar() {
    const scores = { joy:0, anger:0, sorrow:0, amusement:0, fear:0, love:0, disgust:0, surprise:0 };
    let answered = 0;
    
    for(let i=0; i<quizQuestions.length; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if(selected) { scores[selected.value]++; answered++; }
    }

    if(answered < quizQuestions.length) { alert("请先完成所有问题。"); return; }

    document.getElementById('quiz-box').style.display = 'none';
    document.getElementById('chart-box').style.display = 'block';

    const ctx = document.getElementById('emotionRadar').getContext('2d');
    const dataValues = Object.values(scores);
    const labels = Object.keys(scores).map(k => {
        const cat = emotionData.find(c => c.id === k);
        return cat ? cat.title.split(' ')[0].replace('[','').replace(']','') : k;
    });

    if(radarChart) radarChart.destroy();

    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: '当前情绪状态',
                data: dataValues,
                backgroundColor: 'rgba(196, 60, 60, 0.4)',
                borderColor: '#C43C3C',
                pointBackgroundColor: '#8B0000',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: '#d4c6a9' },
                    grid: { color: '#d4c6a9' },
                    pointLabels: { font: { family: 'Noto Serif SC', size: 12 }, color: '#333' },
                    ticks: { display: false, max: 4 }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}
function resetQuiz() {
    document.getElementById('quiz-box').style.display = 'block';
    document.getElementById('chart-box').style.display = 'none';
    renderQuiz();
}

// --- Init ---
window.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    renderContent();
    renderQuiz();
    toggleMenu(0);
});

window.onclick = function(event) {
    const modal = document.getElementById('dailyModal');
    if (event.target == modal) closeDailySign();
}
// === 搜索功能 ===
function toggleSearch() {
    const modal = document.getElementById('searchModal');
    if (!modal) return;
    
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
        container.innerHTML = '<div style="padding:20px; text-align:center;">未找到与"' + query + '"相关的情绪</div>';
        return;
    }
    
    let html = '';
    results.forEach(item => {
        html += '<div class="search-result-item" onclick="scrollToEmotion(\'' + item.name + '\')">';
        html += '<h4>' + item.name + ' <small>| ' + item.en + '</small></h4>';
        html += '<p>' + item.desc.substring(0, 50) + '...</p>';
        html += '</div>';
    });
    
    container.innerHTML = html;
}

function scrollToEmotion(name) {
    closeSearch();
    const cards = document.querySelectorAll('.emotion-card');
    for (const card of cards) {
        const title = card.querySelector('h3');
        if (title && title.textContent.includes(name)) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            break;
        }
    }
}
