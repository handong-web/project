<template>
    <el-row>
        <div class="hidden-md-and-down">
            <transition
                name="el-fade-in-linear"
                v-if="$store.state.hideLeftMenu"
            >
                <img class="moblielogo" src="@/assets/img/mobilelogo.png" />
            </transition>
            <transition
                name="el-fade-in-linear"
                v-if="!$store.state.hideLeftMenu"
            >
                <img class="logo" src="@/assets/img/logo.png" />
            </transition>

            <!-- 导航管理 -->
            <el-col :span="2" class="nav-management">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <p class="nav-management-title">导航管理 |</p>
                    </span>
                    <el-dropdown-menu
                        slot="dropdown"
                        class="nav-management-main"
                    >
                        <el-dropdown-item
                            v-for="(item, index) in menuList"
                            :key="index"
                            class="management-table"
                        >
                            <p class="management-th">{{ item.name }}</p>
                            <p
                                v-for="(itemSon, index) in item.menus"
                                :key="index"
                            >
                                {{ itemSon.name }}
                            </p>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <!-- 导航管理 end -->
            <el-col class="input-container">
                <el-input v-model="input" placeholder="活动搜索"></el-input>
            </el-col>
            <el-col :span="10">
                <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    router
                    :default-active="hrefArea"
                >
                    <!-- <p>{{ $route.path.slice(0, 10) }}</p> -->
                    <el-menu-item
                        v-for="(item, index) in navList"
                        :key="index"
                        :index="item.href"
                        @click="changeMenu(item.href)"
                        >{{ item.name }}</el-menu-item
                    >
                </el-menu>
            </el-col>
            <el-col class="right-header">
                <i class="el-icon-full-screen" @click="fullScreen"></i>
                <i class="el-icon-refresh-right"></i>
                <el-dropdown trigger="click" class="more-link">
                    <span class="el-dropdown-link">
                        <i class="el-icon-s-custom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-user-solid">
                            <span @click="$router.push('/home')">个人中心</span>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-wallet">
                            <span @click="$router.push('/merchants')"
                                >充值</span
                            >
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-switch-button">
                            <span @click="$router.push('/')">退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </div>
        <div class="hidden-lg-and-up mobile-header">
            <el-dropdown trigger="click" class="menu-link">
                <span class="el-dropdown-link">
                    <i class="el-icon-menu"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="(item, index) in navList"
                        :key="index"
                    >
                        <router-link :to="item.href">{{
                            item.name
                        }}</router-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <img class="mobile-logo" src="@/assets/img/logo.png" />
            <el-dropdown trigger="click" class="more-link">
                <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-user-solid">
                        <span @click="$router.push('/home')">个人中心</span>
                    </el-dropdown-item>
                    <el-dropdown-item icon="el-icon-wallet">
                        <span @click="$router.push('/merchants')">充值</span>
                    </el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button">
                        <span @click="$router.push('/')">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-row>
</template>

<script>
import eventBus from '@/util/eventBus'
import 'element-ui/lib/theme-chalk/display.css'

