<template>
    <div class="container">
        <el-row>
            <el-col :span="24">
                <el-card>
                    <ul class="self-tab">
                        <li>自供应产品</li>
                        <li>资源中心</li>
                    </ul>
                    <div>
                        <el-button
                            class="release-product"
                            icon="el-icon-circle-plus"
                            >发布产品</el-button
                        >
                    </div>

                    <region></region>
                    <span class="input-label">产品类型：</span>
                    <!-- 产品类型 -->
                    <el-select v-model="productTypeValue" class="small-select">
                        <el-option
                            v-for="item in productTypeOptions"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <el-checkbox v-model="onlyProduct">仅列出产品</el-checkbox>
                    <el-link
                        :underline="false"
                        type="primary"
                        @click="
                            () => {
                                this.moreConditions = !this.moreConditions
                            }
                        "
                        >更多筛选条件</el-link
                    >
                    <transition
                        name="el-zoom-in-top"
                        class="more-conditions-box"
                    >
                        <div v-show="moreConditions" class="transition-box">
                            <span class="input-label">终端号：</span>
                            <el-input
                                v-model="terminalNumber"
                                class="small-input"
                            ></el-input>
                            <span class="input-label">发布产品时间：</span>
                            <el-date-picker
                                v-model="releaseDate"
                                type="daterange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']"
                            >
                            </el-date-picker>
                            <span class="input-label">状态：</span>
                            <el-checkbox v-model="overdue">过期</el-checkbox>
                        </div>
                    </transition>
                    <div class="search-container">
                        <el-select v-model="productFilter">
                            <el-option
                                v-for="item in productFilterOption"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-input
                            placeholder="请输入产品名称或产品ID或6位数产品编号"
                            v-model="finallySearch"
                            prefix-icon="el-icon-search"
                            class="large-input"
                        >
                        </el-input>
                        <el-button
                            type="primary"
                            icon="el-icon-search"
                            @click="searchAll"
                            >搜索</el-button
                        >
                        <el-button icon="el-icon-s-platform">导出</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div
                    class="table-item"
                    v-for="(item, index) in tableForm"
                    :key="index"
                >
                    <div class="table-message">
                        <!-- 表格图片 -->
                        <div class="img-container">
                            <img :src="item.img" />
                        </div>
                        <!-- 表格详情 -->
                        <div class="message-container">
                            <p style="margin-top:-15px;">
                                <span>[{{ item.city }} {{ item.area }}]</span>
                                <span>{{ item.level }}</span>
                                <span>终端号：{{ item.terminal }}</span>
                                <el-button type="text" v-if="item.terminalSet"
                                    >分终端设置</el-button
                                >
                                <el-button type="text" v-if="item.refresh"
                                    >刷新产品</el-button
                                >
                                <el-button type="text" v-if="item.upgradeCode"
                                    >升8位凭证码</el-button
                                ><span style="color:#777;">（减少重码）</span>
                            </p>
                            <p>
                                <span class="ticket-name">{{ item.name }}</span>
                                <span>(ID: {{ item.id }})</span>
                            </p>
                            <p>供应商：{{ item.supplier }}</p>
                            <p>地址： {{ item.adress }}</p>
                        </div>
                        <!-- 表格操作 -->
                        <div class="operation-container">
                            <el-button type="text" v-if="item.btnGroup.shelves"
                                >下架</el-button
                            >
                            <el-button type="text" v-if="item.btnGroup.modify"
                                >修改</el-button
                            >
                            <el-button
                                type="text"
                                v-if="item.btnGroup.addTicketClass"
                                >添加票类</el-button
                            >
                            <el-button
                                type="text"
                                v-if="item.btnGroup.ticketValidation"
                                >票券验证</el-button
                            >
                            <el-button
                                type="text"
                                v-if="item.btnGroup.tourInformation"
                                >导览信息</el-button
                            >
                            <el-button
                                type="text"
                                v-if="item.btnGroup.sessionManagement"
                                >场次管理</el-button
                            >
                            <el-button
                                type="text"
                                v-if="item.btnGroup.venueManagement"
                                >场馆管理</el-button
                            >
                            <el-button
                                type="text"
                                v-if="item.btnGroup.distributionInventory"
                                >分销库存</el-button
                            >
                            <el-button
                                type="text"
                                v-if="item.btnGroup.viewPassword"
                                >查看密码</el-button
                            >
                            <el-button
                                type="text"
                                v-if="item.btnGroup.ticketClassGrouping"
                                >票类分组</el-button
                            >
                        </div>
                    </div>
                    <div class="table-son">
                        <ul>
                            <li>产品ID</li>
                            <li>票名称</li>
                            <li>成本价</li>
                            <li>建议零售价</li>
                            <li>门市价</li>
                            <li>到期时间</li>
                            <li>状态</li>
                            <li>操作</li>
                        </ul>

                        <ul
                            style="background:#FFF;"
                            v-for="(sonItem, sonIndex) in item.table"
                            :key="sonIndex"
                        >
                            <li>{{ sonItem.productID }}</li>
                            <li style="color:#457ED8;">
                                {{ sonItem.ticketName }}
                            </li>
                            <li style="color:#FF8A00;font-size:14px;">
                                ￥{{ sonItem.costPrice }}
                            </li>
                            <li>￥{{ sonItem.suggestedRetailPrice }}</li>
                            <li>￥{{ sonItem.marketPrice }}</li>
                            <li>{{ sonItem.dueTime }}</li>
                            <li>{{ sonItem.state }}</li>
                            <li>
                                <el-button
                                    size="mini"
                                    v-if="sonItem.operation.distributionPrice"
                                    >分销价格</el-button
                                ><el-button
                                    size="mini"
                                    v-if="sonItem.operation.bundledTickets"
                                    >捆绑门票</el-button
                                ><el-button
                                    size="mini"
                                    v-if="sonItem.operation.shelves"
                                    style="background:#F07845;color:#FFF;"
                                    >下架</el-button
                                ><el-button
                                    size="mini"
                                    v-if="sonItem.operation.delete"
                                    style="background:#F07845;color:#FFF;"
                                    >删除</el-button
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import region from '@/components/region'

