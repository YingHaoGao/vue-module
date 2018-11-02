<template>
    <div class="MoviePage">
        <div class="topBack">
            <div class="topCon content">
                <div class="video_l">
                    <VideoCom :source="vidSrc" :thumb="videoObj.videoImg" :mediaInfo="mediaInfo" @endPlay="nextVideo"></VideoCom>
                    <img class="log" src="../assets/images/header/logo.png"></img>
                </div>
                <div class="video_r">
                    <!-- <videoNow :info="videoObj" @iconClick="collectClick" @buyVipClick="buyVipClick"/> -->
                    <videoNow :info="videoObj" @iconClick="collectClick"/>
                    <Dramas v-if="!dramasObj.disableDramas" :info="dramasObj" @episodeItem="episodeClick"/>
                    <div class="seniority" v-if="seniorityInfo.list.length>0">
                        <Seniority :info="seniorityInfo" @movieClick="seniorityClick"/>
                    </div>
                </div>
                <div class="video_b">
                    <PlotIntroduced :info="plptOmtrpdicedObj"/>
                </div>
            </div>
        </div>
        <div class="bottomCon content">
            <!-- <div class="imageList">
                <ImageList v-if="imageListObj.list.length>0" :info="imageListObj" @btnClick="groupClick" @movieClick="groupItemClick"/>
            </div>
            <img src='../assets/images/advertisement.jpg'/> -->
        </div>
    </div>
</template>

<script>
import VideoCom from '@/components/zhangqi/VideoCom.vue'
import videoNow from '@/components/gaoyinghao/videoNow.vue'
import Scenes from '@/components/gaoyinghao/scenes.vue'
import PlotIntroduced from '@/components/gaoyinghao/plotIntroduced.vue'
import ImageList from '@/components/gaoyinghao/imageList.vue'
import Seniority from '@/components/gaoyinghao/seniority.vue'
import Dramas from '@/components/gaoyinghao/dramas.vue'
import { getToken, getUser } from '../utils/auth.js'

