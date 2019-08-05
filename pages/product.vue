<template>
    <div class="container">
        <el-row>
            <el-col :span="24">
                <el-card>
                    <div slot="header">
                        <span>发布产品</span>
                    </div>
                    <div v-if="!editShow">
                        <ul class="product-container">
                            <li
                                @click="eidtTicket(item.type)"
                                v-for="(item, index) in productType"
                                :key="index"
                            >
                                <div>
                                    <p>{{ item.title }}</p>
                                    <p><el-button>创建票务</el-button></p>
                                    <img :src="item.img" />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <el-steps :active="2" align-center>
                            <el-step title="产品类型"></el-step>
                            <el-step title="景区信息"></el-step>
                            <el-step title="门票信息"></el-step>
                        </el-steps>
                        <el-form
                            ref="form"
                            :model="form"
                            label-width="80px"
                            class="productform"
                        >
                            <el-form-item label="景点名称">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="允许报团">
                                <el-checkbox
                                    name="type"
                                    v-model="form.regiment"
                                ></el-checkbox>
                            </el-form-item>
                            <el-form-item label="景点模板">
                                <el-button @click="editRow">选择</el-button>
                                <p
                                    class="attractions-template"
                                    v-if="form.template == ''"
                                >
                                    请选择景点模板
                                </p>
                                <p class="attractions-template" v-else>
                                    {{ form.template }}
                                </p>
                            </el-form-item>
                            <el-form-item label="景区级别">
                                <el-select
                                    v-model="form.levelOptions"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in levelOptionsList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <el-form-item label="所在地区"> </el-form-item> -->
                            <el-form-item label="所在地址">
                                <el-input v-model="form.adress"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <el-input v-model="form.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="开放时间">
                                <el-input v-model="form.time"></el-input>
                            </el-form-item>
                            <el-form-item label="旅游主题">
                                <el-checkbox
                                    name="type"
                                    v-model="form.theme.historic"
                                    >爱上古迹</el-checkbox
                                >
                                <el-checkbox
                                    name="type"
                                    v-model="form.theme.sea"
                                    >逐海踏浪</el-checkbox
                                >
                                <el-checkbox
                                    name="type"
                                    v-model="form.theme.holiday"
                                    >度假山庄</el-checkbox
                                >
                                <el-checkbox
                                    name="type"
                                    v-model="form.theme.drifting"
                                    >激情漂流</el-checkbox
                                >
                                <el-checkbox
                                    name="type"
                                    v-model="form.theme.city"
                                    >城市风光</el-checkbox
                                >
                                <el-checkbox
                                    name="type"
                                    v-model="form.theme.landscape"
                                    >乐游山水</el-checkbox
                                >
                                <el-checkbox
                                    name="type"
                                    v-model="form.theme.culture"
                                    >文化追根</el-checkbox
                                >
                                <el-checkbox
                                    name="type"
                                    v-model="form.theme.themepark"
                                    >主题乐园</el-checkbox
                                >
                                <el-checkbox
                                    name="type"
                                    v-model="form.theme.hotsprings"
                                    >温泉养生</el-checkbox
                                >
                                <el-checkbox
                                    name="type"
                                    v-model="form.theme.waterworld"
                                    >水世界</el-checkbox
                                >
                                <el-checkbox
                                    name="type"
                                    v-model="form.theme.iceworld"
                                    >冰雪世界</el-checkbox
                                >
                            </el-form-item>
                            <el-form-item
                                label="预订须知"
                                style="height:400px;"
                            >
                                <Editor
                                    v-model="contentOne"
                                    style="height:300px;"
                                />
                            </el-form-item>
                            <el-form-item
                                label="景点详情"
                                style="height:400px;"
                            >
                                <Editor
                                    v-model="contentTwo"
                                    style="height:300px;"
                                />
                            </el-form-item>
                            <el-form-item label="缩略图">
                                <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :limit="1"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                >
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" />
                                </el-dialog>
                            </el-form-item>
                            <el-form-item label="展示图">
                                <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :limit="5"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="fileList"
                                    list-type="picture"
                                >
                                    <el-button size="small" type="primary"
                                        >点击上传</el-button
                                    >
                                    <div slot="tip" class="el-upload__tip">
                                        最多上传5张，只能上传jpg/png文件，且不超过500kb
                                    </div>
                                </el-upload>
                            </el-form-item>
                        </el-form>
                        <el-button @click="saveForm">保存，下一步</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 拖动弹框 -->
        <transition name="el-zoom-in-center" class="prop-box">
            <div id="single-line" :class="propClass" v-show="showProp">
                <div class="prop-header" @mousedown="mousedown">
                    <span style="float:left;">景点模板</span>
                    <span
                        style="float:right;"
                        class="close-btn"
                        @click="closeProp"
                        >x</span
                    >
                </div>
                <div class="prop-main scroll-card">
                    <p class="prop-prompt green-prompt">
                        选择模板后将自动填入相应的景点信息（填入后可再编辑）
                    </p>
                    <p class="prop-prompt">
                        输入关键字，查找/选择对应的景点
                    </p>
                    <el-select
                        v-model="form.template"
                        filterable
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in templateOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="prop-footer">
                    <div class="btn-container">
                        <el-button
                            type="success"
                            size="small"
                            style="background:#18bc9c;border:1px solid #18bc9c;"
                            @click="saveTemplate"
                            >确定</el-button
                        >
                        <el-button
                            type="warning"
                            size="small"
                            plain
                            @click="cancelTemplate"
                            >取消</el-button
                        >
                    </div>
                </div>
            </div>
        </transition>
        <!-- 拖动弹框 end -->
    </div>
