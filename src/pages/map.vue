<template>
    <div id="mmap">
        <div id="china_map"></div>
        <div class="out" @click="toLogin()">
              <div class="in"></div>
        </div>
    </div>
</template>

<script>

import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
echarts.registerMap('china',china)

export default {
    name:'mmap',
    data() {
    return {
      geoCoordMap: {
        '黑龙江': [127.9688, 45.368],
        "新疆": [87.9236, 43.5883],
        "四川": [103.9526, 30.7617],
        "江西": [116.0046, 28.6633],
        "广东": [113.12244, 23.009505],
      },
      data:[
        {name:"黑龙江",value:'海辉学院'},
        {name:"江西",value:'纯真学院'},
        {name:"四川",value:'川御学院'},
        {name:"新疆",value:'前端学院'},
        {name:"广东",value:'信创学院'},
      ],
      }
    },
    methods:{
      toLogin(){
            this.$router.push("/login");
        },
      convertData(data){
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
    },
    // 跳转
    },
    mounted(){
        // 初始化echarts实例
  this.chinachart = echarts.init(document.getElementById('china_map'))
  // 进行相关配置
  this.chartOption = { 
    tooltip: { // 鼠标移到图里面的浮动提示框
     // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
      formatter (params) { 
        // params.data 就是series配置项中的data数据遍历
        let 
          names,
          introduce,
          site
        if (params.data) {
          names = params.data.names
          introduce = params.data.introduce
          site = params.data.site
        } 
        else { // 为了防止没有定义数据的时候报错写的
          names = 0
          introduce = 0
          site = 0
        }
        let htmlStr = `
          <div style='font-size:18px;margin-bottom:10px'> ${params.name}</div>
          <p style='text-align:left;margin-top:-10px;'>
	          名称：${names}<br/>
            介绍：${introduce}<br/>
            地点：${site}<br/>
          </p>
        `
        return htmlStr
      },
      backgroundColor:"#ff9c00",//提示标签背景颜色
      textStyle:{color:"#fff"} //提示标签字体颜色
    }, 
    // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
     visualMap: { // 左下角的颜色区域
      // type: 'piecewise', // 定义为分段型 visualMap
    //   min: 0,
    //   max: 1000,
    //   itemWidth: 40,
    //   bottom: 60,
    // left: 0,
    show:false,
     },
    // geo配置详解： https://echarts.baidu.com/option.html#geo
    geo: { // 地理坐标系组件用于地图的绘制
      map: 'china', // 表示中国地图
      //roam: true, // 是否开启鼠标缩放和平移漫游
      zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
      label: {
        show: true
      },
      itemStyle: { // 地图区域的多边形 图形样式。
        borderColor: 'rgba(0, 0, 0, 0.2)',
        areaColor:'#0A2DAE',
        // shadowColor:'red',
        // areacolor:'red',
        // shadowBlur:20,
        normal:{
          areaColor:'#3a7fd5',
          borderColor:'#0a53e9',
          shadowColor:'#092f8f',
          shadowBlur:20
        },
        emphasis: { // 高亮状态下的多边形和标签样式
          // shadowBlur: 20,
          // shadowColor: 'rgba(0, 0, 0, 0.5)',
          areaColor:'#0a2dae'
        }
      }
    },

    series: [
      {
        name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
        type: 'map',
        geoIndex: 0,
        label: {
          show: true
        },
        // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
        data: [
          {
          'name': '广东',
          'names': '快乐学院', 
          'site': '深圳、广东', // 地点
          'introduce':'前端开发就找快乐学院'
        },
        {
          'name': '江西',
          'names': '纯真学院',
          'site': '南昌、赣州', // 地点
          'introduce':'JAVA开发就找纯真学院'
        },
        {
          'name': '新疆',
           'names': '棉花学院', // 姓名
          'site': '乌鲁木齐', // 地点
          'introduce':'后端开发就找棉花学院'
        },
        {
          'name': '四川',
           'names': '川御学院', // 姓名
          'site': '成都', // 地点
          'introduce':'大数据专业团队'
        },
        {
          'name': '黑龙江',
          'names': '冰雪学院', // 姓名
          'site': '哈尔滨', // 地点
          'introduce':'人工智能专业团队 '
        },
        ]
      },
      {
        name:'TOP 5',
        type:'scatter',
        coordinateSystem:'geo',
        symbol:'pin',
        symbolSize:[110,110],
        label:{
          normal:{
            show:true,
            textStyle:{
              color:'#fff',
              fontSize:15,
              fontWeight:'600'
            },
            formatter(value){
              return value.data.value[2]
            }
          },
        },
        itemStyle:{
          normal:{
            color:'#D8BC37'
          }
        },
        data:this.convertData(this.data),
        showEffectOn:'render',
        rippleEffect:{
          brushType:'stroke'
        },
        hoverAnimation:true,
        zlevel:1
      }
    ],
  }
  // 使用刚指定的配置项和数据显示地图数据
  this.chinachart.setOption(this.chartOption)
  this.chinachart.on('click',function(param){
    if(param.data.names){
      window.open('/#/academy','_self')
    }
  });
 }
}
</script>

<style scoped>
#china_map{
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(to right,#0f378f,#00091a);
    
}
.out{
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: #1b1b1b;
    border: 5px solid #54ffff;
    box-shadow:0 0 10px #54ffff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    cursor: pointer;
}
.in{
    width: 3rem;
    height: 3rem;
    background: url("../assets/images/电源.png");
    background-size: 100% 100%;
    border-radius: 50%;
}
</style>