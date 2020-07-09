<template>
    <el-container>
        <el-aside width="null">
            <el-menu class="el-menu-vertical" :unique-opened="true" router
                     background-color="#151d41" text-color="#fff" :collapse="isCollapse">
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                    <i v-show="!isCollapse" class="el-icon-s-fold expandBtn" @click="isCollapse=true"></i>
                    <i v-show="isCollapse" class="el-icon-s-unfold shrinkBtn" @click="isCollapse=false"></i>
                </el-radio-group>
                <el-menu-item index="/index/manageCenter">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
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
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "ManageCenter",
        data() {
            return {
                isCollapse: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-aside {
        height: 100%;
    }

    .el-menu {
        height: 100%;
    }

    .el-radio-group {
        font-size: 20px;
        width: 100%;
        margin: 20px 20px;
        i {
            color: #909399;
            cursor: pointer;
        }
    }
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-menu-item-group__title {
        display: none;
    }
</style>
