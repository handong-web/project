<template>
    <div id="piechart"></div>
</template>

<script>
export default {
    name: 'piechart',
    data() {
        return {}
    },
    methods: {
        piechartInit() {
            const self = this
            let piechart = this.$echarts.init(
                document.getElementById('piechart')
            )
            piechart.setOption({
                title: { text: '饼图' },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data: [
                            { value: 235, name: '视频广告' },
                            { value: 274, name: '联盟广告' },
                            { value: 310, name: '邮件营销' },
                            { value: 335, name: '直接访问' },
                            { value: 400, name: '搜索引擎' }
                        ]
                    }
                ]
            })
            // 不冲突resize
            setTimeout(() => {
                window.addEventListener('resize', function() {
                    let piechart = self.$echarts.init(
                        document.getElementById('piechart')
                    )
                    piechart.resize()
                })
            }, 10)
        }
    },
    mounted() {
        this.piechartInit()
    }
}
</script>

<style scoped>
#piechart {
    width: 100%;
    height: 380px;
    margin-left: auto;
    margin-right: auto;
    float: right;
}
</style>


