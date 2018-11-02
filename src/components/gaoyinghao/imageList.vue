<template>
<div class="imageList">
    <div class="title">
        <img :src="icon" style="cursor:pointer" :style="info.iconStyle" @click="moreClick(info)"/>
        <b style="padding-right: 20px;cursor:pointer" :style="info.titleStyle" @click="moreClick(info)">{{info.title}}</b>
        <span class="recommend"
              :style="info.recommendStyle"
              v-for="item in info.recommendList"
              :key="item.id"
              @click="movieClick(item, info)">{{item.name}}</span>
        <span :class="moreClass" :style="info.titleBtnStyle" @click="moreClick(info)">{{sHrefText}}</span>
        <ul>
            <li v-for="item in info.button" :key="item.name" @click="btnClick(item)">
                <i>
                    <img :src="item.icon" :style="item.iconStyle" class="buttonIcon"/>
                </i>
                <span :style="item.style">{{item.name}}</span>
            </li>
        </ul>
    </div>
    <div class="content">
        <!-- :class="[ movieImg, (idx + 1)%divisor != 0 ? 'margin_r' : '' ]" -->
        <div class="movieImage"
            :class="movieImg"
            v-if="!!info.list && info.list.length>0"
            v-for="(item, idx) in info.list"
            :style="!!item ? item.style : ''"
            :key="idx">
            <div v-if="!!item" style="width: 100%; height: 100%;">
                <div class="img" :style="item.imgStyle">
                    <img :src="item.img" @click='movieClick(item, info)'>
                    <span class="total" v-if="!!item.total" :style="info.totalStyle">{{item.total}}</span>
                </div>
                <div class="introduce" v-if="isContent">
                    <span class="movieName" :style="info.nameStyle" @click='movieClick(item, info)'>{{item.name}}</span>
                    <span class="movieIntro" :style="info.introStyle">{{item.intro}}</span>
                    <span class="grade" :style="info.gradeStyle">{{item.grade.toFixed(1)}}</span>
                </div>
            </div>
            <div v-if="!item && info.isSeniority" class="seniorityCon" :class="movieImg">
                <Seniority :info="info.seniorityInfo" @movieClick="seniorityClick"/>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
    *{
        text-align: left;
    }
    .imageList{
        display: block;
        /*width: 100%;*/
        position: relative;
    }
    .title{
        padding: 20px 40px;
        text-align: left;
        box-sizing: border-box;
        position: relative;
    }
    .total{
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: rgba(0, 0, 0, .4);
        color: #fff;
        padding: 5px 10px;
        border-radius: 10px;
    }
    .title>img{
        width: 27px;
        height: 27px;
        position: absolute;
        top: 50%;
        left: 0px;
        transform: translate(0, -50%);
    }
    .title>ul{
        float: right;
    }
    .title>ul>li{
        list-style: none;
        cursor: pointer;
    }
    .title>b{
        font-size: 24px;
    }
    .title>span{
        padding: 0px 20px;
        font-size: 12px;
        color: black;
        cursor: pointer;
    }
    .title>span.vip{
        color: #3FB1AF;
    }
    .title>.recommend{
        display: inline-block;
        margin-right: 8px;
        font-size: 12px;
        color: #A7A7A7;
        padding: 3px 12px;
        border-radius: 10px;
        border: solid 1px #A7A7A7;
        box-sizing: border-box;
    }
    .content{
        box-sizing: border-box;
        padding-top: 10px;
    }
    .content .seniorityCon{
        transform: translate(0,-81px);
        height: 100%;
    }
    .margin_r{
        margin-right: 10px;
    }
    .movieImage{
        display: inline-block;
        margin-bottom: 10px;
        /*float: left;*/
        position: relative;
        /*overflow: hidden;*/
    }
    .movieImage.host{
        width: 340px;
        /*height: 243px; */
    }
    .movieImage.boutique:first-child{
        width: 572px;
        /*height: 423px;*/
    }
    .movieImage.boutique:not(:first-child){
        width: 278px;
        /*height: 423px;*/
    }
    .movieImage.free,.movieImage.vip,.movieImage.comedy{
        width: 280px;
        height: 445px;
    }
    .movieImage.special{
        width: 425px;
        /*height: 168px;*/
    }
    .movieImage.guess{
        width: 340px;
        /*height: 240px;*/
    }
    .img{
        position: relative;
    }
    .img>img{
        width: 100% !important;
        height: 100% !important;
    }
    .movieImage>div>.img{
        cursor: pointer;
    }
    .movieImage.host>div>.img{
        width: 100%;
        height: 192px;
    }
    .movieImage.boutique:first-child>div>.img{
        width: 100%;
        height: 373px;
    }
    .movieImage.boutique:not(:first-child)>div>.img{
        width: 100%;
        height: 373px;
    }
    .movieImage.free>div>.img,.movieImage.vip>div>.img,.movieImage.comedy>div>.img{
        width: 100%;
        height: 373px;
    }
    .movieImage.special>div>.img{
        width: 100%;
        height: 168px;
    }
    .movieImage.guess>div>.img{
        width: 100%;
        height: 192px;
    }
    .introduce{
        padding-top: 10px;
        position: relative;
    }
    .movieIntro,.movieName{
        display: block;
    }
    .movieName{
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
    }
    .movieName:hover, li:hover{
        color: #1FAFC0;
    }
    .movieIntro{
        margin-top: 2px;
        font-size: 12px;
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 40px;
    }
    .grade{
        position: absolute;
        top: 8px;
        right: 10px;
        font-size: 23px;
        color: #FF1E13;
        font-weight: 700;
    }
