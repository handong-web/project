<template>
    <div class="container" id="ticketContainer" ref="ticketContainer">
        <!-- fix nav -->
        <span class="current-ticket-nav" v-if="showFixnav"
            >当前票：
            <p>{{ ticketname[ticketsIndex].name }}</p></span
        >
        <div class="fix-nav" v-if="showFixnav">
            <div class="windlass-container">
                <a href="#orderhref">下单</a>
                <a href="#payhref">支付</a>
                <a href="#noticehref">通知</a>
                <a href="#collecthref">取票</a>
                <a href="#dateValidhref">有效期及验证</a>
                <a href="">退改</a>
                <a href="">其他</a>
            </div>
        </div>

        <el-row>
            <ul class="href-container">
                <li @click="backProduct">产品信息</li>
                <li>票属性</li>
            </ul>
            <el-col :span="24">
                <el-card class="noradius-card cyan">
                    <el-form ref="form" :model="ticketform" label-width="90px">
                        <el-form-item label="活动名称：">
                            <span>{{ ticketform.name }}</span>
                        </el-form-item>
                        <el-form-item label="票名称：">
                            <el-input
                                v-for="(item, index) in ticketname"
                                :key="index"
                                placeholder="请输入内容"
                                v-model="item.name"
                                class="ticket-name"
                                v-on:click.native="getNameIndex(index)"
                                @blur="getBlur(item)"
                            >
                                <el-button
                                    slot="append"
                                    icon="el-icon-delete"
                                    @click="deleteticketname(index)"
                                ></el-button>
                            </el-input>
                            <el-button @click="addTicket">添加票</el-button>
                            <el-button @click="copyAdd">复制添加</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
                <!-- 票价表格 -->
                <el-card class="noradius-card">
                    <!-- <p>{{ priceform[ticketsIndex] }}</p> -->
                    <div class="price-head">
                        <span>预定时间段（同 票类不能重复）</span>
                        <span>日库存</span>
                        <span>成本价</span>
                        <span>建议零售价</span>
                        <span>窗口价</span>
                        <span>门市价</span>
                        <span class="add-price" @click="addTicketPrice">
                            <i class="el-icon-document-add"></i>
                        </span>
                    </div>
                    <div
                        class="price-body"
                        v-for="(item, index) in priceform[ticketsIndex]"
                        :key="index"
                    >
                        <div class="item-box">
                            <el-date-picker
                                v-model="priceform[ticketsIndex][index].time"
                                type="daterange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']"
                                style="width:90%;"
                            >
                            </el-date-picker>
                        </div>
                        <div class="item-box">
                            <el-input
                                v-model="
                                    priceform[ticketsIndex][index].inventory
                                "
                            ></el-input>
                        </div>
                        <div class="item-box">
                            <el-input
                                v-model="priceform[ticketsIndex][index].costOf"
                            ></el-input>
                        </div>
                        <div class="item-box">
                            <el-input
                                v-model="
                                    priceform[ticketsIndex][index].retailPrice
                                "
                            ></el-input>
                        </div>
                        <div class="item-box">
                            <el-input
                                v-model="
                                    priceform[ticketsIndex][index].windowPrice
                                "
                            ></el-input>
                        </div>
                        <div class="item-box">
                            <el-input
                                v-model="priceform[ticketsIndex][index].outlets"
                            ></el-input>
                        </div>
                        <div class="item-box">
                            <i
                                v-if="priceform[ticketsIndex].length > 1"
                                class="el-icon-delete"
                                @click="deletePrice(index)"
                            ></i>
                        </div>
                    </div>
                </el-card>
                <!-- 票价表格 end -->
                <div class="ccc windlass-container">
                    <a href="#orderhref">下单</a>
                    <a href="#payhref">支付</a>
                    <a href="#noticehref">通知</a>
                    <a href="#collecthref">取票</a>
                    <a href="#dateValidhref">有效期及验证</a>
                    <a href="">退改</a>
                    <a href="">其他</a>
                </div>

                <div v-for="(item, index) in ticketname" :key="index">
                    <div
                        class="all-form noradius-card"
                        v-if="ticketsIndex == index"
                    >
                        <!-- 下单 -->
                        <el-form
                            id="orderhref"
                            ref="form"
                            :model="
                                allList[0].ticketItem[ticketsIndex].orderForm
                            "
                            label-width="125px"
                            class="border-form"
                            label-position="left"
                        >
                            <h1 class="blue-title">下单</h1>
                            <el-form-item label="票说明：">
                                <el-input
                                    type="textarea"
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.instructions
                                    "
                                ></el-input>
                            </el-form-item>

                            <el-form-item label="提前预定：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.orderState.reservation
                                    "
                                >
                                    <el-radio-button
                                        label="当天可预订"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="需提前预定"
                                    ></el-radio-button>
                                </el-radio-group>
                                <div
                                    v-if="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.orderState.reservation ==
                                            '需提前预定'
                                    "
                                    class="editor-show"
                                >
                                    需提前
                                    <el-input-number
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .orderForm.reservation
                                                .advanceDays
                                        "
                                        controls-position="right"
                                        @change="handleChange"
                                        class="number-ipt"
                                    ></el-input-number>
                                    天，并在
                                    <el-input
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .orderForm.reservation
                                                .advanceHours
                                        "
                                        class="number-ipt"
                                    ></el-input>
                                    时
                                    <el-input
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .orderForm.reservation
                                                .advanceMinutes
                                        "
                                        class="number-ipt"
                                    ></el-input>
                                    分前预定
                                </div>
                            </el-form-item>

                            <el-form-item label="可售渠道：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.orderState.channel
                                    "
                                >
                                    <el-radio-button
                                        label="全部"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="选择渠道"
                                    ></el-radio-button>
                                </el-radio-group>
                                <div
                                    v-if="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.orderState.channel ==
                                            '选择渠道'
                                    "
                                    class="editor-show"
                                >
                                    <el-select
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .orderForm.channel
                                        "
                                        multiple
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="item in allList[0]
                                                .ticketItem[ticketsIndex]
                                                .orderForm.channelOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-form-item>

                            <el-form-item label="下单人数：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.orderState.numberOfPeople
                                    "
                                >
                                    <el-radio-button
                                        label="不限"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="限制数量"
                                    ></el-radio-button>
                                </el-radio-group>
                                <div
                                    v-if="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.orderState
                                            .numberOfPeople == '限制数量'
                                    "
                                    class="editor-show"
                                >
                                    每次下单数量：最少
                                    <el-input
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .orderForm.numberOfPeople.min
                                        "
                                        class="number-ipt"
                                    ></el-input>
                                    张， 最多
                                    <el-input
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .orderForm.numberOfPeople.most
                                        "
                                        class="number-ipt"
                                    ></el-input>
                                    张
                                </div>
                            </el-form-item>

                            <el-form-item label="购票限制：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.orderState.limit
                                    "
                                >
                                    <el-radio-button
                                        label="不限"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="限制"
                                    ></el-radio-button>
                                </el-radio-group>
                                <div
                                    v-if="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.orderState.limit ==
                                            '限制'
                                    "
                                    class="editor-show"
                                >
                                    每个
                                    <el-select
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .orderForm.limit.phoneAddId
                                        "
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="item in allList[0]
                                                .ticketItem[ticketsIndex]
                                                .orderForm.phoneAddIdOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                    <el-input
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .orderForm.limit.days
                                        "
                                        class="number-ipt"
                                    ></el-input>
                                    天内，限购
                                    <el-input
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .orderForm.limit.tickets
                                        "
                                        class="number-ipt"
                                    ></el-input>
                                    <el-select
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .orderForm.limit.unit
                                        "
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="item in allList[0]
                                                .ticketItem[ticketsIndex]
                                                .orderForm.unitOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-form-item>

                            <el-form-item label="实名制：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.orderState.realName
                                    "
                                >
                                    <el-radio-button
                                        label="无需"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="仅需一位游客身份证"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="所有游客需填写身份证"
                                    ></el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="适合年龄：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.orderState.age
                                    "
                                >
                                    <el-radio-button
                                        label="不限"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="限制"
                                        disabled
                                    ></el-radio-button>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="下单时风险提示：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.orderState.riskWarning
                                    "
                                >
                                    <el-radio-button
                                        label="不启用"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="启用"
                                    ></el-radio-button>
                                </el-radio-group>
                                <div
                                    v-if="
                                        allList[0].ticketItem[ticketsIndex]
                                            .orderForm.orderState.riskWarning ==
                                            '不启用'
                                    "
                                >
                                    <span
                                        >例：购买蹦极产品，下单前需要提示"心脏病请勿购票"等提示性信息</span
                                    >
                                </div>
                                <div class="editor-show" v-else>
                                    <el-input
                                        type="textarea"
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .orderForm.riskWarning
                                        "
                                    ></el-input>
                                </div>
                            </el-form-item>
                        </el-form>
                        <!-- 支付 -->
                        <el-form
                            id="payhref"
                            ref="form"
                            :model="allList[0].ticketItem[ticketsIndex].payForm"
                            label-width="125px"
                            class="border-form"
                            label-position="left"
                        >
                            <h1 class="blue-title">支付</h1>
                            <el-form-item label="付款方式：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .payForm.payState.amount
                                    "
                                >
                                    <el-radio-button
                                        label="在线支付"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="现场支付"
                                    ></el-radio-button>
                                </el-radio-group>
                                <span class="ccc-tip"
                                    >在票类生成后无法修改</span
                                >
                                <div
                                    v-if="
                                        allList[0].ticketItem[ticketsIndex]
                                            .payForm.payState.amount ==
                                            '在线支付'
                                    "
                                    class="editor-show"
                                >
                                    <el-input
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .payForm.amount
                                        "
                                        class="number-ipt"
                                    ></el-input>
                                    分钟未支付自动取消
                                </div>
                            </el-form-item>
                            <el-form-item label="折扣率：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .payForm.payState.discount
                                    "
                                >
                                    <el-radio-button
                                        label="无折扣"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="打折"
                                    ></el-radio-button>
                                </el-radio-group>
                                <div
                                    v-if="
                                        allList[0].ticketItem[ticketsIndex]
                                            .payForm.payState.discount == '打折'
                                    "
                                    class="editor-show"
                                >
                                    折扣率：
                                    <el-input
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .payForm.discount
                                        "
                                        class="number-ipt"
                                    ></el-input>
                                    <span class="ccc-tip"
                                        >在票类生成后无法修改</span
                                    >
                                </div>
                            </el-form-item>
                        </el-form>
                        <!-- 通知 -->
                        <el-form
                            id="noticehref"
                            ref="form"
                            :model="
                                allList[0].ticketItem[ticketsIndex].noticeForm
                            "
                            label-width="125px"
                            class="border-form"
                            label-position="left"
                        >
                            <h1 class="blue-title">通知</h1>
                            <el-form-item label="信息通知：">
                                供应商手机号
                                <el-input
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .noticeForm.phone
                                    "
                                    placeholder="请输入内容"
                                    class="normal-ipt"
                                ></el-input>
                                <span class="ccc-tip"
                                    >多个票类手机号需一致，否则无法通知</span
                                >
                                <p>
                                    <el-checkbox
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .noticeForm.way.visitorOkMes
                                        "
                                        >预定成功，短信发送入园凭证给游客</el-checkbox
                                    >
                                </p>
                                <p>
                                    <el-checkbox
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .noticeForm.way.supplierOkWhe
                                        "
                                        >预定成功，微信通知供应商(免费，需在票付通公众号绑定平台账号)</el-checkbox
                                    >
                                </p>
                                <p>
                                    <el-checkbox
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .noticeForm.way.supplierOkMes
                                        "
                                        >预定成功，短信通知供应商</el-checkbox
                                    >
                                </p>
                                <p>
                                    <el-checkbox
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .noticeForm.way.visitorNoMes
                                        "
                                        >取消订单，短信通知游客</el-checkbox
                                    >
                                </p>
                                <p>
                                    <el-checkbox
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .noticeForm.way.supplierNoMes
                                        "
                                        >取消订单，短信通知供应商</el-checkbox
                                    >
                                </p>
                            </el-form-item>
                        </el-form>
                        <!-- 取票 -->
                        <el-form
                            id="collecthref"
                            ref="form"
                            :model="
                                allList[0].ticketItem[ticketsIndex].collectForm
                            "
                            label-width="125px"
                            class="border-form"
                            label-position="left"
                        >
                            <h1 class="blue-title">取票</h1>
                            <el-form-item label="取票信息：">
                                <el-input
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .collectForm.message
                                    "
                                    placeholder="取票信息及取票地址（此信息将显示在给游客的预定短信中）"
                                    class="message-ipt"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="取票时间：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .collectForm.collectState.time
                                    "
                                >
                                    <el-radio-button
                                        label="不限"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="游玩当日可取"
                                    ></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="打印纸票：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .collectForm.collectState.paper
                                    "
                                >
                                    <el-radio-button
                                        label="不打印"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="一票种一张票"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="一人一票"
                                    ></el-radio-button>
                                </el-radio-group>
                                <span class="ccc-tip"
                                    >适用于纸质门票的打印，如自助机和云票务设备（不包括小票）</span
                                >
                            </el-form-item>
                            <el-form-item label="闸机播报内容：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .collectForm.collectState
                                            .brakeMachine
                                    "
                                >
                                    <el-radio-button
                                        label="播报票全称"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="自定义配置"
                                    ></el-radio-button>
                                </el-radio-group>
                                <span class="ccc-tip"
                                    >注：点击“播票全称”，则播报完整播报门票名，点击自定义则可自定义播报文字</span
                                >
                                <div
                                    class="editor-show"
                                    v-if="
                                        allList[0].ticketItem[ticketsIndex]
                                            .collectForm.collectState
                                            .brakeMachine == '自定义配置'
                                    "
                                >
                                    验证播报的文字：
                                    <el-input
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .collectForm.brakeMachine
                                        "
                                        placeholder="如'成人票'"
                                        class="message-ipt"
                                    ></el-input>
                                </div>
                            </el-form-item>
                            <el-form-item label="打印门票内容：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .collectForm.collectState.print
                                    "
                                >
                                    <el-radio-button
                                        label="打印票全称"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="自定义配置"
                                    ></el-radio-button>
                                </el-radio-group>
                                <span class="ccc-tip"
                                    >注：点击“打印票全称”，则票纸上打印完整门票名，点击自定义则可自定义打印票名称</span
                                >
                                <div
                                    class="editor-show"
                                    v-if="
                                        allList[0].ticketItem[ticketsIndex]
                                            .collectForm.collectState.print ==
                                            '自定义配置'
                                    "
                                >
                                    打印的文字：
                                    <el-input
                                        v-model="
                                            allList[0].ticketItem[ticketsIndex]
                                                .collectForm.print
                                        "
                                        placeholder="如'成人票'"
                                        class="message-ipt"
                                    ></el-input>
                                </div>
                            </el-form-item>
                        </el-form>
                        <!-- 有效期及验证 -->
                        <el-form
                            id="dateValidhref"
                            ref="form"
                            :model="
                                allList[0].ticketItem[ticketsIndex]
                                    .dateValidForm
                            "
                            label-width="125px"
                            class="border-form"
                            label-position="left"
                        >
                            <h1 class="blue-title">有效期及验证</h1>
                            <el-form-item label="取票时间：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .dateValidForm.dateValidState.date
                                    "
                                >
                                    <el-radio-button
                                        label="游玩日期当天"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="下单后X天"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="游玩日期前后X天"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="固定时间段"
                                    ></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="入园验证：">
                                <el-radio-group
                                    v-model="
                                        allList[0].ticketItem[ticketsIndex]
                                            .dateValidForm.dateValidState.valid
                                    "
                                >
                                    <el-radio-button
                                        label="整批入园"
                                    ></el-radio-button>
                                    <el-radio-button
                                        label="分批入园"
                                    ></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                        <el-button @click="saveAll">保存</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ticketeditor',
    layout: 'index',
    data() {
        return {
            // 控制fix nav显示/隐藏
            showFixnav: false,
            // 接收上一页面参数容器
            ticketform: {
                name: ''
            },
            // 保存当前票index
            ticketsIndex: 0,
            // 票名称
            ticketname: [{ name: '' }],
            // 票价
            priceform: [
                [
                    {
                        time: '',
                        inventory: '不限',
                        costOf: '0.00',
                        retailPrice: '0.00',
                        windowPrice: '0.00',
                        outlets: '0.00'
                    }
                ]
            ],

            // ***************************大表格*****************************
            // 票价表格

            // ************************************整合大表格************************************
            allList: [
                {
                    productType: '',
                    name: '',
                    regiment: false,
                    template: '',
                    levelOptions: '',
                    adress: '',
                    phone: '',
                    time: '',
                    ticketItem: [
                        {
                            // 下单
                            productType: '',
                            orderForm: {
                                instructions: '',
                                reservation: {
                                    advanceDays: '1',
                                    advanceHours: '23',
                                    advanceMinutes: '59'
                                },
                                channel: '',
                                numberOfPeople: {
                                    min: '1',
                                    most: '99'
                                },
                                limit: {
                                    phoneAddId: '',
                                    days: '0',
                                    tickets: '0',
                                    unit: '张票'
                                },
                                realName: '',
                                age: '',
                                riskWarning: '',
                                channelOptions: [
                                    {
                                        value: '1',
                                        label: '分销后台'
                                    },
                                    {
                                        value: '2',
                                        label: '微平台'
                                    },
                                    {
                                        value: '3',
                                        label: '微商城'
                                    },
                                    {
                                        value: '4',
                                        label: '小程序'
                                    },
                                    {
                                        value: '5',
                                        label: 'PC商城'
                                    }
                                ],
                                phoneAddIdOptions: [
                                    {
                                        value: '1',
                                        label: '手机号'
                                    },
                                    {
                                        value: '2',
                                        label: '身份证'
                                    },
                                    {
                                        value: '3',
                                        label: '手机+身份证号'
                                    }
                                ],
                                unitOptions: [
                                    {
                                        value: '1',
                                        label: '张票'
                                    },
                                    {
                                        value: '2',
                                        label: '笔订单'
                                    }
                                ],
                                orderState: {
                                    reservation: '当天可预订',
                                    channel: '选择渠道',
                                    numberOfPeople: '限制数量',
                                    limit: '限制',
                                    realName: '无需',
                                    age: '不限',
                                    riskWarning: '不启用'
                                }
                            },

                            // 支付
                            payForm: {
                                amount: '120',
                                discount: '0',
                                payState: {
                                    amount: '在线支付',
                                    discount: '无折扣'
                                }
                            },
                            // 通知
                            noticeForm: {
                                phone: '',
                                way: {
                                    visitorOkMes: true,
                                    supplierOkWhe: false,
                                    supplierOkMes: false,
                                    visitorNoMes: false,
                                    supplierNoMes: false
                                }
                            },
                            // 取票
                            collectForm: {
                                message: '',
                                time: '',
                                paper: '',
                                brakeMachine: '',
                                print: '',
                                collectState: {
                                    time: '不限',
                                    paper: '不打印',
                                    brakeMachine: '播报票全称',
                                    print: '自定义配置'
                                }
                            },
                            // 有效期及验证
                            dateValidForm: {
                                date: '',
                                valid: '',
                                validTime: {},
                                delayValid: {},
                                distribution: '',
                                dateValidState: {
                                    date: '游玩日期当天',
                                    valid: '分批入园',
                                    validTime: '有效期内均可验证',
                                    delayValid: '设置延时时间',
                                    distribution: '启用'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },
    components: {},
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    created() {
        this.ticketform = this.$route.query
        console.log('啊啊啊啊')
        // console.log(this.$route.query.params.productType)
    },
    methods: {
        handleScroll(e) {
            var top = document.documentElement.scrollTop
            // console.log(this.$refs.ticketContainer.scrollTop)
            // console.log(top)
            if (top > 200) {
                this.showFixnav = true
            } else {
                this.showFixnav = false
            }
        },
        // 添加票
        addTicket() {
            if (this.ticketname[this.ticketname.length - 1].name == '') {
                this.$message({
                    message: '票名称不能为空',
                    type: 'warning'
                })
                return
            }
            this.ticketname.push({ name: '' })
            console.log(this.ticketname)
            var newList = {
                // 下单
                orderForm: {
                    instructions: '',
                    reservation: {
                        advanceDays: '1',
                        advanceHours: '23',
                        advanceMinutes: '59'
                    },
                    channel: '',
                    numberOfPeople: {
                        min: '1',
                        most: '99'
                    },
                    limit: {
                        phoneAddId: '',
                        days: '0',
                        tickets: '0',
                        unit: '张票'
                    },
                    realName: '',
                    age: '',
                    riskWarning: '',
                    channelOptions: [
                        {
                            value: '1',
                            label: '分销后台'
                        },
                        {
                            value: '2',
                            label: '微平台'
                        },
                        {
                            value: '3',
                            label: '微商城'
                        },
                        {
                            value: '4',
                            label: '小程序'
                        },
                        {
                            value: '5',
                            label: 'PC商城'
                        }
                    ],
                    phoneAddIdOptions: [
                        {
                            value: '1',
                            label: '手机号'
                        },
                        {
                            value: '2',
                            label: '身份证'
                        },
                        {
                            value: '3',
                            label: '手机+身份证号'
                        }
                    ],
                    unitOptions: [
                        {
                            value: '1',
                            label: '张票'
                        },
                        {
                            value: '2',
                            label: '笔订单'
                        }
                    ],
                    orderState: {
                        reservation: '当天可预订',
                        channel: '选择渠道',
                        numberOfPeople: '限制数量',
                        limit: '限制',
                        realName: '无需',
                        age: '不限',
                        riskWarning: '不启用'
                    }
                },

                // 支付
                payForm: {
                    amount: '120',
                    discount: '0',
                    payState: {
                        amount: '在线支付',
                        discount: '无折扣'
                    }
                },
                // 通知
                noticeForm: {
                    phone: '',
                    way: {
                        visitorOkMes: true,
                        supplierOkWhe: false,
                        supplierOkMes: false,
                        visitorNoMes: false,
                        supplierNoMes: false
                    }
                },
                // 取票
                collectForm: {
                    message: '',
                    time: '',
                    paper: '',
                    brakeMachine: '',
                    print: '',
                    collectState: {
                        time: '不限',
                        paper: '不打印',
                        brakeMachine: '播报票全称',
                        print: '自定义配置'
                    }
                },
                // 有效期及验证
                dateValidForm: {
                    date: '',
                    valid: '',
                    validTime: {},
                    delayValid: {},
                    distribution: '',
                    dateValidState: {
                        date: '游玩日期当天',
                        valid: '分批入园',
                        validTime: '有效期内均可验证',
                        delayValid: '设置延时时间',
                        distribution: '启用'
                    }
                }
            }
            this.allList[0].ticketItem.push(newList)
            console.log('大表格')
            console.log(this.allList[0].ticketItem)

            // 票价表格 this.priceform
            let newTable = [
                {
                    time: '',
                    inventory: '不限',
                    costOf: '0.00',
                    retailPrice: '0.00',
                    windowPrice: '0.00',
                    outlets: '0.00'
                }
            ]
            this.priceform.push(newTable)
            console.log('票价表格')
            console.log(JSON.stringify(this.priceform))
        },
        // 深度克隆
        deepClone(obj) {
            let _obj = JSON.stringify(obj),
                objClone = JSON.parse(_obj)
            return objClone
        },
        // 复制添加
        copyAdd() {
            if (this.ticketname[this.ticketsIndex].name == '') {
                this.$message({
                    message: '复制的票名称不能为空',
                    type: 'warning'
                })
                return
            }
            let newName = this.deepClone(this.ticketname[this.ticketsIndex])
            this.ticketname.push(newName)
            let newList = this.deepClone(
                this.allList[0].ticketItem[this.ticketsIndex]
            )
            this.allList[0].ticketItem.push(newList)

            this.priceform.push(
                this.deepClone(this.priceform[this.ticketsIndex])
            )
        },
        deleteticketname(e) {
            if (this.ticketname.length == 1) {
                this.$message({
                    message: '最少保留一张票',
                    type: 'warning'
                })
                return
            }
            this.ticketname.splice(e, 1)
        },
        handleChange(value) {
            // console.log(value)
        },
        // 获取票名称index
        getNameIndex(e) {
            this.ticketsIndex = e
            // console.log(this.ticketsIndex)
        },
        // input失去焦点
        getBlur(e) {
            console.log(e.name)
            if (e.name == '') {
                this.$message({
                    message: '请填写票名称后再做其他操作',
                    type: 'warning'
                })
            }
        },
        // 保存提交
        saveAll() {
            for (var i = 0; i < this.allList[0].ticketItem.length; i++) {
                this.allList[0].ticketItem[i].ticketname = this.ticketname[i].name
                this.allList[0].ticketItem[i].productType = this.$route.query.productType
                this.allList[0].ticketItem[i].ticketPrice = this.priceform[i]
            }
            // let data = this.allList[0].ticketItem
            let data = this.allList
            
            console.log(this.ticketname)
            console.log(data)
            this.$axios
                .post('http://www.eniu.io/index.php?s=api/release/index', data)
                .then(res => {
                    console.log(res.data)
                })
        },
        // 返回产品
        backProduct() {
            let name = this.ticketform.name
            let productType = this.ticketform.productType
            this.$router.push({
                name: 'product',
                query: { name, productType }
            })
        },
        // 票价表格增加
        addTicketPrice() {
            let ticketPriceModel = {
                time: '',
                inventory: '不限',
                costOf: '0.00',
                retailPrice: '0.00',
                windowPrice: '0.00',
                outlets: '0.00'
            }
            let ticketPriceList = this.deepClone(ticketPriceModel)
            this.priceform[this.ticketsIndex].push(ticketPriceList)
        },
        // 删除票价表格
        deletePrice(e) {
            this.priceform.splice(e, 1)
        }
    }
}
</script>

<style scoped>
.href-container {
    width: 100%;
    height: 32px;
}
.href-container li {
    width: 50%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    float: left;
    font-size: 12px;
    cursor: pointer;
}
.href-container li:nth-child(1) {
    background: #e5e5e5;
    color: #333333;
}
.href-container li:nth-child(2) {
    background: #3dba3f;
    color: #ffffff;
}
.cyan {
    background: #d4e6fc;
}
.ccc {
    background: #f4f6f9;
}
.ticket-name {
    width: 200px;
    margin: 0 10px 10px 0;
}
.ticket-name:nth-child(1) {
    margin: 0 10px 10px 0;
}
.ticket-name:nth-child(4n + 1) {
    margin: 0 10px 10px 0;
}
.windlass-container {
    height: 40px;
}
.windlass-container a {
    color: #303133;
    width: 14.2%;
    display: block;
    float: left;
    text-align: center;
    cursor: pointer;
    line-height: 40px;
}
.windlass-container a:nth-child(1) {
    color: #457ed8;
    border-bottom: 2px solid #457ed8;
    margin-top: -2px;
}
.windlass-container a:hover {
    color: #457ed8;
}
.border-form {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}
.number-ipt {
    width: 100px;
}
.editor-show {
    margin-top: 10px;
}
.check-btn {
    color: #409eff;
    cursor: pointer;
}
.blue-title {
    color: #409eff;
}
.checkbox-container {
    margin-top: 15px;
}
.ccc-tip {
    font-size: 12px;
    color: #909399;
}
.normal-ipt {
    width: 200px;
}
.message-ipt {
    width: 400px;
}
.fix-nav {
    width: 60%;
    height: 40px;
    background: rgba(255, 255, 255, 0.9);
    z-index: 999;
    position: fixed;
    top: 65px;
    left: 30%;
    box-shadow: 0 5px 10px #e5e5e5;
    border: 1px solid #f5f5f5;
}
.all-form {
    padding: 20px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.current-ticket-nav {
    font-size: 12px;
    height: 40px;
    background: #409eff;
    opacity: 0.9;
    color: #fff;
    z-index: 999;
    position: fixed;
    top: 65px;
    left: calc(30% - 100px);
    border: 1px solid #f5f5f5;
    width: 100px;
    line-height: 18px;
    padding: 0 12px;
}
/* 票价表格 */
.price-head {
    background-color: #f3f1f1;
    padding: 15px;
    border: 1px solid #e5e5e5;
    color: #4c4e53;
    font-size: 12px;
    font-weight: 600;
    width: 90%;
}
.price-head span {
    width: 14%;
    text-align: left;
    display: inline-block;
}
.price-head span:nth-child(1) {
    width: 22%;
    display: inline-block;
}
.price-head span:nth-child(7) {
    width: 5%;
    display: inline-block;
}
.price-body {
    width: 90%;
    padding: 15px;
    border: 1px solid #e5e5e5;
    border-top: none;
    overflow: hidden;
    height: 70px;
}
.price-body .item-box {
    width: 14%;
    height: 20px;
    float: left;
}
.price-body .item-box:nth-child(1) {
    width: 22%;
}
.price-body .item-box:nth-child(7) {
    width: 5%;
}
.price-body .item-box .el-input {
    width: 80%;
}
.add-price {
    font-size: 16px;
    cursor: pointer;
}
.item-box .el-icon-delete {
    margin-left: 24px;
    line-height: 40px;
    font-size: 20px;
    font-weight: 900;
    cursor: pointer;
}
.item-box .el-icon-delete:hover {
    color: #ff4500;
}
</style>
