<template>
  <span>{{ number }}</span>
</template>

<script>
export default {
  props:{
    // 起始数字
    startNum:{
      type:Number,
      default:0
    },
    // 结束数字
    endNum:{
      type:Number,
      default:0
    },
    // 变化的时间间隔,以毫秒为单位
    duration:{
      type:Number,
      default:50
    },
    // 从开始到结束，数字变化的次数
    times:{
      type:Number,
      default:10
    }
  },
  data(){
    return {
      number:this.startNum
    }
  },
  methods:{
    numScroll(){
      let timer = null
      const step = Math.ceil((this.endNum - this.startNum) / this.times)
      if(step === 0){
        return
      }
      timer = setInterval(() => {
        if(this.number < this.endNum){
          this.number += step
        } else {
          this.number = this.endNum
          clearInterval(timer)
        }
      },this.duration)
    }
  },
  // endNum是异步获取的 必须加侦听器 为了兼容同步数据 必须立即执行
  watch:{
    'endNum':{
      handler(){
        this.numScroll()
      },
      immediate:true
    }
  },
  mounted(){
    // this.numScroll()
  }
}
</script>

<style scoped>

</style>>

