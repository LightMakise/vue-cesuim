<template>

  <div class="p-datalist">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-printer"></i> 列表</el-breadcrumb-item>
        <el-breadcrumb-item>飞行航程</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ope pull-right">
      <el-button type="success" @click="exportExcel">导出</el-button>
    </div>
    <el-table
      id="datatable"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="start"
        label="起始地"
        width="180">
      </el-table-column>
      <el-table-column
        prop="end"
        label="目的地">
      </el-table-column>
      <el-table-column
        prop="startLongitude"
        label="起始地-经度">
      </el-table-column>
      <el-table-column
        prop="startDimension"
        label="起始地-纬度">
      </el-table-column>
      <el-table-column
        prop="endLongitude"
        label="目的地-经度">
      </el-table-column>
      <el-table-column
        prop="endDimension"
        label="目的地-纬度">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="look(scope.$index, scope.row)">航线模拟
          </el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    name: 'Datalist',
    data () {
      return {
        tableData: [
          {
            date: '2016-05-03',
            start: '天津',
            end: '北京',
            startLongitude: 117.2,
            startDimension: 39.08,
            endLongitude: 116.40,
            endDimension: 39.90,
          }, {
            date: '2016-05-04',
            start: '天津',
            end: '上海',
            startLongitude: 117.20,
            startDimension: 39.08,
            endLongitude: 121.47,
            endDimension: 31.23,
          }, {
            date: '2017-02-02',
            start: '北京',
            end: '上海',
            startLongitude: 116.40,
            startDimension: 39.90,
            endLongitude: 121.47,
            endDimension: 31.23,
          }, {
            date: '2018-01-23',
            start: '广州',
            end: '纽约',
            startLongitude: 113.26,
            startDimension: 23.12,
            endLongitude: -74.00,
            endDimension: 40.71,
          },
        ]
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      look(index, row){
        this.$router.push({
          name: "Airline",
          params: row
        })
      },
      exportExcel(){
        /* 获取需要导出的表格DOM元素 */
        var wb = XLSX.utils.table_to_book(document.querySelector('#datatable'))
        /* 进行导出操作 */
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '表格.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      }
    }
  }
</script>
<style scoped>
  .ope{
    margin-bottom: 5px;
  }
</style>
