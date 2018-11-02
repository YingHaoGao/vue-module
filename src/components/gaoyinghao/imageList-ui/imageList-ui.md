##图片列表(框架版) ： imageList-ui.vue 

``
####props 

    info: {
        isSeniority: boolean,       //是否显示排行榜   默认： false
        isSlide: boolean,           //是否为滑动排版   默认： false
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
    }

####slot 
<br>
<font color=#ccccc size=7 face="黑体">scope='props'</font>

    name="title"        : 标题区域插槽
    name="content"      : 列表区域插槽
    name="seniority"    : 排行榜区域插槽

####emit
<br>
<font color=#ccccc size=7 face="黑体">返回参数全部包裹在 option 对象中</font>

    dirClick :          点击滑动按钮回调函数
                        参数： dir - 'left'/'right' - 滑动方向
    seniorityClick:     排行榜点击回调
                        参数： infoItem - object - 被点击的电影对象
                               info - object - 传入的完整数据

``

##图片列表标题/推荐电影名称/“更多”/"换一组" ： imglist-title

``
####props 

    type: string,                   //显示样式类型
                                        取值：  "title"     标题样式       [默认]
                                                "tab"       推荐电影名称
                                                "btn_a"     “更多”/"换一组"按钮
    align: string,                  //排版方向
                                        取值：  "left"       从左向右      [默认]
                                                "right"     从右向左
    icon: require,                  //左侧图标地址
    name: string/html,              //标题显示
    iconStyle: object,              //左侧图标样式
    nameStyle: object,              //标题显示样式
    other: object                   //其他需要返回的参数

####emit
<br>
<font color=#ccccc size=7 face="黑体">返回参数全部包裹在 option 对象中</font>

    titleClick :        点击标题回调函数
                        参数： info - object - 传入组件的所有数据


##图片列表标题/推荐电影名称/“更多”/"换一组" ： imglist-title

``
####props 

    type: string,                   //显示样式类型
                                        取值：  "title"     标题样式       [默认]
                                                "tab"       推荐电影名称
                                                "btn_a"     “更多”/"换一组"按钮
    align: string,                  //排版方向
                                        取值：  "left"       从左向右      [默认]
                                                "right"     从右向左
    icon: require,                  //左侧图标地址
    name: string/html,              //显示内容
    iconStyle: object,              //左侧图标样式
    nameStyle: object,              //标题显示样式
    other: object                   //其他需要返回的参数

####emit
<br>
<font color=#ccccc size=7 face="黑体">返回参数全部包裹在 option 对象中</font>

    titleClick :        点击标题回调函数
                        参数： info - object - 传入组件的所有数据




