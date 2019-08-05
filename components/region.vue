<template>
    <div class="region-container">
        <!-- 地区 -->
        <el-select
            v-model="overseasValue"
            clearable
            placeholder="请选择地区"
            @change="overseasChange(overseasValue)"
            class="form-select"
        >
            <el-option
                v-for="item in overseasOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value"
            >
            </el-option>
        </el-select>
        <!-- 国家 -->
        <el-select
            v-model="countryValue"
            clearable
            placeholder="请选择省份/国家"
            @change="countryChange(countryValue)"
            no-data-text="请先选择地区"
            class="form-select"
        >
            <el-option
                v-for="item in countryOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value"
            >
            </el-option>
        </el-select>
        <!-- 城市 -->
        <el-select
            v-model="cityValue"
            clearable
            placeholder="请选择城市"
            @change="countryChange(cityValue)"
            no-data-text="请先选择省份/国家 "
            class="form-select"
        >
            <el-option
                v-for="item in cityOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value"
            >
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            overseasOptions: [
                {
                    value: '境内'
                },
                {
                    value: '境外'
                }
            ],
            overseasValue: '',
            countryOptions: [],
            countryValue: '',
            cityOptions: [],
            cityValue: '',
        }
    },

    methods: {
        overseasChange(e) {
            console.log(e)
            this.countryValue = ''
        },
        countryChange(e) {
            console.log(e)
        },
        cityChange(e) {
            console.log(e)
        }
    },
    watch: {
        overseasValue() {
            if (this.overseasValue == '境内') {
                this.countryOptions = [
                    { value: '北京市' },
                    { value: '天津市' },
                    { value: '上海市' },
                    { value: '重庆市' },
                    { value: '河北省' },
                    { value: '山西省' },
                    { value: '辽宁省' },
                    { value: '吉林省' },
                    { value: '江苏省' },
                    { value: '浙江省' },
                    { value: '安徽省' },
                    { value: '福建省' },
                    { value: '江西省' },
                    { value: '山东省' },
                    { value: '河南省' },
                    { value: '湖北省' },
                    { value: '湖南省' },
                    { value: '广东省' },
                    { value: '海南省' },
                    { value: '四川省' },
                    { value: '贵州省' },
                    { value: '云南省' },
                    { value: '陕西省' },
                    { value: '甘肃省' },
                    { value: '青海省' },
                    { value: '黑龙江省' },
                    { value: '西藏自治区' },
                    { value: '内蒙古自治区' },
                    { value: '广西壮族自治区' },
                    { value: '宁夏回族自治区' },
                    { value: '新疆维吾尔自治区' },
                    { value: '香港' },
                    { value: '澳门' },
                    { value: '台湾' }
                ]
            } else if (this.overseasValue == '境外') {
                this.countryOptions = [
                    { value: '泰国' },
                    { value: '日本' },
                    { value: '澳大利亚' },
                    { value: '韩国' },
                    { value: '越南' },
                    { value: '柬埔寨' },
                    { value: '俄罗斯' },
                    { value: '欧洲' }
                ]
            } else if (this.overseasValue == '') {
                this.countryOptions = []
            }
        }
    }
}
</script>
<style scoped>
.region-container {
    display: inline-block;
}
</style>