export default {
    name: 'productSell',
    layout: 'index',
    data() {
        return {
            productTypeOptions: [
                { value: '不限' },
                { value: '景点' },
                { value: '线路' },
                { value: '酒店' },
                { value: '套票' },
                { value: '演出' },
                { value: '年卡' },
                { value: '餐饮' },
                { value: '特产' },
                { value: '计时' }
            ],
            productTypeValue: '不限',
            onlyProduct: false,
            moreConditions: false,
            terminalNumber: '',
            releaseDate: '',
            overdue: '',
            productFilterOption: [
                { value: '产品名称' },
                { value: '景区ID' },
                { value: '资源ID' }
            ],
            productFilter: '产品名称',
            finallySearch: '',
            tableForm: [
                {
                    img: require('@/assets/img/product/conference-1.png'),
                    city: '北京市',
                    area: '东城区',
                    level: '非A级',
                    terminal: '150358',
                    terminalSet: true,
                    refresh: true,
                    upgradeCode: true,
                    name: 'asdasd',
                    id: '998366',
                    supplier: ' 梦想小镇测试账号',
                    adress:
                        '河北省秦皇岛市抚宁县南戴河国际娱乐中心碧海金沙海滩',
                    btnGroup: {
                        shelves: true,
                        modify: true,
                        addTicketClass: true,
                        ticketValidation: true,
                        tourInformation: true,
                        sessionManagement: true,
                        venueManagement: true,
                        distributionInventory: true,
                        viewPassword: true,
                        ticketClassGrouping: true
                    },
                    table: [
                        {
                            productID: '2|144432|388282',
                            ticketName: '解决',
                            costPrice: '12.00',
                            suggestedRetailPrice: '12.00',
                            marketPrice: '12.00',
                            dueTime: '2019-12-31',
                            state: '正常',
                            operation: {
                                distributionPrice: true,
                                bundledTickets: true,
                                shelves: true,
                                delete: true
                            }
                        }
                    ]
                },
                {
                    img: require('@/assets/img/product/conference-1.png'),
                    city: '北京市',
                    area: '东城区',
                    level: '非A级',
                    terminal: '150358',
                    terminalSet: true,
                    refresh: true,
                    upgradeCode: true,
                    name: 'asdasd',
                    id: '998366',
                    supplier: ' 梦想小镇测试账号',
                    adress:
                        '河北省秦皇岛市抚宁县南戴河国际娱乐中心碧海金沙海滩',
                    btnGroup: {
                        shelves: true,
                        modify: true,
                        addTicketClass: true,
                        ticketValidation: true,
                        tourInformation: true,
                        sessionManagement: true,
                        venueManagement: true,
                        distributionInventory: true,
                        viewPassword: true,
                        ticketClassGrouping: true
                    },
                    table: [
                        {
                            productID: '2|144432|388282',
                            ticketName: '解决',
                            costPrice: '12.00',
                            suggestedRetailPrice: '12.00',
                            marketPrice: '12.00',
                            dueTime: '2019-12-31',
                            state: '正常',
                            operation: {
                                distributionPrice: true,
                                bundledTickets: true,
                                shelves: true,
                                delete: true
                            }
                        }
                    ]
                },
                {
                    img: require('@/assets/img/product/conference-1.png'),
                    city: '北京市',
                    area: '东城区',
                    level: '非A级',
                    terminal: '150358',
                    terminalSet: true,
                    refresh: true,
                    upgradeCode: true,
                    name: 'asdasd',
                    id: '998366',
                    supplier: ' 梦想小镇测试账号',
                    adress:
                        '河北省秦皇岛市抚宁县南戴河国际娱乐中心碧海金沙海滩',
                    btnGroup: {
                        shelves: true,
                        modify: true,
                        addTicketClass: true,
                        ticketValidation: true,
                        tourInformation: true,
                        sessionManagement: true,
                        venueManagement: true,
                        distributionInventory: true,
                        viewPassword: true,
                        ticketClassGrouping: true
                    },
                    table: [
                        {
                            productID: '2|144432|388282',
                            ticketName: '解决',
                            costPrice: '12.00',
                            suggestedRetailPrice: '12.00',
                            marketPrice: '12.00',
                            dueTime: '2019-12-31',
                            state: '正常',
                            operation: {
                                distributionPrice: true,
                                bundledTickets: true,
                                shelves: true,
                                delete: true
                            }
                        }
                    ]
                }
            ]
        }
    },
    created() {},
    components: { region },
    methods: {
        searchAll() {
            alert(this.comsys.email('handognZasd@asdasd.com'))
        }
    }
}
</script>

