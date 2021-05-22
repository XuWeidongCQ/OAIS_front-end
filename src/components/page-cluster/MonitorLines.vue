<template>
  <div style="width:800px">
    <div class="chart-wrapper1" ref="SPO2">
      
    </div>
    <div class="chart-wrapper2" ref="PR">
      
    </div>
    <div class="chart-wrapper3" ref="NBPDIA">
      
    </div>
    <div class="chart-wrapper4" ref="NBPSYS">
     
    </div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import axios from 'axios'
export default {
  props:{
    ope:{
      type:Object,
      default:() => {}
    }
  },
  data(){
    return {
      monitorData:{},
      done:false
    }
  },
  methods:{
    drawLines(samples,location){
      const data = this.str2Array(samples)
      const option = {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            show:false,
            type:'category',
            data:data['x']
          },
          yAxis: {
            type: 'value',
            name:location,
            nameLocation:'center',
            nameGap:45
          },
          grid:{
            left: '60px',
            right: '30px',
            bottom: '15px',
            top:'10px',
            containLabel: false
          },
          series: [{
              data: data['samples'],
              type: 'line',
              smooth: true,
              symbol:'none'
          }]
      }
      if(this.$refs[location]){
        echarts.init(this.$refs[location]).setOption(option)
      }
      
    },
    str2Array(str){
      const ans = {
        samples:[],
        x:[]
      }
      ans['samples'] = str.split(' ').map(v => parseFloat(v))
      ans['x'] = this.range(ans['samples'].length)
      // console.log(ans)
      return ans
    },
    parseData(obj){
      const ans = {}
      for (const key in obj){
        ans[key] = {}
        const tmp = obj[key].split(' ').map(v => parseFloat(v))
        ans[key]['x'] = this.range(tmp.length)
        ans[key]['y1'] = tmp
      }
      return ans
    },
    range(num){
      const ans = []
      for(let i=0;i<num;i++){
        ans.push(i)
      }
      return ans
    },
    getData(){
      axios.get('./monitor.json')
      .then(r => {
        this.monitorData = this.parseData(r['data'])
        console.log(this.monitorData)
        this.done = true
      })
    }
  },
  created(){
    // console.log(this.ope)
    
  },
  mounted(){
    this.drawLines(this.ope['SPO2_inter'],'SPO2')
    this.drawLines(this.ope['PR_inter'],'PR')
    this.drawLines(this.ope['NBPSYS_inter'],'NBPSYS')
    this.drawLines(this.ope['NBPDIA_inter'],'NBPDIA')
  }
}
</script>

<style scoped>
.chart-wrapper1, 
.chart-wrapper2,
.chart-wrapper3,
.chart-wrapper4{
  height: 150px;
}
</style>