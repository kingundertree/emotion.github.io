# 情绪词条模板 v2.0

本文档定义了情绪词条的完整数据结构，用于指导内容扩展。

## 基础结构

```json
{
  "name": "欣喜",
  "en": "Delight",
  "desc": "意外的微小快乐",
  "source": "杜甫《闻官军收河南河北》"
}
```

## 完整结构（增强版）

```json
{
  // ===== 基础信息 =====
  "name": "欣喜",
  "en": "Delight",
  "pinyin": "xīn xǐ",
  "desc": "意外的微小快乐，内心充满愉悦的温暖感受",
  "source": "杜甫《闻官军收河南河北》",
  
  // ===== 情绪光谱 =====
  "spectrum": {
    "intensity": 3,
    "polarity": "+",
    "duration": "短暂",
    "trigger": "意外收获",
    "valence": 0.7,
    "arousal": 0.5
  },
  
  // ===== 心理学维度 =====
  "psychology": {
    "ekman": "joy",
    "plutchik": "joy-serenity",
    "dimension": {
      "valence": 0.8,
      "arousal": 0.6,
      "dominance": 0.5
    },
    "definition": {
      "academic": "一种由意外收获或积极事件引发的愉悦情绪状态",
      "colloquial": "心里美滋滋，忍不住想笑"
    }
  },
  
  // ===== 文化比较 =====
  "crossCulture": {
    "western": "Delight implies mild, pleasant surprise, often from unexpected good news",
    "chinese": "欣喜含'欣然'之意，强调主动性与内在满足，比'快乐'更含蓄",
    "japanese": "よろこび (yorokobi) - 喜悦，带有感激之情"
  },
  
  // ===== 相关情绪网络 =====
  "relations": {
    "similar": ["愉悦", "庆幸", "欣慰"],
    "opposite": ["失望", "沮丧", "懊恼"],
    "oftenWith": ["期待", "释然", "感恩"],
    "evolves_to": ["狂喜", "陶醉"],
    "evolves_from": ["期待", "紧张"]
  },
  
  // ===== 名著情节 =====
  "classics": {
    "honglou": {
      "scene": "刘姥姥进大观园",
      "chapter": "第39-41回",
      "characters": ["刘姥姥", "贾母", "王熙凤"],
      "context": "乡野老妇初入豪门，大开眼界",
      "emotionTrigger": "刘姥姥见所未见的新奇事物",
      "quote": "老刘，老刘，食量大如牛，吃个老母猪，不抬头！",
      "analysis": "通过乡野与豪门的对比，制造喜剧效果，展现欣喜的纯真",
      "modernParallel": "初入大城市的年轻人"
    },
    "xiyou": { ... },
    "shuihu": { ... },
    "sanguo": { ... }
  },
  
  // ===== 多媒体资源 =====
  "media": {
    "music": [
      {
        "id": 139821,
        "title": "春节序曲",
        "artist": "李焕之",
        "type": "classic",
        "description": "欢快热烈的旋律，展现节日的喜悦",
        "url": "https://music.163.com/#/song?id=139821"
      },
      {
        "id": 123456,
        "title": "好运来",
        "artist": "祖海",
        "type": "modern",
        "description": "喜庆欢快，适合喜事场景"
      },
      {
        "id": 789012,
        "title": "春江花月夜",
        "artist": "古筝",
        "type": "instrumental",
        "description": "优美流畅，内心平和的喜悦"
      }
    ],
    "video": {
      "keyword": "活着 家珍归来",
      "searchUrl": "https://search.bilibili.com/all?keyword=活着%20家珍归来",
      "clips": [
        {
          "title": "活着 - 家珍归来",
          "timeStart": "01:23:45",
          "duration": "2:30",
          "description": "家珍回到福贵身边，一家人团聚的欣喜"
        }
      ]
    },
    "images": [
      {
        "url": "images/emotions/delight-1.jpg",
        "description": "儿童收到礼物的笑脸",
        "source": "Unsplash"
      }
    ]
  },
  
  // ===== 诗词歌赋 =====
  "poetry": [
    {
      "title": "闻官军收河南河北",
      "author": "杜甫",
      "dynasty": "唐",
      "content": "剑外忽传收蓟北，初闻涕泪满衣裳。却看妻子愁何在，漫卷诗书喜欲狂。",
      "translation": "剑门关外忽然传来收复蓟北的消息，刚听到时眼泪洒满了衣裳...",
      "tags": ["狂喜", "欣慰"]
    }
  ],
  
  // ===== 现代场景 =====
  "modernScenarios": [
    {
      "scene": "收到意外的好消息",
      "example": "考试成绩比预期好很多",
      "intensity": 3,
      "tip": "记录此刻，感恩生活"
    },
    {
      "scene": "久别重逢",
      "example": "遇到多年未见的老朋友",
      "intensity": 4,
      "tip": "珍惜相聚时光"
    },
    {
      "scene": "作品被认可",
      "example": "辛苦完成的项目得到赞赏",
      "intensity": 4,
      "tip": "享受成就感，继续前行"
    }
  ],
  
  // ===== 应对策略 =====
  "coping": {
    "enhance": "记录此刻，感恩生活。将这份喜悦分享给他人，让快乐传递。",
    "balance": "享受当下，不过度依恋。明白情绪是流动的，保持平和心态。",
    "whenOverwhelmed": "如果欣喜过度影响判断，深呼吸，给自己一点冷静时间。"
  },
  
  // ===== 创作应用 =====
  "creative": {
    "writing": {
      "keywords": ["嘴角上扬", "眉开眼笑", "手舞足蹈", "心花怒放"],
      "actions": ["拍手", "跳跃", "拥抱", "转圈"],
      "expressions": ["眼角弯弯", "面带微笑", "神采飞扬"]
    },
    "screenplay": {
      "cameraAngle": "特写面部表情，捕捉眼神的变化",
      "lighting": "暖色调，明亮柔和",
      "music": "轻快活泼的旋律",
      "pacing": "节奏稍快，展现兴奋感"
    }
  },
  
  // ===== 标签系统 =====
  "tags": {
    "categories": ["正面情绪", "高频情绪"],
    "scenes": ["职场", "家庭", "社交"],
    "topics": ["成就", "人际", "日常"]
  },
  
  // ===== 元数据 =====
  "meta": {
    "createdAt": "2026-03-03",
    "updatedAt": "2026-03-03",
    "contributors": ["kingundertree"],
    "version": "2.0"
  }
}
```

