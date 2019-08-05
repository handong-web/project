<template>
    <div>
        <el-row class="all-components">
            <!-- table -->
            <el-col>
                <el-card>
                    <tab-table />
                </el-card>
            </el-col>
        </el-row>
        <!-- 通知tips -->
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>通知示例</span>
                    </div>
                    <div>
                        <el-button plain @click="open1">可自动关闭</el-button>
                        <el-button plain @click="open2">不会自动关闭</el-button>
                        <el-button plain @click="success">成功</el-button>
                        <el-button plain @click="warning">警告</el-button>
                        <el-button plain @click="message">消息</el-button>
                        <el-button plain @click="error">错误</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 搜索表格 -->
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card>
                    <el-table
                        :data="
                            tableData.filter(
                                data =>
                                    !search ||
                                    data.name
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                            )
                        "
                        style="width: 100%"
                    >
                        <el-table-column label="Date" prop="date">
                        </el-table-column>
                        <el-table-column label="Name" prop="name">
                        </el-table-column>
                        <el-table-column align="right">
                            <template slot="header" slot-scope="scope">
                                <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"
                                />
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)"
                                    >Edit</el-button
                                >
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="
                                        handleDelete(scope.$index, scope.row)
                                    "
                                    >Delete</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <!-- loading表格 -->
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card>
                    <div slot="header">
                        <span>Loading Table</span>
                        <i
                            class="el-icon-refresh-right"
                            style="float:right;padding:3px 0;cursor:pointer;"
                            @click="showLoading"
                        ></i>
                    </div>
                    <el-table
                        v-loading="loading"
                        :data="tableData"
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <!-- 滚动条 -->
        <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :offset="12">
                <el-card class="scroll-card">
                    <p v-for="(item, index) in 40" :key="index">
                        悬停触发滚动条
                    </p>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Table from '@/components/table'

export default {
    name: 'merchants-components',
    components: {
        'tab-table': Table
    },
    data() {
        return {
            msg: '组件合集',
            id: 'aaa',
            tableData: [
                {
                    date: '2019-05-02',
                    name: '张三',
                    address: '山西省太原市'
                },
                {
                    date: '2019-05-04',
                    name: '李四',
                    address: '山西省太原市'
                },
                {
                    date: '2019-05-01',
                    name: '王五',
                    address: '山西省太原市'
                },
                {
                    date: '2019-05-03',
                    name: '赵四',
                    address: '山西省太原市'
                }
            ],
            search: '',
            loading: false
        }
    },
    methods: {
        open1() {
            const h = this.$createElement

            this.$notify({
                title: '标题名称',
                message: h(
                    'i',
                    { style: 'color: teal' },
                    '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'
                )
            })
        },
        open2() {
            this.$notify({
                title: '提示',
                message: '这是一条不会自动关闭的消息',
                duration: 0
            })
        },
        success() {
            this.$notify({
                title: '成功',
                message: '这是一条成功的提示消息',
                type: 'success'
            })
        },
        warning() {
            this.$notify({
                title: '警告',
                message: '这是一条警告的提示消息',
                type: 'warning'
            })
        },
        message() {
            this.$notify.info({
                title: '消息',
                message: '这是一条消息的提示消息'
            })
        },
        error() {
            this.$notify.error({
                title: '错误',
                message: '这是一条错误的提示消息'
            })
        },
        handleEdit(index, row) {
            console.log(index, row)
        },
        handleDelete(index, row) {
            console.log(index, row)
        },
        showLoading() {
            var self = this
            this.loading = true
            setTimeout(function() {
                self.loading = false
            }, 2000)
        }
    }
}
</script>


<style scoped>
@-webkit-keyframes fadeIn {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>

