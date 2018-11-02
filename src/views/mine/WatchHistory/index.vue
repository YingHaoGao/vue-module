<template>
    <div class="watch">
        <div class="watch_head">
            <ul>
                <li v-for="(item,index) in tabsCard.tabs" :class="index == tabsCard.num ? 'active' : ''" :key="index" @click="tab(index)">
                    <span>{{ item }}</span>
                </li>
            </ul>
            <span v-if="!isEdit" @click="changeEditStatus">编辑</span>
            <div v-else class="barSty">
                <span style="margin-right: 10px;" @click="cancelEdit(false)">取消</span>
                <span @click="cancelEdit(true)">删除</span>
            </div>
        </div>
        <div class="main">
            <!-- 电影 -->
            <div v-if="tabsCard.num == 0">
                <el-checkbox-group v-model="checkList">
                    <div class="itemCard" v-for="(item,index) in showData" :key='index'>
                        <div class="card">
                            <img :src="'/realNet/file/'+item.videoInfo.horizontalImage" alt="">
                            <span>剩余{{item.remainingTime}}</span>
                            <div class="layer" v-show="isEdit">
                                    <el-checkbox :label="item.id"></el-checkbox>
                                </div>
                        </div>
                        <div class="cardDes">
                            <p >{{ item.videoInfo.videoName}}</p>
                             <p>第{{item.episode}}集</p>
                        </div>
                    </div>
                </el-checkbox-group>
            </div>
            <!-- 电视剧 -->
            <div v-if="tabsCard.num == 1">
                <el-checkbox-group v-model="checkList">
                    <div class="itemCard" v-for="(item,index) in showData" :key='index'>
                        <div class="card">
                            <img :src="'/realNet/file/'+item.videoInfo.horizontalImage" alt="">
                            <span>剩余{{item.remainingTime}}</span>
                            <div class="layer" v-show="isEdit">
                                <el-checkbox :label="item.id"></el-checkbox>
                            </div>
                        </div>
                        <div class="cardDes">
                            <p v-if="item.videoInfo">{{ item.videoInfo.videoName}}</p>
                             <p>第{{item.episode}}集</p>
                        </div>
                    </div>
                </el-checkbox-group>
            </div>
            <!-- 娱乐生活 -->
            <div v-if="tabsCard.num == 2">
                <el-checkbox-group v-model="checkList">
                    <div class="itemCard" v-for="(item,index) in showData" :key='index'>
                        <div class="card">
                            <img :src="'/realNet/file/'+item.videoInfo.horizontalImage" alt="">
                            <span>剩余{{item.remainingTime}}</span>
                            <div class="layer" v-show="isEdit">
                                <el-checkbox :label="item.id"></el-checkbox>
                            </div>
                        </div>
                          <div class="cardDes">
                         <p>{{ item.videoInfo.videoName}}</p>
                        <p>第{{item.episode}}集</p>
                    </div>
                    </div>
                </el-checkbox-group>
            </div>
            <!-- 全部 -->
            <div v-if="tabsCard.num == 3">
                <el-checkbox-group v-model="checkList">
                    <div class="itemCard" v-for="(item,index) in showData" :key='index'>
                        <div class="card">
                            <img :src="'/realNet/file/'+item.videoInfo.horizontalImage" alt="">
                            <span>剩余{{item.remainingTime}}</span>
                            <div class="layer" v-show="isEdit">
                                <el-checkbox :label="item.id"></el-checkbox>
                            </div>
                        </div>
                        <div class="cardDes">
                            <p v-if="item.videoInfo">{{ item.videoInfo.videoName }}</p>
                             <p>第{{item.episode}}集</p>
                        </div>
                    </div>
                </el-checkbox-group>
            </div>
            <div v-show="isShowNoContent">
                <p style="text-align:center;">无观看记录</p>
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
                tabsCard: {
                    tabs: ['电影','电视剧','娱乐生活','全部'],
                    num: 0
                },
                isEdit: false, // 是否编辑
                isShowNoContent: false,  // 是否展示无内容提示
                checkList: [], // 选择数组
                showData: [], // 电影展示数据
                showData1: [], // 电视剧
                showData2: [],  // 娱乐生活
                showData3: [],  // 全部
            }
        },
        props: {
            status: {
                type: Boolean,
                default: false
            },
            isClose: {
                type: Function,
                default: function() {
                    console.log('我是弹框关闭后打印的')
                }
            }
        },
        methods: {
            tab(index) {
                this.tabsCard.num = index;
            },
            changeEditStatus() {
                this.isEdit = true;
            },
            cancelEdit(status) {
                if(status) {
                    // 选中删除的卡片
                    console.log(this.checkList)
                    //
                    this.delCollect();
                }
                this.isEdit = false;
                this.checkList = [];
            },
            delCollect(){
                let params = {
                    token: getToken()
                };
                let data = {
                    "historyIds": "1"   // 观看历史的类型
                };
                axios({
                    method: 'delete',
                    url: '/realNet/history/delete',
                    headers: params,
                    data:data
                })
                .then((res) =>{
                    //删除成功
                    debugger;
                    this.isClose();
                    this.$message({
                          showClose: true,
                          message: '删除成功',
                          type: 'success',
                          duration: 1000
                     });
                     //刷新页面
                     
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            //观看历史
            collectFn(obj){
                let params = {
                    token: getToken()
                };
                let data = {
                    type: 1,
                    "videoInfo.categoryId": obj.type,   // 观看历史的类型
                };
                axios({
                    method: 'get',
                    url: '/realNet/history/getHistories',
                    headers: params,
                    data:data
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
           // 电影 
            let obj = {
                type: 2,
                fn: (res) => {
                    this.showData = res;
                }
            }
           this.collectFn(obj); 
           let obj1 = {
                type: 3,
                fn: (res) => {
                    this.showData = res;
                }
            }
           this.collectFn(obj1); 
           let obj2 = {
                type: 5,
                fn: (res) => {
                    this.showData = res;
                }
            }
           this.collectFn(obj2); 
           let obj3 = {
                type: '',
                fn: (res) => {
                    this.showData = res;
                }
            }
           this.collectFn(obj3); 
        }
    }
</script>

<style lang='scss' scoped>
    .watch {
        width: 930px;

        .watch_head {
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
            .barSty {
                font-size: 14px;
                color: #2CB5C5;
                cursor: pointer;
            }

        }

        .main {
            width: 100%;

            div {
                width: 100%;

                .itemCard {
                    width: 290px;
                    height: 190px;
                    margin: 0 18px 40px 0;

                    display: inline-block;

                    .card {
                        width: 290px;
                        height: 165px;
                        margin-bottom: 10px;

                        background-color: #ccc;
                        position: relative;

                        span {
                            width: 84px;
                            height: 24px;

                            position: absolute;
                            right: 10px;
                            bottom: 10px;
                            
                            font-size: 14px;
                            color: #fff;
                            background-color: rgba(#000,.65);
                            border-radius: 12px;
                            text-align: center;
                            line-height: 24px;
                        }
                        .layer {
                            position: absolute;
                            left: 0;
                            top: 0;
                            z-index: 10;

                            width: 100%;
                            height: 100%;
                            background-color: rgba(#000,.3);
                        }
                    }
                     .card img{
                         width: 290px;
                        height: 165px;
                    }

                    .cardDes {
                        display: flex;

                        p {
                            margin-right: 8px;
                        }
                    }
                }
            }
        }
    }
</style>
