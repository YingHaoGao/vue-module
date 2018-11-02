<template>
    <div class="home">
        <!-- <loopPlayImages v-if="bannerImagesData != null" :images-data="bannerImagesData" :background-appe-mode="false" :default-classes="loopPlayImagesData.defaultClasses"></loopPlayImages> -->
        <div style="width: 90%; margin: 0 auto;">
            <!-- <div class="KeyListView">
                <KeywordList v-for="(item) in keyListContentData" :info="initKeyListViewData(item, item.id)" @moreClick="moreClick" @targetChange="targetChange" style="display: table-cell;" :key="item.id"/>
            </div>
            <div class="movieList" v-for="(item, i) in templateData" :key="i">
                <ImageList :info="item" @moreClick="moreContentsClick" @movieClick="movieClick"/>
            </div>
            <div class="Advertisement">
            </div> -->
            <ImageList :info="{
                title: {
                    name: '<h1>电影</h1>',
                    icon: require('../assets/icon/2.png'),
                    nameStyle: {
                        color: '#ccc'
                    },
                    iconStyle: {
                        borderRadius: '10px'
                    },
                    tabList: [
                        {
                            target: '电影',
                            name: `<a href='#'>电影</a>`,
                            style: {
                                color: '#ccc'
                            }
                        }
                    ],
                    l_buttonList: [
                        {
                            target: '更多',
                            name: `<a href='#'>更多></a>`,
                            style: {
                                color: 'black'
                            }
                        }
                    ],
                    r_buttonList: [
                        {
                            target: '换一组',
                            icon: require('../assets/icon/banner_left.png'),
                            name: `<a href='#'>换一组</a>`,
                            style: {
                                color: 'black'
                            }
                        }
                    ]
                },
                content: {
                    imageType: 'horizontal',
                    list: [
                        {
                            col: 1,
                            row: 2,
                            target: '电影1',
                            image: require('../assets/images/no_data.png'),
                            name: `<b>电影1</b>`,
                            intro: 'asdfafdasdfadasdfasdfasfdasdfasdfasfdafdadfassafasdfasfdasfdsa',
                            grade: '9.9'
                        },
                        {
                            target: '电影2',
                            image: require('../assets/images/no_data.png'),
                            name: `<b>电影2</b>`,
                            intro: 'asdfafdasdfadasdfasdfasfdasdfasdfasfdafdadfassafasdfasfdasfdsa',
                            grade: '9.9'
                        },
                        {
                            target: '电影3',
                            image: require('../assets/images/no_data.png'),
                            name: `<b>电影3</b>`,
                            intro: 'asdfafdasdfadasdfasdfasfdasdfasdfasfdafdadfassafasdfasfdasfdsa',
                            grade: '9.9'
                        },
                        {
                            target: '电影4',
                            image: require('../assets/images/no_data.png'),
                            name: `<b>电影4</b>`,
                            intro: 'asdfafdasdfadasdfasdfasfdasdfasdfasfdafdadfassafasdfasfdasfdsa',
                            grade: '9.9'
                        },
                        {
                            target: '电影5',
                            image: require('../assets/images/no_data.png'),
                            name: `<b>电影5</b>`,
                            intro: 'asdfafdasdfadasdfasdfasfdasdfasdfasfdafdadfassafasdfasfdasfdsa',
                            grade: '9.9'
                        },
                        {
                            target: '电影6',
                            image: require('../assets/images/no_data.png'),
                            name: `<b>电影6</b>`,
                            intro: 'asdfafdasdfadasdfasdfasfdasdfasdfasfdafdadfassafasdfasfdasfdsa',
                            grade: '9.9'
                        },
                        {
                            target: '电影7',
                            image: require('../assets/images/no_data.png'),
                            name: `<b>电影7</b>`,
                            intro: 'asdfafdasdfadasdfasdfasfdasdfasdfasfdafdadfassafasdfasfdasfdsa',
                            grade: '9.9'
                        },
                        {
                            target: '电影8',
                            image: require('../assets/images/no_data.png'),
                            name: `<b>电影8</b>`,
                            intro: 'asdfafdasdfadasdfasdfasfdasdfasdfasfdafdadfassafasdfasfdasfdsa',
                            grade: '9.9'
                        },
                        {
                            target: '电影9',
                            image: require('../assets/images/no_data.png'),
                            name: `<b>电影9</b>`,
                            intro: 'asdfafdasdfadasdfasdfasfdasdfasdfasfdafdadfassafasdfasfdasfdsa',
                            grade: '9.9'
                        }
                    ]
                }
            }">
                <span slot="title_l_btn" class="titleTab" slot-scope="props">
                        <b v-for="(item,i) in [
                            {
                                target: '电影',
                                name: `<a href='#'>电影</a>`,
                                style: {
                                    color: '#ccc'
                                }
                            },
                            {
                                target: '电影1',
                                name: `<a href='#'>电影1</a>`,
                                style: {
                                    color: '#ccc'
                                }
                            }
                        ]" 
                        :style="item.style" 
                        :key="item.name"
                        @click="tab(props)"
                        v-html="item.name"></b>
                    </span>
            </ImageList>
        </div>
    </div>
