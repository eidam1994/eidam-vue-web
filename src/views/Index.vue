<template>
    <el-container direction="vertical">
        <el-header>
            <HeaderNav></HeaderNav>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import HeaderNav from "@components/HeaderNav";

    export default {
        name: "Index",
        components: {
            HeaderNav
        }
    }
</script>

<style scoped>
    .el-header {
        padding: 0px;
    }
    .el-main {
        padding: 0px;
    }
    .el-container {
        height: 100%;
    }
</style>
