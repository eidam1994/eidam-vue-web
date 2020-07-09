<template>
    <div class="headerBox">
        <el-menu :default-active="defaultActive" router class="el-menu-demo"
                 mode="horizontal" background-color="#545c64" text-color="#fff"
                 active-text-color="#ffd04b">
            <el-menu-item @click="changeMenu('/index/softwareCenter')" index="/index/softwareCenter">软件中心</el-menu-item>
            <el-menu-item @click="changeMenu('/index/manageCenter')" index="/index/manageCenter">管理中心</el-menu-item>
        </el-menu>
        <div class="avatar">
            <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <div class="dropMenu">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">个人中心<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="userName">{{userName}}</el-dropdown-item>
                    <el-dropdown-item divided command="userInfo">个人资料</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {logout} from "@apis/user";

    export default {
        name: "HeaderNav",
        data() {
            return {
                defaultActive: '/index/softwareCenter',
                userName: this.$store.state.userInfo.userName
            };
        },
        created() {
        },
        methods: {
            changeMenu(path) {
                this.defaultActive = path
            },
            handleCommand(command) {
                switch (command) {
                    case "logout":
                        this.logout()
                        break
                    case "userInfo":
                        this.defaultActive = '/index/userInfo'
                        this.$router.push({ path: '/index/userInfo' })
                        break
                }
            },
            logout() {
                logout().then(result => {
                    if (result.success) {
                        this.$router.push({ path: '/login' })
                        this.$message.success("已退出登陆")
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .avatar {
        width: 50px;
        height: 50px;
        position: relative;
        left: calc(100% - 150px);
        top: -55.5px;
    }
    .dropMenu {
        width: 80px;
        position: relative;
        left: calc(100% - 90px);
        top: -90px;
        .el-dropdown-link {
            color: white;
            cursor: pointer;
        }
    }
</style>
