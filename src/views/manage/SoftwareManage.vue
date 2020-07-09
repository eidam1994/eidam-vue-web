<template>
    <el-table
        :data="softwareList"
        border
        style="width: 100%">
        <el-table-column prop="fileName" label="软件名称">
        </el-table-column>
        <el-table-column prop="fileIcon" label="软件类型">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-popconfirm
                    confirmButtonText='确定'
                    cancelButtonText='取消'
                    icon="el-icon-info"
                    iconColor="red"
                    title="确定要要删除该软件吗？"
                    @onConfirm="handleDelete(scope.$index, scope.row)">
                    <el-button slot="reference"
                               size="mini"
                               type="danger">删除</el-button>
                    <el-button>删除</el-button>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {deleteSoftware, SoftwareList} from "@apis/basis";

    export default {
        name: "SoftwareManage",
        data() {
            return {
                softwareList: []
            }
        },
        methods: {
            getSoftwareList() {
                SoftwareList().then(res => {
                    if (res.success) {
                        this.softwareList = res.list
                    }
                })
            },
            handleDelete(index, row) {
                console.log(row.id)
                deleteSoftware({"id":row.id, "filePath": row.filePath}).then(res => {
                    if (res.success) {
                        this.deleteRow(index, this.softwareList)
                    }
                })
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            }
        },
        created() {
            this.getSoftwareList()
        }
    }
</script>

<style scoped>

</style>
