<template>
    <el-row class="tab-table">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- 全部 -->
            <el-tab-pane label="全部" name="all">
                <template>
                    <el-button
                        type="primary"
                        icon="el-icon-refresh"
                        class="refresh-btn"
                        @click="refresh"
                        circle
                    ></el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click="batchRemove"
                    ></el-button>
                    <el-button
                        type="success"
                        icon="el-icon-folder-add"
                        circle
                        @click="addRow"
                    ></el-button>
                    <!-- <el-button
                        @click="toggleSelection([tableData[1], tableData[2]])"
                        >切换第二、第三行的选中状态</el-button
                    >
                    <el-button @click="toggleSelection()">取消选择</el-button> -->
                </template>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    style="width: 100%"
                    :stripe="true"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column label="ID">
                        <template slot-scope="scope">{{
                            scope.row.id
                        }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="columnName"
                        label="栏目名称"
                    ></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>

                    <el-table-column
                        prop="nickName"
                        label="昵称"
                    ></el-table-column>
                    <el-table-column prop="mark" label="标志">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.mark == '推荐'"
                                class="little-tag recommended"
                                >{{ scope.row.mark }}</span
                            >
                            <span
                                v-if="scope.row.mark == '首页'"
                                class="little-tag home-page"
                                >{{ scope.row.mark }}</span
                            >
                            <span
                                v-if="scope.row.mark == '热门'"
                                class="little-tag hot"
                                >{{ scope.row.mark }}</span
                            >
                        </template>
                    </el-table-column>
                    <el-table-column prop="image" label="图片">
                        <i
                            class="el-icon-location"
                            style="color:#18bc9c;font-size:22px;"
                        ></i>
                    </el-table-column>
                    <el-table-column
                        prop="weight"
                        label="权重"
                    ></el-table-column>
                    <el-table-column prop="state" label="状态">
                        <template slot-scope="scope">
                            <p v-if="scope.row.state == 'success'">
                                <span class="state-dot home-page"></span
                                ><span class="normal">{{
                                    scope.row.state
                                }}</span>
                            </p>
                            <p v-if="scope.row.state == 'warning'">
                                <span class="state-dot hot"></span
                                ><span class="no-normal">{{
                                    scope.row.state
                                }}</span>
                            </p>
                            <p v-if="scope.row.state == 'danger'">
                                <span class="state-dot recommended"></span
                                ><span class="dangerous">{{
                                    scope.row.state
                                }}</span>
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope" class="edit-btn">
                            <el-tooltip
                                class="item"
                                effect="dark"
                                content="编辑"
                                placement="top"
                            >
                                <span
                                    class="table-btn bg-blue"
                                    @click="editRow(scope.$index, scope.row)"
                                    ><i class="el-icon-edit"></i
                                ></span>
                            </el-tooltip>
                            <el-tooltip
                                class="item"
                                effect="dark"
                                content="删除"
                                placement="top"
                            >
                                <span
                                    class="table-btn bg-red"
                                    @click="remove(scope.$index, scope.row)"
                                    ><i class="el-icon-delete"></i
                                ></span>
                            </el-tooltip>
                            <p></p>
                            <p></p>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-pagination
                style="float:right;margin-top:20px;"
                @size-change="pagingSize"
                @current-change="pagingCurrent"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="40"
            >
            </el-pagination>

            <!-- 拖动弹框 -->
            <transition name="el-zoom-in-center">
                <div id="single-line" :class="propClass" v-if="showProp">
                    <div class="prop-header" @mousedown="mousedown">
                        <span style="float:left;">编辑</span>
                        <span
                            style="float:right;"
                            class="close-btn"
                            @click="closeProp"
                            >x</span
                        >
                        <span style="float:right;" @click="fullProp"
                            ><i class="el-icon-full-screen"></i
                        ></span>
                    </div>
                    <div class="prop-main scroll-card">
                        <el-form
                            ref="editLine"
                            :model="editLine"
                            label-width="80px"
                        >
                            <el-form-item label="ID:">
                                <el-input v-model="editLine.id"></el-input>
                            </el-form-item>
                            <el-form-item label="栏目名称:">
                                <el-input
                                    v-model="editLine.columnName"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="名称:">
                                <el-input v-model="editLine.name"></el-input>
                            </el-form-item>
                            <el-form-item label="昵称:">
                                <el-input
                                    v-model="editLine.nickName"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="标志:">
                                <el-radio-group v-model="editLine.mark">
                                    <el-radio label="推荐"></el-radio>
                                    <el-radio label="首页"></el-radio>
                                    <el-radio label="热门"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="权重:">
                                <el-select
                                    v-model="editLine.weight"
                                    placeholder="请选择权重"
                                >
                                    <el-option
                                        v-for="(item, index) in 15"
                                        :key="index"
                                        :label="item"
                                        :value="item"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态:">
                                <el-radio-group v-model="editLine.state">
                                    <el-radio label="success"></el-radio>
                                    <el-radio label="warning"></el-radio>
                                    <el-radio label="danger"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="prop-footer">
                        <div class="btn-container">
                            <el-button
                                type="success"
                                size="small"
                                style="background:#18bc9c;border:1px solid #18bc9c;"
                                @click="saveEdit(editLine)"
                                >确定</el-button
                            >
                            <el-button
                                type="warning"
                                size="small"
                                plain
                                @click="resetTable(editLine)"
                                >重置</el-button
                            >
                        </div>
                    </div>
                </div>
            </transition>
            <!-- 拖动弹框 end -->

            <!-- 新增编辑弹框 -->
            <transition name="el-zoom-in-center">
                <div id="single-line" :class="propClass" v-if="showPropAdd">
                    <div class="prop-header" @mousedown="mousedown">
                        <span style="float:left;">编辑</span>
                        <span
                            style="float:right;"
                            class="close-btn"
                            @click="closeProp"
                            >x</span
                        >
                        <span style="float:right;" @click="fullProp"
                            ><i class="el-icon-full-screen"></i
                        ></span>
                    </div>
                    <div class="prop-main scroll-card">
                        <el-form
                            ref="addLine"
                            :model="addLine"
                            label-width="80px"
                        >
                            <el-form-item label="ID:">
                                <el-input v-model="addLine.id"></el-input>
                            </el-form-item>
                            <el-form-item label="栏目名称:">
                                <el-input
                                    v-model="addLine.columnName"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="名称:">
                                <el-input v-model="addLine.name"></el-input>
                            </el-form-item>
                            <el-form-item label="昵称:">
                                <el-input v-model="addLine.nickName"></el-input>
                            </el-form-item>
                            <el-form-item label="标志:">
                                <el-radio-group v-model="addLine.mark">
                                    <el-radio label="推荐"></el-radio>
                                    <el-radio label="首页"></el-radio>
                                    <el-radio label="热门"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="权重:">
                                <el-select
                                    v-model="addLine.weight"
                                    placeholder="请选择权重"
                                >
                                    <el-option
                                        v-for="(item, index) in 15"
                                        :key="index"
                                        :label="item"
                                        :value="item"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态:">
                                <el-radio-group v-model="addLine.state">
                                    <el-radio label="success"></el-radio>
                                    <el-radio label="warning"></el-radio>
                                    <el-radio label="danger"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="prop-footer">
                        <div class="btn-container" style="width:56px;">
                            <el-button
                                type="success"
                                size="small"
                                style="background:#18bc9c;border:1px solid #18bc9c;"
                                @click="saveAdd(addLine)"
                                >确定</el-button
                            >
                        </div>
                    </div>
                </div>
            </transition>
            <!-- 新增编辑弹框 end -->

            <!-- 全部 end -->
            <el-tab-pane label="默认" name="default">默认</el-tab-pane>
            <el-tab-pane label="单页" name="single">单页</el-tab-pane>
            <el-tab-pane label="文章" name="article">文章</el-tab-pane>
            <el-tab-pane label="Test" name="test">Test</el-tab-pane>
        </el-tabs>
    </el-row>
</template>

<script>
export default {
    name: 'tab-table',
    data() {
        return {
            activeName: 'all',
            propClass: 'prop-container',
            tableData: [
                {
                    id: '1',
                    columnName: 'test',
                    name: '测试2',
                    nickName: 'test2',
                    mark: '推荐',
                    image: '@/assets/img/qrcode.png',
                    weight: '13',
                    state: 'success',
                    index: '1'
                },
                {
                    id: '2',
                    columnName: 'test',
                    name: '测试1',
                    nickName: 'test1',
                    mark: '推荐',
                    image: '@/assets/img/qrcode.png',
                    weight: '12',
                    state: 'success',
                    index: '2'
                },
                {
                    id: '3',
                    columnName: 'page',
                    name: '软件产品',
                    nickName: 'software',
                    mark: '推荐',
                    image: '@/assets/img/qrcode.png',
                    weight: '5',
                    state: 'success',
                    index: '3'
                },
                {
                    id: '4',
                    columnName: 'page',
                    name: '企业管理软件',
                    nickName: 'company',
                    mark: '推荐',
                    image: '@/assets/img/qrcode.png',
                    weight: '7',
                    state: 'success',
                    index: '4'
                },
                {
                    id: '5',
                    columnName: 'page',
                    name: 'SASS平台软件',
                    nickName: 'company-sass',
                    mark: '首页',
                    image: '@/assets/img/qrcode.png',
                    weight: '11',
                    state: 'success',
                    index: '5'
                },
                {
                    id: '6',
                    columnName: 'page',
                    name: 'CRM系统',
                    nickName: 'company-crm',
                    mark: '推荐',
                    image: '@/assets/img/qrcode.png',
                    weight: '10',
                    state: 'success',
                    index: '6'
                },
                {
                    id: '7',
                    columnName: 'page',
                    name: '网站建设',
                    nickName: 'website',
                    mark: '推荐',
                    image: '@/assets/img/qrcode.png',
                    weight: '6',
                    state: 'warning',
                    index: '7'
                },
                {
                    id: '8',
                    columnName: 'page',
                    name: '移动端',
                    nickName: 'website-mobile',
                    mark: '热门',
                    image: '@/assets/img/qrcode.png',
                    weight: '9',
                    state: 'danger',
                    index: '8'
                },
                {
                    id: '9',
                    columnName: 'page',
                    name: 'PC端',
                    nickName: 'website-pc',
                    mark: '推荐',
                    image: '@/assets/img/qrcode.png',
                    weight: '8',
                    state: 'warning',
                    index: '9'
                },
                {
                    id: '10',
                    columnName: 'page',
                    name: '移动应用',
                    nickName: 'mobile-app',
                    mark: '热门',
                    image: '@/assets/img/qrcode.png',
                    weight: '2',
                    state: 'success',
                    index: '10'
                },
                {
                    id: '11',
                    columnName: 'page',
                    name: 'Andriod开发',
                    nickName: 'android',
                    mark: '推荐',
                    image: '@/assets/img/qrcode.png',
                    weight: '4',
                    state: 'success',
                    index: '11'
                },
                {
                    id: '12',
                    columnName: 'page',
                    name: '微信公众号',
                    nickName: 'wechat-public',
                    mark: '首页',
                    image: '@/assets/img/qrcode.png',
                    weight: '3',
                    state: 'danger',
                    index: '12'
                },
                {
                    id: '13',
                    columnName: 'page',
                    name: '官方新闻',
                    nickName: 'news',
                    mark: '推荐',
                    image: '@/assets/img/qrcode.png',
                    weight: '1',
                    state: 'success',
                    index: '13'
                }
            ],
            multipleSelection: [],
            showProp: false,
            showPropAdd: false,
            editLine: {
                id: '',
                columnName: '',
                name: '',
                nickName: '',
                mark: '',
                image: '',
                weight: '',
                state: ''
            },
            addLine: {
                id: '',
                columnName: '',
                name: '',
                nickName: '',
                mark: '',
                image: '',
                weight: '',
                state: ''
            },
            search: '',
            loading: false,
            // 分页data
            currentPage1: 1,
            currentPage2: 1,
            currentPage3: 1,
            currentPage4: 1
        }
    },
    mounted() {},
    methods: {
        handleClick(tab, event) {},
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row)
                })
            } else {
                this.$refs.multipleTable.clearSelection()
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        // 批量删除
        batchRemove() {
            var allTable = this.tableData.concat(this.multipleSelection)
            var newAll = []
            for (var i = 0; i < allTable.length; i++) {
                if (
                    allTable.indexOf(allTable[i]) ==
                    allTable.lastIndexOf(allTable[i])
                ) {
                    newAll.push(allTable[i])
                }
            }
            if (this.multipleSelection == '') {
                this.$message.warning('请先选中要删除的列表！')
            } else {
                this.$confirm('确定删除选中项？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.tableData = newAll
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            }
        },
        // 打开增加行编辑弹窗
        addRow() {
            // 初始化弹窗大小
            this.propClass = 'prop-container'
            this.showPropAdd = true
        },
        // 保存增加表格
        saveAdd(e) {
            this.$confirm('确定保存修改？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.tableData.push(e)
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    })
                    this.showPropAdd = false
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消保存'
                    })
                })
        },
        // 编辑
        editRow(index, row) {
            // 初始化弹窗大小
            this.propClass = 'prop-container'
            this.showProp = true
            this.editLine = Object.assign({}, row)
        },
        // 删除
        remove(index, row) {
            this.$confirm('确定删除此项？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.tableData.splice(index, 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        // 重置
        resetTable(e) {
            this.editLine = Object.assign({}, this.tableData[e.index - 1])
        },
        // 保存编辑
        saveEdit(e) {
            this.$confirm('确定保存修改？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.tableData[e.index - 1].id = e.id
                    this.tableData[e.index - 1].columnName = e.columnName
                    this.tableData[e.index - 1].columnName = e.columnName
                    this.tableData[e.index - 1].name = e.name
                    this.tableData[e.index - 1].nickName = e.nickName
                    this.tableData[e.index - 1].mark = e.mark
                    this.tableData[e.index - 1].weight = e.weight
                    this.tableData[e.index - 1].state = e.state
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    })
                    this.showProp = false
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消保存'
                    })
                })
        },
        // 拖拽
        mousedown(event) {
            this.selectElement = document.getElementById('single-line')
            var div1 = this.selectElement
            var distanceX = event.clientX - this.selectElement.offsetLeft
            var distanceY = event.clientY - this.selectElement.offsetTop
            document.onmousemove = function(ev) {
                var oevent = ev || event
                div1.style.left = oevent.clientX - distanceX + 'px'
                div1.style.top = oevent.clientY - distanceY + 'px'
            }
            document.onmouseup = function() {
                document.onmousemove = null
                document.onmouseup = null
            }
        },
        // 关闭弹框
        closeProp() {
            this.showProp = false
            this.showPropAdd = false
        },
        // 模拟loading
        refresh() {
            var self = this
            this.loading = true
            setTimeout(function() {
                self.loading = false
            }, 2000)
        },
        // 全屏弹框
        fullProp() {
            if (this.propClass == 'prop-container') {
                this.propClass = 'prop-container-big'
            } else {
                this.propClass = 'prop-container'
            }
        },
        // 分页
        pagingSize(val) {
            console.log(`每页 ${val} 条`)
        },
        pagingCurrent(val) {
            console.log(`当前页: ${val}`)
        }
    }
}
</script>