</template>


<script>
import Editor from '@/components/Editor'
export default {
    name: 'product',
    layout: 'index',
    data() {
        return {
            // 富文本
            contentOne: '<p>请在此编辑预订须知</p>',
            contentTwo: '<p>请在此编辑景点详情</p>',
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [
                // {
                //     name: 'food.jpeg',
                //     url:
                //         'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // },
                // {
                //     name: 'food2.jpeg',
                //     url:
                //         'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // }
            ],
            editShow: false,
            showProp: false,
            propClass: 'prop-container',
            form: {
                productType: '',
                name: '',
                regiment: false,
                template: '',
                levelOptions: '',
                adress: '',
                phone: '',
                time: '',
                theme: {
                    historic: false,
                    sea: false,
                    holiday: false,
                    drifting: false,
                    city: false,
                    landscape: false,
                    culture: false,
                    themepark: false,
                    hotsprings: false,
                    waterworld: false,
                    iceworld: false
                }
            },
            levelOptionsList: [
                {
                    value: '选项1',
                    label: 'AAAAA'
                },
                {
                    value: '选项2',
                    label: 'AAAA'
                },
                {
                    value: '选项3',
                    label: 'AAA'
                },
                {
                    value: '选项4',
                    label: 'AA'
                },
                {
                    value: '选项5',
                    label: 'A'
                },
                {
                    value: '选项6',
                    label: '非A级'
                }
            ],
            templateOptions: [
                {
                    value: '迎泽公园',
                    label: '迎泽公园'
                },
                {
                    value: '晋祠公园',
                    label: '晋祠公园'
                },
                {
                    value: '绵山',
                    label: '绵山'
                },
                {
                    value: '五台山',
                    label: '五台山'
                },
                {
                    value: '平遥古城',
                    label: '平遥古城'
                }
            ],
            productType: [
                {
                    title: '景区 票务',
                    img: require('@/assets/img/product/conference-1.png'),
                    type: 'scenicSpot'
                },
                {
                    title: '旅游 线路',
                    img: require('@/assets/img/product/startup-1.png'),
                    type: 'tourism'
                },
                {
                    title: '剧场 演出',
                    img: require('@/assets/img/product/culture-1.png'),
                    type: 'theatre'
                },
                {
                    title: '套票 产品',
                    img: require('@/assets/img/product/welfare-1.png'),
                    type: 'packages'
                },
                {
                    title: '餐饮 产品',
                    img: require('@/assets/img/product/parent-1.png'),
                    type: 'restaurant'
                },
                {
                    title: '度假 酒店',
                    img: require('@/assets/img/product/sport-1.png'),
                    type: 'holiday'
                },
                {
                    title: '年卡 套餐',
                    img: require('@/assets/img/product/party-1.png'),
                    type: 'yearCard'
                },
                {
                    title: '旅游 特产',
                    img: require('@/assets/img/product/exhibit-1.png'),
                    type: 'specialty'
                }
            ]
        }
    },
    created() {
        console.log(this.$route.query.name)
        if (this.$route.query.name == undefined) {
            this.editShow = false
        } else {
            this.editShow = true
            this.form.name = this.$route.query.name
            this.form.productType = this.$route.query.productType
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log(file)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        // 图片上传 end
        eidtTicket(params) {
            // console.log(e)
            this.form.productType = params
            this.editShow = !this.editShow
        },
        onSubmit() {
            console.log('submit!')
        },
        editRow() {
            // 初始化弹窗大小
            this.propClass = 'prop-container'
            this.showProp = true
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
        },
        // 保存
        saveForm() {
            let name = this.form.name
            let regiment = this.form.regiment
            let productType = this.form.productType
            let template = this.form.template
            let levelOptions = this.form.levelOptions
            let adress = this.form.adress
            let phone = this.form.phone
            let time = this.form.time
            this.$router.push({
                name: 'ticketeditor',
                query: {
                    name,
                    regiment,
                    productType,
                    template,
                    levelOptions,
                    adress,
                    phone,
                    time
                }
            })
            console.log(this.form)
        },
        // 保存景点模板
        saveTemplate() {
            if (this.form.template == '') {
                this.$message({
                    message: '请选择景点模板',
                    type: 'warning'
                })
                return
            }
            this.showProp = false
            this.form.levelOptions = '选项1'
            this.form.adress = '山西省太原市'
            this.form.phone = '18801117272'
            this.form.time = '2019.7.20 - 2019.7.31'
            this.form.theme.historic = true
            this.form.theme.drifting = true
            this.form.theme.landscape = true
            this.form.theme.culture = true
        },
        // 取消景点模板
        cancelTemplate() {
            this.form.template = ''
            this.showProp = false
        },
        // 富文本
        onEditorBlur(editor) {
            //失去焦点事件
            console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
            //获得焦点事件
            console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        },
        onEditorChange({ editor, html, text }) {
            //内容改变事件
            console.log('editor change!', text)
            this.content = html
        }
    },
    components: {
        Editor
    }
}
</script>

<style>
.productform .el-input {
    width: 280px;
}
.el-step {
    margin-bottom: 20px;
}
.product-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 0;
    min-width: 1020px;
}
.product-container li {
    flex-grow: 1;
    width: 22%;
    height: 273px;
    margin: 30px 15px;
    cursor: pointer;
}

