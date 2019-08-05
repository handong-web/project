<template>
    <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        router
        :default-active="$store.state.currentHref"
        unique-opened
    >
        <i
            @click="switchMenu"
            :class="isCollapse ? 'el-icon-more cross' : 'el-icon-more vertical'"
            ref="switchbtn"
        ></i>
        <div class="portrait-container-hide" v-if="hideMenu">
            <img class="portrait-img" src="@/assets/img/cc.png" />
        </div>
        <div class="portrait-container" v-else>
            <div class="portrait-header">
                <div class="portrait-left fl">
                    <img class="portrait-img" src="@/assets/img/cc.png" />
                </div>
                <div class="portrait-right fl">
                    <p>欢迎您：{{ user.name }}</p>
                    <p>角色：{{ user.role }}</p>
                </div>
            </div>
            <p class="text-btn"><i class="el-icon-edit-outline"></i>修改资料</p>
            <p class="text-btn"><i class="el-icon-mouse"></i>退出登录</p>
        </div>
        <!-- 一级菜单 -->
        <el-submenu
            v-for="(item, index) in newList"
            :key="index"
            :index="item.index"
        >
            <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item-group
                v-for="(item1, index) in item.menus"
                :key="index"
            >
                <el-menu-item :index="item1.href">
                    <i :class="item1.icon"></i>{{ item1.name }}
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
import eventBus from '@/util/eventBus'

export default {
    data() {
        return {
            isCollapse: false,
            hideMenu: false,
            props: ['listData'],
            user: {
                name: 'AKA Fucker',
                role: '超级管理员'
            },
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
                }
            ],
            homeList: [
                {
                    name: '首页',
                    icon: 'el-icon-s-home',
                    index: '0',
                    menus: [
                        {
                            name: '首页子页面',
                            href: '/home',
                            icon: 'el-icon-link'
                        },
                        {
                            name: 'Dashboard',
                            href: '/homeDashboard',
                            icon: 'el-icon-link'
                        }
                    ]
                }
            ],
            merchantsList: [
                {
                    name: '商户',
                    icon: 'el-icon-s-home',
                    index: '0',
                    menus: [
                        {
                            name: '商户子页面',
                            href: '/merchants',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '商户组件',
                            href: '/merchantsComponents',
                            icon: 'el-icon-link'
                        }
                    ]
                }
            ],
            productList: [
                {
                    name: '产品',
                    icon: 'el-icon-s-home',
                    index: '0',
                    menus: [
                        {
                            name: '发布新产品',
                            href: '/product',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '出售中产品',
                            href: '/productSell',
                            icon: 'el-icon-link'
                        },
                        {
                            name: '表单验证',
                            href: '/productValidation',
                            icon: 'el-icon-link'
                        },
                        // {
                        //     name: 'asd',
                        //     href: '/ticketeditor',
                        //     icon: 'el-icon-link'
                        // },
                    ]
                }
            ],
            selectPage: '/home'
        }
    },
    mounted() {
        if (document.body.offsetWidth < '1100') {
            this.$store.commit('changeMenu')
            this.isCollapse = !this.isCollapse
            this.hideMenu = !this.hideMenu
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath)
        },
        switchMenu() {
            this.$store.commit('changeMenu')
            this.isCollapse = !this.isCollapse
            this.hideMenu = !this.hideMenu
            var vertical = document.getElementsByClassName('vertical')[0]
            var cross = document.getElementsByClassName('cross')[0]
            this.isCollapse
                ? (vertical.style.transform = 'rotate(0deg)')
                : (cross.style.transform = 'rotate(90deg)')
        }
    },
    watch: {
        $route(to, from) {
            // console.log(to.path)
        }
    },
    computed: {
        newList: function() {
            switch (this.$route.path.slice(0, 5)) {
                case '/home':
                    return this.homeList
                    break
                case '/merc':
                    return this.merchantsList
                    break
                case '/prod':
                    return this.productList
            }
        }
    }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-icon-more {
    margin: 0 auto;
    display: block;
    font-size: 18px;
    width: 18px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
}
.cross {
    transition: all 0.3s ease-out;
    transform: rotate(0deg);
}
.vertical {
    transition: all 0.3s ease-out;
    transform: rotate(90deg);
}
.el-icon-more {
    margin: 0 auto;
    display: block;
    font-size: 18px;
    width: 18px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
}
.el-menu {
    height: calc(100vh - 60px);
}
.portrait-container {
    width: 199px;
    height: 120px;
    background: url(../assets/img/head.jpg) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
}
.portrait-container-hide {
    width: 100%;
    height: 70px;
    background: url(../assets/img/head.jpg) no-repeat;
    background-size: 100% 100%;
    padding: 6px 0;
}
.portrait-img {
    width: 55px;
    height: auto;
    display: block;
    border-radius: 50%;
    margin: 0 auto;
    box-shadow: 0 10px 40px 0 rgba(62, 57, 107, 0.07),
        0 2px 9px 0 rgba(62, 57, 10);
}
.portrait-header {
    height: 80px;
}
.portrait-header .portrait-left {
    margin: 10px 0 0 10px;
}
.portrait-header .portrait-right {
    margin-top: 10px;
    font-size: 12px;
    color: #fff;
    margin: 22px 0 0 15px;
}
.portrait-header .portrait-right p {
    line-height: 18px;
}
.portrait-container .text-btn {
    color: #fff;
    font-size: 14px;
    width: 50%;
    float: left;
    text-align: center;
    cursor: pointer;
}
/* 旋转 */
@keyframes rotatefresh {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(90deg);
        transition: all 0.6s;
    }
}
</style>

