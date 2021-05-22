<template>
  <div>
    <!-- 第一行 -->
    <div class="xu-row">
      <div class="xu-col-9" style="flex: 0 0 70%;max-width: 70%;">
        <div class="xu-box">
          <div slot="header" class="xu-box-title">患者手术数据录入</div>
          <div class="form-wrapper xu-row">
            <div class="xu-col-4">
              <div class="xu-form-item">
                <span style="width:85px">姓名：</span>
                <input class="xu-input" v-model="name">
              </div>
              <div class="xu-form-item">
                <span style="width:85px">*性别：</span>
                <!-- <input class="xu-input" v-model="sex"> -->
                <x-select v-model='sex' :options="['男','女']" :styleObj="{'width':'185px','border-color':'#111'}" class="mb15"></x-select>
              </div>
              <div class="xu-form-item">
                <span style="width:85px">*年龄：</span>
                <input class="xu-input" v-model="age" type="number">
              </div>
              <div class="xu-form-item">
                <span style="width:85px">*体重(kg)：</span>
                <input class="xu-input" v-model="weight" type="number">
              </div>
              <div class="xu-form-item">
                <span style="width:85px">*身高(cm)：</span>
                <input class="xu-input" v-model="height" type="number">
              </div>
              <div class="xu-form-item">
                <span style="width:85px">*科室：</span>
                <x-select v-model='departmentNow' :options=' departments' :styleObj="{'width':'185px','border-color':'#111'}" class="mb15"></x-select>
              </div>
            </div>
            <div class="xu-col-8"> 
              <div class="xu-form-item">
                <span>*术前诊断描述：</span>
                <textarea  class="xu-input-textarea" v-model='opeBefDesc' style="width:500px;height:120px"></textarea>
              </div>
              <div class="xu-form-item">
                <span>*实施手术：</span>
                <textarea  class="xu-input-textarea" v-model='opeDesc' style="width:500px;height:120px"></textarea>
              </div>
            </div>
          </div>
          <x-button :value="'开始预测'" @click="startPredict()"></x-button>
        </div>
      </div>
      <div class="xu-col-3" style="flex: 0 0 30%;max-width: 30%;">
        <div class="xu-box">
          <div slot="header" class="xu-box-title">本次手术预计持续时间</div>
          <div class="gauge-wrapper" ref="gauge-wrapper" style="padding-top:35px">
            这是仪表盘
          </div>
        </div>
      </div>
    </div>
    <div class="xu-row" style="margin-top:25px">
      <div class="xu-col-12">
        <div class="xu-box">
          <div slot="header" class="xu-box-title">历史记录</div>
          <div class="table-wrapper xu-add-scrollBar">
            <x-table 
            :title="['#','姓名','性别','年龄','体重','身高','科室','术前诊断','实施手术','预计时长/h','操作']"
            :size="'sm'"
            :align="'center'"
            :strip="true">
              <tr v-for="(ope,index) in sdorData" :key="index">
                <td>{{ index }}</td>
                <td>{{ ope["姓名"] }}</td>
                <td>{{ ope["性别"] }}</td>
                <td>{{ ope["年龄"] }}</td>
                <td>{{ ope["体重"] }}</td>
                <td>{{ ope["身高"] }}</td>
                <td>{{ ope["科室"] }}</td>
                <td>{{ ope["术前诊断"] }}</td>
                <td>{{ ope["实施手术"] }}</td>
                <td>{{ ope["预测时长"] }}</td>
                <td>
                  <x-button :value="'删除'" :size="'sm'" :type="'warning'" @click="delRecord(index)" :markerObj="['fa','fa-trash']"></x-button>
                </td>
              </tr>
            </x-table>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import xSelect from '../x-views/xSelect'
