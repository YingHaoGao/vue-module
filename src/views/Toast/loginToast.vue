<template>
    <div class="toast">
        <!-- 对话框 -->
        <el-dialog :visible.sync="status" @close='changeStatus'>
            <div slot="title" class="jumFpeedback_head">
                <img src="../../assets/images/login/logo.png" alt="">
                <b></b>
                <span>登录</span>
            </div>
            <div class="jumpFeedback_body">
                <div :class="userFocusStatus.styleStatus ? 'inputSty active' : 'inputSty'">
                    <img src="../../assets/images/login/phone.png" alt="">
                    <input type="text" v-model="login.phone" @focus="focusFn(true)" @input="changeFn(true)" @blur="blurFn(true)" placeholder="在此输入手机号/邮箱">
                    <img src="../../assets/images/login/del.png" alt="" v-show="userFocusStatus.delIsShow" @click="delBtn(true)"> 
                </div>
                <div :class="pwdFocusStatus.styleStatus ? 'inputSty active' : 'inputSty'">
                    <img src="../../assets/images/login/pwd.png" alt="">
                    <input type="password" v-model="login.pwd" @focus="focusFn(false)" @input="changeFn(false)" @blur="blurFn(false)" placeholder="在此输入密码">
                    <img src="../../assets/images/login/del.png" alt=""  v-show="pwdFocusStatus.delIsShow" @click="delBtn(false)">
                </div>
                <div class="loginBtn" @click="loginFn">
                    <span>登录</span>
                </div>
                <div class="quickTips">
                    <span @click="registFn">快速注册</span>
                    <span @click="forgetFn">忘记密码</span>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <span>其他登录方式：</span>
                <div class="elseLogin">
                    <img src="../../assets/images/login/wx.png" alt="">
                    <img src="../../assets/images/login/QQ.png" alt="">
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import RegisteredToast from './registeredToast'
    import axios from 'axios';
    import { setToken, setUser } from '../../utils/auth.js'
    import BUS from '../../utils/eventBus'

    export default {
        data() {
            return {
                login: {
                    phone: '',
                    pwd: ''
                },
                userFocusStatus: {
                    styleStatus: false,
                    delIsShow: false
                },
                pwdFocusStatus: {
                    styleStatus: false,
                    delIsShow: false
                },
                isShowRegi: false,
                isForget: false,
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
            registFn() {
                this.status = false;
                this.isShowRegi = true;
            },
            forgetFn() {
                this.status = false;
                this.isForget = true;
            },
            changeStatus() {
                if(this.isShowRegi) {
                    this.isClose(1); // 头部用
                    this.isShowRegi = false;
                    return;
                }
                if(this.isForget) {
                    this.isClose(2);
                    this.isForget = false;
                    return;
                }
                this.isClose(0); // 头部用
                
            },
            dialogFormVisibleFn(status) {
                this.dialogFormVisible = false;
            },
            focusFn(status) {
                if(status) {
                    this.userFocusStatus.styleStatus = true;
                } else {
                    this.pwdFocusStatus.styleStatus = true;
                }
            },
            blurFn(status) {
                if(status) {
                    this.userFocusStatus.styleStatus = false;
                    this.userFocusStatus.delIsShow = false;
                    if(this.login.phone) {
                        this.userFocusStatus.delIsShow = true;
                    }
                } else {
                    this.pwdFocusStatus.styleStatus = false;
                    this.pwdFocusStatus.delIsShow = false;
                    if(this.login.pwd) {
                        this.pwdFocusStatus.delIsShow = true;
                    }
                }
            },
            changeFn(status) {
                if(status) {
                    if(this.login.phone) {
                        this.userFocusStatus.delIsShow = true;
                    } else {
                        this.userFocusStatus.delIsShow = false;
                    }
                } else {
                    if(this.login.pwd) {
                        this.pwdFocusStatus.delIsShow = true;
                    } else {
                        this.pwdFocusStatus.delIsShow = false;
                    }
                }
            },
            delBtn(status) {
                if(status) {
                    this.login.phone = '';
                    this.userFocusStatus.delIsShow = false;
                } else {
                    this.login.pwd = '';
                    this.pwdFocusStatus.delIsShow = false;
                }
            },
            // 登录
            loginFn() {
                if(this.login.phone && this.login.pwd) {
                    let params = {
                        loginName: this.login.phone,
                        password: this.login.pwd
                    };
                    axios({
                        method: 'post',
                        url: '/realNet/customer/login',
                        data: params
                    })
                    .then((res) =>{
                        if(res.data.code == 200) {
                            this.isClose();
                            this.$message({
                                showClose: true,
                                message: '登录成功',
                                type: 'success',
                                duration: 1000
                            });
                            let obj = res.data.result;
                            setToken(obj.token);
                            setUser(JSON.stringify(obj.user));
                            this.$store.state.name = obj.user.name
                            BUS.$emit('getUser',obj.user);
                        }else{
                            //密码错误
                            this.isClose();
                            this.$message({
                                showClose: true,
                                message: res.data.message,
                                type: 'success',
                                duration: 1000
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                } else if(!this.login.phone) {
                    this.$message({
                            showClose: true,
                            message: '请先输入手机号或邮箱',
                            type: 'warning',
                            duration: 1000
                        });
                } else if(!this.login.pwd) {
                    this.$message({
                        showClose: true,
                        message: '请填写密码',
                        type: 'warning',
                        duration: 1000
                    });
                }
            }
        },
        components: {
            RegisteredToast
        }
    }
</script>

<style lang='scss' scoped>
    .jumFpeedback_head {
        display: flex;
        align-items: center;

        img {
            margin-top: 0;
        }
        b {
            width: 4px;
            height: 4px;
            margin: 0 10px;

            background-color: #3bc0d0;
            border-radius: 50%;
            display: inline-block;
        }
        span {
            font-size: 18px;
            color: #3bc0d0;
        }
    }
    .jumpFeedback_body {
        width: 100%;
        padding: 40px 61px 10px;

        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        align-items: center;

        .inputSty {
            width: 100%;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #e1e9eb;

            display: flex;
            align-items: center;

            input {
                width: 78%;
                height: 30px;
                border: none;
                margin-left: 25px;

                outline: none;
                font-size: 16px;

                &::-webkit-input-placeholder {
                    color: #ccc;
                }
                &::-moz-placeholder {
                    color: #ccc;
                }
                &::-ms-input-placeholder {
                    color: #ccc;
                }
            }
            img {
                cursor: pointer;
            }
        }

        .loginBtn {
            width: 360px;
            height: 50px;
            margin-top: 20px;

            background-color: #3bc0d0;
            border-radius: 8px;
            cursor: pointer;
            
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                font-size: 18px;
                color: #fff;
                letter-spacing: 1px;
            }
        }

        .quickTips {
            width: 50%;
            height: 30px;
            margin: 25px 0 10px;

            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                font-size: 16px;
                color: #3bc0d0;
                position: relative;
                cursor: pointer;

                &:nth-last-of-type(1)::before {
                    content: '';
                    width:1px;
                    height: 16px;
                    background-color: #ccc;
                    position: absolute;
                    left: -30px;
                    top: 4px;
                }
            }
        }
    }
    .dialog-footer {
        width: 100%;
        height: 60px;
        padding: 0 10px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        box-sizing: border-box;
        background-color: rgb(243, 247, 248);
        border-radius: 0 0 8px 8px;

        span {
            font-size: 14px;
            color: #666;
        }
        .elseLogin {
            width: 100px;

            display: flex;
            justify-content: space-around;
            align-items: center;

            img {
                cursor: pointer;
            }
        }
    }
    // 输入框激活样式
    .active {
        border-bottom: 1px solid #3bc0d0 !important;
    }
</style>