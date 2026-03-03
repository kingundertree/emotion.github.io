/**
 * 名著案例扩展
 * 为每个情绪添加更多名著场景
 */

const classicsExtensions = {
    "欣喜": {
        honglou: {
            scene: "刘姥姥进大观园",
            chapter: "第39-41回",
            characters: ["刘姥姥", "贾母", "王熙凤"],
            context: "乡野老妇初入豪门，大开眼界",
            quote: "老刘，老刘，食量大如牛...",
            analysis: "通过乡野与豪门的对比，展现欣喜的纯真",
            modernParallel: "初入大城市的年轻人"
        },
        xiyou: {
            scene: "孙悟空拜师学艺",
            chapter: "第1-2回",
            characters: ["孙悟空", "菩提祖师"],
            context: "石猴得道，欢喜若狂",
            quote: "大王在此百年，如今大王有此神通",
            analysis: "从懵懂到觉醒的欣喜"
        },
        sanguo: {
            scene: "三顾茅庐成功",
            chapter: "第37-38回",
            characters: ["刘备", "诸葛亮"],
            context: "诚意感动卧龙，终得贤才",
            quote: "备久慕高名，今得相见",
            analysis: "求贤若渴终获成功的欣喜"
        }
    },
    
    "狂喜": {
        honglou: {
            scene: "宝玉挨打后黛玉探视",
            chapter: "第33-34回",
            characters: ["宝玉", "黛玉"],
            context: "虽痛却喜，知己情深",
            quote: "你从此可都改了罢",
            analysis: "痛中带喜，情感升华"
        },
        xiyou: {
            scene: "取得真经归来",
            chapter: "第98-100回",
            characters: ["唐僧", "孙悟空", "如来佛祖"],
            context: "历经磨难，终成正果",
            quote: "功德圆满，皆大欢喜",
            analysis: "坚持到底的终极欣喜"
        },
        sanguo: {
            scene: "赤壁之战胜利",
            chapter: "第49回",
            characters: ["周瑜", "诸葛亮"],
            context: "火攻成功，曹操大败",
            quote: "万事俱备，只欠东风",
            analysis: "战略成功的狂喜"
        }
    },
    
    "暴怒": {
        honglou: {
            scene: "王熙凤大闹宁国府",
            chapter: "第44回",
            characters: ["王熙凤", "尤氏"],
            context: "发现丈夫偷情，怒不可遏",
            quote: "什么要紧的事！你们到底还是同路人",
            analysis: "被背叛后的极端愤怒"
        },
        xiyou: {
            scene: "孙悟空大闹天宫",
            chapter: "第4-7回",
            characters: ["孙悟空", "玉帝", "众神"],
            context: "不服天庭管束，怒火中烧",
            quote: "皇帝轮流做，明年到我家",
            analysis: "被轻视后的反抗之怒"
        },
        sanguo: {
            scene: "张飞怒鞭督邮",
            chapter: "第2回",
            characters: ["张飞", "督邮"],
            context: "不满贪官污吏",
            quote: "害民贼！认得我么？",
            analysis: "正义之怒"
        }
    },
    
    "孤寂": {
        honglou: {
            scene: "黛玉葬花",
            chapter: "第27回",
            characters: ["林黛玉"],
            context: "寄人篱下，孤独无依",
            quote: "花谢花飞花满天，红消香断有谁怜",
            analysis: "将花比己，孤独自怜",
            modernParallel: "独自在大城市打拼的年轻人"
        },
        xiyou: {
            scene: "唐僧独坐孤灯",
            chapter: "多处",
            characters: ["唐僧"],
            context: "取经路上的孤独",
            quote: "徒弟们都不在，我如何是好",
            analysis: "领袖的孤独"
        },
        sanguo: {
            scene: "刘备寄人篱下",
            chapter: "第21回",
            characters: ["刘备"],
            context: "投靠曹操，寄人篱下",
            quote: "备若有基业，天下碌碌之辈，诚不足虑也",
            analysis: "英雄落魄的孤独",
            modernParallel: "创业失败后的沉寂期"
        }
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = classicsExtensions;
}
