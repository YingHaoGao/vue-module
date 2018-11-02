##(新)图片列表 ： imageList.vue 

``
####props 

    info: {
        title: {                    //标题区域
            name: string/html,          //标题显示内容
            icon: require,              //标题图标
            nameStyle: object,          //标题内容样式
            iconStyle: object,          //标题图标样式
            tabList: [                  //标题右侧推荐电影标签列表
                {
                    target: string,         //标签自定义标记
                    name: string/html,      //标签显示内容
                    style: object,          //标签样式
                }
                ...
            ],
            l_buttonList: [              //左侧“更多”按钮组 【可选】
                {
                    target: string,         //按钮自定义标记
                    name: string/html,      //按钮显示内容  默认：“更多>”
                    icon: object,           //按钮图标
                    style: object           //按钮样式
                }
                ...
            ],
            r_buttonList: [            //右侧“换一组”按钮组 【可选】
                {
                    target: string,         //按钮自定义标记
                    name: string/html,      //按钮显示内容  默认：“换一组”
                    icon: object,           //按钮图标
                    style: object,          //按钮样式
                    iconStyle: object       //按钮图标样式
                }
                ...
            ]
        },
        content: {                  //列表区域
            imageType: string,          //图片显示横版还是竖版 
                                                          取值： horizontal 横版
                                                                vertical   竖版
                                                          默认： 'vertical'
            isSlide: boolean,           //是否为滑动排版   默认： true
            speed: number,              //滑动动画速度(ms) 默认： 300
                                                          条件： isSlide 为 true 时生效
            timing: String,             //滑动效果         
                                                          取值： ease,
                                                                linear,
                                                                ease-in,
                                                                ease-out,
                                                                ease-in-out
                                                          默认： ease
                                                          条件： isSlide 为 true 时生效
            l_button: html,             //向左滑动按钮显示 默认： “<”
                                                          条件： isSlide 为 true 时生效
            r_button: html,             //向右滑动按钮显示 默认： “>”
                                                          条件： isSlide 为 true 时生效
            buttonStyle: object,        //滑动按钮样式
            buttonStyleHover: object,   //滑动按钮鼠标移入样式
            buttonStyleDown: object,    //滑动按钮鼠标按下样式
            style: object,              //列表区域样式
            list: [                     //电影数组
                {
                    col: number,            //占据列的数量  默认：1
                    row: number,            //占据行的数量  默认：1
                        /*
                            col: 2,row: 1   首图超大横版（之后一排竖版图）
                            col: 1,row: 2   首图超大竖版（之后两排横版图）
                         */
                    target: string,         //电影标记
                    image: require,         //电影缩略图地址
                    name: string/html,      //电影名称
                    intro: string/html,     //电影简介
                    grade: string/html,     //电影评分
                    style: object,          //电影容器样式
                    imageStyle: object,     //缩略图样式
                    nameStyle: object,      //名称样式
                    introStyle: object,     //简介样式
                    gradeStyle: object,     //评分样式
                    styleHover: object,     //电影容器鼠标移入样式
                    imageStyleHover: object,//缩略图鼠标移入样式
                    nameStyleHover: object, //名称鼠标移入样式
                    tabList:[               //电影角标数组
                        {
                            name: string/html,      //角标显示内容
                            style: object           //角标样式(absolute定位)  
                                                        默认： 缩略图左下角
                        }
                        ...
                    ]
                }
            ]
        },
        seniorityInfo: {                   //排行榜组件对象 [可选] 默认： false
            width: number,                 //排行榜显示宽度  默认： 300
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
        }
    }

####slot

    name='image' scope='props':  "下载遮罩层"  返回参数 {{props.info}} : 单个电影数据

####emit
<font color=#ccccc size=7 face="黑体">返回参数全部包裹在 option 对象中</font>

    tabClick :          点击推荐电影标签回调
                        参数： tabInfo - object - 模板数据
                               info - object - 传入的完整数据
    movieClick :        点击电影模块回调
                        参数： infoItem - object - 被点击按钮回调电影的数据对象
                               info - object - 传入的完整数据
    btnClick:           标题区域内按钮点击回调(更多，换一组)
                        参数： btnInfo - object - 被点击的按钮对象
                               info - object - 传入的完整数据
    seniorityClick:     排行榜点击回调
                        参数： infoItem - object - 被点击的电影对象
                               info - object - 传入的完整数据

``