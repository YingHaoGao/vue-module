<template>
    <div class="downloadDetailPage">
        <div class="detailCom">
            <!-- 电影简介 -->
            <plotIntroduced :info="plotIntroduced">
                <div class="detailComSlot" slot="title">
                    <div class="titleOuter">
                        <div class="titleLeft">{{plotIntroduced.title}}</div>
                        <div class="tltleRight">
                            <img src="../assets/icon/comedy.png" alt="">
                            <span class="number">125.6万</span>
                            <span class="score">{{plotIntroduced.score}}</span>
                        </div>
                    </div>
                    <div class="categoryOuter">
                        <span class="category">{{plotIntroduced.categoryValue}}</span>
                        <span v-if="filesLength>1" class="count">更新至第{{filesLength}}集</span>
                    </div>
                </div>
            </plotIntroduced>
        </div>
        <div class="downloadList">
            <div class="downloadListTitel">
                <div class="title">
                    <img src="../assets/icon/download.png" />
                    <b>剧集下载</b>
                </div>
                <div class="tab">
                    <span 
                        v-for="(item , i) in filesNum"
                        @click="filesTabNumClick(i)"
                        :class="{active: filesID == i}"
                    >
                        {{filesTabNum(i)}}
                    </span>
                </div>
            </div>
            <imageList :info="downloadList" @movieClick="triggerDownload"/>
        </div>
        <!-- 相关视频 -->
        <!--
        <div class="downloadAboutList">
            <imageList :info="downloadAboutList" @btnClick="btnClick" />
        </div>
        -->
        <div style="width:100%; margin: 0 auto;">
            <div class="Advertisement"></div>
        </div>
    </div>
</template>

<script>
import plotIntroduced from "@/components/gaoyinghao/plotIntroduced.vue";
import imageList from "@/components/gaoyinghao/imageList.vue";
import { getToken, getUser } from '../utils/auth.js'

