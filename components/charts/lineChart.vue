<template>
    <div id="linechart"></div>
</template>

<script>
export default {
    name: 'linechart',
    data() {
        return {}
    },
    methods: {
        linechartInit() {
            const self = this
            let linechart = this.$echarts.init(
                document.getElementById('linechart')
            )
            linechart.setOption({
                title: {
                    text: 'PRODUCTS SALES'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {
                            show: true
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        },
                        magicType: {
                            type: ['line', 'bar']
                        }
                    }
                },
                grid: {
                    left: '2%',
                    right: '2%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec'
                        ]
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Electronics',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { color: '#ffc2a4' },
                        smooth: true,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#ffc2a4'
                                }
                            }
                        },
                        data: [0, 240, 0, 0, 0, 0, 0, 8, 0, 0, 300, 0]
                    },
                    {
                        name: 'Apparel',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { color: '#ff9eac' },
                        smooth: true,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#ff9eac'
                                }
                            }
                        },
                        data: [0, 0, 0, 190, 25, 150, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        name: 'Decor',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { color: '#4dcbcd' },
                        smooth: true,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#4dcbcd'
                                }
                            }
                        },
                        data: [0, 0, 0, 80, 0, 0, 0, 0, 150, 0, 0, 0]
                    }
                ]
            })
            // 不冲突resize
            setTimeout(() => {
                window.addEventListener('resize', function() {
                    let linechart = self.$echarts.init(
                        document.getElementById('linechart')
                    )
                    linechart.resize()
                })
            }, 10)
        }
    },
    mounted() {
        this.linechartInit()
    }
}
</script>

<style scoped>
#linechart {
    width: 100%;
    height: 380px;
}
</style>
