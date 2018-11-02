<template>
    <div class="aside_1">
        <div class="baseSetting">
            <h4>基本设置</h4>
            <div class="baseInfo">
                <div class="baseInfo_top">
                    <div class="userIcon">
                        <img style="width:70px;height:70px;border-radius: 50%;" :src="$store.state.avatar">
                    </div>
                    <div class="userDes">
                        <p>
                            昵称：
                            <input type="text" v-model="userObj.name" ref="inputs" @blur="settingBtn(4)" class="inputSty">
                            <img src="../../../assets/images/mine/nickRename.png" style="margin-left:5px;cursor:pointer;" alt="" @click="writeNickName">
                        </p>
                        <!-- <p>
                            会员类型：
                            <img src="../../../assets/images/mine/vip.png" alt="">
                            <span>超级VIP会员</span>
                            <span @click="payFn">立即续费</span>
                        </p> -->
                    </div>
                </div>
                <form id="upload" enctype="multipart/form-data" method="post">
					<el-upload
					class="upload-demo"
					action="/realNet/customer/updateCustomerAvatar"
                    name="avatar"
                    :headers="headers"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
                    :on-success="handleSucc"
                    :on-error="handleError"
					list-type="picture">
					<el-button size="small" type="primary">更改头像</el-button>
					<!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
					</el-upload>
				</form>
            </div>
        </div>
        <div class="securitySetting">
            <h4>安全设置</h4>
            <div class="securityWrap">
                <div class="securityItem">
                    <div class="securityItemImg">
                        <img src="../../../assets/images/mine/mine_phone.png" alt="">
                    </div>
                    <div class="securityItem_right">
                        <p style="display:flex;justify-content: space-between;">
                            <span class="normalSty" v-if="phoneNum">手机已验证</span>
                            <span class="normalSty" v-else>手机未绑定</span>
                            <span class="activeSty" style="cursor:pointer;" @click="(phoneNum ? changePhoneFn() : bindPhoneFn())">绑定/修改手机号</span>
                        </p>
                        <p class="pSty">
                            <span style="font-size:18px;color:#000;font-weight:bold;" v-if="phoneNum">{{phoneNum}}</span>
                            <span v-else><i style="color:#CADCDC;font-size:16px;">暂无绑定手机号</i></span>
                            <!--<span class="activeSty" style="cursor:pointer;" @click="changePhoneFn">绑定/修改手机号</span>-->
                        </p>
                    </div>
                </div>
                <div class="securityItem">
                    <div class="securityItemImg">
                        <img src="../../../assets/images/mine/mine_email.png" alt="">
                    </div>
                    <div class="securityItem_right">
                        <p style="display:flex;justify-content: space-between;">
                            <span class="normalSty" v-if="email">邮箱已绑定</span>
                            <span class="normalSty" v-else>邮箱未绑定</span>
                            <span class="activeSty" style="cursor:pointer;" @click="(email ? changeEmailFn() : bindEmailFn())">绑定/修改邮箱</span>
                        </p>
                        <p>
                            <span style="font-size:18px;color:#000;font-weight:bold;" v-if="email">{{email}}</span>
                            <span v-else><i style="color:#CADCDC;font-size:16px;">暂无邮箱信息</i></span>
                        </p>
                    </div>
                </div>
                <div class="securityItem">
                    <div class="securityItemImg">
                        <img src="../../../assets/images/mine/mine_pwd.png" alt="">
                    </div>
                    <div class="securityItem_right">
                        <p>
                            <span class="activeSty" style="margin-right:35px;cursor:pointer;" @click="changePwdFn">修改密码</span>
                            <!-- <span class="activeSty">找回密码</span> -->
                        </p>
                        <p>
                            <span style="font-size:14px;color:#888888;">
                                可以通过手机号或邮箱完成操作
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="DIY">
            <h4>个性设置</h4>
            <div class="DIYWrap">
                <div class="diyItem">
                    <div class="diyItem_left">
                        生日：
                        <input type="text" v-model="userObj.birthday" placeholder="未设置" ref="birthday">
                    </div>
                    <span @click="settingBtn(0)">设置</span>
                </div>
                <div class="diyItem">
                    <div class="diyItem_left">
                        血型：
                        <input type="text" v-model="userObj.bloodGroup" placeholder="未设置" ref="bloodGroup">
                    </div>
                    <span @click="settingBtn(1)">设置</span>
                </div>
                <div class="diyItem">
                    <div class="diyItem_left">
                        年龄：
                        <input type="text" v-model="userObj.age" placeholder="未设置" ref="age">
                    </div>
                    <span @click="settingBtn(2)">设置</span>
                </div>
                <div class="diyItem">
                    <div class="diyItem_left">
                        性别：
                        <input type="text" v-model="userObj.sex" placeholder="未设置" ref="sex">
                    </div>
                    <span @click="settingBtn(3)">设置</span>
                </div>
            </div>
        </div>
        <writePwd :status='writeStatus' :isClose='closeToastFn'></writePwd>
        <edit-email :state="editEmailStatus" :pevalue="userObj.email" @closeState="closeState"></edit-email>
        <edit-phone :state="editPhone" :pevalue="userObj.phoneNum" @closeState="closePhoneState"></edit-phone>
        <bind-phone :state="bindPhone" @closeState="closeBindPhone"></bind-phone>
        <bind-email :state="bindEmail" @closeState="closeBindEmail"></bind-email>
    </div>
