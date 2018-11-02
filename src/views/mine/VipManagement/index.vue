<template>
    <div class="aside_2">
        <div class="currentStatus">
            <h4>当前状态</h4>
            <div class="currentWrap">
                <div class="imgWrap">
                    <img src="../../../assets/images/mine/vip.png" alt="">
                </div>
                <div v-if="memberExpireTime!=null" class="currentWrap_right">
                    <h3>超级VIP会员</h3>
                    <p>到期时间: <span v-if="memberExpireTime!=null">{{memberExpireTime|formatDate}}</span></p>
                </div>
                <div v-if="!memberExpireTime" class="currentWrap_right">
                    <h3>普通用户</h3>
                </div>
            </div>
            <div class="wayType">
                <div class="wayItem" :class="index == payType.num ? 'active' : ''" v-for="(item,index) in payType.tabs" :key="index" @click="tabCard(index)">
                    <h4>{{ item.typeName }}<span v-if="item.introduction">{{item.introduction}}</span>
                    </h4>
                    <p>
                        <span class="spanActive" v-if="item.money">￥{{ item.money }}</span>
                        <span>{{item.monthNum}}个月</span>
                    </p>
                    <img src="../../../assets/images/mine/recomond.png" alt="">
                    <span class="postionSpan">推荐</span>
                </div>
            </div>
        </div>
        <div class="payWay">
            <h4>支付方式</h4>
            <div class="payWayWrap">
                <div class="payItem_left">
                    <div class="codeWrap">
                        <div class="code" ref="qrcode">
                        </div>
                        <h3>微信支付</h3>
                        <p>使用微信扫码支付</p>
                    </div>
                    <div class="codeWrap">
                        <div class="code" ref="qrcode2">
                            
                        </div>
                        <h3>支付宝支付</h3>
                        <p>使用支付宝扫码支付</p>
                    </div>
                </div>
                <div class="payItem_right">
                    <h4>支付<i v-if="showMoney">￥{{ payType.tabs[payType.num].money }}元</i></h4>
                    <p>支付后自动刷新页面，即可享受超级会员</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import {formatDate} from '../../../utils/date.js';
  import { getToken, setToken, setUser,getUser } from '../../../utils/auth.js';
  import QRCode from 'qrcodejs2'
    export default {
        data() {
            return {
                payType: {
                    tabs: [],
                    num: 0
                },
                memberExpireTime:null,
                showMoney:false
            }
        },
        filters:{
            formatDate(time){
                let date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm:ss');
            }
        },
        methods:{
            
            tabCard(index) {
                this.payType.num = index;
                //获取用户支付二维码
                this.payCodeFn();

            },
            payCodeFn(){
                
                var params = {
                    token: getToken()
                };
                var data = {
                   "memberTypeId":"15" 
                };
                axios({
                    method: 'get',
                    url: '/realNet/pay/vxPayUrl',
                    headers: params,
                    data:data
                })
                .then((res) =>{
                   
                    var imgUrl = res.data.result;
                    this.$refs.qrcode.innerHTML='';
                    this.$refs.qrcode2.innerHTML='';
                    new QRCode(this.$refs.qrcode, {
                        width: 112,
                        height: 112, // 高度
                        text: imgUrl// 二维码内容
                    });
                    
                    new QRCode(this.$refs.qrcode2, {
                        width: 112,
                        height: 112, // 高度
                        text: imgUrl// 二维码内容
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
           //获取会员类型
            vipFn(){
               let params = {
                    token: getToken()
                };
                axios({
                    method: 'get',
                    url: '/realNet/memberType/getMemberTypes',
                    headers: params
                })
                .then((res) =>{
                    this.payType.tabs = res.data.result.content;
                    this.payCodeFn();
                    this.showMoney = true;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        mounted() {
            var user = JSON.parse(getUser());
            this.memberExpireTime = user.memberExpireTime;
            this.vipFn();
           // this.qrcode();
        }
    }
</script>

<style lang='scss' scoped>
    .aside_2 {
        width: 930px;
    }
    .currentStatus {
        width: 100%;

        h4 {
            font-size: 14px;   
            font-weight: bold;
            
            margin-bottom: 15px;
        }
        .currentWrap {
            width: 100%;
            height: 90px;
            padding: 26px 20px;

            background: url('../../../assets/images/mine/line_bg.png') no-repeat;
            background-size: 100% 100%;
            box-sizing: border-box;

            display: flex;
            align-items: center;

            .imgWrap {
                width: 50px;
                height: 37px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .currentWrap_right {
                width: 40%;
                height: 45px;
                margin-left: 20px;

                h3 {
                    margin-bottom: 10px;

                    color: #F1D08F;
                    font-size: 16px;
                }
                p {
                    font-size: 14px;
                    color: rgba(#fff,.8);
                }
            }
        }
        .wayType {
            width: 100%;
            height: 100px;
            margin: 30px 0 50px;
            display: flex;
            justify-content: space-between;

            .wayItem {
                width: 214px;
                height: 100px;
                padding: 15px 21px;
                border: 1px solid #3BC0D0;
                background-color: #F3F7F8;
                box-sizing: border-box;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                position: relative;

                h4 {
                    font-size: 20px;
                    color: #000;
                    span {
                        display: inline-block;
                        width: 58px;
                        height: 22px;
                        border: 1px solid #FF771D;
                        color: #FF771D;
                        font-size: 13px;
                        border-radius: 5px;
                        line-height: 22px;
                        margin-left: 10px;

                    }
                }
                p {
                    font-size: 14px;
                    color: #000;

                    .spanActive {
                        font-size: 20px;
                        color: #FF3600;
                        margin-right: 5px;
                    }
                }
                &.active {
                    background-color: #FFF6F3;
                    border: 2px solid #FF6E40;
                }
                & > img {
                    display: none;
                }
                &:nth-of-type(1) > img {
                    position: absolute;
                    left: -7px;
                    top: -14px;

                    display: block;
                }
                .postionSpan {
                    font-size: 14px;
                    color: #fff;

                    display: none;
                }
                &:nth-of-type(1) .postionSpan {
                    position: absolute;
                    left: -7px;
                    top: -14px;
                    z-index: 2;
                }
            }
        }
    }
    .payWay {
        width: 100%;

        h4 {
            font-size: 14px;
            margin-bottom: 15px;
            font-weight: bold;
        }
        .payWayWrap {
            width: 100%;
            height: 245px;
            border: 1px solid #EAECED;

            background-color: #F9F9F9;
            display: flex;
            align-items: center;

            .payItem_left {
                width: 40%;
                height: 100%;
                margin-right: 80px;

                display: flex;
                justify-content: space-around;

                .codeWrap {
                    width: 150px;
                    height: 100%;
                    padding: 32px 0;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;

                    h3 {
                        font-size: 16px;
                    }
                    p {
                        font-size: 14px;
                        color: #888888;
                    }

                    .code {
                        width: 112px;
                        height: 112px;

                        background: url('../../../assets/images/mine/codeWrap.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            .payItem_right {
                font-size: 16px;
                color: #666666;

                h4 {
                    font-size: 20px;

                    i {
                        color:#FF4314;
                        font-size: 30px;
                    }
                }
            }
        }
    }
</style>