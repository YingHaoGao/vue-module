<template>
    <div class="toast">
        <!-- 对话框 -->
        <el-dialog :visible.sync="state" @close='changeStatus'>
            <div slot="title" class="jumFpeedback_head">
                <img src="../../assets/images/login/logo.png" alt="">
                <b></b>
                <span>忘记密码</span>
            </div>
            <div class="jumpFeedback_body">
                <div class="user">
                    <input type="text" v-model="phone" @focus="focusFn" @input="changeFn" @blur="blurFn" placeholder="在此输入手机号/邮箱">
                    <img src="../../assets/images/login/del.png"  v-show="status.delIsShow" @click="delBtn" alt="">
                </div>
                <div class="code">
                    <el-input v-model="code" placeholder="请输入验证码"></el-input>
                    <el-button type="primary" @click="btnTimeFn">{{isClickBtn ? `重新发送${time}s` : '获取验证码' }}</el-button>
                </div>
                <div class="inputSty">
                    <el-input type="password" v-model="password" placeholder="设置密码"></el-input>
                </div>
                <div class="inputSty">
                    <el-input type="password" v-model="confirmPassword" @blur="blurPwdFn" placeholder="再次输入密码"></el-input>
                </div>
                <div class='loginBtn active' @click="registerFn">
                    <span>登录</span>
                </div>
            </div>
            <!-- <div slot="footer" class="dialog-footer">
                <span></span>
                <div class="elseLogin">
                    <span @click="goLogin">立即登录</span>
                </div>
            </div> -->
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                phone: '',
                code: '',
                name: '',
                password: '',
                confirmPassword: '',
                isClickBtn: false,
                time: 59,
                status: {
                    styleStatus: false,
                    delIsShow: false
                },
                isHidden: false,
            }
        },
        methods: {
            changeStatus() {
                this.isClose(true);
            },
            dialogFormVisibleFn(status) {
                this.dialogFormVisible = false;
            },
            focusFn() {
                this.status.styleStatus = true;
            },
            blurFn() {
                this.status.styleStatus = false;
                this.status.delIsShow = false;
                if(this.phone) {
                    this.status.delIsShow = true;
                }
            },
            changeFn() {
                    if(this.phone) {
                        this.status.delIsShow = true;
                    } else {
                        this.status.delIsShow = false;
                    }
            },
            delBtn() {
                    this.phone = '';
                    this.status.delIsShow = false;
            },

            // 获取验证码
            btnTimeFn() {
                if(!this.isClickBtn) {
                    this.isClickBtn = true;

                    // 获取验证码
                    if(this.phone && /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.phone)) {
                        let interval = setInterval(() =>{
                            this.time = this.time - 1;
                            if(this.time == 0) {
                                clearInterval(interval);
                                this.time = 59;
                                this.isClickBtn = false;
                            }
                        },1000);

                        let params = {
                            phoneNumOrEmail: this.phone
                        };
                        axios({
                            method: 'post',
                            url: '/realNet/customer/sendSms',
                            data: params
                        })
                        .then(function (res) {
                            if(res.code == 200) {
                                 this.$message({
                                    showClose: true,
                                    message: '验证码已发送',
                                    type: 'success',
                                    duration: 1000
                                });
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        this.isClickBtn = false;
                        this.$message({
                            showClose: true,
                            message: '请先输入手机号或邮箱',
                            type: 'warning',
                            duration: 1000
                        });
                    }
                    
                }
            },
            // 确保两次密码一致
            blurPwdFn() {
                if(this.password != this.confirmPassword) {
                    this.$message({
                        showClose: true,
                        message: '请确保两次密码一致!',
                        type: 'warning',
                        duration: 1000
                    });
                }
            },
            // 忘记密码登录逻辑 TODO：
            registerFn() {
                if(this.phone && this.code && this.password) {
                    let params = {
                        code: this.code,
                        phoneNumOrEmail: this.phone,
                        password: this.password,
                        name: this.name
                    };
                    axios({
                        method: 'post',
                        url: '/realNet/customer/register',
                        data: params
                    })
                    .then((res) => {
                        if(res.data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: '恭喜你注册成功!',
                                type: 'success',
                                duration: 1000
                            });
                        }
                        this.state = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                } else if(!this.phone) {
                    this.$message({
                            showClose: true,
                            message: '请先输入手机号或邮箱',
                            type: 'warning',
                            duration: 1000
                        });
                } else if(!this.code) {
                    this.$message({
                            showClose: true,
                            message: '请先输入验证码',
                            type: 'warning',
                            duration: 1000
                        });
                }
            }
        },
        props: {
            state: {
                type: Boolean,
                default: false
            },
            isClose: {
                type: Function,
                default: function () {
                    console.log('sd')
                }
            }
        },
    }
</script>

<style lang='scss' scoped>
    .jumFpeedback_head {
        display: flex;
        align-items: center;

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

        .user {
            width: 100%;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #e1e9eb;

            display: flex;
            align-items: center;

            input {
                width: 90%;
                height: 30px;
                border: none;

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
        }

        .code {
            width: 100%;

            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .agreement {
            margin: 20px 0;
        }
        .inputSty {
            width: 100%;

            margin: 10px 0;
        }

        .loginBtn {
            width: 360px;
            height: 50px;
            margin-top: 20px;

            background-color: rgb(221,225,226);
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
        & > .active {
            background-color: #409EFF;
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
            width: 45%;

            display: flex;
            justify-content: space-around;
            align-items: center;

            cursor: pointer;

            // span {
            //     position: relative;
                
            //     &:nth-last-of-type(1)::before {
            //         content: '';
            //         width: 1px;
            //         height: 10px;
            //         background-color: #ccc;
            //         position: absolute;
            //         left: -20px;
            //         top: 5px;
            //     }
            // }
        }
    }
</style>