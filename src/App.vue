<template>
  <div id="app">
    <main-header></main-header>
      <router-view></router-view>
    <main-footer></main-footer>    
  </div>
</template>

<script>
import MainHeader from '@/components/zhangqi/MainHeader.vue'
import MainFooter from '@/components/zhangqi/MainFooter.vue'
export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter,
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;

  min-width: 1180px;
}
</style>