</template>

<script>
    import axios from 'axios';
    import { getToken, setToken, setUser ,getUser} from '../../../utils/auth.js'
    import BUS from '../../../utils/eventBus'
    import writePwd from '../../Toast/writePwd'
    import editEmail from '../../Toast/editEmail'
    import editPhone from '../../Toast/editPhone'
    import bindPhone from '../../Toast/bindPhone'
    import bindEmail from '../../Toast/bindEmail'
    export default {
        data() {
            return {
                userObj: {},
                phoneNum: '',
                email: '',
                avatar: '',
                writeStatus: false,
                editEmailStatus: false,
                editPhone: false,
                bindPhone: false,
                bindEmail: false,
                headers: {},
            }
        },
        methods: {
            payFn() {
                BUS.$emit('drup');
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handleSucc (response,file,filelist) {
              var that = this
              if (response.code === 200){
                that.avatar = "/realNet/file/" + response.result.avatar
                that.$store.state.avatar = that.avatar
                setUser(JSON.stringify(response.result))
              }
            },
            handleError (err,file,fileList) {
              console.log(err)
              console.log("error")
            },
            handlePreview(file) {
                console.log(file);
            },
            // 点击输入框状态变化
            writeNickName() {
                this.$refs.inputs.focus();
            },
            // 设置个人信息
            settingBtn(status) {
                var data = {
                    token: getToken()
                };
                var birthday = '';
                var bloodGroup ='';
                var age = '';
                var sex = '';
				var name = '';
                var params ;
                if(status == 0) {
                    // 执行设置生日相关逻辑
                   birthday = this.$refs.birthday.value;
                   params = {"birthday":birthday}; 
                } else if(status == 1) {
                    // 执行设置血型相关逻辑
                   bloodGroup = this.$refs.bloodGroup.value;
                   params = {"bloodGroup":bloodGroup}; 
                } else if(status == 2) {
                    // 年龄
                   age = this.$refs.age.value;
                   params = {"age":age}; 
                } else if(status == 3) {
                    //性别
                   sex = this.$refs.sex.value;
                   params = {"sex":sex}; 
                } else if(status == 4) {
                    //昵称
                   name = this.$refs.inputs.value;
                   params = {"name":name};
                   this.$store.state.name = name
                }
                debugger;
                axios({
                    method: 'PUT',
                    url: '/realNet/customer/updateCustomer',
                    headers: data,
                    data: params
                })
                .then((res) =>{
                    if (res.data.message == 'ok') {
						setUser(JSON.stringify(res.data.result));
						this.$message({
							showClose: true,
							message: "设置成功！",
							type: 'success',
							duration: 1000
						 })
					} else {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'warning',
							duration: 1000
						 })
					}
                })
                .catch(function (error) {
                    console.log(error);
                });  
            },
            closeToastFn() {
                console.log(11);
                // 关闭弹框
                this.writeStatus = false;
            },
            // 点击修改密码
            changePwdFn() {
                this.writeStatus = true;
            },
            // 修改邮箱
            changeEmailFn() {
              console.log(this.editEmailStatus)
                this.editEmailStatus = true
            },
            //修改手机号
            changePhoneFn() {
              this.editPhone = true
            },
            bindPhoneFn() {
              console.log("ASfd")
              this.bindPhone = true
            },
            bindEmailFn() {
              this.bindEmail = true
            },
            closeState() {
              this.userObj = JSON.parse(getUser())
              this.email = this.userObj.email
              this.editEmailStatus = false
            },
            closePhoneState() {
              this.userObj = JSON.parse(getUser())
              this.phoneNum = this.userObj.phoneNum
              this.editPhone = false
            },
            closeBindPhone() {
              this.userObj = JSON.parse(getUser())
              this.phoneNum = this.userObj.phoneNum
              this.bindPhone = false
            },
            closeBindEmail() {
              this.userObj = JSON.parse(getUser())
              this.email = this.userObj.email
              this.bindEmail = false
            }
        },
        components: {
            writePwd,
            editEmail,
            editPhone,
            bindPhone,
            bindEmail
        },
        mounted() {
            this.userObj = JSON.parse(getUser());
            this.phoneNum = this.userObj.phoneNum
            this.email = this.userObj.email
            let headers = {
              token : getToken()
            }
            this.headers = headers
            // debugger;
            this.avatar = "/realNet/file/"+this.userObj.avatar;
        }
    }