## 字段说明

### 情绪光谱 (spectrum)

| 字段 | 类型 | 说明 | 取值范围 |
|------|------|------|----------|
| intensity | number | 情绪强度 | 1-10 |
| polarity | string | 情绪极性 | "+", "-", "±" |
| duration | string | 持续时间特征 | "短暂", "中等", "持久" |
| trigger | string | 典型触发条件 | 文字描述 |
| valence | number | 效价（愉悦度） | -1 到 1 |
| arousal | number | 唤醒度（激活程度） | 0 到 1 |

### 心理学维度 (psychology)

| 字段 | 说明 |
|------|------|
| ekman | Ekman 基础情绪分类 |
| plutchik | Plutchik 轮盘位置 |
| dimension.valence | 效价：正/负 |
| dimension.arousal | 唤醒度：平静/激动 |
| dimension.dominance | 支配度：被动/主动 |

### 相关情绪 (relations)

| 字段 | 说明 |
|------|------|
| similar | 相似情绪（同类） |
| opposite | 相反情绪 |
| oftenWith | 常伴随出现的情绪 |
| evolves_to | 可能演变为 |
| evolves_from | 可能由...演变 |

---

## 扩展指南

### 优先级

1. **P0 - 必填**：name, en, desc, source
2. **P1 - 重要**：spectrum, psychology, classics
3. **P2 - 丰富**：media, poetry, modernScenarios
4. **P3 - 高级**：crossCulture, creative, coping

### 内容创作建议

1. **定义**：简洁准确，区分与其他情绪的不同
2. **典故**：选择最具代表性的历史人物/事件
3. **名著情节**：确保情节准确，注明回目
4. **现代场景**：贴近当代生活，提供具体例子

---

*模板版本: 2.0*
*最后更新: 2026-03-03*
