<template>
  <div>
    <div class="xu-row">
      <div class="xu-col-2">
        <x-box>
          <div slot='header' class="xu-box-title">信息面板</div>
          <div class="statistic-wrapper">
            <div class="statistic-info" style="margin-bottom:25px">
              <div class="xu-float-left">
                <div class="statistic-number">
                  <x-number-scroll :endNum="totalOpe"></x-number-scroll>
                </div>
                <div class="statistic-text">手术</div>
              </div>
              <div class="xu-float-right">
                <span class="fa fa-bed statistic-icon"></span>
              </div>
            </div>
            <div class="statistic-info" style="margin-bottom:25px">
              <div class="xu-float-left">
                <div class="statistic-number">
                  <x-number-scroll :endNum="statictis_info['total_department']"></x-number-scroll>
                </div>
                <div class="statistic-text">科室</div>
              </div>
              <div class="xu-float-right">
                <span class="fa fa-plus-square statistic-icon"></span>
              </div>
            </div>
            <div class="statistic-info">
              <div class="xu-float-left">
                <div class="statistic-number">
                  <!-- <x-number-scroll :endNum="newOpe"></x-number-scroll> -->
                  {{newOpe}}
                </div>
                <div class="statistic-text">今日新增手术</div>
              </div>
              <div class="xu-float-right">
                <span class="fa fa-level-up statistic-icon"></span>
              </div>
            </div>
          </div>
        </x-box>
      </div>
      <div class="xu-col-7">
        <x-box>
          <div slot='header' class="xu-box-title">每个科室的患者分布</div>
          <div class="chart-wrapper" ref="chart-wrapper">
            <x-basic-chart :source="departmentOpe" :type="'line'" :legend="{}" :yMax='800' :yName="'人数'" v-if="isShow"></x-basic-chart>
          </div>
        </x-box>
      </div>
      <div class="xu-col-3">
        <x-box>
          <div slot='header' class="xu-box-title">患者分布</div>
          <div class="pie-wrapper" ref="pie-wrapper">
            这是饼图
          </div>
        </x-box>
      </div>
    </div>
    <div class="xu-row" style="margin-top:25px">
      <div class="xu-col-3">
        <div class="xu-box">
          <div slot='header' class="xu-box-title">体重分布(kg)</div>
          <div class="chart-wrapper1" ref="chart-wrapper1">1</div>
        </div>
      </div>
      <div class="xu-col-3">
        <div class="xu-box">
          <div slot='header' class="xu-box-title">身高分布(cm)</div>
          <div class="chart-wrapper2" ref="chart-wrapper2">2</div>
        </div>
      </div>
      <div class="xu-col-3">
        <div class="xu-box">
          <div slot='header' class="xu-box-title">年龄分布</div>
          <div class="chart-wrapper3" ref="chart-wrapper3">3</div>
        </div>
      </div>
      <div class="xu-col-3">
        <div class="xu-box">
          <div slot='header' class="xu-box-title">手术文本信息</div>
          <div class="chart-wrapper4" ref="chart-wrapper4">4</div>
          <div class="right-top-box">
            <x-select v-model="textType" :options="['术前诊断','手术名称']" :styleObj="{'width':'80px','font-size':'1em'}"></x-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts-wordcloud';
