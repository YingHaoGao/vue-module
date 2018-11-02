<template>
    <div class="toast">
        <!-- 对话框 -->
        <el-dialog :visible.sync="status" @close='changeStatus'>
            <div slot="title" class="jumFpeedback_head">
                <img src="../../assets/images/login/logo.png" alt="">
                <b></b>
                <span>修改密码</span>
            </div>
            <div class="jumpFeedback_body">
                <div class="inputSty">
                    <img src="../../assets/images/login/pwd.png" alt="">
                    <input type="password" v-model="login.oldPwd" placeholder="请输入原密码">
                    <img src="../../assets/images/login/del.png" alt="" v-show="userFocusStatus.delIsShow" @click="delBtn(true)">
                </div>
                <div class="inputSty">
                    <img src="../../assets/images/login/pwd.png" alt="">
                    <input type="password" v-model="login.pwd" placeholder="请输入新密码">
                    <img src="../../assets/images/login/del.png" alt=""  v-show="pwdFocusStatus.delIsShow" @click="delBtn(false)">
                </div>
                <div class="inputSty">
                    <img src="../../assets/images/login/pwd.png" alt="">
                    <input type="password" v-model="login.ConfirmPwd" placeholder="请再次输入新密码">
                    <img src="../../assets/images/login/del.png" alt=""  v-show="pwdFocusStatus.delIsShow" @click="delBtn(false)">
                </div>
                <div class="loginBtn" @click="writeFn">
                    <span>立即修改</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import RegisteredToast from './registeredToast'
    import axios from 'axios';
    import { getToken, setToken, setUser } from '../../utils/auth.js'
    import BUS from '../../utils/eventBus'

    export default {
        data() {
            return {
                login: {
                    oldPwd: '',
                    pwd: '',
                    ConfirmPwd: ''
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
               this.isClose();
            },
            dialogFormVisibleFn(status) {
                this.dialogFormVisible = false;
            },
            // 修改密码
            writeFn() {
                if(this.login.oldPwd && this.login.pwd && this.login.pwd == this.login.ConfirmPwd) {
                    axios({
                        method: 'PUT',
                        url: '/realNet/customer/updatePassword',
                        headers: {token: getToken()},
                        data: {"oldPassword":this.login.oldPwd,"password":this.login.pwd}
                    }).then((res) =>{
                      console.log(res)
                        if (res.data.result == null){
                          this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'warning',
                            duration: 1000
                          });
                        } else {
                          this.$message({
                            showClose: true,
                            message: "密码修改成功！",
                            type: 'success',
                            duration: 1000
                          })
                          this.login.pwd = '';
                          this.login.oldPwd = '';
                          this.login.ConfirmPwd = '';
                          this.isClose();
                        }
                        //obj.fn(res.data.result);
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else if(!this.login.oldPwd) {
                    this.$message({
                            showClose: true,
                            message: '请先输入原密码',
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
                } else if(this.login.pwd != this.login.ConfirmPwd) {
                    this.$message({
                        showClose: true,
                        message: '两次密码不一致',
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