.product-container li div {
    width: 210px;
    height: 273px;
    margin: 0 auto;
    border-radius: 5px;
    position: relative;
}
.product-container li div img {
    transition: opacity 1s;
    opacity: 1;
    position: absolute;
    width: 210px;
    height: 273px;
    border-radius: 5px;
    top: 0;
    left: 0;
}
.product-container li div:hover img {
    opacity: 0;
    transition: all 1s ease;
}
.product-container li div p:nth-child(1) {
    height: 40px;
    opacity: 0.75;
    border-radius: 5px 5px 0 0;
    font-size: 28px;
    line-height: 40px;
    color: #fff;
    text-align: center;
}
.product-container li:nth-child(1) div p,
.product-container li:nth-child(7) div p {
    background: #2a8fdd;
}
.product-container li:nth-child(2) div p,
.product-container li:nth-child(8) div p {
    background: #ff6703;
}
.product-container li:nth-child(3) div p,
.product-container li:nth-child(6) div p {
    background: #4fd240;
}
.product-container li:nth-child(4) div p,
.product-container li:nth-child(5) div p {
    background: #38dec1;
}

.product-container li div p:nth-child(2) {
    height: 64px;
    background: #f9f4f1;
    border-radius: 0 0 5px 5px;
    margin-top: 170px;
    padding: 11px 0;
}
.product-container li div p:nth-child(2) .el-button {
    background: #1ab394;
    display: block;
    width: 126px;
    height: 40px;
    font-size: 18px;
    font-weight: 500;
    margin: 0 auto;
    color: #fff;
}
.product-container li:nth-child(1) div {
    background: url(../assets/img/product/conference-2.jpg);
}
.product-container li:nth-child(2) div {
    background: url(../assets/img/product/startup-2.jpg);
}
.product-container li:nth-child(3) div {
    background: url(../assets/img/product/culture-2.jpg);
}
.product-container li:nth-child(4) div {
    background: url(../assets/img/product/welfare-2.jpg);
}
.product-container li:nth-child(5) div {
    background: url(../assets/img/product/parent-2.jpg);
}
.product-container li:nth-child(6) div {
    background: url(../assets/img/product/sport-2.jpg);
}
.product-container li:nth-child(7) div {
    background: url(../assets/img/product/party-2.jpg);
}
.product-container li:nth-child(8) div {
    background: url(../assets/img/product/exhibit-2.jpg);
}
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
    padding: 20px;
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
.prop-prompt {
    font-size: 12px;
    margin: 10px 0;
}
.green-prompt {
    color: #3dba3f;
}
/* 正常尺寸弹框 end */
.el-select-dropdown {
    z-index: 9999999 !important;
}
.attractions-template {
    border: 1px solid #ccc;
    color: #2a98da;
    width: 160px;
    text-align: center;
    margin-top: 10px;
}
</style>
