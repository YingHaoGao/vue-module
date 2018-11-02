<template>
    <el-menu :default-active="activeIndex" class="main-header" mode="horizontal" @select="handleSelect" background-color="#181c25" text-color="#fff" active-text-color="#3bc0d0">
        <el-menu-item index="/">
            <img src="../../assets/images/header/logo.png" alt="">
        </el-menu-item>
        <el-menu-item index="/home">
            <img class="el-icon-location" src="../../assets/images/header/nav-1.png" alt="">
            <span>首页</span>
        </el-menu-item>
        <el-submenu index="/nav">
            <template slot="title"> 
                <img class="el-icon-location" src="../../assets/images/header/nav-2.png" alt="">
                <span>导航</span>
            </template>
            <el-menu-item v-for="(navItem, i) in navList" :key="i" :index="navItem.title">{{navItem.title}}</el-menu-item>
        </el-submenu>
        <search-com></search-com>
        <el-menu-item index="/about" class="header-right">
            <img class="el-icon-location" src="../../assets/images/header/nav-5.png" alt="">
            <br />
            <span class="header-right-text">瑞网青年计划</span>
        </el-menu-item>
        <el-menu-item index="/rmhd" class="header-right">
            <img class="el-icon-location" src="../../assets/images/header/nav-4.png" alt="">
            <br />
            <span class="header-right-text">RMHD专区</span>
        </el-menu-item>
        <el-menu-item index="/login" class="header-right">
            <img class="el-icon-location" src="../../assets/images/header/nav-3.png" alt="">
            <br />
            <span class="header-right-text">{{$store.state.name ? $store.state.name : "登录/注册"}}</span>
        </el-menu-item>
        <loginToast :status="loginStatus" :isClose="changeStatus"></loginToast>
        <RegisteredToast :state="registeredState" :isClose="closeRegisterFn"></RegisteredToast>
        <forgetPwd :state="fargetState" :isClose="forgetFn"></forgetPwd>
    </el-menu>
</template>

<script>
    import SearchCom from "@/components/zhangqi/SearchCom.vue"
    import loginToast from "@/views/Toast/loginToast.vue"
    import RegisteredToast from "../../views/Toast/registeredToast"
    import forgetPwd from "../../views/Toast/forgetPwd"
    import { getUser,removeUser, removeToken } from "../../utils/auth"
    import BUS from "../../utils/eventBus"
    export default {
        name: "MainHeader",
        components: {
            SearchCom,
            loginToast,
            RegisteredToast,
            forgetPwd
        },
        props: {
            msg: String
        },
        data() {
            var that = this;
            this.$axios({
                url: "/realNet/pageManager/getPageManagers",
                method: "get",
                headers: {
                    "token": "123456789"
                },
            }).then(function(resp) {
                if (resp.data.result && resp.data.result.content) {
                    var rmhdItem = null;
                    resp.data.result.content.map(function(item) {
                        
                        if (item.title) {
                            switch(item.title) {
                                case "RMHD下载":
                                rmhdItem = item;
                                case "首页":
                                case "搜索":
                                break;

                                default:
                                that.navPath[item.title] = item.url
                                that.navList.push(item)
                            }
                        }
                    });
                    that.navPath[rmhdItem.title] = rmhdItem.url
                    that.navList.push(rmhdItem)
                }
            })
            return {
                activeIndex: "1",
                loginStatus: false,
                registeredState: false,
                fargetState: false,
                name: "",
                navList: [],
                navPath: {}
            }
        },
        computed: {},
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                switch(key) {
                    case "/login":
                    if( getUser() )
                        this.$router.push("/mine");
                    else
                        this.loginStatus = true;
                    break;

                    case "/":
                    case "/home":
                    this.$router.push("/");
                    // 若监听跳转到此路由，清除用户信息
                    if( getUser() != null ) {
                        let obj = JSON.parse( getUser() );
                        this.$store.state.name = obj.name;
                    }
                    break;

                    case "RMHD下载":
                    case "/rmhd":
                    if( getUser() )
                        window.location.href = "/special-page?pageTitle=RMHD下载&detailPage=DownloadDetailPage";
                    else
                        this.loginStatus = true;
                    break;

                    case "/about":
                    window.location.href = "http://2018.today365.com.cn";
                    break;

                    default:
                    if (this.navList.length > 0)
                        window.location.href = this.navPath[key];
                }
            },
            loginBtnFn() {
                this.loginStatus = true;
            },
            changeStatus(val) {
                this.loginStatus = false;
                if (val == 1)
                    this.registeredState = true
                else if (val == 2)
                    this.fargetState = true;
            },
            closeRegisterFn(val) {
                this.registeredState = false;
                if(val)
                    this.loginStatus = true;
            },
            forgetFn() {
                this.fargetState = false;
            }
        },
        mounted() {
            if(getUser() != null) {
               let obj = JSON.parse(getUser());
               this.$store.state.name = obj.name;
            }
            BUS.$on("getUser",(data) => {
                this.name = data.name;
            })
            // removeUser();
            // removeToken();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .main-header {
        .header-right {
            float: right !important;
            margin-top: -50px !important;
            line-height: 20px !important;
            text-align: center;
            .header-right-text {
                font-size: 12px;
            }
            img {
                display: inline-block;
                margin-top: 8px;
                margin-bottom: 4px;
                margin-right: 0;
            }
        }
    }
    .el-menu--horizontal {
        .el-menu {
            width: 300px;
            background-color: rgba(0, 0, 0, 0.8) !important;
            padding: 0;
            box-shadow: none;
            .el-menu-item {
                display: inline-block;
                background-color: rgba(0, 0, 0, 0) !important;
            }
        }
    }
</style>
