<template>
    <div class="TVplay">
        <loopPlayImages v-if="bannerImagesData != null" :images-data="bannerImagesData" :background-appe-mode="false" :default-classes="loopPlayImagesData.defaultClasses"></loopPlayImages>
        <div style="width: 90%; margin: 0 auto;">
            <div class="KeyListView">
                <KeywordList v-for="(item) in keyListContentData" :info="initKeyListViewData(item, item.id)" @moreClick="moreClick" @targetChange="targetChange" style="display: table-cell;" :key="item.id"/>
            </div>
            <div class="movieList" v-for="(item, i) in templateData" :key="i">
                <ImageList :info="item" @moreClick="moreContentsClick" @movieClick="movieClick"/>
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

const IMAGESCONST = {
    "电影": { icon: 'movie_icon', type: 'free', imgWidth: 280 },
    "电视剧": { icon: 'special', type: 'free', imgWidth: 280 },
    "娱乐": { icon: 'recreation', type: 'free', imgWidth: 280 },
    "RMHD": { icon: 'vip', type: 'vip', imgWidth: 280 },
    "精品": {icon: 'boutique', type: 'boutique', imgWidth: 278},
    "热播": {icon: 'host', type: 'host', imgWidth: 340},
};

export default {
    name: 'special-page',
    components: {
        loopPlayImages,
        KeywordList,
        ImageList,
    },
    computed: {
        pageTitle () {
            return this.$route.query.pageTitle || "电影";
        },
        detailPage () {
            return this.$route.query.detailPage || 'TVplayPage';
        },
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
                "title": self.pageTitle,
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
                    )
                    if (imgAttr.type == "boutique") {
                        maxImgCount = 1 + Math.floor(
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
                            "recommendList":[],
                        }
                        var contentObj = null;
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

                                if(i < maxImgCount)
                                    contentInfoData.list.push(contentObj)
                                else
                                    contentInfoData.recommendList.push(titleObj)
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
        initKeyListViewData(data, k) {
            if(k) {
                var infoData = {},
                    list = [{
                        name: '全部',
                        target: 'all',
                        isActive: true 
                    }];

                infoData.title = data.name ? data.name : '';
                infoData.isRadio = true;
                data.menuList.map((item, idx) => {
                    list.push({
                        name: item.name ? item.name : '',
                        target: item.searchField ? item.searchField : ''
                    })
                })
                infoData.list = list;

                return infoData
            }else{
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
        /*关键字列表 点击 ‘更多’ 回调*/
        moreClick(type) {
            this.$router.push({ path: '/search' })
        },
        /*关键字列表 点击类型回调*/
        targetChange(info) {
            this.$router.push({
                path: '/search',
                query: {
                    searchField: info.target
                }
            })
        },
        /*图片列表 点击“更多”回调*/
        moreContentsClick(info) {
            console.log(info);
            this.$router.push({
                path: '/search',
                query: {
                    searchField: info.searchField
                }
            })
        },
        /*图片列表 点击“电影”回调*/
        movieClick(option) {
            this.$router.push({
                name: this.detailPage,
                query: {
                    contentId: option.infoItem.id
                }
            })
        },
    }
}
</script>