</template>

<script>
import loopPlayImages from '@/components/loopPlayImages/loopPlayImages.vue'
import '../assets/css/loopPlayImages.css'
import KeywordList from '@/components/gaoyinghao/keywordList.vue'
import Seniority  from '@/components/gaoyinghao/seniority.vue'
// import ImageList from '@/components/gaoyinghao/imageList.vue'
// import ImageList from '@/components/gaoyinghao/newImageList.vue'
import ImageList from '@/components/gaoyinghao/imageList-ui/imageList-ui.vue'
import '../assets/css/Home.css'
import $ from 'jquery'

const IMAGESCONST = {
    "电影": { icon: 'movie_icon', type: 'free', imgWidth: 280 },
    "电视剧": { icon: 'special', type: 'free', imgWidth: 280 },
    "娱乐": { icon: 'recreation', type: 'free', imgWidth: 280 },
    "RMHD": { icon: 'vip', type: 'vip', imgWidth: 280 },
    "精品": {icon: 'boutique', type: 'boutique', imgWidth: 278},
    "热播": {icon: 'host', type: 'host', imgWidth: 340}
};

export default {
    name: 'home',
    components: {
        loopPlayImages,
        KeywordList,
        ImageList,
        Seniority
    },
    mounted: function() {
        var self = this;
        this.$axios({
            url: "/realNet/pageManager/findOne",
            method: "get",
            headers: {
                "token": "123456789"
            },
            params: {
                "title": "首页",
            },
        }).then(function(resp) {
            if (resp.data.result) {
                //轮播图区数据处理
                var dataMap = resp.data.result.dataMap;
                if (dataMap.bannerList) {
                    self.bannerImagesData = dataMap.bannerList.map((item) => {
                        return {
                            backgroundImage: `/realNet/file/${item.image}`,
                            imageLinkRouterName: item.link
                        }
                    });
                }
                //关键字区域
                self.keyListContentData = dataMap.menuList;
                console.log(dataMap.menuList)
                //内容区数据处理
                var tempData = new Array(dataMap.contentTemplateList.length)
                var tempDataCount = 0;
                dataMap.contentTemplateList.map((item, idx) => {
                    var requestParamsData = {
                        orderByField: "score",
                        orderByType: "DESC",
                        pageSize: 10,
                        pageNum: 0
                    }
                    var requestParamsId=JSON.parse(item.searchField)
                    if (requestParamsId)
                        Object.assign(requestParamsData,requestParamsId)
                    var imgAttr=self.getImgAttr(item.name,IMAGESCONST);
                    var maxImgCount = Math.floor(
                        document.body.clientWidth * 0.9 / (imgAttr.imgWidth + 10)
                    ) - 1
                    if (imgAttr.type == "boutique") {
                        maxImgCount = Math.floor(
                            (document.body.clientWidth * 0.9 - 582) / (imgAttr.imgWidth + 10)
                        )
                    }
                    self.$axios({
                        url: "/realNet/video/getVideoInfos",
                        method: "get",
                        headers: {
                            "token": "123456789"
                        },
                        params: requestParamsData
                    }).then(function(resp) {
                        var contentData = resp.data.result.content;
                        var titleObj = null;

                        var contentInfoData = {
                            "title":item.name,
                            "type": imgAttr.type,
                            "icon": require('../assets/icon/'+imgAttr.icon+'.png'),
                            "searchField": item.searchField,
                            "list": [],
                            "isSeniority": self.showSeniority(item),
                            "recommendList":[],
                            "seniorityInfo": {
                                "title": '排行榜',
                                "icon": require('../assets/icon/imageIcon.png'),
                                "type": 'name',
                                "list": []
                            }
                        }
                        var contentObj = null;
                        var seniorityInfoData ={
                            title: '排行榜',
                            icon: require('../assets/icon/imageIcon.png'),
                            type: 'name',
                            style: {
                                width: '100%',
                                height: '100%'
                            },
                            list: [],
                        }
                        var seniorityObj = null;
                        if(contentData) {
                            contentData.map((listItem, i) => {
                                titleObj = {
                                    "id": listItem.id,
                                    "name": listItem.videoName,
                                }
                                contentObj = {
                                    "id": listItem.id,
                                    "img": `/realNet/file/uploads/${listItem.verticalImage}`,
                                    "name": listItem.videoName,
                                    "intro": listItem.description,
                                    "grade": listItem.score
                                }
                                if ( (imgAttr.type == 'boutique' && i == 0) || imgAttr.type == 'host' )
                                    contentObj.img = `/realNet/file/uploads/${listItem.horizontalImage}`
                                seniorityObj = {
                                    "id": listItem.id ? listItem.id : '',
                                    "name": listItem.videoName,
                                    "grade": listItem.score
                                }

                                if(i < maxImgCount)
                                    contentInfoData.list.push(contentObj)
                                else
                                    contentInfoData.recommendList.push(titleObj)
                                if(i < 10){
                                    seniorityInfoData.list.push(seniorityObj);
                                    contentInfoData.isSeniority = !!seniorityInfoData;
                                    contentInfoData.seniorityInfo = seniorityInfoData;
                                }
                            })
                            tempData[idx] = contentInfoData;
                            if (++tempDataCount == tempData.length)
                                self.templateData = tempData
                        }
                    })
                })
            }
        })
    },
    data: function() {
        return {
            bannerImagesData: null,
            loopPlayImagesData: {
                defaultClasses: {
                    outerRotateStage: "loopImages",
                    rotateStageClass: "loopStage",
                    innerShowClass: "container",
                    btnClass: "btnOuter",
                    circularClass: "dots"
                }
            },
            keyListContentData: null,
            templateData: null,
            key: false
        }
    },
    methods: {
        tab(props){
            console.log(props)
        },
        initKeyListViewData(data, k) {
            var infoData ={
                type: '',
                title: '电影',
                list: [{
                    name: '动作',
                    target: ''
                }, {
                    name: '爱情',
                    target: ''
                }, {
                    name: '科幻',
                    target: ''
                }, {
                    name: '惊悚',
                    target: ''
                }]
            }

            if(data) {
                infoData.title = data.name ? data.name : '';
                infoData.isRadio = true;
                console.log(data)
                infoData.list = data.menuList.map((item) => {
                    return {
                        name: item.name ? item.name : '',
                        target: item.searchField ? item.searchField : ''
                    }
                })
            }
            return infoData
        },
        getSeniorityData(data,k){
            if(data) {
                return data
            } else {
                return {}
            }
        },
        getImgAttr(name,changObj){
            for(var k in changObj){
                if(name.indexOf(k)!=-1)
                    return changObj[k]
            }
            return { icon: 'comedy', type: 'comedy', imgWidth: 280 }
        },
        showSeniority(item){
            return (item.name=="电影"||item.name=="电视剧")
        },
        /*关键字列表 点击 ‘更多’ 回调*/
        moreClick(type) {
            this.$router.push({ path: '/search' })
        },
        /*关键字列表 点击类型回调*/
        targetChange(info) {
            console.log(info);
            this.$router.push({
                path: '/search',
                query: {
                    searchField: info.target
                }
            })
        },
        /*图片列表 点击“更多”回调*/
        moreContentsClick(info) {
            this.$router.push({
                path: '/special-page',
                query: {
                    pageTitle: info.title,
                    detailPage: this.getDetailPageName(info.title)
                }
            })
        },
        /*图片列表 点击“电影”回调*/
        movieClick(option) {
            this.$router.push({
                name: this.getDetailPageName(option.info.title),
                query: {
                    contentId: option.infoItem.id
                }
            })
        },
        getDetailPageName(title) {
            if ( title.toUpperCase().indexOf("RMHD") > -1 )
                return "DownloadDetailPage"
            return "TVplayPage"
        },
    }
}
</script>
