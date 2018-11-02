<template>
    <div class="message">
        <h4>全部消息</h4>
        <div class="msgWrap">
            <div class="msgItem" v-for="(item,index) in messageData" :key="index">
                <div class="msgImg">
                    <img src="../../../assets/images/mine/messageTips.png" style="width:50px;height:50px;" alt="">
                </div>
                <div class="content">
                    <div class="content_top">
                        <h4>消息提醒</h4>
                        <span>2018-09-26   09:20</span>
                    </div>
                    <div class="content_bottom">
                        <p v-if="showMore.status && index == showMore.num">
                            <span>{{ item.content }}</span>
                        </p>
                        <p v-else class="pSty">
                            <span>{{ item.content }}</span>
                        </p>
                        <!-- <span @click="moreFn(index)">{{ showMore.status && index == showMore.num ? '收起' : '展开'}}</span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { getToken, setToken, setUser } from '../../../utils/auth.js'

    export default {
        data() {
            return {
                showMore: {
                    num: 1000,
                    status: false
                },
                messageData: []
            }
        },
        methods: {
            moreFn(index) {
                this.showMore.status = !this.showMore.status;
                this.showMore.num = index;
            },
            // 我的消息
            messageFn() {
                let params = {
                    token: getToken()
                };
                axios({
                    method: 'get',
                    url: '/realNet/message/getMessages',
                    headers: params
                })
                .then((res) =>{
                    this.messageData = res.data.result.content;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        mounted() {
            this.messageFn();  // 我的消息
        }
    }
</script>

<style lang='scss' scoped>
    .message {
        width: 930px;

        & > h4 {
            padding-bottom: 16px;
            font-size: 16px;
            color: #000;
            border-bottom: 1px solid #DDDDDD;
        }
        .msgItem {
            width: 930px;
            margin: 15px 0;
            
            display: flex;

            .msgImg {
                width: 50px;
                height: 50px;
                margin-right: 10px;

                background-color: #ccc;
                border-radius: 50%;
                overflow: hidden;
            }
            .content {
                width: 80%;

                .content_top {
                    width: 100%;
                    height: 15px;
                    margin-bottom: 10px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    h4 {
                        font-size: 14px;
                        color: #000;
                    }
                    span {
                        font-size: 12px;
                        color: #999999;
                    }
                }
                .content_bottom {
                    width: 100%;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #EEEEEE;
                    
                    display: flex;
                    justify-content: space-between;

                    p {
                        width: 80%;
                        line-height: 1.45;

                        span {
                            font-size: 14px;
                            color: #000;
                        }
                    }
                    .pSty {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    span {
                        color: #3BC0D0;
                        font-size: 14px;
                        cursor: pointer;
                    }
                }
            }
            

        }
    }
</style>
