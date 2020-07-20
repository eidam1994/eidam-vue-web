<template>
    <div class="recordCenter">
        <el-row>
            <el-col :span="18">
                <div class="articleList">111</div>
            </el-col>
            <el-col :span="6">
                <div class="other">22</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "RecordCenter"
    }
</script>

<style lang="scss" scoped>
    .recordCenter {
        margin: 0px 200px 0px 200px;
    }
    .articleList {
        margin: 30px 20px 0px 0px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .other {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-top: 30px;
    }
</style>
