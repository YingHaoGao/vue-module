#组件简介

##图片列表 ： imageList.vue 

``
####props 

    info : {
        type: string,                   //图片列表样式类型   
                                            取值:   host - 电影热播榜，
                                                    boutique - 精品推荐，
                                                    free - 免费电影，
                                                    vip - 会员专享，
                                                    comedy - 爆笑喜剧，
                                                    special - 电影专题，
                                                    guess - 猜你喜欢
        icon: require,                  //列表左上角图标地址
        iconStyle: object,              //左上角图标样式
        title: string,                  //图片列表名称
        titleStyle: object,             //标题样式
        titleBtn: string,               //列表标题右侧的“更多”按钮显示文字
        titleBtnStyle: object,          //列表标题右侧的“更多”按钮样式
        nameStyle: object，             //电影标题样式
        introStyle: object,             //电影简介样式
        totalStyle: object,             //右下角提示文字样式
        gradeStyle: object,             //评分样式
        isSeniority: boolean,           //是否显示排行榜组件 【可选】 默认 false
        divisor: number,                //排行榜出现的位置 【可选】 从1开始计算
        button: [                       //右侧“换一组”按钮[可选]
            {
                name: string,           //按钮名称
                icon: require,          //按钮图标
                target: string,         //自定义按钮标记，回调函数使用
                iconStyle: object,      //图标样式
                style: object           //按钮样式
            }
        seniorityInfo: {                   //[可选]排行榜组件对象
            style: object,                 //最外成容器样式
            title: string,                 //排行榜标题
            titleStyle: object,            //标题区域样式
            contentStyle: object,          //内容区域样式
            listStyle: object,             //排行榜每一项的样式，作用在 li标签
            icon: require,                 //左上角图标地址
            type: "name" / "image",        //排行榜类型： "name": 文字类型，"image": 图片类型
            list: [
                {
                    id: string,             //电影唯一标识
                    name: string,           //展示名称
                    icon: require,          //如果为 “image”类型，icon 为电影排行图标
                    src: require            //如果为 “image”类型，src 为电影缩略图地址,
                    style: object           //展示名称样式
                }
            ]  
        },
        recommendList: [                //列表标题右侧推荐的电影列表
            {
                id: string,             //电影唯一标识符 
                name: string            //电影名称
            }
        ],
        list: [
            {
                id: string,             //电影唯一标识符
                horizontalImage: require,//电影缩略图地址
                name: string,           //电影名称
                intro: string,          //电影简介
                grade: number           //电影评分
                total: string,          //右下角提示文字
                style: object,          //单个电影容器的样式
                imgStyle: object        //电影缩略图样式
            }
        ]
    }

####emit

    recommendClick : 点击“更多”左侧推荐电影名称的回调 参数： 参数： infoItem - object - 被点击推荐电影的数据对象
    moreClick : 点击更多按钮回调  参数： info - object - 模板数据
    movieClick : 点击电影模块回调  参数： infoItem - object - 被点击按钮回调电影的数据对象
    btnClick: 点击右侧按钮回调  参数： btnInfo - object - 被点击的按钮对象

``

##（新）图片列表 ： newImageList.vue 

``
####props 

    info : {
        type: string,                   //图片列表样式类型   
                                            取值:   host - 电影热播榜，
                                                    boutique - 精品推荐，
                                                    free - 免费电影，
                                                    vip - 会员专享，
                                                    comedy - 爆笑喜剧，
                                                    special - 电影专题，
                                                    guess - 猜你喜欢
        icon: require,                  //列表左上角图标地址
        iconStyle: object,              //左上角图标样式
        title: string,                  //图片列表名称
        titleStyle: object,             //标题样式
        titleBtn: string,               //列表标题右侧的“更多”按钮显示文字
        titleBtnStyle: object,          //列表标题右侧的“更多”按钮样式
        nameStyle: object，             //电影标题样式
        introStyle: object,             //电影简介样式
        totalStyle: object,             //右下角提示文字样式
        gradeStyle: object,             //评分样式
        isSeniority: boolean,           //是否显示排行榜组件 【可选】 默认 false
        divisor: number,                //排行榜出现的位置 【可选】 从1开始计算
        button: [                       //右侧“换一组”按钮[可选]
            {
                name: string,           //按钮名称
                icon: require,          //按钮图标
                target: string,         //自定义按钮标记，回调函数使用
                iconStyle: object,      //图标样式
                style: object           //按钮样式
            }
        seniorityInfo: {                   //[可选]排行榜组件对象
            style: object,                 //最外成容器样式
            title: string,                 //排行榜标题
            titleStyle: object,            //标题区域样式
            contentStyle: object,          //内容区域样式
            listStyle: object,             //排行榜每一项的样式，作用在 li标签
            icon: require,                 //左上角图标地址
            type: "name" / "image",        //排行榜类型： "name": 文字类型，"image": 图片类型
            list: [
                {
                    id: string,             //电影唯一标识
                    name: string,           //展示名称
                    icon: require,          //如果为 “image”类型，icon 为电影排行图标
                    src: require            //如果为 “image”类型，src 为电影缩略图地址,
                    style: object           //展示名称样式
                }
            ]  
        },
        recommendList: [                //列表标题右侧推荐的电影列表
            {
                id: string,             //电影唯一标识符 
                name: string            //电影名称
            }
        ],
        list: [
            {
                id: string,             //电影唯一标识符
                horizontalImage: require,//电影缩略图地址
                name: string,           //电影名称
                intro: string,          //电影简介
                grade: number           //电影评分
                total: string,          //右下角提示文字
                style: object,          //单个电影容器的样式
                imgStyle: object        //电影缩略图样式
            }
        ]
    }

####emit

    recommendClick : 点击“更多”左侧推荐电影名称的回调 参数： 参数： infoItem - object - 被点击推荐电影的数据对象
    moreClick : 点击更多按钮回调  参数： info - object - 模板数据
    movieClick : 点击电影模块回调  参数： infoItem - object - 被点击按钮回调电影的数据对象
    btnClick: 点击右侧按钮回调  参数： btnInfo - object - 被点击的按钮对象

``

##关键字列表 ： keywordList.vue 

``
####props 

    info : {
        type: string,                   //关键字列表类型（可自定义，仅作为返回参数使用）
        title: string,                  //关键字列表名称
        titleStyle: object,             //标题样式
        move: string,                   //标题右侧按钮文字， 默认“更多 >”
        movieStyle: object,             //列表内容样式
        isRadio: boolean,               //是否是单选模式  默认  false：多选模式
        list: [
            {
                name: string,           //类别显示名称
                target: string,         //类别标识 *唯一标识符(不可重复)
                isActive: boolean       //是否默认选中 默认 false
            }
        ]
    }

####emit

    moreClick : 点击更多按钮回调  参数： info - object - keywordList传入的数据对象
    targetChange : 修改类型列表回调  
                        参数： objList - 多选模式 - arrary - 选中的类型对象列表
                        参数： objList - 单选模式 - object - 选中的类型对象

``

##剧情简介 ： plotIntroduced.vue 

``
####props 

    info : {
        title: string,                 //剧情简介标题
        titleStyle: object,            //标题文字样式
        icon: require,                 //左上角图标地址
        name: string,                  //电影名称
        grade: number,                 //电影评分
        cover: require,                //电影缩略图地址
        coverStyle: object,            //电影缩略图样式
        isShow: boolean,               //默认内容区域是否展示，默认 false
        isNotTitle: boolean,           //不展示上方标题区域，默认 false
        contentStyle: object,          //内容区域样式
        total_l: string,               //缩略图左侧角标内容
        total_r: string,               //缩略图右侧角标内容
        total_lStyle: object,          //缩略图左侧角标样式
        total_rStyle: object,          //缩略图右侧角标样式
        isModuleShow: boolean,         //module版内容区域显示/隐藏，默认 false
        moduleContent: string,         //module版内容区域展示文字
        moduleStyle: string,           //module版内容区域样式        
        tages: [
            {
                title: string,             //简介后方类型标签名称
                target: string,            //简介后方类型标签类型
                style: object              //简介后方类型标签样式
            }
        ],
        list: {                         //内容区域对象
            key: [                      //key 是内容区域前方的名称 如 ‘导演’
                {
                    name: string,           //展示的文字
                    isActor: boolean,       //是否是演员列表样式,
                    style: object           //样式
                }
            ]
            ||                              //或者
            {
                isTarges: boolean       //是否是看点列表样式,如果是true，则为对象
            }
        }           
    }

####slot

    <template slot="title">             //详情区域插槽
    </template>

####$emit
    
    close: module关闭详情事件回调。

``

##排行榜 ： seniority.vue 

``
####props 

    info : {
        title: string,                 //排行榜标题
        style: object,                 //组件最外层容器样式
        titleStyle: object,            //标题区域样式
        contentStyle: object,          //内容区域样式
        listStyle: object,             //排行榜每一项的样式，作用在 li标签
        icon: require,                 //左上角图标地址
        type: "name" / "image",        //排行榜类型： "name": 文字类型，"image": 图片类型
        list: [
            {
                id: string,             //电影唯一标识
                name: string,           //展示名称
                icon: require,          //如果为 “image”类型，icon 为电影排行图标
                src: require            //如果为 “image”类型，src 为电影缩略图地址,
                style: object           //展示名称样式
            }
        ]          
    }

####emit

    movieClick : 点击电影按钮回调  参数： info - object - 电影数据对象

``

##当前播放影片 ： videoNow.vue 

``
####props 

    info : {
        id: string,                 //电影唯一标识
        title: string,              //电影名称
        titleStyle: object,         //电影标题样式
        style: object,              //容器样式
        viewCounts: number,         //电影评分
        videoImg: require,          //电影缩略图
        isVip: boolean,             //是否显示二维码
        isVipPrice: boolean,        //显示(VIP)/(非VIP) 默认  false
        codeImg: require,           //支付图片
        codeUrl: string,            //支付地址
        episode: number,            //剧集数量
        nowEpisode: number,         //当前集数
        price: number,              //价格[可选]
        buttons: [                  //右上角按钮数组
            {
                icon: require,      //按钮显示图片地址
                activeIcon: require,//按钮选中显示的图片地址
                alt: string,        //鼠标移入图片提示文字
                target: string,     //自定义类型，作为点击事件回调参数
                isAction: boolean,  //当前按钮是否显示选中样式
                style: object       //按钮样式
            }
        ]   
    }

####emit

    iconClick : 点击右上角图标回调  参数： option:{
                                                info: object - 电影数据对象，item
                                                button: object - 自定义的按钮数据对象
                                            }
    movieClick : 点击电影按钮回调  参数： info - object - 电影数据对象
    buyVipClick : 点击开通VIP按钮回调  参数： info - object - 电影数据对象
    episodeItem : 点击集数回调  option:{
                                            info: object - 电影数据对象，item
                                            num: number - 集数
                                        }

``

##剧集选择组件 ： dramas.vue 

``
####props 

    info : {
        episode: number,            //剧集数量
        episodeStyle: object,       //容器样式
        headerStyle: object,        //上方容器样式
        headerItemStyle: object,    //头部按钮样式
        contentStyle: object,       //剧集容器样式
        conItemStyle: object,       //剧集按钮样式
        nowEpisode: number          //当前集数 
    }

####emit

    episodeItem : 点击集数回调  option:{
                                            info: object - 电影数据对象，item
                                            num: number - 集数
                                        }

``

##电影花絮 ： scenes.vue 

``
####props 

    info : {
        contentStyle: object,           //容器样式
        title: string,                  //标题
        titleStyle: object,             //标题样式
        list: [                         //剧集列表
            {
                videoImg: require,      //电影缩略图
                imgStyle: object,       //缩略图样式
                title: sting,           //电影名称
                titleStyle: object,     //电影名称样式
                price: number,          //价格【可选】
                icon: require,          //播放次数前的图标
                viewCounts: number,     //播放次数
                total: [
                    {
                        title: string,  //缩略图角标显示内容
                        totalStyle: object, //角标样式
                    }
                ]
            }
        ]
    }

####emit

    scenesClick : 点击花絮回调  option:{
                                            info: object - 精彩花絮数据对象，item
                                        }

``