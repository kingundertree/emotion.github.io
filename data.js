        const emotionData = [
            {
                id: "joy", title: "【喜】欢愉与希望", en: "Joy & Hope",
                items: [
                    { name: "欣喜", en: "Delight", desc: "意外的微小快乐", source: "杜甫《闻官军收河南河北》", honglou: "刘姥姥进大观园", xiyou: "悟空得知弼马温是个官职", shuihu: "梁山泊好汉初聚义", sanguo: "刘备得遇孔明" },
                    { name: "狂喜", en: "Ecstasy", desc: "极度的、难以自持的快乐", source: "范进中举", honglou: "宝玉失玉复得", xiyou: "师徒四人取得真经", shuihu: "智取生辰纲成功", sanguo: "曹操大胜袁绍" },
                    { name: "欣慰", en: "Gratification", desc: "付出后得到回报的满足", source: "孔子赞颜回", honglou: "贾政见宝玉作诗", xiyou: "观音见悟空改邪归正", shuihu: "宋江见众兄弟归心", sanguo: "刘备托孤见刘禅" },
                    { name: "庆幸", en: "Relief", desc: "躲过灾祸后的喜悦", source: "完璧归赵", honglou: "巧姐遇救", xiyou: "唐僧躲过妖怪第一劫", shuihu: "林冲风雪山神庙幸存", sanguo: "赵云长坂坡救阿斗" },
                    { name: "自豪", en: "Pride", desc: "因成就而产生的光荣感", source: "霍去病封狼居胥", honglou: "元春省亲", xiyou: "悟空大闹天宫自称齐天大圣", shuihu: "武松打虎后受赏", sanguo: "关羽水淹七军" },
                    { name: "陶醉", en: "Enchantment", desc: "沉浸于美好境界的忘我之乐", source: "王羲之《兰亭集序》", honglou: "湘云醉卧芍药裀", xiyou: "八戒在高老庄", shuihu: "鲁智深倒拔垂杨柳后饮酒", sanguo: "曹操横槊赋诗" },
                    { name: "雀跃", en: "Exuberance", desc: "活泼外放的兴奋", source: "《诗经·子衿》", honglou: "宝钗扑蝶", xiyou: "悟空学成归来", shuihu: "李逵初见宋江", sanguo: "曹植七步成诗前" },
                    { name: "知足", en: "Contentment", desc: "内心平静、无欲则安", source: "陶渊明《归去来兮辞》", honglou: "李纨守寡", xiyou: "沙僧流沙河悟道", shuihu: "公孙胜修道", sanguo: "诸葛亮躬耕南阳" },
                    { name: "期待", en: "Anticipation", desc: "对未来美好事物的向往", source: "陆游《游山西村》", honglou: "黛玉进府", xiyou: "唐僧出发取经", shuihu: "林冲发配前盼回家", sanguo: "三顾茅庐前" },
                    { name: "释然", en: "Liberation", desc: "放下包袱后的轻松愉悦", source: "苏轼《定风波》", honglou: "宝玉出家", xiyou: "悟空成佛", shuihu: "燕青隐退", sanguo: "姜维最后一搏前的解脱" }
                ]
            },
            {
                id: "anger", title: "【怒】愤慨与力量", en: "Anger & Indignation",
                items: [
                    { name: "愤怒", en: "Anger", desc: "通用的生气状态", source: "唐雎不辱使命", honglou: "宝玉踢袭人", xiyou: "悟空三打白骨精被误解", shuihu: "鲁提辖拳打镇关西", sanguo: "张飞怒鞭督邮" },
                    { name: "暴怒", en: "Rage", desc: "失去理智的极端爆发", source: "秦始皇焚书坑儒", honglou: "贾政毒打宝玉", xiyou: "悟空推倒人参果树", shuihu: "李逵沂岭杀四虎", sanguo: "曹操杀吕伯奢全家" },
                    { name: "愤慨", en: "Indignation", desc: "针对不公义的道德性愤怒", source: "岳飞《满江红》", honglou: "晴雯被逐", xiyou: "悟空怒斥神仙纵奴", shuihu: "林冲火并王伦", sanguo: "祢衡击鼓骂曹" },
                    { name: "恼火", en: "Annoyance", desc: "轻微的、因琐事引起的不快", source: "《世说新语》", honglou: "黛玉恼周瑞家的", xiyou: "唐僧恼悟空杀人", shuihu: "杨志恼卖刀牛二", sanguo: "周瑜恼孔明借箭" },
                    { name: "嫉恨", en: "Jealous Rage", desc: "因嫉妒而生的怒火", source: "周瑜既生瑜何生亮", honglou: "赵姨娘害宝玉", xiyou: "六耳猕猴嫉恨悟空", shuihu: "王伦嫉恨林冲", sanguo: "庞德嫉恨关羽" },
                    { name: "震怒", en: "Fury", desc: "上位者的雷霆之怒", source: "武则天清洗", honglou: "贾母震怒", xiyou: "玉帝怒派天兵", shuihu: "高俅怒逼王进", sanguo: "孙权怒摔酒杯" },
                    { name: "悲愤", en: "Grief-anger", desc: "悲伤与愤怒交织", source: "伍子胥鞭尸", honglou: "黛玉焚稿", xiyou: "悟空见师父被抓", shuihu: "林冲雪夜上梁山", sanguo: "诸葛亮哭周瑜" },
                    { name: "愠怒", en: "Resentment", desc: "压抑在心中未爆发的怒气", source: "韩信受胯下之辱", honglou: "探春对赵姨娘", xiyou: "白龙马忍辱负重", shuihu: "杨志失陷生辰纲", sanguo: "徐庶进曹营" },
                    { name: "狂躁", en: "Irritation", desc: "焦躁不安引发的攻击性", source: "张飞醉酒", honglou: "夏金桂撒泼", xiyou: "八戒嚷嚷分行李", shuihu: "阎婆惜要挟宋江", sanguo: "魏延狂躁反骨" },
                    { name: "决绝之怒", en: "Righteous Wrath", desc: "带有牺牲精神的愤怒", source: "蔺相如怒发冲冠", honglou: "鸳鸯抗婚", xiyou: "悟空誓死护师", shuihu: "阮氏三雄劫生辰纲", sanguo: "黄盖苦肉计" }
                ]
            },
            {
                id: "sorrow", title: "【哀】悲痛与失落", en: "Sorrow & Grief",
                items: [
                    { name: "悲伤", en: "Sadness", desc: "基础的难过情绪", source: "孔子获麟", honglou: "黛玉葬花", xiyou: "唐僧思念母亲", shuihu: "林冲娘子自缢", sanguo: "徐庶别母" },
                    { name: "悲痛", en: "Grief", desc: "撕心裂肺的痛苦", source: "霸王别姬", honglou: "贾母哭黛玉", xiyou: "悟空哭唐僧", shuihu: "宋江哭晁盖", sanguo: "曹操哭典韦" },
                    { name: "哀愁", en: "Melancholy", desc: "淡淡的、持续的忧伤", source: "李煜《虞美人》", honglou: "秋窗风雨夕", xiyou: "女儿国国王送别", shuihu: "宋江浔阳楼题诗", sanguo: "曹植洛神赋" },
                    { name: "绝望", en: "Despair", desc: "彻底失去希望的死寂", source: "屈原投江", honglou: "司棋殉情", xiyou: "唐僧被困无底洞", shuihu: "杨志卖刀无路", sanguo: "马谡失街亭" },
                    { name: "惋惜", en: "Regret", desc: "对美好消逝的遗憾", source: "诸葛亮病逝", honglou: "众姐妹叹落花", xiyou: "悟空惜紧箍咒", shuihu: "吴用惜宋江", sanguo: "刘备惜庞统" },
                    { name: "孤寂", en: "Loneliness", desc: "无人理解的凄凉", source: "柳宗元《江雪》", honglou: "宝玉淋雨", xiyou: "悟空被逐回花果山", shuihu: "林冲草料场独饮", sanguo: "姜维死后蜀亡" },
                    { name: "凄楚", en: "Distress", desc: "悲惨且令人心酸", source: "杜甫《石壕吏》", honglou: "香菱学诗", xiyou: "比丘国小孩受苦", shuihu: "金翠莲啼哭", sanguo: "百姓流离" },
                    { name: "缅怀", en: "Mourning", desc: "对逝者的追忆", source: "苏轼《江城子》", honglou: "宝玉祭晴雯", xiyou: "唐僧祭父母", shuihu: "梁山祭晁盖", sanguo: "孔明祭先主" },
                    { name: "幻灭", en: "Disillusionment", desc: "理想破灭后的空虚", source: "贾府被抄", honglou: "万境归空", xiyou: "见如来前众生相", shuihu: "招安后兄弟凋零", sanguo: "三国归晋" },
                    { name: "苍凉", en: "Desolation", desc: "面对天地的宏大悲哀", source: "陈子昂《登幽州台》", honglou: "白茫茫大地", xiyou: "取经路漫漫", shuihu: "蓼儿洼荒凉", sanguo: "滚滚长江东逝水" }
                ]
            },
            {
                id: "amusement", title: "【乐】趣味与安逸", en: "Amusement & Serenity",
                items: [
                    { name: "愉悦", en: "Pleasure", desc: "感官或精神的舒适", source: "《兰亭集序》", honglou: "芦雪庵联诗", xiyou: "蟠桃会", shuihu: "梁山泊大碗喝酒", sanguo: "铜雀台比武" },
                    { name: "诙谐", en: "Amusement", desc: "被逗乐，觉得有趣", source: "《滑稽列传》", honglou: "刘姥姥逗笑", xiyou: "八戒逗悟空", shuihu: "王定六说笑", sanguo: "蒋干盗书" },
                    { name: "惬意", en: "Coziness", desc: "悠闲自在的满足", source: "苏轼《记承天寺》", honglou: "宝玉酣睡", xiyou: "悟空花果山称王", shuihu: "阮小七捕鱼", sanguo: "卧龙冈午睡" },
                    { name: "调侃", en: "Playfulness", desc: "轻松戏谑的心态", source: "刘邦戏弄群臣", honglou: "黛玉调侃宝钗", xiyou: "悟空调侃八戒", shuihu: "燕青调侃李师师", sanguo: "孔明调侃鲁肃" },
                    { name: "逍遥", en: "Carefree", desc: "无拘无束的自由之乐", source: "庄子《逍遥游》", honglou: "柳湘莲", xiyou: "云游四海", shuihu: "公孙胜", sanguo: "左慈戏曹操" },
                    { name: "窃喜", en: "Smugness", desc: "暗自高兴，略带狡黠", source: "草船借箭", honglou: "小红攀高枝", xiyou: "悟空偷丹", shuihu: "时迁偷鸡", sanguo: "庞统献连环计" },
                    { name: "恬淡", en: "Tranquility", desc: "不争不抢的平和之乐", source: "陶渊明《饮酒》", honglou: "宝琴折梅", xiyou: "镇元大仙", shuihu: "罗真人", sanguo: "司马徽" },
                    { name: "惊喜", en: "Surprise-Joy", desc: "意料之外的乐趣", source: "萧何追韩信", honglou: "宝玉收帖", xiyou: "得救兵", shuihu: "逢好汉", sanguo: "得良将" },
                    { name: "自嘲", en: "Self-mockery", desc: "通过嘲笑自己获得解脱", source: "苏轼《自题》", honglou: "宝玉自称浊玉", xiyou: "八戒说自己笨", shuihu: "宋江自称罪人", sanguo: "曹操割须弃袍" },
                    { name: "会心", en: "Understanding Smile", desc: "默契相视一笑", source: "高山流水", honglou: "宝黛共读", xiyou: "悟空气息相通", shuihu: "兄弟眼神", sanguo: "刘关张" }
                ]
            },
            {
                id: "fear", title: "【惧】惊恐与敬畏", en: "Fear & Awe",
                items: [
                    { name: "恐惧", en: "Fear", desc: "面对具体威胁的害怕", source: "秦舞阳色变", honglou: "贾瑞照镜", xiyou: "唐僧怕妖", shuihu: "百姓怕官", sanguo: "汉献帝怕曹" },
                    { name: "惊恐", en: "Terror", desc: "极度惊吓，心理崩溃", source: "四面楚歌", honglou: "抄检大观园", xiyou: "见真身", shuihu: "见鬼怪", sanguo: "木牛流马" },
                    { name: "畏惧", en: "Dread", desc: "对权威的深层害怕", source: "君子有三畏", honglou: "怕王夫人", xiyou: "怕观音", shuihu: "怕宋江", sanguo: "怕司马懿" },
                    { name: "惊慌", en: "Panic", desc: "混乱无序的逃跑冲动", source: "风声鹤唳", honglou: "贾府被抄", xiyou: "小妖乱窜", shuihu: "官兵溃败", sanguo: "赤壁火烧" },
                    { name: "疑惧", en: "Apprehension", desc: "因不确定产生的担忧", source: "曹操杀吕伯奢", honglou: "黛玉忧心", xiyou: "真假悟空", shuihu: "林冲防暗算", sanguo: "空城计" },
                    { name: "战栗", en: "Trembling", desc: "生理性的发抖恐惧", source: "秦廷之威", honglou: "金荣跪地", xiyou: "小妖见大圣", shuihu: "泼皮见鲁达", sanguo: "夏侯杰吓死" },
                    { name: "敬畏", en: "Awe", desc: "面对神圣的谦卑之惧", source: "孔子叹老子", honglou: "祭宗祠", xiyou: "见如来", shuihu: "拜九天玄女", sanguo: "祭天地" },
                    { name: "心悸", en: "Horror", desc: "心理极度不适", source: "惠帝见人彘", honglou: "秦可卿托梦", xiyou: "地狱景象", shuihu: "活剥人皮", sanguo: "左慈显圣" },
                    { name: "怯懦", en: "Cowardice", desc: "因害怕而不敢行动", source: "见义不为", honglou: "迎春懦弱", xiyou: "八戒退缩", shuihu: "洪教头", sanguo: "刘璋投降" },
                    { name: "梦魇", en: "Nightmare", desc: "潜意识中的深层恐惧", source: "晋景公梦大厉", honglou: "赵姨娘中魔", xiyou: "唐僧噩梦", shuihu: "宋江梦玄女", sanguo: "曹操梦三马" }
                ]
            },
            {
                id: "love", title: "【爱】深情与眷恋", en: "Love & Affection",
                items: [
                    { name: "慈爱", en: "Compassion", desc: "长辈对晚辈的关爱", source: "孟母三迁", honglou: "贾母爱宝玉", xiyou: "观音爱悟空", shuihu: "宋江爱兄弟", sanguo: "刘备爱民" },
                    { name: "热恋", en: "Passion", desc: "激烈的男女之情", source: "凤求凰", honglou: "宝黛互诉", xiyou: "女儿国情", shuihu: "阎婆惜张文远", sanguo: "吕布戏貂蝉" },
                    { name: "依恋", en: "Attachment", desc: "难舍难分的依赖", source: "霸王别姬", honglou: "紫鹃试忙", xiyou: "白马恋主", shuihu: "李逵恋宋江", sanguo: "赵云恋主" },
                    { name: "倾慕", en: "Adoration", desc: "对他人才华的仰慕", source: "弟子赞孔子", honglou: "香菱慕黛玉", xiyou: "国王慕唐僧", shuihu: "燕青慕李师师", sanguo: "周瑜慕小乔" },
                    { name: "怜惜", en: "Tenderness", desc: "对弱者的爱护心疼", source: "漂母饭信", honglou: "宝玉替平儿理妆", xiyou: "悟空救小孩", shuihu: "鲁达救金氏", sanguo: "曹操惜关羽" },
                    { name: "挚爱", en: "Devotion", desc: "坚定不移的深爱", source: "尾生抱柱", honglou: "黛玉还泪", xiyou: "唐僧取经", shuihu: "宋江忠义", sanguo: "关羽忠汉" },
                    { name: "友爱", en: "Friendship", desc: "志同道合的情谊", source: "桃园结义", honglou: "湘云宝钗", xiyou: "师兄弟", shuihu: "梁山泊", sanguo: "桃园三结义" },
                    { name: "博爱", en: "Universal Love", desc: "对众生的宏大爱意", source: "范仲淹", honglou: "宝玉有情", xiyou: "普度众生", shuihu: "替天行道", sanguo: "仁政" },
                    { name: "相思", en: "Longing", desc: "爱而不得的深切思念", source: "王维《相思》", honglou: "红豆曲", xiyou: "女王夜思", shuihu: "林冲念妻", sanguo: "甄宓思曹植" },
                    { name: "守护", en: "Protectiveness", desc: "愿意为爱牺牲自我", source: "程婴救孤", honglou: "小红照顾", xiyou: "悟空护师", shuihu: "燕青救主", sanguo: "典韦护曹" }
                ]
            },
            {
                id: "disgust", title: "【恶】厌恶与鄙夷", en: "Disgust & Contempt",
                items: [
                    { name: "厌恶", en: "Disgust", desc: "通用的反感情绪", source: "论语乡原", honglou: "妙玉嫌刘姥姥", xiyou: "悟空嫌脏", shuihu: "好汉嫌贪官", sanguo: "祢衡嫌俗人" },
                    { name: "鄙夷", en: "Contempt", desc: "看不起，认为低劣", source: "燕雀安知", honglou: "黛玉鄙夷仕途", xiyou: "神仙嫌凡夫", shuihu: "林冲鄙夷小人", sanguo: "关羽鄙夷孙权" },
                    { name: "憎恨", en: "Hatred", desc: "强烈的敌意", source: "伍子胥鞭尸", honglou: "贾环恨宝玉", xiyou: "妖魔恨行者", shuihu: "林冲恨高俅", sanguo: "刘备恨曹操" },
                    { name: "嫌弃", en: "Revulsion", desc: "不愿接近的排斥", source: "亭长妻嫌韩信", honglou: "王夫人嫌晴雯", xiyou: "八戒嫌累", shuihu: "潘金莲嫌武大", sanguo: "曹操嫌祢衡" },
                    { name: "愤懑", en: "Abhorrence", desc: "对不公的深恶痛绝", source: "屈原《离骚》", honglou: "尤三姐控诉", xiyou: "车迟国恨道", shuihu: "武松恨西门庆", sanguo: "吉平恨曹" },
                    { name: "轻蔑", en: "Scorn", desc: "傲慢地看不起", source: "关羽虎女", honglou: "凤姐轻蔑贾瑞", xiyou: "大圣轻蔑天兵", shuihu: "武松轻蔑蒋门神", sanguo: "张飞轻蔑严颜" },
                    { name: "作呕", en: "Nausea", desc: "极度生理性厌恶", source: "惠帝见人彘", honglou: "贾赦强娶", xiyou: "见妖怪吃人", shuihu: "见孙二娘包子", sanguo: "见董卓尸体" },
                    { name: "唾弃", en: "Spurning", desc: "像吐口水一样抛弃", source: "后人唾弃秦桧", honglou: "众人唾弃贾雨村", xiyou: "百姓唾弃妖道", shuihu: "百姓唾弃高俅", sanguo: "后人唾弃吕布" },
                    { name: "忌惮", en: "Loathing with Fear", desc: "既讨厌又害怕", source: "曹操忌惮刘备", honglou: "凤姐忌惮尤二姐", xiyou: "妖怪忌惮悟空", shuihu: "官府忌惮梁山", sanguo: "曹操忌惮关羽" },
                    { name: "寒心", en: "Chill", desc: "因背叛而心冷", source: "韩信叹走狗烹", honglou: "宝玉寒心", xiyou: "悟空寒心被逐", shuihu: "林冲寒心", sanguo: "徐庶寒心" }
                ]
            },
            {
                id: "surprise", title: "【惊】震撼与错愕", en: "Surprise & Shock",
                items: [
                    { name: "惊讶", en: "Surprise", desc: "普通的意外感", source: "鱼腹藏书", honglou: "刘姥姥见玻璃", xiyou: "见变化", shuihu: "见武艺", sanguo: "见奇谋" },
                    { name: "震惊", en: "Shock", desc: "巨大的心理冲击", source: "四面楚歌", honglou: "宝玉听说黛玉回苏", xiyou: "见真佛", shuihu: "见招安诏", sanguo: "见八十万大军" },
                    { name: "错愕", en: "Bewilderment", desc: "因意外而发呆", source: "空城计", honglou: "贾政听诗", xiyou: "悟空被识破", shuihu: "李逵见母虎", sanguo: "庞统见落凤坡" },
                    { name: "骇然", en: "Alarm", desc: "被吓到的惊讶", source: "画皮揭皮", honglou: "秦可卿死", xiyou: "见骷髅", shuihu: "见人头", sanguo: "见左慈" },
                    { name: "惊叹", en: "Wonder", desc: "对奇迹的赞叹", source: "核舟记", honglou: "叹宝琴", xiyou: "叹神通", shuihu: "叹神力", sanguo: "叹诸葛" },
                    { name: "恍悟", en: "Realization", desc: "突然明白真相", source: "萧何追韩信", honglou: "宝玉悟禅", xiyou: "悟空悟道", shuihu: "宋江悟天书", sanguo: "徐庶悟母意" },
                    { name: "呆滞", en: "Stunned", desc: "惊讶到失去反应", source: "黛玉听闻婚讯", honglou: "黛玉呆傻", xiyou: "唐僧呆坐", shuihu: "武松呆立", sanguo: "曹操呆望" },
                    { name: "诧异", en: "Curiosity-Surprise", desc: "感到奇怪并探究", source: "圯上敬履", honglou: "宝钗诧异", xiyou: "八戒诧异", shuihu: "燕青诧异", sanguo: "孔明诧异" },
                    { name: "惊魂", en: "Frightened Surprise", desc: "受惊后的余悸", source: "荆轲刺秦王", honglou: "宝玉被打后", xiyou: "唐僧脱险后", shuihu: "林冲逃后", sanguo: "刘备摔阿斗后" },
                    { name: "颠覆", en: "Paradigm Shift", desc: "世界观被彻底打破", source: "王侯将相宁有种乎", honglou: "贾府被抄", xiyou: "见灵山", shuihu: "梁山被招安", sanguo: "三国归晋" }
                ]
            }
        ];

        // --- Quiz Data ---
        const quizQuestions = [
            { q: "最近遇到开心事，你的第一反应是？", options: ["狂喜不止", "内心欣慰", "淡然处之", "担心乐极生悲"], scores: ["joy", "joy", "amusement", "fear"] },
            { q: "看到不公平的事，你会？", options: ["暴怒反击", "愤慨难平", "暗自恼火", "无奈回避"], scores: ["anger", "anger", "anger", "sorrow"] },
            { q: "夜深人静时，你常感到？", options: ["孤寂凄凉", "平静安逸", "焦虑惊恐", "思念故人"], scores: ["sorrow", "amusement", "fear", "love"] },
            { q: "面对喜欢的人，你是？", options: ["热烈追求", "默默守护", "患得患失", "发乎情止乎礼"], scores: ["love", "love", "fear", "love"] },
            { q: "遇到讨厌的人，你会？", options: ["直接憎恨", "表面客气内心鄙夷", "尽量远离", "感到恶心"], scores: ["anger", "disgust", "disgust", "disgust"] },
            { q: "突如其来的消息，让你？", options: ["震惊呆滞", "惊喜交加", "惊恐万分", "恍然大悟"], scores: ["surprise", "surprise", "fear", "surprise"] },
            { q: "回顾过去，你更多是？", options: [" regretful (惋惜)", "nostalgic (缅怀)", "relieved (释然)", "bitter (愤懑)"], scores: ["sorrow", "sorrow", "joy", "disgust"] },
            { q: "你对未来的态度是？", options: ["充满期待", "无所谓", "有些担忧", "绝望"], scores: ["joy", "amusement", "fear", "sorrow"] }
        ];