</script>

<style lang='scss' scoped>
    .aside_1 {
        width: 930px;
    }
    .baseSetting {
        margin-bottom: 35px;

        h4 {
            font-size: 14px;
            margin-bottom: 15px;
        }

        .baseInfo {
            width: 100%;
            height: 140px;
            padding: 16px;
            border: 1px solid rgba(234, 236, 237, 1);

            background-color: #F9F9F9;
            box-sizing: border-box;

            .baseInfo_top {
                width: 100%;
                height: 75px;
                margin-bottom: 8px;

                display: flex;
                align-items: center;

                .userIcon {
                    width: 70px;
                    height: 70px;
                    margin-right: 30px;

                    background-color: #D2E0E2;
                    border-radius: 50%;
                    overflow: hidden;
                }
                .userDes {
                    width: 50%;
                    height: 70px;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;

                    font-size: 14px;

                    p {
                        .inputSty {
                            width: 50px;
                            display: inline-block;
                            border: none;
                            font-size: 14px;
                            background-color: transparent;
                        }
                        &:nth-last-of-type(1) {
                            display: felx;
                            align-items: center;

                            img {
                                margin: 0 6px;
                            }
                            span {
                                &:nth-last-of-type(1) {
                                    width: 70px;
                                    height: 28px;
                                    margin-left: 10px;
                                    border: 1px solid #BC9D57;

                                    color:#BC9D57;
                                    font-size: 13px;
                                    display: inline-block;
                                    line-height: 28px;
                                    text-align: center;
                                    border-radius: 14px;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            }

            .spanSty {
                width: 70px;
                height: 28px;
                border: 1px solid #3BC0D0;

                color: #3BC0D0;
                font-size: 13px;
                border-radius: 14px;
                display: inline-block;
                line-height: 28px;
                text-align: center;
                cursor: pointer;
            }
        }
    }
    .securitySetting {
        margin-bottom: 40px;

        h4 {
            font-size: 14px;
        }
        .securityWrap {
            width: 100%;
            height: 85px;
            margin-top: 15px;

            display: flex;
            justify-content: space-around;
            align-items: center;

            .securityItem {
                width: 300px;
                height: 85px;
                border: 1px solid #3BC0D0;

                background-color: #F9FBFB;

                display: flex;
                align-items: center;

                .securityItemImg {
                    width: 42px;
                    height: 100%;
                    margin: 0 10px;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .securityItem_right {
                    width: 220px;
                    height: 100%;
                    padding: 15px 0;

                    box-sizing: border-box;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;

                    .normalSty {
                        font-size: 14px;
                        color: #000;
                    }
                    .activeSty {
                        font-size: 14px;
                        color: #2CB5C5;
                    }
                    .pSty {
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
        }
    }
    .DIY {
        h4 {
            font-size: 14px;
        }
        .DIYWrap {
            width: 926px;
            padding:20px;
            border: 1px solid #EAECED;
            margin-top: 15px;

            box-sizing: border-box;

            .diyItem {
                width: 100%;
                height: 40px;
                
                font-size: 14px;

                display: flex;
                align-items: center;
                justify-content: space-between;

                & > span {
                    color: #2CB5C5;
                    cursor: pointer;
                }

                .diyItem_left {
                    input {
                        width: 200px;
                        height: 25px;
                        border:none;

                        line-height: 25px;
                        font-size: 14px;
                        color: #888888;
                        background-color: transparent;
                    }
                }
            }
        }
    }
</style>