export default {
    components: {
        plotIntroduced,
        imageList
    },
    data() {
        return {
            movieId: this.$route.query.contentId || 34,
            videoLocalityValue: "",
            videoType: "",
            plotIntroduced: {},
            filesLength: 0, // 一共有多少集视频
            filesNum: 0, // 可以显示多少页视频
            filesSpace: 30, // 每次显示多少集视频
            filesID : 0,
            downloadListArr:[],
            downloadList: {
                type: "free",
                title: "剧集下载",
                icon: require("../assets/icon/download.png"),
                list: []
            },
            /*
            downloadAboutList: {
                type: "free",
                title: "相关视频",
                icon: require("../assets/icon/boutique.png"),
                button: [
                    {
                        name: "换一组",
                        icon: require("../assets/icon/group.png")
                    }
                ],
                list: []
            },
            */
            pageNum: 0, // 第几页
            totalPages: 0, // 一共有几页
            adoutVideoLocality: '',
            aboutVideoType: ''
        };
    },
    mounted() {
        this.detailData();
    },
    methods: {
        // 获取电影简介，剧集下载数据，
        // 给相关视频传参数
        detailData() {
            var that = this;
            
            that.$axios({
                url: "/realNet/video/getVideoInfos",
                params: {
                    id: that.movieId,
                    containVideoFile: true
                },
                headers: {
                    token: 123456789
                },
                method: "get"
            }).then(res => {
                var data = res.data.result.content[0];
                if (data) {
                    // 电影简介
                    that.plotIntroduced = {
                        isShow: true,
                        isNotTitle: true,
                        title: data.videoName,
                        cover: `/realNet/file/uploads/${data.verticalImage}`,
                        score: data.score,
                        categoryValue: data.categoryValue,
                        list: {
                            地区: [{
                                name: data.videoLocalityValue
                            }],
                            导演: [{
                                name: data.director
                            }],
                            类型: [{
                                name: data.videoTypeValue
                            }],
                            语言: [{
                                name: data.languageValue
                            }],
                            年份: [{
                                name: data.year
                            }],
                            简介: [{
                                name: data.description
                            }]
                        }
                    };
                    // 剧集下载
                    console.log(data.files)
                    that.downloadListArr = data.files.map(item => {
                        return {
                            id: item.id,
                            img: `/realNet/file/uploads/${item.image}`,
                            file: item.fileRmhd? item.fileRmhd: `/realNet/upload/${item.file}`,
                            name: `第${item.episode}集`,
                            intro: item.description || "",
                            grade: 8,
                            total: item.duration
                        };
                    });
                    that.downloadList.list = that.downloadListArr.slice(0, that.filesSpace);
                    // 一个有多少集视频
                    that.filesLength = data.files.length;
                    // 可以显示多少页视频
                    that.filesNum = Math.ceil(that.filesLength / that.filesSpace);
                    that.adoutVideoLocality = data.videoLocality;
                    that.aboutVideoType = data.videoTypeValue
                    // 相关视频
                    //that.detailAboutData();

                    if (document.documentElement.scrollTop)
                        document.documentElement.scrollTop = 0
                    if (document.body.scrollTop)
                        document.body.scrollTop = 0
                    if (window.pageYOffset)
                        window.pageYOffset = 0
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        // 获取相关视频数据
        /*detailAboutData() {
            var that = this;
            that.$axios({
                url: "/realNet/video/getVideoInfos",
                method: "get",
                headers: {
                    token: 123456789
                },
                params: {
                    videoLocality: that.adoutVideoLocality,
                    videoType: that.aboutVideoType,
                    pageSize: 4,
                    pageNum: that.pageNum
                }
            }).then(res => {
                var data = res.data.result.content;
                that.downloadAboutList.list = data.map(item => {
                    return {
                        id: item.id,
                        img: `/realNet/file/uploads/${item.verticalImage}`,
                        name: item.videoName ? item.videoName : "",
                        intro: item.description ? item.description : "",
                        grade: item.score ? item.score : 8
                    };
                });
                that.totalPages = res.data.result.totalPages;
            }).catch(function(error) {
                console.log(error);
            });
        },*/
        filesTabNum(i){
            var fristNum, lastNum, num;
            fristNum = i * this.filesSpace + 1;
            lastNum = ((i + 1) * this.filesSpace) > this.filesLength 
                    ? this.filesLength
                    : (i+1)*this.filesSpace;
            num = fristNum !== lastNum 
                    ? `${fristNum}-${lastNum}` 
                    : `${lastNum}`;
            return num;
        },
        filesTabNumClick(i){
            var fristNum, lastNum;
            fristNum = i * this.filesSpace;
            lastNum = ((i + 1) * this.filesSpace) > this.filesLength 
                    ? this.filesLength
                    : (i + 1) * this.filesSpace;
            this.filesID = i;
            this.downloadList.list = this.downloadListArr.slice(fristNum,lastNum) 
        },
        /*btnClick(data){
            if (this.pageNum >= this.totalPages)
                this.pageNum = 0;
            this.detailAboutData();
            this.pageNum++;
        },*/
        triggerDownload(options) {
            var link = document.createElement('a')
            link.href = options.infoItem.file
            link.setAttribute(
                'download',
                this.plotIntroduced.title + '_' + options.infoItem.name + ".mp4"
            )
            if (link.dispatchEvent) {
                var evClick = document.createEvent("MouseEvents"); 
                evClick.initEvent("click", true, true); 
                link.dispatchEvent(evClick);
            } else if (link.click) {
                link.click()
            }
            this.saveHistory(options.infoItem.id);
        },
        saveHistory(fid) {
            if ( getUser() && getToken() ) {
                var that = this
                that.$axios({
                    url: '/realNet/download/getDownloads',
                    method: 'GET',
                    params: {
                        "videoInfo.id": that.movieId,   // 视频ID
                        fileId: fid,                    // 剧集ID
                    },
                    headers:{
                        token: getToken()
                    }
                }).then(resp=>{
                    if ( resp.data.result && resp.data.result.content &&
                        !that.favorated(resp.data.result.content, fid) )
                    {
                        that.$axios({
                            url: '/realNet/download/insert',
                            method: 'POST',
                            data: {
                                customerId: JSON.parse( getUser() ).id, // 客户id
                                videoInfo: {id: that.movieId},          // 视频ID
                                fileId: fid,                            // 剧集ID
                            },
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
        },
        favorated: function(records, fid) {
            for (var i = 0; i < records.length; ++i) {
                if (records[i].videoInfo.id == this.movieId && records[i].fileId == fid)
                    return true
            }
            return false
        },
    }
};
</script>

<style lang="scss">
.downloadDetailPage {
    width: 90%;
    margin: 0 5%;
    .detailCom {
        background-color: #f9f9f9;
        .plotIntroduced {
            width: 100%;
            margin: 0 auto;
            background-color: #f9f9f9;
            .content {
                .introduced {
                    .detailComSlot {
                        margin-bottom: 10px;
                        div {
                            float: none;
                            display: block;
                        }
                        .titleOuter {
                            margin-bottom: 20px;
                            .titleLeft {
                                font-size: 32px;
                                color: #22252f;
                                display: inline-block;
                            }
                            .tltleRight {
                                position: absolute;
                                right: 0;
                                display: inline-block;
                                .number {
                                    font-size: 20px;
                                    color: #22252f;
                                }
                                .score {
                                    font-size: 32px;
                                    color: #ff1d18;
                                    margin-left: 28px;
                                }
                            }
                        }
                        .categoryOuter {
                            .category {
                                display: inline-block;
                                font-size: 14px;
                                color: #666;
                                border: 1px solid #666;
                                border-radius: 20px;
                                padding: 4px 8px;
                            }
                            .count {
                                font-size: 14px;
                                color: #ec2740;
                                margin-left: 20px;
                            }
                        }
                    }
                    & > div {
                        b {
                            color: #000;
                            font-size: 14px;
                            font-weight: normal;
                        }
                    }
                }
            }
        }
    }
    .downloadList {
        width: 100%;
        margin: 0 auto;
        .downloadListTitel {
            .title {
                padding: 20px 40px;
                text-align: left;
                box-sizing: border-box;
                position: relative;
                & > img {
                    width: 27px;
                    height: 27px;
                    position: absolute;
                    top: 50%;
                    left: 0px;
                    transform: translate(0, -50%);
                }
                & > b {
                    font-size: 24px;
                }
            }
            .tab {
                padding-bottom: 30px;
                >span{
                    display: inline-block;
                    width: 70px;
                    height: 30px;
                    line-height: 30px;
                    border-radius: 20px;
                    text-align: center;
                    cursor: pointer;
                    border: 1px solid #ccc;
                    margin-right: 20px;
                    &.active{
                        color: #3bc0d0;
                        border-color: #3bc0d0;
                    }
                    &:hover{
                        color: #3bc0d0;
                        border-color: #3bc0d0;
                    }
                }
            }
        }
        .imageList {
            width: 100%;
            .title {
                display: none;
            }
            .content {
                padding-top: 0;
                margin: 0 -0.5%;
                .movieImage {
                    width: 19%;
                    height: auto;
                    margin: 0 0.5% 35px;
                    > div {
                        height: auto;
                        .img {
                            height: auto;
                            > img {
                                width: 100%;
                                height: auto !important;
                            }
                        }
                    }
                }
                .grade {
                    display: none;
                }
            }
        }
    }
    .downloadAboutList {
        width: 100%;
        margin: 0 auto;
        .title {
            > span {
                display: none;
            }
            > ul > li > i > img {
                width: 16px;
                margin-right: 10px;
            }
        }
        .imageList {
            width: 100%;
            .content {
                padding-top: 0;
                margin: 0 -1%;
                .movieImage {
                    width: 23%;
                    margin: 0 1% 35px;
                    > img {
                        width: 100%;
                        height: auto;
                    }
                }
            }
        }
    }
}
</style>



