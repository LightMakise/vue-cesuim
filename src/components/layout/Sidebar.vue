<template>
  <div class="sidebar">

    <el-menu default-active="datalist" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <el-menu-item index="datalist">
        <template slot="title">
          <i class="el-icon-printer"></i>
          <span>飞行航程</span>
        </template>
      </el-menu-item>
      <el-menu-item index="airline">
        <template slot="title">
          <i class="el-icon-sort"></i>
          <span>航线模拟</span>
        </template>
      </el-menu-item>
      <el-menu-item index="form">
        <template slot="title">
          <i class="el-icon-date"></i>
          <span>基本表单</span>
        </template>
      </el-menu-item>
      <el-menu-item index="charts">
        <template slot="title">
          <i class="el-icon-date"></i>
          <span>图表</span>
        </template>
      </el-menu-item>

      <!--<el-submenu index="2">-->
        <!--<template slot="title">-->
          <!--<i class="el-icon-location"></i>-->
          <!--<span>导航一</span>-->
        <!--</template>-->
        <!--<el-submenu index="1-4">-->
          <!--<template slot="title">选项4</template>-->
          <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
        <!--</el-submenu>-->
      <!--</el-submenu>-->
      <!--<el-menu-item index="3">-->
        <!--<i class="el-icon-menu"></i>-->
        <!--<span slot="title">导航二</span>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="4">-->
        <!--<i class="el-icon-setting"></i>-->
        <!--<span slot="title">导航三</span>-->
      <!--</el-menu-item>-->
    </el-menu>

  </div>
</template>

<script>
  export default {
    name: 'Sidebar',
    data () {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .sidebar{
    position: absolute;
    top: 70px;
    left: 0;
    width: 200px;
    height: 100%
  }
  .el-menu-vertical-demo{
    height: 100%;
  }
</style>
