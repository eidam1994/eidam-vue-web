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
                        <el-avatar :size="80" ></el-avatar>
                        <div class="updateAvatar">修改头像</div>
                    </el-aside>
                    <el-main>Main</el-main>
                </el-container>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "UserInfo",
        data() {
            return {
            }
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
        }
    }

    .updateAvatar {
        font-size: 14px;
        cursor: pointer;
        color: #3a8ee6;
    }
</style>