import xButton from '../x-views/xButton'
import xTable from '../x-views/xTable'
import showAlert from '@/x-views/xAlert/xAlert'
import axios from 'axios'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/gauge'
export default {
  components:{xSelect,xButton,xTable},
  data(){
    return {
      name:'刘书',
      sex:'女',
      weight:58,
      height:160,
      age:51,
      departmentNow:'心血管科',
      departments:['口腔科','妇产科','心血管科','整形外科','普通外科','普通胸外科','泌尿外科','眼科','神经内科','神经外科','耳鼻咽喉科','肝胆外科','骨科'],
      opeBefDesc:'风心病',
      opeDesc:'房颤消融改良迷宫术+人工二尖瓣置换术',
      // opeInfos:[
      //   {'id':123,'p':'xxx','w':64,'h':64,'a':36,'d':'肝胆外科','name':'肝胆总管切开取石术+空肠RouxY吻合术','time':'2.4h'},
      //   {'id':124,'p':'xxx','w':64,'h':64,'a':36,'d':'肝胆外科','name':'肝胆总管切开取石术+空肠RouxY吻合术','time':'2.4h'},
      //   {'id':125,'p':'xxx','w':64,'h':64,'a':36,'d':'肝胆外科','name':'肝胆总管切开取石术+空肠RouxY吻合术','time':'2.4h'},
      //   {'id':126,'p':'xxx','w':64,'h':64,'a':36,'d':'肝胆外科','name':'肝胆总管切开取石术+空肠RouxY吻合术','time':'2.4h'},
      //   {'id':127,'p':'xxx','w':64,'h':64,'a':36,'d':'肝胆外科','name':'肝胆总管切开取石术+空肠RouxY吻合术','time':'2.4h'},
      // ]
      sdorData:[],
    }
  },
  methods:{
    getData(){
      axios.get('./predictData.json')
      .then(r => {
        this.sdorData = r.data['预测']
      })
    },
    delRecord(index){
      this.sdorData.splice(index,1)
      showAlert('删除成功','success')
    },
    startPredict(){
      if(this.weight <= 0 || this.height <= 0 || this.age <= 0){
        showAlert('输入的数据范围不对，请重新输入！','failure')
        return
      }
      const data = {
        'name':this.name,
        'sex':this.sex,
        'weight':this.weight,
        'height':this.height,
        'age':this.age,
        'departmentNow':this.departmentNow,
        'opeBefDesc':this.opeBefDesc,
        'opeDesc':this.opeDesc
      }
      for(const key in data){
        if(!data[key]){
          showAlert('请保证必须字段的数据非空！','failure')
          return
        }
      }
      console.log(data)
      this.$http['post']('/predict_SDOR',data,{headers:{"token":window.sessionStorage['token']}})
      .then(r => {
        const {data:{msg:{ope,sdor},code}} = r
        if(code === 200){
          this.sdorData.push({
            '姓名':ope['name'],
            '年龄':ope['age'],
            '性别':ope['sex'],
            '体重':ope['weight'],
            '身高':ope['height'],
            '科室':ope['departmentNow'],
            '术前诊断':ope['opeBefDesc'],
            '实施手术':ope['opeDesc'],
            '预测时长':sdor.toFixed(2)
          })
          showAlert('预测成功','success')
          this.drawGauge(sdor.toFixed(2))
        }
      })
    },
    drawGauge(sdor=4.80){
      const option = {
                tooltip: {
                formatter: '{a} <br/>{b} : {c}'
            },
            series: [
                {
                    name: '预测结果',
                    type: 'gauge',
                    radius:'100%',
                    min:0,
                    max:10,
                    detail: {formatter: (v) => v.toFixed(2),fontSize:50,fontWeight:'bold'},
                    data: [{value: sdor, name: 'SDOR/h'}]
                }
            ]
      }
      echarts.init(this.$refs['gauge-wrapper']).setOption(option)
    }
  },
  created(){
    this.getData()
  },
  mounted(){
    this.drawGauge()
  }
}
</script>

<style  scoped>
.form-wrapper,.table-wrapper {
  margin-top: 15px;
}
.table-wrapper {
  font-size: 14px;
  height: 300px;
}
.gauge-wrapper {
  height: 354px;
  box-sizing: border-box;
}
</style>