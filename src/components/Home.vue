<template>
  <div class="main">
    <v-header></v-header>
    <v-sidebar></v-sidebar>
    <div class="page-content">
      <transition name="move" mode="out-in"><router-view/></transition>
    </div>
  </div>
</template>

<script>
  import vHeader from "@/components/layout/Header.vue"
  import vSidebar from "@/components/layout/Sidebar.vue"
  export default {
    name: 'Home',
    components:{vHeader,vSidebar},
    data () {
      return {}
    },
  }
</script>
<style scoped>
  html, body, #cesiumContainer {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .main{
    width: 100%;
    height: 100%;
    overflow: hidden
  }
  .page-content{
    position: absolute;
    left: 200px;
    right: 0;
    top: 70px;
    bottom: 0;
    width: auto;
    box-sizing: border-box;
    overflow-y: scroll;
    padding:50px;
  }
</style>
