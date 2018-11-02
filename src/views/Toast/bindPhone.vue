<template>
    <div class="toast">
        <!-- 对话框 -->
        <el-dialog :visible.sync="state" @close="closeFn">

            <div slot="title" class="jumFpeedback_head">
                <img src="../../assets/images/login/logo.png" alt="">
                <b></b>
                <span>绑定手机号</span>
            </div>
            <div class="jumpFeedback_body">
                <div class="user">
                    <input type="text" v-model="phoneNum"  placeholder="在此输入手机号">
                    <img src="../../assets/images/login/del.png"  v-show="" alt="">
                </div>
                <div class="code">
                    <el-input v-model="code" placeholder="请输入验证码"></el-input>
                    <el-button type="primary" @click="getCode(phoneNum)">{{(isClickBtn? '重新发送'+time+'s' : '获取验证码')}}</el-button>
                </div>
                <div class="loginBtn active">
                    <span @click="editSure">确认</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import axios from 'axios'
  import { getToken, setUser } from "../../utils/auth";
  export default {
    name: "bindPhone",
    data() {
      return {
        phoneNum: '',
        code: '',
        time: 59,
        isClickBtn: false
      }
    },
    props: {
      state: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getCode (email) {
        console.log(email)
        if (!this.isClickBtn){
          this.isClickBtn = true
          if ( /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(email) ) {
            let interval = setInterval(() =>{
              this.time = this.time - 1;
              if(this.time == 0) {
                clearInterval(interval);
                this.time = 59;
                this.isClickBtn = false;
              }
            },1000);
            var that = this
            let headers = {
              token: getToken()
            }
            let data = {
              phoneNumOrEmail: email
            }
            axios({
              method: 'post',
              url: '/realNet/customer/sendSms',
              headers: headers,
              data: data
            }).then(function (res) {
              console.log(res)
              var resObj = res.data
              if (resObj.code === 200) {
                that.$message({
                  showClose: true,
                  message: '验证码已发送',
                  type: 'success',
                  duration: 1000
                })
              } else {
                that.$message({
                  showClose: true,
                  message: resObj.message,
                  type: 'warning',
                  duration: 1000
                })
              }
            }).catch(function (e) {
              console.log(e)
            })
          }else{
            this.isClickBtn = false
            this.$message({
              showClose: true,
              message: '手机格式错误',
              type: 'warning',
              duration: 1000
            })
          }
        }
      },
      closeFn() {
        this.$emit("closeState")
        console.log('ddddd')
      },
      editSure() {
        if (this.code && this.phoneNum) {
          var that = this
          let headers = {
            token: getToken()
          }
          let params = {
            phoneNum: this.phoneNum,
            code: this.code
          }
          axios({
            headers: headers,
            method: 'put',
            url: '/realNet/customer/bindingPhoneNum',
            data: params
          }).then(function (res) {
            var resObj = res.data
            if (resObj.code === 200){
              that.$message({
                showClose: true,
                message: '绑定手机号成功',
                type: 'success',
                duration: 1000
              })
              setUser(JSON.stringify(resObj.result))
              that.closeFn()
            }else {
              that.$message({
                showClose: true,
                message: resObj.message,
                type: 'success',
                duration: 1000
              })
            }
          })
        }else{
          if (!this.code){
            this.$message({
              showClose: true,
              message: '请输入验证码',
              type: 'warning',
              duration: 1000
            })
          } else if (!this.phoneNum){
            this.$message({
              showClose: true,
              message: '请输入手机号',
              type: 'warning',
              duration: 1000
            })
          }
        }
      }
    }
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
        padding: 20px 61px 40px 61px;
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