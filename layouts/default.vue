<template>
    <div>
        <!-- <p>{{$store.state.currentHref}}</p> -->
        <el-container>
            <el-header>
                <pc-header />
            </el-header>
            <el-container>
                <el-aside v-if="hackReset">
                    <left-menu />
                </el-aside>
                <!-- <el-main
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                > -->
                <el-main>
                    <nuxt />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import leftMenu from '@/components/leftMenu'
import header from '@/components/header'

export default {
    data() {
        return {
            name: 'default',
            loading: true,
            notLoading: false,
            hackReset: true
        }
    },
    mounted() {
        this.$store.commit('jumpUrl', this.$route.path)
    },
    components: {
        'left-menu': leftMenu,
        'pc-header': header
    },
    watch: {
        $route(to, from) {
            this.$store.commit('jumpUrl', to.path)
            this.hackReset = false
            this.$nextTick(() => {
                this.hackReset = true
            })
        }
    },
    computed: {}
}
</script>


<style>
.el-header {
    background: #0072d2;
    padding: 0;
    height: auto !important;
}
.el-aside {
    width: auto !important;
}
.el-main {
    background: #f4f6f9;
}
</style>
