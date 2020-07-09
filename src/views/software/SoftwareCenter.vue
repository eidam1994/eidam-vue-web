<template>
    <el-main>
        <div class="fileBox" @click="downloadSoftware(software.id)" v-for="software in softwareList">
            <el-avatar :title="software.fileName" shape="square" :size="150" :src="iconPath + software.fileIcon + '.png'"></el-avatar>
            <div :title="software.fileName" class="fileName">{{software.fileName}}</div>
        </div>
        <div class="fileBox uploadBox">
            <el-upload class="file-uploader" action="void" :http-request="handleRequest"
                       :show-file-list="false" :on-success="handleUploadSuccess"
                       :before-upload="startUpload">
                <i class="el-icon-plus file-uploader-icon"></i>
            </el-upload>
        </div>
        <el-dialog
            title="上传中"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            :center="true">
            <el-progress :text-inside="true" :stroke-width="16" :percentage="uploadPercent"></el-progress>
            <span slot="footer" class="dialog-footer">
                <el-popconfirm @onConfirm="handleStopUpload" title="确定要停止上传吗？" v-show="uploadButtonVisible">
                    <el-button type="primary" slot="reference">{{uploadButton}}</el-button>
                </el-popconfirm>
                <el-button @click="finishUpload" v-show="!uploadButtonVisible" type="primary">{{uploadButton}}</el-button>
            </span>
        </el-dialog>
    </el-main>
</template>

<script>
    import {SoftwareList} from "@apis/basis";
    import {ICON_PATH} from "@js/constant";

    export default {
        name: "SoftwareCenter",
        data() {
            return {
                softwareList: [],
                uploadPercent: 0,
                dialogVisible: false,
                uploadButton: '停止上传',
                uploadButtonVisible: false,
                cancelUpload: null,
                iconPath: ICON_PATH
            }
        },
        methods: {
            startUpload() {
                this.dialogVisible = true;
                this.uploadButton = '停止上传'
                this.uploadButtonVisible = true
            },
            handleRequest(file) {
                let that = this
                let cancelToken = this.$axios.CancelToken;
                this.cancelUpload = cancelToken.source();
                let FormDatas = new FormData();
                FormDatas.append('file', file.file);
                this.$axios({
                    url: '/api/software/upload',
                    method: 'post',
                    data: FormDatas,
                    cancelToken: this.cancelUpload.token,
                    //上传进度
                    onUploadProgress: (progressEvent, file) => {
                        this.uploadPercent = progressEvent.loaded / progressEvent.total * 100 | 0;  //百分比
                    }
                }).then(data => {
                    file.onSuccess();
                }).catch(function (error) {
                    that.dialogVisible = false
                    that.$message({
                        message: '上传已停止',
                        type: 'success'
                    });
                    that.uploadPercent = 0
                });
            },
            handleUploadSuccess() {
                this.uploadButton = '上传完成'
                this.uploadButtonVisible = false
                this.$message({
                    message: '上传完成',
                    type: 'success'
                });
                this.getSoftwareList()
            },
            handleStopUpload() {
                if(this.cancelUpload){
                    this.cancelUpload.cancel('取消上传');
                }
            },
            finishUpload() {
                this.dialogVisible = false
                this.uploadPercent = 0
            },
            downloadSoftware(id) {
                let elemIF = document.createElement('iframe')
                elemIF.src = "/api/software/download?id=" + id
                elemIF.style.display = 'none'
                document.body.appendChild(elemIF)
            },
            getSoftwareList() {
                SoftwareList().then(res => {
                    if (res.success) {
                        this.softwareList = res.list
                    }
                })
            }
        },
        created() {
            this.getSoftwareList()
        }
    }
</script>

<style scoped>
    .fileBox {
        width: 150px;
        display: inline-block;
        margin: 10px 50px 10px 0px;
        cursor: pointer;
    }

    .fileBox:hover {
        box-shadow: 2px 2px #eaeaea;
    }

    .fileName {
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .uploadBox {
        position: absolute;
        border: 1px dotted grey;
    }

    .file-uploader {
        position: relative;
        width: 150px;
        height: 150px;
    }

    .file-uploader-icon {
        position: relative;
        width: 150px;
        height: 150px;
        line-height: 150px;
    }

    .el-progress__text {
        font-size: 16px !important;
    }
</style>
