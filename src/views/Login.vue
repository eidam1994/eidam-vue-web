<template>
    <div class="login-warp">
        <el-form label-position="right" :model="loginForm" label-width="80px" :rules="rules" ref="loginForm" class="login-container">
            <el-form-item label="用户名" prop="userName">
                <el-input type="text" v-model="loginForm.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
            </el-form-item>
<!--            <el-row>-->
<!--                <el-col :span="12">-->
<!--                    <el-form-item label="验证码">-->
<!--                        <el-input type="text" v-model="loginForm.authCode" auto-complete="off"></el-input>-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="12">-->

<!--                </el-col>-->
<!--            </el-row>-->
            <el-form-item prop="rememberMe">
                <el-checkbox class="remember" v-model="rememberMe">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item style="width:100%;" class="loginBtn">
                <el-button type="primary" style="width: 100%;" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {delCookie, getCookie, setCookie} from "@utils/util";
    import {login} from "@apis/user";

    export default {
        name: "login",
        data() {
            return {
                // 记住密码
                rememberMe: false,
                loginForm: {
                    userName: '',
                    password: '',
                    authCode: ''
                },
                // rules前端验证
                rules: {
                    userName: [{required: true, message: '请输入账号', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        created() {
            this.getUserInfo()
        },
        methods: {
            // 获取用户名密码
            getUserInfo() {
                if (getCookie('user') != '' && getCookie('pwd') != '') {
                    this.loginForm.userName = getCookie('user')
                    this.loginForm.password = getCookie('pwd')
                    this.rememberMe = true
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 注释
                        login(this.loginForm).then(res => {
                            if (res.success) {
                                if (this.rememberMe) {
                                    //保存帐号到cookie，有效期7天
                                    setCookie('user', this.loginForm.userName, 7)
                                    //保存密码到cookie，有效期7天
                                    setCookie('pwd', this.loginForm.password, 7)
                                } else {
                                    delCookie('user')
                                    delCookie('pwd')
                                }
                                //如果请求成功就让他2秒跳转路由
                                this.$message.success("登陆成功")
                                this.$store.commit('login', res.userInfo)
                                setTimeout(() => {
                                    // 缓存token
                                    // localStorage.setItem('logintoken', res.data.token)
                                    // 缓存用户个人信息
                                    // localStorage.setItem('userdata', JSON.stringify(res.data))
                                    // this.$store.commit('login', 'true')
                                    this.$router.push({ path: '/index/softwareCenter' })
                                }, 1000)
                            } else {
                                this.$message.error(res.message)
                                return false
                            }
                        })
                    } else {
                        // 获取图形验证码
                        // this.getcode()
                        this.$message.error('请输入用户名密码！')
                        return false
                    }
                })
            },
        }
    }
</script>

<style>
    .login-warp {
        width: 100%;
        height: 100%;
        background-image: linear-gradient(#66cccc, #ccffff);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .el-form-item__label {
        font-size: 16px;
        color: black;
    }

    .login-container {
        border-radius: 10px;
        margin: 0px auto;
        width: 350px;
        padding: 30px 35px 15px 35px;
        border: 1px solid #eaeaea;
        text-align: left;
        background: #fff;
        box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
    }

    .remember {
        margin: 0px;
        color: black;
    }
    .loginBtn .el-form-item__content {
        margin-left: 0px !important;
    }
</style>
