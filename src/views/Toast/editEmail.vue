<template>
    <div class="toast">
        <!-- 对话框 -->
        <el-dialog :visible.sync="state" @close="closeFn">
            <div slot="title" class="jumFpeedback_head">
                <img src="../../assets/images/login/logo.png" alt="">
                <b></b>
                <span>更改邮箱</span>
            </div>
            <div style="width: 70%; margin: 0 auto;padding-top: 30px;">
                <el-steps :active="active" finish-status="success">
                    <el-step title="验证"></el-step>
                    <el-step title="修改"></el-step>
                </el-steps>
            </div>
            <div class="jumpFeedback_body" v-if="(active == 1)">
                <div class="user">
                    <input type="text" v-model="phoneEmail"  placeholder="在此输入原邮箱">
                    <img src="../../assets/images/login/del.png"  v-show="" alt="">
                </div>
                <div class="code">
                    <el-input v-model="fCode" placeholder="请输入验证码"></el-input>
                    <el-button type="primary" @click="getCode(phoneEmail)">{{(isClickBtn? '重新发送'+time+'s' : '获取验证码')}}</el-button>
                </div>
                <div class="loginBtn active">
                    <span @click="nextStep">下一步</span>
                </div>
            </div>
            <div v-else class="jumpFeedback_body">
                <div class="user">
                    <input type="text" v-model="newEmail"  placeholder="在此输入新邮箱">
                    <img src="../../assets/images/login/del.png"  v-show="" alt="">
                </div>
                <div class="code">
                    <el-input v-model="code" placeholder="请输入验证码"></el-input>
                    <el-button type="primary" @click="getCode(newEmail)">{{(isClickBtn? '重新发送'+time+'s' : '获取验证码')}}</el-button>
                </div>
                <div class="loginBtn active">
                    <span @click="editSure">确认更改</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import { getToken, setUser } from "../../utils/auth";

export default {
  name: 'editEmail',
  data () {
    return {
      phoneEmail: '',
      fCode: '',
      newEmail: '',
      code: '',
      active: 1,
      time: 59,
      isClickBtn: false,
    }
  },
  props: {
    state: {
      type: Boolean,
      default: false
    },
    pevalue: {
      type: String,
      default: ''
    }
  },
  methods: {
    nextStep() {
      var that = this
      if (this.phoneEmail && this.fCode ) {
        let headers = {
          token: getToken()
        }
        let params = {
          phoneNumOrEmail: this.phoneEmail,
          firstCode: this.fCode,
          step: 0
        }
        axios({
          method: 'put',
          url: '/realNet/customer/updateEmail',
          headers: headers,
          data: params
        }).then(function (res) {
          var resObj = res.data
          if (resObj.code === 200){
            that.$message({
              showClose: true,
              message: '验证通过',
              type: 'success',
              duration: 1000
            })
            that.active = 2
            that.time = 59
            that.isClickBtn = false
          } else {
            that.$message({
              showClose: true,
              message: resObj.message,
              type: 'warning',
              duration: 2000
            })
          }
        }).catch(function (e) {
          console.log(e)
        })
      } else if (!this.phoneEmail) {
        this.$message({
          showClose:true,
          message: '请先输入邮箱',
          type: 'warning',
          duration: 1000
        })
      } else if (!this.fCode) {
        this.$message({
          showClose: true,
          message: '请先输入验证码',
          type: 'warning',
          duration: 1000
        })
      }
    },
    getCode (email) {
      console.log(email)
      if (!this.isClickBtn){
        this.isClickBtn = true
        if ( /^[A-Za-z0-9_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email) ) {
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
            message: '邮箱格式错误',
            type: 'warning',
            duration: 1000
          })
        }
      }
    },
    editSure() {
      if (this.fCode && this.code && this.phoneEmail && this.newEmail ){
        var that = this
        let headers = {
          token: getToken()
        }
        let params = {
          phoneNumOrEmail: this.phoneEmail,
          firstCode: this.fCode,
          email: this.newEmail,
          code: this.code
        }
        axios({
          url: '/realNet/customer/updateEmail',
          method: 'put',
          headers: headers,
          data: params
        }).then(function (res) {
          var resObj    =   res.data
          if (resObj.code === 200){
            that.$message({
              showClose: true,
              message: '更改邮箱成功',
              type: 'success',
              duration: 1000
            })
            setUser(JSON.stringify(resObj.result))
            that.closeFn(that.newEmail)
          } else {
            that.$message({
              showClose: true,
              message: resObj.message,
              type: 'warning',
              duration: 1000
            })
          }
        })
      } else {
        if (!this.code){
          this.$message({
            showClose: true,
            message: '请输入验证码',
            type: 'warning',
            duration: 1000
          })
        } else if (!this.newEmail){
          this.$message({
            showClose: true,
            message: '请输入邮箱',
            type: 'warning',
            duration: 1000
          })
        }
      }
    },
    closeFn(mail) {
      if (mail){
        this.$emit("closeState",mail)
      } else {
        this.$emit("closeState")
      }

      console.log('ddddd')
    }
  },
  mounted () {
    console.log(this.pevalue)
    this.phoneEmail = this.pevalue
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