<template>
    <div class="MoviePage">
        <div class="topBack">
            <div class="topCon content">
                <div class="video_l">
                    <VideoCom :source="vidSrc" :thumb="videoObj.videoImg"></VideoCom>
                    <img class="log" src="../assets/images/header/logo.png"></img>
                </div>
                <div class="video_r">
                    <videoNow :info="videoObj" @iconClick="collectClick" @buyVipClick="buyVipClick"/>
                </div>
                <div class="video_b">
                    <PlotIntroduced :info="plptOmtrpdicedObj"/>
                </div>
            </div>
        </div>
        <div class="bottomCon content">
            <div class="imageList">
                <ImageList v-if="imageListObj.list.length>0" :info="imageListObj" @btnClick="groupClick" @movieClick="groupItemClick"/>
            </div>
            <div class="seniority">
                <Seniority v-if="seniorityInfo.list.length>0" :info="seniorityInfo" @movieClick="seniorityClick"/>
            </div>
            <img src='../assets/images/banner6.jpg'/>
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

 export default {
    name: 'moviePage',
    components: {
        VideoCom,
        videoNow,
        Scenes,
        PlotIntroduced,
        ImageList,
        Seniority
    },
    mounted () {
        this.getData();
    },
    data () {
        var contentId = this.$route.query.contentId || 40;
        return {
            vidSrc: {},
            params: {
                id: contentId,
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
                buttons: [
                  {
                    icon: require('../assets/icon/collect.png'),
                    activeIcon: require('../assets/icon/boutique.png'),
                    alt: '收藏',
                    target: 'shoucang',
                    isAction: false
                  }
                ]
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
                    "color": '#42B0BD'
                },
                coverStyle: {
                    width: '100px',
                    height: '125px'
                },
                contentStyle: {
                    background: 'rgb(43, 51, 63)',
                    "font-size": "10px"
                },
                moduleStyle: {
                    color: 'blue'
                },
                tages: [],
                list: {}
            },
            imageListObj: {
                  ISSHOW: false,
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
            },
            seniorityInfo: {
              title: '电影排行榜',
              titleStyle: {
                  "padding": '20px 40px',
                  "margin-bottom": '0px'
              },
              icon: require('../assets/icon/seniority.png'),
              type: 'image',
              list: []
            },
            pageNum: 0, // 第几页
            totalPages: 0, // 一共有几页
            dussVideoLocality: '',
            dussVideoType: ''
        }
    },
    methods: {
        //获取数据
        getData () {
            var that = this;

            this.$axios({
                url: "/realNet/video/getVideoInfos",
                params: {
                    id: this.params.id,
                    containVideoFile: true
                },
                headers: {'token': '123456789'},
                methods: "get"
            }).then(function(res){
                var data = res.data.result.content[0];
                var protagonistArr = [];
                var tagesStyle = {
                    "border-radius": "10px",
                    "font-size": "10px",
                    "padding": "3px 10px"
                };

                if(!!data.protagonist){
                    var protagonist = data.protagonist.split('、');
                    protagonist.map(function(item){
                        protagonistArr.push({name: item});
                    })
                }

                that.videoObj.title = data.videoName;
                that.videoObj.videoImg = `/realNet/file/uploads/${data.horizontalImage}`;
                that.plptOmtrpdicedObj.name = data.videoName;
                that.plptOmtrpdicedObj.grade = data.score;
                that.plptOmtrpdicedObj.cover = `/realNet/file/uploads/${data.verticalImage}`;
                that.plptOmtrpdicedObj.list = {
                    '导演': [ { name: data.director } ],
                    '主演': protagonistArr,
                    //'看点': { isTarges: true },
                    '简介': [ { name: data.description} ]
                };
                that.plptOmtrpdicedObj.tages = [
                    { title: data.videoLocalityValue, style: tagesStyle },
                    { title: data.videoTypeValue, style: tagesStyle },
                    { title: data.language, style: tagesStyle },
                    { title: data.keywords, style: tagesStyle },
                    { title: data.year, style: tagesStyle }
                ];
                that.params.videoFiles = data.files.map(function(item) {
                    return {
                        type: "application/x-mpegURL",
                        src: `/realNet/file/uploads/${item.file}/out.m3u8`
                    }
                });
                that.vidSrc = that.params.videoFiles[0];

                that.dussVideoLocality = data.videoLocality
                that.dussVideoType = data.videoType
                that.getDuessList();

                that.getSeniorityList(data.videoLocality, data.videoType, data.leaderboardSortOrder);
                document.documentElement.scrollTop = 0
            })
        },
        //获取“猜你喜欢”数据
        getDuessList () {
            var that = this;

            this.$axios({
                url: "/realNet/video/getVideoInfos",
                params: {
                    videoLocality: this.dussVideoLocality,
                    videoType: this.dussVideoType,
                    pageSize: 4,
                    pageNum: this.pageNum
                },
                headers: {'token': '123456789'},
                methods: "get"
            }).then(function(res){
                var data = res.data.result.content;
                that.imageListObj.list = data.map(item => {
                    return {
                            id: item.id,
                            img: `/realNet/file/uploads/${item.verticalImage}`,
                            name: item.videoName ? item.videoName : '',
                            intro: item.description ? item.description : '',
                            grade: item.score ? item.score : 8
                        };
                })
                that.totalPages = res.data.result.totalPages;
            })
        },
        //获取排行榜数据
        getSeniorityList (videoLocality, videoType, leaderboardSortOrder) {
            var that = this;

            this.$axios({
                url: "/realNet/video/getVideoInfos",
                params: {
                    videoLocality: videoLocality,
                    videoType: videoType,
                    pageSize: 4,
                    orderByField: leaderboardSortOrder
                },
                headers: {'token': '123456789'},
                methods: "get"
            }).then(function(res){
                var data = res.data.result.content;
                that.seniorityInfo.list = data.map((item,idx) => {
                    var icon = '';

                    switch(idx){
                        case 0:
                            icon = require('../assets/icon/1.png');
                            break;
                        case 1:
                            icon = require('../assets/icon/2.png');
                            break;
                        case 2:
                            icon = require('../assets/icon/3.png');
                            break;
                        default:
                            icon = require('../assets/icon/4.png');
                            break;
                    }

                    return {
                            id: item.id,
                            icon: icon,
                            src: `/realNet/file/uploads/${item.verticalImage}`,
                            name: item.videoName ? item.videoName : ''
                        };
                });
            })
        },
        //“猜你喜欢”点击换一组事件
        groupClick (btnInfo) {
            if(btnInfo.target === 'group'){
                if(this.pageNum >= this.totalPages)
                    this.pageNum = 0;
                this.getDuessList();
                this.pageNum++;
            }
        },
        //“猜你喜欢”电影点击事件
        groupItemClick (info) {
            console.log(info)
        },
        //点击收藏事件
        collectClick (option) {
            if(option.button.target === 'shoucang'){
                console.log('点击收藏事件')
            }
        },
        //点击开通VIP事件
        buyVipClick (info) {
            console.log(info)
        },
        //排行榜内电影点击事件
        seniorityClick (info) {
            console.log(info)
        },
    }
}

</script>

<style scoped>
.topBack{
    width: 100%;
    background: rgb(43, 51, 63);
}
.video_l{
    width: calc(100% - 350px);
    height: 776px;
    overflow: hidden;
    float: left;
    position: relative;
}
.video_r{
    width: 350px;
    height: 776px;
    overflow: hidden;
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
.imageList,.seniority{
    float: left;
    margin-bottom: 20px;
}
.imageList{
    width: calc(100% - 230px);
}
.seniority{
    width: 230px;
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
