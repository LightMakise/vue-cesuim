<template>
  <div v-show="this.$route.params.date">

    <div class="content font-20">
      {{content.date}} {{content.start}} <span>-</span> {{content.end}}
      <div class="back pull-right" >
        <el-button type="info" @click="back">返回列表</el-button>
      </div>
    </div>
    <div id="cesiumDemo"></div>
  </div>
</template>
<script>
  export default {
    name: 'Airline',
    data(){
      return {
        airData: [],
        content: {
          start: "",
          end: "",
          date: "",
        },
      }
    },
    created(){
      if(this.$route.params.date){
          this.assAirData(this.$route.params)
          this.content.start = this.$route.params.start
          this.content.end = this.$route.params.end
          this.content.date = this.$route.params.date
        }else{
          this.$message.error('没有飞行数据');
        }

    },
    mounted(){
      if(this.$route.params.date){
        this.initAriLine()
      }
    },
    methods: {
      back(){
        this.$router.back()
      },
      //初始化航线
      initAriLine(){
        var Cesium = this.Cesium
        var view = new Cesium.Viewer('cesiumDemo', {
          baseLayerPicker: false,
          imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
          }),
          // 阴影是否被太阳投射
          shadows: false
        });
        // 启用地球照明
        view.scene.globe.enableLighting = false;
        // 起始时间
        var start = Cesium.JulianDate.fromDate(new Date(2017, 7, 11));
        // 结束时间
        var stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate());
        // 设置始时钟始时间
        view.clock.startTime = start.clone();
        // 设置时钟当前时间
        view.clock.currentTime = start.clone();
        // 设置始终停止时间
        view.clock.stopTime = stop.clone();
        // 时间速率，数字越大时间过的越快
        view.clock.multiplier = 10;
        // 时间轴
        view.timeline.zoomTo(start, stop);
        // 循环执行
        view.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
        /**
         * 计算飞行
         * @param source 数据坐标
         * @returns {SampledPositionProperty|*}
         */
        function computeFlight(source) {
          // 取样位置 相当于一个集合
          var property = new Cesium.SampledPositionProperty();
          for (var i = 0; i < source.length; i++) {
            var time = Cesium.JulianDate.addSeconds(start, source[i].time, new Cesium.JulianDate);
            var position = Cesium.Cartesian3.fromDegrees(source[i].longitude, source[i].dimension, source[i].height);
            // 添加位置，和时间对应
            property.addSample(time, position);
          }
          return property;
        }

        for (var j = 0; j < this.airData.length; j++) {
          var property = computeFlight(this.airData[j]);
          // 添加模型
          var planeModel = view.entities.add({
            // 和时间轴关联
            availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
              start: start,
              stop: stop
            })]),
            position: property,
            // 根据所提供的速度计算点
            orientation: new Cesium.VelocityOrientationProperty(property),
            // 模型数据
            model: {
              uri: '/static/models/CesiumAir/Cesium_Air.glb',
              minimumPixelSize: 128
            }
          })
        }
      },
      /**
       * 组装飞行数据
       * 飞行时间：360  飞行最大高度：70000 达到最大高度：两地中间点
       * 一条航线五组数据
       * @param data
       */
      assAirData(data){
        let itemArr = []
        for (let i = 0; i <= 4; i++) {
          var itemObj = {
            longitude: 0,
            dimension: 0,
            height: 0,
            time: 0,
          }
          if (i === 0) {
            itemObj.longitude = data.startLongitude
            itemObj.dimension = data.startDimension
            itemArr.push(itemObj)
          }
          //飞机上升
          else if (i === 1) {
            if (data.startLongitude > data.endLongitude) {
              itemObj.longitude = data.startLongitude - 0.01
            } else {
              itemObj.longitude = data.startLongitude + 0.01
            }
            if (data.startDimension > data.endDimension) {
              itemObj.dimension = data.startDimension - 0.01
            } else {
              itemObj.dimension = data.startDimension + 0.01
            }
            itemObj.height = 10000
            itemObj.time = 10
            itemArr.push(itemObj)
          }
          //飞机到达最大高度
          else if (i === 2) {
            itemObj.longitude = (data.startLongitude + data.endLongitude) / 2
            itemObj.dimension = (data.startDimension + data.endDimension) / 2
            itemObj.height = 70000
            itemObj.time = 180
            itemArr.push(itemObj)
          }
          //飞机上升
          else if (i === 3) {
            if (data.startLongitude < data.endLongitude) {
              itemObj.longitude = data.endLongitude - 0.01
            } else {
              itemObj.longitude = data.endLongitude + 0.01
            }
            if (data.startDimension < data.endDimension) {
              itemObj.dimension = data.endDimension - 0.01
            } else {
              itemObj.dimension = data.endDimension + 0.01
            }
            itemObj.height = 10000
            itemObj.time = 350
            itemArr.push(itemObj)
          }
          //到达
          else {
            itemObj.longitude = data.endLongitude
            itemObj.dimension = data.endDimension
            itemObj.height = 0
            itemObj.time = 360
            itemArr.push(itemObj)
            this.airData.push(itemArr)
          }
        }
        console.log(JSON.stringify(this.airData));
      }
    }
  }
</script>
<style scoped>
  #cesiumDemo {
    border: 2px solid #000000;
    border-radius: 5px;
    padding: 5px;
  }

  .content {
    height: 50px;
    padding: 5px;
  }
</style>
