<template >
    <!-- 个人中心页面 -->
    <div class="mine">
        <div class="bannerWrap">
            <div class="userInfo">
                <div class="iconWrap">
                    <img style="width:70px;height:70px;border-radius: 50%;" :src="$store.state.avatar">
                    <!--<img class="iconImg" src="../../assets/images/mine/vip.png" alt="">-->
                </div>
                <h5>{{ $store.state.name }}</h5>
                <!--<p v-if="remainingTime">超级VIP会员 {{remainingTime|}}</p>-->
                <!--<p v-if="!remainingTime">普通用户</p>-->
                <!--<div v-if="remainingTime" class="user_btn" @click="payFn">-->
                    <!--<span>立即续费</span>-->
                <!--</div>-->
                <!--<div v-if="!remainingTime" class="user_btn" @click="payFn">-->
                    <!--<span>立即充值</span>-->
                <!--</div>-->
                <div  class="quitSty">
                    <img src="../../assets/images/mine/quit.png" alt="">
                    <span @click="quitLogin">退出</span>
                </div>
            </div>
            <img src="../../assets/images/mine/banner_bg.png" alt="">
        </div>
        <div class="baseMain baseWrap">
            <ul class="asideMenu">
                <li v-for="(item,index) in asideMenu.tabs" :key="index" :class="index == asideMenu.num ? 'tabActive': ''" @click="tab(index)">
                    <img :src="index == asideMenu.num ? asideMenu.imgs[index].active : asideMenu.imgs[index].src" alt="">
                    <span>{{ item }}</span>
                </li>
            </ul>
            <div>
                <div v-if="asideMenu.num == 0">
                    <PersonalSettings></PersonalSettings>
                </div>
                <!--<div v-if="asideMenu.num == 1">-->
                    <!--<VipManagement></VipManagement>-->
                <!--</div>-->
                <!--<div v-if="asideMenu.num == 2">-->
                    <!--<OrderManagement></OrderManagement>-->
                <!--</div>-->
                <div v-if="asideMenu.num == 1">
                    <MyMessage></MyMessage>
                </div>
                <!--<div v-if="asideMenu.num == 4">-->
                    <!--<WatchHistory></WatchHistory>-->
                <!--</div>-->
                <!--<div v-if="asideMenu.num == 5">-->
                    <!--<CollectHistory></CollectHistory>-->
                <!--</div>-->
                <div v-if="asideMenu.num == 2">
                    <UploadHistory></UploadHistory>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PersonalSettings from './PersonalSettings/index'
    import VipManagement from './VipManagement/index'
    import OrderManagement from './OrderManagement/index'
    import MyMessage from './MyMessage/index'
    import WatchHistory from './WatchHistory/index'
    import CollectHistory from './CollectHistory/index'
    import UploadHistory from './UploadHistory/index'
    import axios from 'axios';
    import { getToken, setToken, setUser,getUser,removeToken,removeUser} from '../../utils/auth.js'
    import BUS from '../../utils/eventBus'


    export default {
        data() {
            return {
               asideMenu: {
                   tabs: [
                     '个人设置',
                     // 'VIP管理',
                     // '订单管理',
                     '我的消息',
                     // '观看历史',
                     // '收藏历史',
                     '下载历史'
                   ],
                   num: 0,
                   imgs: [
                       {
                           src: require('../../assets/images/mine/mine_0.png'),
                           active: require('../../assets/images/mine/mine_0_active.png')
                       },
                       {
                           src: require('../../assets/images/mine/mine_1.png'),
                           active: require('../../assets/images/mine/mine_1_active.png')
                       },
                       {
                           src: require('../../assets/images/mine/mine_2.png'),
                           active: require('../../assets/images/mine/mine_2_active.png')
                       },
                       {
                           src: require('../../assets/images/mine/mine_3.png'),
                           active: require('../../assets/images/mine/mine_3_active.png')
                       },
                       {
                           src: require('../../assets/images/mine/mine_4.png'),
                           active: require('../../assets/images/mine/mine_4_active.png')
                       },
                       {
                           src: require('../../assets/images/mine/mine_5.png'),
                           active: require('../../assets/images/mine/mine_5_active.png')
                       },
                       {
                           src: require('../../assets/images/mine/mine_6.png'),
                           active: require('../../assets/images/mine/mine_6_active.png')
                       },
                   ]
               },
               name: '',
               avatar:'',
               memberExpireTime:'',
               remainingTime:''
            }
        },
        
        methods: {
            tab(index) {
                this.asideMenu.num = index;
            },
            // 点击立即续费
            payFn() {
                this.asideMenu.num = 1;
            },
            // 刷新token
            refreshTokenFn() {
                let params = {
                    token: getToken()
                };
                axios({
                    method: 'get',
                    url: '/realNet/customer/refreshToken',
                    headers: params
                })
                .then((res) =>{
                    let obj = res.data.result;
                    setToken(obj.token);
                    setUser(JSON.stringify(obj.user));
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            // 退出相关逻辑
            quitLogin() {
                removeToken();
                removeUser();
                this.$store.state.name = null
                this.$router.push('/');
            }
        },
        components: {
            PersonalSettings,
            VipManagement,
            OrderManagement,
            MyMessage,
            WatchHistory,
            CollectHistory,
            UploadHistory
        },
        mounted() {
            this.refreshTokenFn();   // 页面刷新token
            let userObj = JSON.parse(getUser());
            console.log(userObj)
            this.$store.state.name = userObj.name;
            this.avatar = "/realNet/file/"+userObj.avatar;
            this.$store.state.avatar = this.avatar
            this.memberExpireTime = userObj.memberExpireTime;
            this.remainingTime = userObj.remainingTime;
            BUS.$on('drup', () => {
                this.payFn();
            });
        }
    }
</script>

<style lang='scss' scoped>
    .mine {
        width: 100%;
    }
    // banner区域样式
    .bannerWrap {
        width: 100%;
        height: 240px;

        position: relative;
        z-index: 2;

        & > img {
            width: 100%;
            height: 240px;
            
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
        }
        .userInfo {
            width: 860px;
            height: 100%;
            padding: 20px 0;
            margin: 0 auto;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;

            color: #fff;
            position: relative;
            font-size: 14px;
            z-index: 2;
            box-sizing: border-box;

            .iconWrap {
                width: 70px;
                height: 70px;

                background-color: #D2E0E2;
                border-radius: 50%;
                position: relative;

                .iconImg {
                    width: 28px;
                    height: 21px;

                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
            }
            h5 {
                font-size: 18px;
            }
            .user_btn {
                width: 120px;
                height: 38px;

                background:linear-gradient(-90deg,rgba(249,194,107,0.7),rgba(255,226,158,0.7));
                border-radius:19px;
                cursor: pointer;

                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    color: #473824;
                    font-size: 16px;
                    font-weight: bold;
                }
            }
            .quitSty {
                width: 60px;
                height: 50px;

                display: flex;
                align-items: center;
                justify-content: space-between;

                position: absolute;
                right: 10px;
                top: 10px;

                cursor: pointer;
            }
        }
    }
    // 内容主体样式
    .baseMain {
        padding: 20px 0;

        background-color: #fff;

        display: flex;
    }
    .asideMenu {
        width: 230px;
        height: 340px;
        padding: 25px 0;
        margin-right: 30px;

        background-color: #F3F7F8;
        list-style: none;
        box-sizing: border-box;

        li {
            width: 100%;
            height: 40px;
            padding: 0 60px;

            display: flex;
            align-items: center;

            box-sizing: border-box;
            font-size: 14px;
            color: #000;
            cursor: pointer;
            
            img {
                margin-right: 16px;
            }
        }
        .tabActive {
            background: #3BC0D0;
            color: #fff;
        }
    }
</style>
