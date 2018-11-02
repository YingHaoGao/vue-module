import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Mine from './views/mine/index'
import SearchPage from "./views/SearchPage.vue"
import DownloadDetailPage from "./views/DownloadDetailPage.vue"
import TVplayPage from './views/TVplayPage.vue'
import SpecialPage from './views/SpecialPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    //搜索页面
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage
    },
    //下载页面
    {
      path: '/download-detail',
      name: 'DownloadDetailPage',
      component: DownloadDetailPage
    },
    //播放页面
    {
      path: '/tvplay-page',
      name: 'TVplayPage',
      component: TVplayPage
    },
    //专区页面
    {
      path: '/special-page',
      name: 'SpecialPage',
      component: SpecialPage
    },
    // 个人中心
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
  ]
})