<style scoped>
.self-tab {
    width: 100%;
    border-bottom: 1px solid #457ed8;
    height: 36px;
    margin-bottom: 10px;
}
.self-tab li {
    float: left;
    padding: 0 20px;
    font-size: 14px;
    height: 35px;
    line-height: 35px;
    color: #262d37;
    border-top: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    cursor: pointer;
}
.self-tab li:nth-child(1) {
    background: #457ed8;
    border: 1px solid #457ed8;
    font-weight: 600;
    color: #fff;
}
.release-product {
    margin-bottom: 10px;
}

.more-conditions-box {
    background: red;
    margin-top: 20px;
}
.transition-box {
    margin: 10px 0;
}

.large-input {
    width: 360px;
}
.search-container {
    margin-top: 10px;
}
.table-item {
    padding: 15px 10px 0;
    background: #fff;
    overflow: hidden;
    font-size: 12px;
    color: #4c4e53;
    margin-top: 15px;
}
.ticket-name {
    font-size: 14px;
    font-weight: 800;
    color: #457ed8;
}
.table-item .img-container {
    width: 122px;
    height: 92px;
    padding: 5px;
    border: 1px solid #ddd;
    float: left;
    margin: 0 4px;
}
.table-item .img-container img {
    width: 100%;
    height: 100%;
}
.table-item .message-container {
    width: calc(80% - 146px);
    height: 92px;
    padding: 5px;
    float: left;
    margin: 0 4px;
}
.table-item .message-container p {
    line-height: 20px;
}
.table-item .el-button {
    font-size: 12px;
}
.table-item .operation-container {
    width: 20%;
    height: 92px;
    padding: 5px;
    float: left;
    margin: 0 4px;
}
.table-item .operation-container .el-button {
    padding: 6px 0px;
}
.table-item .table-son {
    width: calc(100% + 20px);
    margin: 100px 0 0 -10px;
    background: #fafafa;
}
.table-item .table-son ul {
    height: 44px;
    border-bottom: 1px solid #e5e5e5;
}
.table-item .table-son ul li {
    float: left;
    height: 44px;
    line-height: 44px;
    width: 10%;
    text-align: center;
}
.table-item .table-son ul li:nth-last-child(1) {
    width: 30%;
}
</style>
