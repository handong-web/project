<template>
    <div>
        <!-- 1 -->
        <el-row>
            <el-col
                :xs="24"
                :sm="24"
                :md="12"
                :lg="6"
                :xl="6"
                v-for="(item, index) in overviewList"
                :key="index"
            >
                <el-card class="four-pie">
                    <p :style="{ color: item.color }">{{ item.name }}</p>
                    <p>{{ item.value }}</p>
                    <div class="progress-container">
                        <el-progress
                            :color="item.color"
                            type="circle"
                            :percentage="item.progress"
                            :stroke-width="15"
                        ></el-progress>
                    </div>
                    <p>{{ item.detailvalue }}</p>
                    <p :style="{ color: item.color }">{{ item.detailname }}</p>
                </el-card>
            </el-col>
        </el-row>
        <!-- 2 -->
        <el-row :gutter="30">
            <el-col :xs="12" :sm="12" :md="16" :lg="16" :xl="17">
                <el-card>
                    <line-chart />
                </el-card>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="7">
                <el-card>
                    <pie-chart />
                </el-card>
            </el-col>
        </el-row>
        <!-- 3 -->
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card class="run-container">
                    <div class="run-box">
                        <div class="fl little-pic"></div>
                        <div class="fl run-message">
                            <p>Running</p>
                            <p>Walk - Run Training</p>
                        </div>
                    </div>
                    <div class="run-box">
                        <p>Distance (Last Week)</p>
                        <el-progress
                            :text-inside="true"
                            :percentage="45"
                            color="#16D39A"
                        ></el-progress>
                        <p>80 KM</p>
                    </div>
                    <div class="run-box">
                        <img src="@/assets/img/zhu.png" alt="" />
                    </div>
                    <div class="run-box">
                        <p><i class="el-icon-time"></i>56:55 Hrs</p>
                        <p>Anverage Running Time</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 4 -->
        <el-row :gutter="30">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>DAILY DIET</span>
                    </div>
                    <div class="level-table">
                        <p>Some quick example text to build on the card.</p>
                        <p>
                            Protein Milk<span style="background:#00B5B8;"
                                >2</span
                            >
                        </p>
                        <p>
                            oz Water<span style="background:#2DCEE3;">4</span>
                        </p>
                        <p>
                            Vegetable Juice<span style="background:#FF7588;"
                                >8</span
                            >
                        </p>
                        <p>
                            Sugar Free Jello-O<span style="background:#FFA87D;"
                                >1</span
                            >
                        </p>
                        <p>
                            Protein Meal<span style="background:#16D39A;"
                                >3</span
                            >
                        </p>
                        <el-link :underline="false">Card link</el-link>
                        <el-link :underline="false">Another link</el-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <el-card class="move-container">
                    <div class="move-top">
                        <div class="left-top">
                            <p>14</p>
                            <p>Nov</p>
                        </div>
                        <i class="el-icon-refresh-right"></i>
                        <i class="el-icon-light-rain move-icon"></i>
                        <div class="move-message">
                            <p>Windy</p>
                            <p>Beijing, China</p>
                        </div>
                    </div>
                    <div class="move-bottom">
                        <div>
                            <i class="el-icon-light-rain"></i>
                            <p>2MPH</p>
                        </div>
                        <div>
                            <i class="el-icon-sunrise"></i>
                            <p>2%</p>
                        </div>
                        <div>
                            <i class="el-icon-magic-stick"></i>
                            <p>13.0°</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <el-card style="height:468px;"
                    ><img
                        src="@/assets/img/table.png"
                        alt=""
                        style="width:100%;"
                /></el-card>
            </el-col>
        </el-row>
        <!-- 5 -->
        <el-row :gutter="30">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <el-card class="p-0">
                    <div class="switch-top">
                        <el-carousel
                            height="150px"
                            arrow="never"
                            style="background:#CCC;"
                        >
                            <el-carousel-item v-for="item in 3" :key="item">
                                <h3 class="small">576x384</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="switch-bottom">
                        <p class="small-title">HEALTH NEWS & FITNESS ADVICE</p>
                        <p class="card-message">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </p>
                        <p class="card-message">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </p>
                        <el-link :underline="false">Card link</el-link>
                        <el-link :underline="false">Another link</el-link>
                    </div>
                    <div class="switch-footer">
                        <span>2 days ago</span>
                        <div class="fr">
                            <span class="little-tag green">Branding</span>
                            <span class="little-tag pink">Design</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <el-card></el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <el-card></el-card>
                <el-card></el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import LineChart from '@/components/charts/lineChart'
import PieChart from '@/components/charts/pieChart'

