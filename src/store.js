import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
Vue.prototype.$axios = axios;

export default new Vuex.Store({
  state: {
    name: null,
    avatar: null,
  },
  mutations: {

  },
  actions: {

  }
})
