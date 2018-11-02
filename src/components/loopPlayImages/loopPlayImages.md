loopPlayImages：该组件为轮播图组件，组件通过父级页面或构造函数参数传入外部样式，图片信息集，拥有左右按钮进行左右切换图片、自动切换图片、滑屏切换图片、图片链接的功能。
方法：
##构造函数：function(backgroundAppeMode,defaultClasses,imagesData)
将组件实例与容器及数据对象绑定(该构造函数为原生js编写的组件所需的构造函数，若组件使用vue进行编写，则不需要此函数,仅需由父级页面通过props传入参数defaultClasses、imagesData。
backgroundAppeMode - Boolean,当backgroundAppeMode为true时，背景出现模式为图片首尾相接的匀速滚动的形式，当     backgroundAppeMode为false时，背景图片出现模式为无匀速直接为相应图片到达相应显示位置的模式。 （若采用Vue实现，参数通过props传递）
defaultClasses  - {} object，预定义外观样式，对象结构如下：（若采用Vue实现，参数通过props传递）。
{
    outerRotateStage:String,轮播图整体外部边框样式，主要控制整体轮播图显示位置的大小
    rotateStageClass:String,图片显示坐标样式
    innerShowClass:String,内部所有图片链接在一起的样式
    btnClass:String,左右按钮外部样式
    circularClass:String,圆点控制按钮外部样式
}
imagesData - [Object],图片信息集，内部包含图片信息和点击图片链接地址，结构如下：（若采用Vue实现，参数通过props传递）。
{
    backgroundImage:require(String),    //图片信息
    imageLinkRouterName:String,   //点击图片链接地址
}
