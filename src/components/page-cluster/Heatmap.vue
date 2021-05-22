<template>
  <div  class="chart-wrapper" ref="chart-wrapper"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/heatmap'
import 'echarts/lib/component/visualMap'
export default {
  data(){
    return {
      x:['妇产科','心血管科','普通外科','普通胸外科','泌尿外科','神经外科','耳鼻咽喉科','肝胆外科','骨科'],
      y:['妇产科','心血管科','普通外科','普通胸外科','泌尿外科','神经外科','耳鼻咽喉科','肝胆外科','骨科'],
      value:[
        [1,0.2385,0.7782,0.236,0.3465,0.559,0.3062,0.7481,0.2199],
        [0.2385,1,0.3799,0.1238,0.1794,0.356,0.112,0.3609,0.3647],
        [0.7782,0.3799,1,0.373,0.4619,0.7554,0.3301,0.779,0.583],
        [0.236,0.1238,0.373,1,0.1573,0.2584,0.1097,0.3417,0.3424],
        [0.3465,0.1794,0.4619,0.1573,1,0.3504,0.1507,0.5074,0.4555],
        [0.559,0.356,0.7554,0.2584,0.3504,1,0.2483,0.7557,0.7586],
        [0.3062,0.112,0.3301,0.1097,0.1507,0.2483,1,0.3273,0.3261],
        [0.7481,0.3609,0.779,0.3417,0.5074,0.7557,0.3273,1,0.4954],
        [0.2199,0.3647,0.583,0.3424,0.4555,0.7586,0.3261,0.4954,1]
      ]
    }
  },
  methods:{
    draw(data,x,y){
      const option =  {
              tooltip: {
                  position: 'top'
              },
              grid: {
                  // height: '50%',
                  top: '5%',
                  right:'15%',
                  left:'15%',
                  bottom:'15%'
              },
              xAxis: {
                  type: 'category',
                  data: y,
                  splitArea: {
                      show: true
                  },
                  axisLabel:{
                    interval:0,
                    rotate:90
                  }
              },
              yAxis: {
                  type: 'category',
                  data: x,
                  splitArea: {
                      show: true
                  }
              },
              visualMap: {
                  min: 0,
                  max: 1,
                  calculable: true,
                  orient: 'vertical',
                  right: '0',
                  bottom: 'center',
                  type:'continuous',
                  precision:4
              },
              series: [{
                  type: 'heatmap',
                  data: data,
                  label: {
                      show: true
                  },
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }]
      };
      echarts.init(this.$refs['chart-wrapper']).setOption(option)
    },
    transfromData(){
      let ans = []
      let xlen = this.x.length-1
      let ylen = this.y.length-1
      for(let i=0;i<=ylen;i++){
        for(let j=0;j<=xlen;j++){
          ans.push([i,j,this.value[ylen-j][i]])
        }
      }
      return ans
    }
  },
  mounted(){
    // console.log(this.transfromData())
    this.x.reverse()
    this.draw(this.transfromData(),this.x,this.y)
  }
}
</script>

<style scoped>
.chart-wrapper {
  width: 650px;
  height: 600px;
}
</style>