<style scoped>
/* 正常尺寸弹框 */
.prop-container {
    position: fixed;
    height: 500px;
    width: 500px;
    border: 1px solid #ccc;
    background: #ffffff;
    top: 20%;
    left: 35%;
    border-radius: 5px;
    z-index: 9999;
}
.prop-container .prop-header {
    height: 42px;
    overflow: hidden;
    background: #2c3e50;
    cursor: move;
    padding: 0 0 0 20px;
    border-radius: 5px 5px 0 0;
}
.prop-container .prop-header span {
    color: #fff;
    line-height: 42px;
    font-size: 14px;
    font-weight: 400;
    margin-right: 10px;
}
.prop-container .prop-header span i {
    font-size: 16px;
    cursor: pointer;
}
.prop-container .prop-header .close-btn {
    width: 18px;
    height: 18px;
    cursor: pointer;
    background: #e74c3c;
    text-align: center;
    float: right;
    display: inline-block;
    margin-top: 11px;
    line-height: 14px;
    border-radius: 50%;
}
.prop-container .prop-main {
    height: 400px;
    padding: 20px 60px;
}
.prop-container .prop-footer {
    padding: 12px 0;
    background: #ecf0f1;
    height: 56px;
    border-radius: 0 0 5px 5px;
}
.prop-container .prop-footer .btn-container {
    width: 130px;
    margin: 0px auto;
}
/* 正常尺寸弹框 end */

