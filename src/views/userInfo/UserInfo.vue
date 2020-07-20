<template>
    <el-container>
        <el-aside width="200px">
            <el-menu class="el-menu-vertical" :unique-opened="true"
                     background-color="#fff" text-color="#000">
                <el-menu-item index="/index/manageCenter">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">个人资料</span>
                </el-menu-item>
                <el-menu-item index="/index/manageCenter/softwareCenter">
                    <i class="el-icon-s-platform"></i>
                    <span slot="title">软件管理</span>
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-s-platform"></i>
                        <span slot="title">菜单1</span>
                    </template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
            <el-container class="userInfoContainer">
                <el-header>
                    <h3>个人资料</h3>
                </el-header>
                <el-container class="userInfo">
                    <el-aside width="100px">
                        <el-avatar :size="80" :src="avatarPath + $store.state.userInfo.avatar"></el-avatar>
                        <el-upload
                                class="file-uploader"
                                action="void" :http-request="handleRequest"
                                :show-file-list="false" :on-success="handleUploadSuccess"
                                accept=".jpg,.jpeg,.png">
                            <div class="updateAvatar">修改头像</div>
                        </el-upload>
                    </el-aside>
                    <el-main>
                        <el-form class="userInfoForm" ref="userInfo" :rules="rules" :model="userInfo"
                                 label-width="100px">
                            <el-form-item prop="userName" label="用户名">
                                <el-input v-model="userInfo.userName"></el-input>
                            </el-form-item>
                            <el-form-item label="电话">
                                <el-input v-model="userInfo.phoneNumber"></el-input>
                            </el-form-item>
                            <el-form-item prop="newPassword" v-if="isUpdatePassword" label="新密码">
                                <el-input type="password" v-model="userInfo.newPassword"></el-input>
                            </el-form-item>
                            <el-form-item prop="newPasswordConfirm" v-if="isUpdatePassword" label="确认密码">
                                <el-input type="password" v-model="userInfo.newPasswordConfirm"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('userInfo')">提交</el-button>
                                <el-button @click="isUpdatePassword = !isUpdatePassword"><span v-if="isUpdatePassword">取消</span>修改密码
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-main>
                </el-container>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>
    import {updateUserInfo} from "@apis/user";
    import {AVATAR_PATH} from "@js/constant";

    export default {
        name: "UserInfo",
        data() {
            var confirmPassword = (rule, value, callback) => {
                if (value !== this.userInfo.newPassword) {
                    callback(new Error('两次输入的密码不一致'))
                } else {
                    callback()
                }
            }
            return {
                userInfo: {
                    id: '',
                    userName: '',
                    phoneNumber: '',
                    newPassword: '',
                    newPasswordConfirm: ''
                },
                rules: {
                    userName: [{required: true, message: '请输入账号', trigger: 'blur'}],
                    newPassword: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    newPasswordConfirm: [
                        {required: true, message: '请确认密码', trigger: 'blur'},
                        {validator: confirmPassword, trigger: 'blur'}
                    ]
                },
                isUpdatePassword: false,
                avatarPath: AVATAR_PATH
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        updateUserInfo(this.userInfo).then(res => {
                            if (res.success) {
                                this.$message.success("修改成功")
                                this.$store.commit('login', res.userInfo)
                            } else {
                                this.$message.error(res.message)
                                return false
                            }
                        })
                    }
                })
            },
            handleRequest(file) {
                let that = this
                let formData = new FormData();
                formData.append('file', file.file);
                formData.append('id', this.userInfo.id)
                this.$axios({
                    url: '/api/user/updateAvatar',
                    method: 'post',
                    data: formData,
                }).then(res => {
                    that.$store.commit('login', res.data.userInfo)
                    that.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    file.onSuccess();
                }).catch(function (error) {
                    that.$message({
                        message: '上传失败',
                        type: 'fail'
                    });
                });
            },
            handleUploadSuccess() {

            }
        },
        created() {
            this.userInfo = this.$store.state.userInfo
        }
    }
</script>

<style lang="scss" scoped>
    .el-container {
        width: 80%;
        margin: auto;
    }

    .el-aside {
        height: 60%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .el-main {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .el-menu {
        height: 100%;
    }

    .userInfoContainer {
        width: 100%;

        .el-header {
            padding-left: 12px;
        }
    }

    .userInfo {
        width: 100%;

        .el-aside {
            height: 200px;
            box-shadow: none;
            text-align: center;
        }

        .el-main {
            height: 500px;
            box-shadow: none;
            padding: 0px;
        }

        .el-avatar {
            background: #ffffff;
        }
    }

    .updateAvatar {
        font-size: 14px;
        cursor: pointer;
        color: #3a8ee6;
    }

    .userInfoForm {
        width: 360px;
        margin-left: 180px;
    }
</style>