export default {
    name: 'moviePage',
    components: {
        VideoCom,
        videoNow,
        Scenes,
        PlotIntroduced,
        ImageList,
        Seniority,
        Dramas
    },
    mounted () {
        this.getData()
    },
    data () {
        return {
            vidSrc: null,
            params: {
                id: this.$route.query.contentId || 40,
                videoFiles: [],
            },
            videoObj: {
                videoImg: '',
                style: {
                    width: '100%'
                },
                title: '',
                titleStyle: {
                    display: "inline-block"
                },
                isVip: false,
                isVipPrice: false,
                price: 0,
                codeImg: '',
                buttons: [{
                    icon: require('../assets/icon/collect.png'),
                    activeIcon: require('../assets/icon/boutique.png'),
                    alt: '收藏',
                    target: 'shoucang',
                    isAction: false
                }]
            },
            plptOmtrpdicedObj: {
                title: '剧情简介',
                icon: require('../assets/icon/word.png'),
                isShow: true,
                isModuleShow: false,
                name: '',
                grade: 0,
                titleStyle: {
                    "font-size": '10px',
                    "color": '#626873'
                },
                coverStyle: {
                    width: '100px',
                    height: '125px'
                },
                contentStyle: {
                    background: 'rgb(43, 51, 63)',
                    width: 'calc(100% - 100px)',
                    "font-size": "10px"
                },
                moduleStyle: {
                    color: 'blue'
                },
                tages: [],
                list: {}
            },
            /*imageListObj: {
                isShow: false,
                type: 'guess',
                title: '猜你喜欢',
                icon: require('../assets/icon/guess.png'),
                titleBtn: '',
                button: [
                    {
                        name: '换一组',
                        target: 'group',
                        icon: require('../assets/icon/group.png'),
                        iconStyle: {
                            width: '13px',
                            height: '13px',
                            "margin-right": '5px'
                        }
                    }
                ],
                list: []
            },*/
            seniorityInfo: {
              title: '热门推荐',
              titleStyle: {
                  "padding": '20px 40px',
                  "margin-bottom": '0px'
              },
              icon: require('../assets/icon/seniority.png'),
              type: 'image',
              list: []
            },
            dramasObj: {
                episode: 1,
                nowEpisode: 1,
                disableDramas: true
            },
            pageNum: 0, // 第几页
            totalPages: 0, // 一共有几页
            //dussVideoLocality: '',
            //dussVideoType: ''
            mediaInfo: null
        }
    },
    methods: {
        //获取数据
        getData () {
            var that = this

            this.$axios({
                url: "/realNet/video/getVideoInfos",
                params: {
                    id: this.params.id,
                    containVideoFile: true
                },
                headers: {'token': '123456789'},
                methods: "get"
            }).then(function(res) {
                var data = (
                    res.data.result && res.data.result.content
                )? res.data.result.content[0]: null
                if (!data)
                    return console.log(res.data)

                console.log(data)
                if ( data.categoryValue.indexOf("下载") > -1 ||
                    data.categoryValue.toUpperCase().indexOf("RMHD") > -1 )
                {
                    return that.$router.replace({
                        name: "DownloadDetailPage",
                        query: {
                            contentId: data.id
                        }
                    });
                }
                if (data.categoryValue.indexOf("电影") < 0)
                    that.$set(that.dramasObj, "disableDramas", false)

                var protagonistArr = []
                var tagesStyle = {
                    "border-radius": "10px",
                    "font-size": "10px",
                    "padding": "3px 10px"
                }

                if(!!data.protagonist){
                    var protagonist = data.protagonist.split('、')
                    protagonist.map(function(item){
                        protagonistArr.push({name: item})
                    })
                }

                that.videoObj.title = data.videoName
                that.videoObj.videoImg = `/realNet/file/uploads/${data.horizontalImage}`
                //剧情简介
                that.plptOmtrpdicedObj.name = data.videoName + ' 第' + that.dramasObj.nowEpisode + '集'
                that.plptOmtrpdicedObj.grade = data.score
                that.plptOmtrpdicedObj.cover = `/realNet/file/uploads/${data.verticalImage}`
                that.plptOmtrpdicedObj.list = {
                    '导演': [ { name: data.director } ],
                    '主演': protagonistArr,
                    //'看点': { isTarges: true },
                    '简介': [ { name: data.description} ]
                }
                that.plptOmtrpdicedObj.tages = [
                    { title: data.videoLocalityValue, style: tagesStyle },
                    { title: data.videoTypeValue, style: tagesStyle },
                    { title: data.languageValue, style: tagesStyle },
                    //{ title: data.keywords, style: tagesStyle },
                    { title: data.year, style: tagesStyle }
                ]
                //电视剧集数
                that.dramasObj.episode = data.files.length
                that.params.videoFiles = data.files.map(function(item) {
                    return [{
                        withCredentials: false,
                        type: "application/x-mpegURL",
                        src: `/realNet/file/uploads/${item.file}/out.m3u8`
                    }, {
                        type: "video/mp4",
                        src: `/realNet/upload/${item.file}`
                    }]
                })
                that.vidSrc = that.params.videoFiles[0]
                that.mediaInfo = {
                    name: data.videoName,        // 视频名称
                    videoFileId: 1,              // 第几集
                    videoInfo: data,             // 视频ID
                    categoryId: data.categoryId, // 栏目id
                    episode: data.files.length,  // 共几集
                }

                /*that.dussVideoLocality = data.videoLocality
                that.dussVideoType = data.videoTypeValue
                that.getDuessList()*/

                that.getSeniorityList(data.videoLocality, data.videoTypeValue)

                if (document.documentElement.scrollTop)
                    document.documentElement.scrollTop = 0
                if (document.body.scrollTop)
                    document.body.scrollTop = 0
                if (window.pageYOffset)
                    window.pageYOffset = 0
            })
        },
        //获取“猜你喜欢”数据
        /*getDuessList () {
            var that = this

            this.$axios({
                url: "/realNet/video/getVideoInfos",
                params: {
                    videoLocality: this.dussVideoLocality,
                    videoTypeValue: this.dussVideoType,
                    pageSize: 4,
                    pageNum: this.pageNum,
                    containVideoFile: true
                },
                headers: {'token': '123456789'},
                methods: "get"
            }).then(function(res){
                var data = res.data.result.content
                that.imageListObj.list = data.map(item => {
                    return {
                            id: item.id,
                            img: `/realNet/file/uploads/${item.verticalImage}`,
                            name: item.videoName ? item.videoName : '',
                            intro: item.description ? item.description : '',
                            grade: item.score ? item.score : 8,
                            total: item.files.length + '集全'
                        }
                })
                that.totalPages = res.data.result.totalPages
            })
        },*/
        //获取排行榜数据
        getSeniorityList (videoLocality, videoType) {
            var that = this

            this.$axios({
                url: "/realNet/video/getVideoInfos",
                params: {
                    videoLocality: videoLocality,
                    videoTypeValue: videoType,
                    pageSize: 4,
                    orderByField: "score",
                    orderByType: "DESC"
                },
                headers: {'token': '123456789'},
                methods: "get"
            }).then(function(res){
                var data = res.data.result.content
                that.seniorityInfo.list = data.map((item,idx) => {
                    var icon = ''

                    switch(idx){
                        case 0:
                            icon = require('../assets/icon/1.png')
                            break
                        case 1:
                            icon = require('../assets/icon/2.png')
                            break
                        case 2:
                            icon = require('../assets/icon/3.png')
                            break
                        default:
                            icon = require('../assets/icon/4.png')
                            break
                    }

                    return {
                        id: item.id,
                        icon: icon,
                        src: `/realNet/file/uploads/${item.verticalImage}`,
                        name: item.videoName ? item.videoName : ''
                    }
                })
            })
        },
        //选择集数回调函数
        episodeClick (option) {
            this.dramasObj.nowEpisode = option.num
            this.plptOmtrpdicedObj.name = this.videoObj.title + (
                option.num > 1
            )? ' 第' + option.num + '集': '';
            if (option.num - 1 < this.params.videoFiles.length) {
                this.vidSrc = this.params.videoFiles[option.num - 1]
                this.mediaInfo = {
                    name: this.mediaInfo.name,              // 视频名称
                    videoFileId: option.num,                // 第几集
                    videoInfo: this.mediaInfo.videoInfo,    // 视频信息
                    categoryId: this.mediaInfo.categoryId,  // 栏目id
                    episode: this.mediaInfo.episode,        // 共几集
                }
            }
        },
        nextVideo() {
            if (this.mediaInfo.videoFileId < this.mediaInfo.episode)
                this.episodeClick({num: this.mediaInfo.videoFileId + 1})
        },
        //点击收藏事件
        collectClick (option) {
            if(option.button.target === 'shoucang'){
                if ( getUser() && getToken() ) {
                    var that = this
                    this.$axios({
                        url: '/realNet/history/getHistories',
                        method: 'GET',
                        params: {
                            categoryId: that.mediaInfo.categoryId,   // 栏目ID
                            name: that.mediaInfo.name,               // 视频名称
                            videoFileId: that.mediaInfo.videoFileId, // 第几集
                            type: 2                                  // 收藏历史
                        },
                        headers:{
                            token: getToken()
                        }
                    }).then(res=>{
                        if ( res.data.result && res.data.result.content &&
                            !that.favorated(res.data.result.content) )
                        {
                            that.$axios({
                                url: '/realNet/history/insert',
                                method: 'POST',
                                data: Object.assign({
                                    customerId: JSON.parse( getUser() ).id, // 客户id
                                    remainingTime: 0,                       // 剩余时长
                                    type: 2                                 // 收藏历史
                                }, that.mediaInfo),
                                headers:{
                                    token: getToken()
                                }
                            }).catch(error=>{
                                console.log(error)
                            })
                        }
                    }).catch(error=>{
                        console.log(error)
                    })
                }
            }
        },
        favorated: function(records) {
            for (var i = 0; i < records.length; ++i) {
                if (records[i].videoInfo.videoName == this.mediaInfo.name &&
                    records[i].videoFileId == this.mediaInfo.videoFileId)
                {
                    return true
                }
            }
            return false
        },
        //“猜你喜欢”点击换一组事件
        /*groupClick (btnInfo) {
            if(btnInfo.target === 'group'){
                if(this.pageNum >= this.totalPages)
                    this.pageNum = 0
                this.getDuessList()
                this.pageNum++
            }
        },
        //“猜你喜欢”电影点击事件
        groupItemClick (info) {
            console.log(info)
        },
        //点击开通VIP事件
        buyVipClick (info) {
            console.log(info)
        },*/
        //排行榜内电影点击事件
        seniorityClick (info) {
            window.location.href = "http://localhost:8080/tvplay-page?contentId=" + info.id;
        },
    }
}

</script>

<style scoped>
.MoviePage{
    width: 100%;
    background: rgb(43, 51, 63);
}
.topBack{
    width: 90%;
    margin: 0 auto;
}
.video_l{
    width: calc(100% - 350px);
    height: 576px;
    overflow: hidden;
    float: left;
    position: relative;
}
.video_r{
    width: 350px;
    height: 576px;
    overflow: auto;
    float: left;
    background: #10131A;
}
.video_b{
    width: 100%;
    float: left;
}
.content{
    width: 100%;
    margin: auto;
    overflow: hidden;
}
.imageList{
    float: left;
    margin-bottom: 20px;
}
.imageList{
    width: 100%;
}
.seniority{
    width: calc(100% - 20px);
    margin-left: 10px;
}
.bottomCon{
    margin-bottom: 20px;
}
.log{
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
