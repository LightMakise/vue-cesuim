<template>
  <div class="header">
    <div class="title color-white font-22 text-center">无人机监控平台</div>
    <div class="operation">
      <i class="el-icon-setting color-white font-22"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  .header{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    background: #182538;
    line-height: 70px;
  }
  .header .title{
    float: left;
    width: 300px;
  }
  .header .operation{
    float: right;
    margin-right: 50px;
  }
</style>