export default {
    name: 'Home',
    // 阻塞页面=>鉴权
    // middleware: "auth",
    components: {
        'line-chart': LineChart,
        'pie-chart': PieChart
    },
    data() {
        return {
            overviewList: [
                {
                    name: 'Steps',
                    value: '3,261',
                    progress: 85,
                    detailvalue: '65%',
                    detailname: '↑ Completed',
                    color: '#00B5B8'
                },
                {
                    name: 'Distance',
                    value: '7.6 mile',
                    progress: 75,
                    detailvalue: '10',
                    detailname: "Miles Today's Target",
                    color: '#FF7588'
                },
                {
                    name: 'Calories',
                    value: '4,025 kcal',
                    progress: 90,
                    detailvalue: '5000',
                    detailname: "kcla Today's Target",
                    color: '#FFA87D'
                },
                {
                    name: 'Heart Rate',
                    value: '102 BPM',
                    progress: 80,
                    detailvalue: '125',
                    detailname: 'BPM Highest',
                    color: '#16D39A'
                }
            ]
        }
    },
    methods: {}
}
</script>

<style scoped>
.four-pie p {
    text-align: center;
}
.four-pie p:nth-child(1) {
    font-size: 16px;
}
.four-pie p:nth-child(2) {
    font-size: 42px;
    color: #404e67;
}
.four-pie p:nth-child(4) {
    font-size: 24px;
    color: #404e67;
}
.four-pie .progress-container {
    width: 126px;
    margin: 10px auto;
}
/* runing container */
.run-box {
    width: calc(25% + 1px);
    height: 64px;
    overflow: hidden;
    float: left;
    border-right: 1px solid #eceff1;
}
.run-box img {
    margin: 0 auto;
    display: block;
    margin-top: 18px;
}
.run-container .run-box:nth-child(2) {
    padding: 0 15px;
}
.run-container .run-box:nth-child(2) p:nth-child(1) {
    font-size: 14px;
    color: #404e67;
    margin-bottom: 5px;
}
.run-container .run-box:nth-child(2) p:nth-child(3) {
    font-size: 14px;
    color: #404e67;
    margin-top: 5px;
    font-weight: 500;
}
.run-container .run-box:nth-child(4) {
    width: calc(25% - 3px);
    border: none;
    text-align: center;
}
.run-container .run-box .little-pic {
    width: 64px;
    height: 100%;
    background: #cccccc;
}
.run-container p {
    font-size: 16px;
    color: #303133;
}
.run-container .run-box .run-message {
    text-indent: 20px;
}
.run-container .run-box .run-message p:nth-child(1) {
    margin-top: 10px;
    font-weight: 500;
}
.move-container {
    background: #0cc27e;
}
/* 移动动画 */
@keyframes move {
    0% {
        transform: translate(0px, 0px);
    }

    50% {
        transform: translate(50%, 0px);
    }

    100% {
        transform: translate(0px, 0px);
    }
}
@keyframes moveTop {
    0% {
        transform: translate(0px, 0px);
    }

    50% {
        transform: translate(0px, 4px);
    }

    100% {
        transform: translate(0px, 0px);
    }
}

/* 移动动画 end */
.move-icon {
    animation: move 3s infinite;
    position: absolute;
    left: 25%;
    width: 50%;
    font-size: 100px;
    color: #10c888;
    margin-top: 95px;
}
.move-top {
    background: #b9f2e1;
    position: relative;
    left: -20px;
    top: -20px;
    width: calc(100% + 40px);
    height: 300px;
}
.move-top .left-top {
    width: 54px;
    text-align: center;
    color: #ffffff;
    padding: 14px;
    background: #39daa9;
    float: left;
}
.move-top .el-icon-refresh-right {
    float: right;
    font-size: 24px;
    font-weight: 900;
    color: #10c888;
    margin: 20px;
}
.move-top .move-message {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
}
.move-top .move-message p:nth-child(1) {
    font-size: 14px;
    color: #10c888;
}
.move-top .move-message p:nth-child(2) {
    font-size: 20px;
    color: #06b76c;
    margin-bottom: 20px;
}
.move-bottom {
    width: calc(100% + 40px);
    height: 130px;
    position: relative;
    left: -20px;
    top: -20px;
    background: #0cc27e;
    overflow: hidden;
}
.move-bottom div {
    margin-top: 50px;
    width: 33.33%;
    float: left;
    text-align: center;
    color: #ffffff;
}
.move-bottom div i {
    font-size: 28px;
    animation: moveTop 1s infinite;
}
/* level-table */
.level-table p {
    border-bottom: 1px solid #e4e7ed;
    padding: 17px 0 17px 0;
}
.level-table p span {
    float: right;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 17px;
}
.el-link {
    margin-top: 20px;
    color: #009c9f;
}

.switch-bottom .el-link {
    text-indent: 20px;
    margin: 0 0 30px;
}
.switch-footer {
    padding: 20px;
    border-top: 1px solid #e4e7ed;
}
</style>