import xBox from '../x-views/xBox'
import xBasicChart from '../x-views/xBasicChart'
import xTable from '../x-views/xTable'
import xNumberScroll from '../x-views/xNumberScroll';
import xSelect from '../x-views/xSelect.vue';
import createWs from '../service/ws';
export default {
  components:{xBox,xBasicChart,xTable,xNumberScroll,xSelect},
  data(){
    return {
      departmentOpe:{
        'x':['口腔科','妇产科','心血管科','整形外科','普通外科','普通胸外科','泌尿外科','眼科','神经内科','神经外科','耳鼻咽喉科','肝胆外科','骨科'],
        '男':[56,0,165,7,160,111,302,14,35,131,126,103,404],
        '女':[34,599,198,14,157,83,116,7,23,159,89,131,405]
      },
      isShow:false,
      statictis_info:{},
      totalOpe:0,
      newOpe:100,
      textType:'术前诊断',
      ws:null
    }
  },
  methods:{
    drawbar1(){
      const option = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          color:['#4ea397','#f58db2','#f2b3c9'],
          legend:{
            data:['男','女'],
            right:0
          },
          grid: {
              left: '70px',
              right: '10px',
              bottom: '60px',
              top:'40px',
              containLabel: false
          },
          xAxis: {
                  type: 'category',
                  data: ['0-25', '25-50', '50-75', '75-100', '100-125', '125-150', '>=150'],
                  axisTick: {
                      alignWithLabel: true
                  },
                  name:'体重/kg',
                  show:true,
                  axisLabel:{
                    interval:0,
                    rotate:90,
                    show:true,
                    fontSize:13
                }
              },
          yAxis: {
            type:'value',
            name:'人数',
            nameLocation:'center',
            nameGap:50
          },
          series: [
              {
                  name: '男',
                  type: 'bar',
                  barWidth: '40%',
                  barCategoryGap: '0%',
                  barGap:'0%',
                  data: this.getRawDataFromObj(this.statictis_info['weight_distribution'],'男'),//[53, 42, 342, 511, 21, 11, 7],
                  itemStyle:{
                    opacity:1
                  }
              },
              {
                  name: '女',
                  type: 'bar',
                  barWidth: '40%',
                  barCategoryGap: '-100%',
                  barGap:'0%',
                  data: this.getRawDataFromObj(this.statictis_info['weight_distribution'],'女'),//[63, 140, 657, 221, 12, 5, 3],
                  itemStyle:{
                    opacity:1
                  }
              },
          ]
      }
      echarts.init(this.$refs['chart-wrapper1']).setOption(option)
    },
    drawbar2(){
      const option = {
              tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          color:['#4ea397','#f58db2','#f2b3c9'],
          legend:{
            data:['男','女'],
            right:0
          },
          grid: {
              left: '70px',
              right: '10px',
              bottom: '60px',
              top:'40px',
              containLabel: false
          },
          xAxis: {
                  type: 'category',
                  data: ['100-125', '125-150', '150-175', '>=175'],
                  axisTick: {
                      alignWithLabel: true
                  },
                  show:true,
                  axisLabel:{
                    interval:0,
                    rotate:90,
                    show:true,
                    fontSize:13
                }
              },
          yAxis: {
            type:'value',
            name:'人数',
            nameLocation:'center',
            nameGap:50
          },
          series: [
              {
                  name: '男',
                  type: 'bar',
                  barWidth: '40%',
                  barCategoryGap: '0%',
                  barGap:'0%',
                  data: Object.entries(this.statictis_info['height_distribution']).map(ele => ele[1]['男']),//[53, 45, 1241, 511],
                  itemStyle:{
                    opacity:1
                  }
              },
              {
                  name: '女',
                  type: 'bar',
                  barWidth: '40%',
                  barCategoryGap: '-100%',
                  barGap:'0%',
                  data: Object.entries(this.statictis_info['height_distribution']).map(ele => ele[1]['女']),//[53, 345, 841, 31],
                  itemStyle:{
                    opacity:1
                  }
              },
          ]
      }
      echarts.init(this.$refs['chart-wrapper2']).setOption(option)
    },
    drawbar3(){
      const option = {
              tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          color:['#4ea397','#f58db2','#f2b3c9'],
          legend:{
            data:['男','女'],
            right:0
          },
          grid: {
              left: '70px',
              right: '10px',
              bottom: '60px',
              top:'40px',
              containLabel: false
          },
          xAxis: {
                  type: 'category',
                  data: ['0-20', '20-40', '40-60', '60-80','>=80'],
                  axisTick: {
                      alignWithLabel: true
                  },
                  show:true,
                  axisLabel:{
                    interval:0,
                    rotate:90,
                    show:true,
                    fontSize:13
                  }
              },
          yAxis: {
            type:'value',
            name:'人数',
            nameLocation:'center',
            nameGap:50
          },
          series: [
              {
                  name: '男',
                  type: 'bar',
                  barWidth: '40%',
                  barCategoryGap: '0%',
                  barGap:'0%',
                  data: Object.entries(this.statictis_info['age_distribution']).map(ele => ele[1]['男']),//[353, 245, 641, 511, 92],
                  itemStyle:{
                    opacity:1
                  }
              },
              {
                  name: '女',
                  type: 'bar',
                  barWidth: '40%',
                  barCategoryGap: '-100%',
                  barGap:'0%',
                  data: Object.entries(this.statictis_info['age_distribution']).map(ele => ele[1]['女']),//[253, 545, 841, 411, 72],
                  itemStyle:{
                    opacity:1
                  }
              },
          ]
      }
      echarts.init(this.$refs['chart-wrapper3']).setOption(option)
    },
    drawPie(){
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            // icon:'circle',
            data: ['男', '女']
        },
        color:['#4ea397','#f58db2'],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['45%', '65%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'outside'
                },
                labelLine: {
                    show: true
                },
                itemStyle:{
                  
                },
                data: [
                    {value: this.statictis_info['sex_count']['男'], name: '男'},
                    {value: this.statictis_info['sex_count']['女'], name: '女'},
                ]
            }
        ]
      }
      echarts.init(this.$refs['pie-wrapper']).setOption(option)
    },
    drawWordCloud(words){
      const option = {
        series: [{
              type: 'wordCloud',
              // shape: 'circle',  
              width: '95%',
              height: '90%',
              right: null,
              bottom: null,
              sizeRange: [12, 50],
              rotationRange: [-90, 90],
              rotationStep: 30,
              gridSize: 8,
              drawOutOfBound: false,
              layoutAnimation: true,
              textStyle: {
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  color: function () {
                      return 'rgb(' + [
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160)
                      ].join(',') + ')';
                  }
              },
              emphasis: {
                  focus: 'self',
                  textStyle: {
                      shadowBlur: 10,
                      shadowColor: '#333'
                  }
              },
              data: words
        }]
      }
      echarts.init(this.$refs['chart-wrapper4']).setOption(option)
    },
    getData(){
      this.$http['get']('/statistic',{headers:{"token":window.sessionStorage['token']}})
      .then(r => {
        const {data:{msg,code}} = r
        if(code == 200){
          this.statictis_info = msg
          // console.log(this.statictis_info['weight_distribution'])
          // console.log(Object.keys(this.statictis_info['age_distribution']))
          // console.log(this.getRawDataFromObj(this.statictis_info['weight_distribution'],'男'))
          // console.log(Object.entries(this.statictis_info['weight_distribution']).map(ele => ele[1]['男']))
          this.drawbar1()
          this.drawbar2()
          this.drawbar3()
          this.drawPie()
          this.departmentOpe = {}
          this.departmentOpe['x'] = Object.keys(this.statictis_info['patient_distribution'])
          this.departmentOpe['男'] = Object.entries(this.statictis_info['patient_distribution']).map(ele => ele[1]['男'])
          this.departmentOpe['女'] = Object.entries(this.statictis_info['patient_distribution']).map(ele => ele[1]['女'])
          this.isShow = true
          this.totalOpe = msg['total_patient'] + 76
        }
      })
    },
    getWordCloud(textType){
      this.$http['get']('/word_cloud/'+textType,{headers:{"token":window.sessionStorage['token']}})
      .then(r => {
        const {data:{msg,code}} = r
        if(code === 200){
          this.drawWordCloud(msg)
        }
      })
    },
    getNewOpe(path){
      this.ws = createWs(path)
      this.ws.onopen = function(){
        console.log('ws已经连接')
      }
      this.ws.onmessage = (e) => {
        const {data} = e
        console.log('ws收到数据')
        console.log(data)
        this.newOpe = parseInt(data)
      }
      this.ws.onclose = function() {
        console.log('ws已经关闭')
      }
    },
    //为了解决Object.entries()面对数字键的时候输出乱序的问题
    getRawDataFromObj(obj,sex){
      const ans = []
      const keys = Object.keys(obj)
      const last = keys.pop()
      keys.sort((a,b) => {
        return parseFloat(a.split('-')[0]) - parseFloat(b.split('-')[0])
      })
      keys.push(last)
      for(const key of keys){
        ans.push(obj[key][sex])
      }
      return ans
    },
  },
  watch:{
    'textType':{
      handler:function(newVal){
        const route = newVal === '术前诊断' ? 'opeBefDesc' : 'opeDesc'
        this.getWordCloud(route)
      }
    }
  },
  mounted(){  
    this.getData()
    this.getWordCloud('opeBefDesc')
    this.getNewOpe('/new_ope')
  },
  beforeDestroy(){
    console.log('销毁组件')
    this.ws.close()
  }
}
</script>

<style  scoped>
.chart-wrapper {
  height: 350px;
  background-color:#ffffff;
}
.pie-wrapper,
.statistic-wrapper {
  height: 350px;
  position: relative;
  overflow: hidden;
  padding-top: 15px;
  box-sizing: border-box;
}
.chart-wrapper4,
.chart-wrapper3,
.chart-wrapper1,
.chart-wrapper2 {
  height: 320px;
}

.statistic-info {
  height: 90px;
  background-color: #4185ac;
  box-sizing: border-box;
  border: 1px #e6e6e6 solid;
  border-radius: 10px;
  color: #fff;
  padding: 0 10px;
}
.statistic-number{
  font-size: 30px;
  padding-top: 12px;
  font-weight: bold;
  
}
.statistic-text {
  font-size: 12px;
  padding-left: 5px;
  /* color: #111; */
}
.statistic-icon {
  font-size: 50px;
  display: inline-block;
  padding-top: 17px;
  padding-right: 5px;
}
.right-top-box {
  position: absolute;
  top:14px;
  right: 15px
}
</style>