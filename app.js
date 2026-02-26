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

            return `
                <div id="${cat.id}-${iIndex}" style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px dashed #eee;">
                    <h3>${item.name} <small style="font-weight:normal; color:#666; font-size:0.85rem">| ${item.en}</small></h3>
                    <p><strong>定义：</strong>${item.desc}</p>
                    <p><strong>典故：</strong>${item.source}</p>
                    ${bookExamples ? `<div style="margin-top:10px;"><strong>名著情节：</strong>${bookExamples}</div>` : ''}
                    <div class="resource-grid">
                        <div class="resource-card">
                            <h4>🎵 音乐</h4>
                            <a href="https://music.163.com/" target="_blank" class="btn-link">试听</a>
                        </div>
                        <div class="resource-card">
                            <h4>🎬 影视</h4>
                            <a href="https://search.bilibili.com/all?keyword=${encodeURIComponent(item.name + ' 四大名著')}" target="_blank" class="btn-link">搜索</a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        contentHtml += `<section id="${cat.id}"><h1>${cat.title}</h1><h2>${cat.en}</h2>${itemsHtml}</section>`;
    });

    books.forEach(book => {
        let casesHtml = '';
        emotionData.forEach(cat => {
            cat.items.forEach(item => {
                if(item[book.id]) {
                    casesHtml += `
                        <div class="resource-card" style="border-left: 4px solid ${book.color}; margin-bottom:15px;">
                            <h4>${item.name} <span style="font-weight:normal; font-size:0.75rem">(${item.en})</span></h4>
                            <p style="font-size:0.85rem; margin: 5px 0; color:#333;">${item[book.id]}</p>
                            <a href="#${cat.id}-${cat.items.indexOf(item)}" onclick="closeMobileSidebar()" class="btn-link" style="background:transparent; color:${book.color}; border:1px solid ${book.color}; padding:2px 6px; font-size:0.75rem;">查看详解</a>
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