</style>

<script>
/*组件引入*/
import Seniority from './seniority.vue';

export default({
    props: {
        info: Object
    },
    components: { Seniority },
    watch: {
        'info.type': function() {
            this.getInit();
        }
    },
    data () {
        return {
            icon: '',
            moreClass: '',
            sHrefText: '',
            isContent: '',
            divisor: '',
            list: '',
            movieImg: '',
            seniorityInfo: false
        }
    },
    created () {
        this.getInit();
    },
    methods: {
        getInit () {
            var info = this.info,
                moreClass = '',
                sHrefText = '',
                movieImg = '',
                divisor = 5,
                list = info.list || [],
                isContent = false;

            switch(info.type){
                case 'host':         //电影热播榜
                    moreClass = 'vip';
                    sHrefText = 'VIP专享影视排行';
                    movieImg = 'host';
                    divisor = 5;
                    isContent = true;
                    break;
                case 'boutique':     //精品推荐
                    moreClass = '';
                    sHrefText = '更多 >';
                    movieImg = 'boutique';
                    divisor = 5;
                    isContent = true;
                    break;
                case 'free':         //免费电影
                    moreClass = '';
                    sHrefText = '更多 >';
                    movieImg = 'free';
                    divisor = 6;
                    isContent = true;
                    break;
                case 'vip':         //会员专享
                    moreClass = '';
                    sHrefText = '更多 >';
                    movieImg = 'vip';
                    divisor = 6;
                    isContent = true;
                    break;
                case 'comedy':         //爆笑喜剧
                    moreClass = '';
                    sHrefText = '更多 >';
                    movieImg = 'comedy';
                    divisor = 5;
                    isContent = true;
                    break;
                case 'special':     //电影专题
                    moreClass = '';
                    sHrefText = '更多 >';
                    movieImg = 'special';
                    divisor = 4;
                    isContent = false;
                    break;
                case 'guess':         //猜你喜欢
                    moreClass = '';
                    sHrefText = '';
                    movieImg = 'guess';
                    divisor = 4;
                    isContent = true;
                    break;
            }
            divisor = !!info.divisor ? info.divisor : divisor;
            console.log(info)
            if(!!list && list.length>0 && !!info.seniorityInfo && !!info.isSeniority){
                list.splice(divisor - 1, 1, false);
                console.log(list)
            }
            if(!!info.titleBtn){
                sHrefText = info.titleBtn
            }

            this.icon = info.icon;
            this.moreClass = moreClass,
            this.sHrefText = sHrefText,
            this.isContent = isContent,
            this.divisor = divisor,
            this.list = list,
            this.movieImg = movieImg,
            this.seniorityInfo = !!info.seniorityInfo ? info.seniorityInfo : false
        },
        //点击更多按钮回调
        moreClick (info) {
            this.$emit('moreClick',info)
        },
        //点击电影模块回调  参数： infoItem - object - 被点击电影的数据对象
        movieClick (infoItem, info) {
            this.$emit('movieClick', { infoItem: infoItem, info: info })
        },
        seniorityClick(infoItem) {
            this.$emit('movieClick', { infoItem: infoItem, info: this.info })
        },
        //点击右侧按钮回调  参数： btnInfo - object - 被点击的按钮对象
        btnClick (btnInfo) {
            this.$emit('btnClick', btnInfo);
        }
    }
});
</script>
