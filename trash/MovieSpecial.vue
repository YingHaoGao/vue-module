<template>
    <div class="movieSpecial">
        <loopPlayImages :images-data="loopPlayImagesData.imagesData" :background-appe-mode="loopPlayImagesData.backgroundAppeMode" :default-classes="loopPlayImagesData.defaultClasses"></loopPlayImages>
        <div style="width: 90%; margin: 0 auto;">
            <div class="KeyListView">
                <KeywordList v-for="(item, i) in keyListContentData" :info="initKeyListViewData(item,key)" @moreClick="moreClick" @targetChange="targetChange" style="flex:1" :key="item.id"/>
            </div>
            <div class="movieList" v-for="(item, index) in contentTemplateListData">
                <ImageList :info="getContentTemplateData(templateData[index],key)" @moreClick="moreClick" @movieClick="movieClick" />
            </div>
            <div class="Advertisement">
            </div>
        </div>
    </div>
</template>

<script>
import loopPlayImages from '@/components/loopPlayImages/loopPlayImages.vue'
import '../assets/css/loopPlayImages.css'
import KeywordList from '@/components/gaoyinghao/keywordList.vue'
import ImageList from '@/components/gaoyinghao/imageList.vue'
import '../assets/css/Home.css'
import $ from 'jquery'

export default {
    name: 'movie-special',
    components: {
        loopPlayImages,
        KeywordList,
        ImageList,
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
                "title": "电影专题",//TODO 确认电影专题页请求参数
            },
        }).then(function(resp) {
            console.log(resp.data.result)
            //轮播图区数据处理
            var dataMap = resp.data.result.dataMap;
            //TODO 释放轮播图数据引入self.initBannerViewData(dataMap, self)
            
            //关键字列表区数据处理
            self.keyListContentData = dataMap.menuList;
            self.contentTemplateListData = dataMap.contentTemplateList
            console.log(self.contentTemplateListData)
            //电影电视剧等内容区数据处理 
            self.contentTemplateListData.map((item) => {
                var requestParamsData={
                    "orderByField": "leaderboardSortOrder"
                }
                var requestParamsId=JSON.parse(item.searchField)
                for(var k in requestParamsId){
                    requestParamsData[k]=requestParamsId[k]
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
                    console.log(contentData)
                    console.log(item.name)
                    var titleObj = null;
                    var contentInfoData = {
                        "title":item.name,
                        "type": 'free',
                        "icon":require('../assets/icon/movie.png'),
                        "list": [],
                        "recommendList":[]
                    }
                    var contentObj = null;
                    if(contentData) {
                        contentData.map((listItem, i) => {
                            titleObj = {
                                "name": listItem.videoName,
                            }
                            contentObj = {
                                "id": listItem.id ? listItem.id : '',
                                "img": `/realNet/file/uploads/${listItem.verticalImage}`,
                                "name": listItem.videoName,
                                "intro": listItem.description,
                                "grade": listItem.score
                            }
                            if(i<5){
                                contentInfoData.recommendList.push(titleObj)
                            }
                            contentInfoData.list.push(contentObj)
                        })
                        self.templateData.push(contentInfoData)
                    }
                })
            })
        })

    },
    data: function() {
        return {
            loopPlayImagesData: {
                backgroundAppeMode: false,
                imagesData: [{
                    backgroundImage: require('../assets/images/banner1.jpg'),
                    imgageLinkRouterName: '#'
                }],
                defaultClasses: {
                    outerRotateStage: "loopImages",
                    rotateStageClass: "loopStage",
                    innerShowClass: "container",
                    btnClass: "btnOuter",
                    circularClass: "dots"
                }
            },
            keyListContentData: null,
            contentTemplateListData: null,
            templateData: [],
            key: false
        }
    },
    methods: {
        getContentTemplateData(data, k) {
            if(data) {
                return data
            } else {
                return {
                    type: 'host',
                    title: '图片列表1',
                    icon: require('../assets/icon/host.png'),
                    list: [{
                            id: '232323',
                            img: require('../assets/images/vImage_1.jpg'),
                            name: '电影',
                            intro: '这是一部不错的电影',
                            grade: 8.8
                    }]
                }
            }
        },
        initBannerViewData(data, vueObj) {
            vueObj.loopPlayImagesData.imagesData = data.bannerList.map((item) => {
                return {
                    backgroundImage: `/realNet/file/${item.image}`,
                    imageLinkRouterName: item.link
                }
            })
        },
        initKeyListViewData(data, k) {
            var infoData ={
                    type: '',
                    title: '电影',
                    list: [{
                        name: '动作',
                        target: ''
                    }]
                }
                
            if(data) {
                infoData.title = data.name ? data.name : ''
                infoData.list = data.menuList.map((item) => {
                    return {
                        name: item.name ? item.name : '',
                        target: ''
                    }
                })
            }
            return infoData
        },
        /*关键字列表 点击 ‘更多’ 回调*/
        moreClick(type) {
            console.log(type);
        },
        targetChange(list) {
            console.log(list);

        },
        movieClick(type) {
            console.log(type);
        },
    }
}
</script>
