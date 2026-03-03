/**
 * 情绪词条扩展脚本
 * 根据模板扩展情绪词条内容
 */

const emotionExtensions = {
    // 喜 - 扩展示例
    "欣喜": {
        spectrum: {
            intensity: 3,
            polarity: "+",
            duration: "短暂",
            trigger: "意外收获",
            valence: 0.7,
            arousal: 0.5
        },
        psychology: {
            ekman: "joy",
            definition: "由意外收获或积极事件引发的愉悦情绪"
        },
        relations: {
            similar: ["愉悦", "庆幸", "欣慰"],
            opposite: ["失望", "沮丧"],
            oftenWith: ["期待", "释然"]
        },
        modernScenarios: [
            { scene: "收到意外的好消息", example: "考试成绩比预期好" },
            { scene: "久别重逢", example: "遇到多年未见的老朋友" },
            { scene: "作品被认可", example: "辛苦完成的项目得到赞赏" }
        ],
        coping: {
            enhance: "记录此刻，感恩生活",
            balance: "享受当下，不过度依恋"
        }
    },
    
    "狂喜": {
        spectrum: {
            intensity: 9,
            polarity: "+",
            duration: "短暂",
            trigger: "重大成功",
            valence: 0.9,
            arousal: 0.9
        },
        psychology: {
            ekman: "joy",
            definition: "极度强烈的喜悦，难以自控"
        },
        relations: {
            similar: ["陶醉", "振奋"],
            opposite: ["绝望", "悲痛"],
            evolves_from: ["欣喜", "期待"]
        },
        modernScenarios: [
            { scene: "重大突破", example: "科研项目取得重大进展" },
            { scene: "梦想成真", example: "考上理想学校/得到理想工作" }
        ]
    },
    
    // 怒 - 扩展示例
    "暴怒": {
        spectrum: {
            intensity: 10,
            polarity: "-",
            duration: "短暂",
            trigger: "严重冒犯",
            valence: -0.9,
            arousal: 1.0
        },
        psychology: {
            ekman: "anger",
            definition: "极度强烈的愤怒，可能失去理智"
        },
        relations: {
            similar: ["愤怒", "激愤"],
            opposite: ["平静", "宽容"],
            evolves_from: ["愤怒", "不满"]
        },
        coping: {
            balance: "深呼吸，远离触发源，给自己冷静时间"
        }
    },
    
    // 哀 - 扩展示例
    "孤寂": {
        spectrum: {
            intensity: 5,
            polarity: "-",
            duration: "持久",
            trigger: "社交隔离",
            valence: -0.5,
            arousal: 0.2
        },
        psychology: {
            ekman: "sadness",
            definition: "长期的孤独感与寂寞感"
        },
        relations: {
            similar: ["孤独", "凄凉"],
            opposite: ["热闹", "温馨"],
            oftenWith: ["怀念", "忧郁"]
        },
        modernScenarios: [
            { scene: "独居生活", example: "一个人在异乡生活" },
            { scene: "夜深人静", example: "深夜独自一人" }
        ]
    },
    
    // 惧 - 扩展示例
    "战栗": {
        spectrum: {
            intensity: 8,
            polarity: "-",
            duration: "短暂",
            trigger: "强烈惊吓",
            valence: -0.8,
            arousal: 0.95
        },
        psychology: {
            ekman: "fear",
            definition: "极度恐惧导致的身体反应"
        },
        relations: {
            similar: ["惊恐", "恐慌"],
            opposite: ["镇定", "从容"]
        }
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = emotionExtensions;
}