/* 全屏弹框 */
.prop-container-big {
    position: fixed;
    height: calc(100vh - 60px);
    width: calc(100% - 190px);
    border: 1px solid #ccc;
    background: #ffffff;
    top: 60px;
    left: 190px;
    border-radius: 5px;
    z-index: 9999;
}
.prop-container-big .prop-header {
    height: 42px;
    overflow: hidden;
    background: #2c3e50;
    cursor: move;
    padding: 0 0 0 20px;
    border-radius: 5px 5px 0 0;
}
.prop-container-big .prop-header span {
    color: #fff;
    line-height: 42px;
    font-size: 14px;
    font-weight: 400;
    margin-right: 10px;
}
.prop-container-big .prop-header span i {
    font-size: 16px;
    cursor: pointer;
}
.prop-container-big .prop-header .close-btn {
    width: 18px;
    height: 18px;
    cursor: pointer;
    background: #e74c3c;
    text-align: center;
    float: right;
    display: inline-block;
    margin-top: 11px;
    line-height: 14px;
    border-radius: 50%;
}
.prop-container-big .prop-main {
    height: calc(100vh - 159px);
    padding: 20px 60px;
}
.prop-container-big .prop-footer {
    padding: 12px 0;
    background: #ecf0f1;
    height: 56px;
    border-radius: 0 0 5px 5px;
}
.prop-container-big .prop-footer .btn-container {
    width: 130px;
    margin: 0px auto;
}
/* 全屏弹框 end */

.refresh-btn {
    background: #18bc9c;
    border: 1px solid #18bc9c;
}
</style>
