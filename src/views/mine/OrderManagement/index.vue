<template>
    <!-- 订单管理 -->
    <div class="order">
        <div class="order_head">
            <ul>
                <li v-for="(item,index) in tabsCard.tabs" :class="index == tabsCard.num ? 'active' : ''" :key="index" @click="tab(index)">
                    <span>{{ item }}</span>
                </li>
            </ul>
        </div>
        <div class="main">
            <!-- 今天 -->
            <div v-if="tabsCard.num == 0" >
                <div class="orderItem" v-for="(item,index) in showData" :key='index'>
                    <div class="titleImg">
                        <img v-if="item.videoInfo" :src="'/realNet/file/'+item.videoInfo.horizontalImage" alt="">
                    </div>
                    <div class="titleImg_right">
                        <div class="titleImg_top">
                            <h4>
                                <span>订单编号:{{item.outTradeNo}}</span>
                                <span class="normalSty">￥{{item.money}}</span>
                            </h4>
                            <p>
                                <span v-if="item.videoInfo">{{ item.videoInfo.videoName }}</span>
                                <span> </span>
                            </p>
                        </div>
                        <p>
                            <span>{{item.createdTime|formatDate}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <!-- 最近一周 -->
            <div v-if="tabsCard.num == 1">
                <div class="orderItem" v-for="(item,index) in showData" :key='index'>
                    <div class="titleImg">
                        <img v-if="item.videoInfo" :src="'/realNet/file/'+item.videoInfo.horizontalImage" alt="">
                    </div>
                    <div class="titleImg_right">
                        <div class="titleImg_top">
                            <h4>
                                <span>订单编号:{{item.outTradeNo}}</span>
                                <span class="normalSty">￥{{item.money}}</span>
                            </h4>
                            <p>
                                <span v-if="item.videoInfo">{{ item.videoInfo.videoName }}</span>
                                <span> </span>
                            </p>
                        </div>
                        <p>
                            <span>{{item.createdTime|formatDate}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <!-- 最近一月 -->
            <div v-if="tabsCard.num == 2">
                <div class="orderItem" v-for="(item,index) in showData" :key='index'>
                    <div class="titleImg">
                        <img v-if="item.videoInfo" :src="'/realNet/file/'+item.videoInfo.horizontalImage" alt="">
                    </div>
                    <div class="titleImg_right">
                        <div class="titleImg_top">
                            <h4>
                                <span>订单编号:{{item.outTradeNo}}</span>
                                <span class="normalSty">￥{{item.money}}</span>
                            </h4>
                            <p>
                                <span v-if="item.videoInfo">{{ item.videoInfo.videoName }}</span>
                                <span> </span>
                            </p>
                        </div>
                        <p>
                            <span>{{item.createdTime|formatDate}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <!-- 全部 -->
            <div v-if="tabsCard.num == 3">
                <div class="orderItem" v-for="(item,index) in showData" :key='index'>
                    <div class="titleImg">
                        <img v-if="item.videoInfo" :src="'/realNet/file/'+item.videoInfo.horizontalImage" alt="">
                    </div>
                    <div class="titleImg_right">
                        <div class="titleImg_top">
                            <h4>
                                <span>订单编号:{{item.outTradeNo}}</span>
                                <span class="normalSty">￥{{item.money}}</span>
                            </h4>
                            <p>
                                <span v-if="item.videoInfo">{{ item.videoInfo.videoName }}</span>
                                <span> </span>
                            </p>
                        </div>
                        <p>
                            <span>{{item.createdTime|formatDate}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div v-show="isShowNoContent">
                <p style="text-align:center;">无观看记录</p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { getToken, setToken, setUser } from '../../../utils/auth.js';
    import {formatDate } from '../../../utils/date.js'
    export default {
        data() {
            return {
                tabsCard: {
                    tabs: ['今天','最近一周','最近一月','全部'],
                    num: 0
                },
                videoName:'',
                showData: [], // 主体展示数据
                isShowNoContent: false,  // 是否展示无内容提示
            }
        },
        filters:{
            formatDate(time){
                let date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm:ss');
            }
        },
        methods: {
            tab(index) {
                this.tabsCard.num = index;
                //  TODO:
                // let type; // 接口标识类型 
                // if(index == 0) {  // 今天
                //     type =  ''
                // } else if(index == 1) {  // 最近一周
                //     type =  '1'
                // } else if(index == 2) {  // 最近一月
                //     type = '2'
                // } else if(index == 3) {
                //     type = '3'
                // }
                 let obj = {
                    params: {
                        // 需求接口请求字段参数
                        // 还有个字段是标识选项卡时间类型，在if判断如上述type
                     },
                    fn: (res) => {
                        this.showData = res; 
                    }
                };
                this.orderFn(obj); 
            },
             orderFn(obj){
               let data = {
                    token: getToken()
                };
                //TODO 修改为实际请求参数
                // let params = {
                //    "beginTime":1539162270000,
                //    "endTime":1539162271002
                // };
                axios({
                    method: 'get',
                    url: '/realNet/order/getOrders',
                    headers: data,
                    data: obj.params
                })
                .then((res) =>{
                    if(res.data.result.content.length == 0) {
                        this.isShowNoContent = true;
                    } else {
                        this.isShowNoContent = false;
                    }
                    obj.fn(res.data.result.content);
                })
                .catch(function (error) {
                    console.log(error);
                });
             }
        },
        mounted() {
            let obj = {
                params: {
                    // 需求接口请求字段参数
                },
                fn: (res) => {
                   this.showData = res; 
                }
            };
           this.orderFn(obj); 
        }
    }
</script>

<style lang='scss' scoped>
    .order {
        width: 930px;

        .order_head {
            width: 100%;
            height: 41px;
            border: 1px solid #EAECED;
            padding: 0 40px;
            margin-bottom: 30px;

            background-color: #F9F9F9;
            box-sizing: border-box;

            display: flex;
            justify-content: space-between;
            align-items: center;

            ul {
                width: 70%;
                height: 100%;
                padding: 0;

                li {
                    height: 100%;
                    padding: 0 20px;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    float: left;
                    font-size: 14px;
                    position: relative;
                    
                    span {
                        cursor: pointer;
                    }
                }
                .active {
                    font-weight: bold;

                    &::before {
                        position: absolute;
                        left: 50%;
                        margin-left: -15px;
                        bottom: -2px;
                        content: '';
                        background-color: #3BC0D0;
                        width: 35px;
                        height: 3px;
                    }
                }
            }
                    
            & > span {
                font-size: 14px;
                color: #2CB5C5;
                cursor: pointer;
            }

        }

        .main {
            width: 100%;

            .orderItem {
                width: 930px;
                height: 135px;
                margin-bottom: 30px;


                display: flex;

                .titleImg {
                    width: 240px;
                    height: 135px;
                    margin-right: 30px;

                    background-color: #ccc;
                }
                .titleImg_right {
                    width: 615px;
                    height: 100%;
                    padding: 10px 0;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    box-sizing: border-box;

                    .titleImg_top {
                        width: 100%;
                        height: 60px;

                        h4 {
                            width: 100%;
                            height: 25px;
                            margin-bottom: 16px;

                            display: flex;
                            justify-content: space-between;

                            font-size: 20px;
                            .normalSty {
                                color: #666666;
                                font-weight: normal;
                            }
                        }
                        p {
                            font-size: 16px;
                            color: #888888;
                        }
                    }

                    & > p {
                        font-size: 16px;
                        color: #888888;
                    }
                }
            }
         }

    }
</style>