export default {
    data() {
        return {
            activeIndex: '1',
            navList: [
                {
                    href: '/home',
                    name: '首页'
                },
                {
                    href: '/merchants',
                    name: '商户'
                },
                {
                    href: '/product',
                    name: '产品'
                },
                {
                    href: '/',
                    name: '用户'
                },
                {
                    href: '/',
                    name: '微信'
                },
                {
                    href: '/',
                    name: '佣金'
                },
                {
                    href: '/',
                    name: '网站'
                },
                {
                    href: '/',
                    name: '扩展'
                },
                {
                    href: '/',
                    name: '学习'
                },
                {
                    href: '/',
                    name: '设置'
                }
            ],
            menuList: [
                {
                    name: '产品管理',
                    icon: 'el-icon-s-home',
                    index: '0',
                    menus: [
                        {
                            name: '发布中产品',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '出售中产品',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '仓库中产品',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '销售渠道配置',
                            href: '/home',
                            icon: 'el-icon-link'
                        }
                    ]
                },
                {
                    name: '销售管理',
                    icon: 'el-icon-s-home',
                    index: '1',
                    menus: [
                        {
                            name: '产品预定',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '订单查询',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '票券验证',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '退票审核',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '计调下单',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '异常订单处理',
                            href: '/home',
                            icon: 'el-icon-link'
                        }
                    ]
                },
                {
                    name: '直销管理',
                    icon: 'el-icon-s-home',
                    index: '2',
                    menus: [
                        {
                            name: 'B端首页配置',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '线下票务系统',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: 'B2C商城配置',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: 'OTA平台配置',
                            href: '/home',
                            icon: 'el-icon-link'
                        }
                    ]
                },
                {
                    name: '产品管理',
                    icon: 'el-icon-s-home',
                    index: '0',
                    menus: [
                        {
                            name: '发布中产品',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '出售中产品',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '仓库中产品',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '销售渠道配置',
                            href: '/home',
                            icon: 'el-icon-link'
                        }
                    ]
                },
                {
                    name: '销售管理',
                    icon: 'el-icon-s-home',
                    index: '1',
                    menus: [
                        {
                            name: '产品预定',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '订单查询',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '票券验证',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '退票审核',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '计调下单',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '异常订单处理',
                            href: '/home',
                            icon: 'el-icon-link'
                        }
                    ]
                },
                {
                    name: '直销管理',
                    icon: 'el-icon-s-home',
                    index: '2',
                    menus: [
                        {
                            name: 'B端首页配置',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '线下票务系统',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: 'B2C商城配置',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: 'OTA平台配置',
                            href: '/home',
                            icon: 'el-icon-link'
                        }
                    ]
                }
            ],
            input: '',
            hrefArea: 'home',
            fullscreen: false
        }
    },
    mounted() {
        var self = this
        window.onresize = function temp() {}
        // if (this.$route.path.slice(0,5) == '/home') {
        //     self.hrefArea = '/home'
        // }
        switch (this.$route.path.slice(0, 5)) {
            case '/home':
                self.hrefArea = '/home'
                break
            case '/merc':
                self.hrefArea = '/merchants'
                break
            case '/prod':
                self.hrefArea = '/product'
        }
    },
    methods: {
        // handleSelect(key, keyPath) {
        //     console.log(key, keyPath)
        // }
        changeMenu(params) {
            eventBus.$emit('changeMenu', params)
            this.$store.commit('startUpdate')
        },
        // 全屏
        fullScreen() {
            let element = document.documentElement
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen()
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen()
                }
            }
            this.fullscreen = !this.fullscreen
        }
    }
}
</script>

<style scoped>
.el-menu {
    background: #0072d2;
    margin-left: 20px;
    width: 580px;
}
.el-menu-item {
    color: #fff !important;
    padding: 0 15px;
}
.el-menu-item:hover {
    background: #1c8fef !important;
}
.el-menu-item:visited {
    background: #1c8fef !important;
}
.el-menu--horizontal > .el-menu-item.is-active {
    border: none !important;
    background: #1c8fef !important;
}
.input-container {
    width: 140px;
}
.logo {
    width: 170px;
    margin: 10px 15px 0 15px;
    height: auto;
    float: left;
}
.moblielogo {
    width: 40px;
    margin: 10px 12px 0 12px;
    height: auto;
    float: left;
}
.right-header {
    width: 70px;
    float: right;
}
.right-header i {
    line-height: 60px;
    color: #fff;
    cursor: pointer;
}
.mobile-header {
    height: 60px;
    overflow: hidden;
    position: relative;
}
.mobile-logo {
    width: 140px;
    height: auto;
    display: block;
    margin: 14px auto;
}
.mobile-header .menu-link {
    position: absolute;
    top: 20px;
    left: 10px;
}
.mobile-header .more-link {
    position: absolute;
    top: 20px;
    right: 10px;
}
.mobile-header .el-icon-menu {
    top: 20px;
    left: 10px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
}
.mobile-header .el-icon-more {
    top: 20px;
    right: 10px;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
}
.nav-management {
    width: 70px;
}
.nav-management-title {
    color: #fff;
    line-height: 60px;
    cursor: pointer;
}
.nav-management-main {
    width: 652px;
}
.el-dropdown-menu {
    padding: 10px;
}
.management-table {
    border: 1px solid #ccc;
    width: 200px;
    height: 260px;
    margin: 5px;
    float: left;
}
.management-th {
    color: #0072d2;
    font-weight: 600;
    font-size: 16px;
}
</style>

