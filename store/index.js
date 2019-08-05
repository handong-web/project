import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    hideLeftMenu: false,
    currentHref: "",
    updateMenu: true
})

export const mutations = {
    changeMenu(state) {
        state.hideLeftMenu = !state.hideLeftMenu
    },
    jumpUrl(state,params) {
        state.currentHref = params
    },
    startUpdate(state) {
        state.updateMenu = !state.updateMenu
        state.updateMenu = true
    }
}