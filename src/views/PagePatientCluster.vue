<template>
  <div>
    <x-box>
      <div slot="header" class="xu-box-title">
        <span>手术信息聚类结果</span>
        <div class="search-wrapper">
          <div class="form-item">
            <span class="item-name">姓名</span>
            <input type="text" class="xu-input-tmp" v-model="searchData.name" placeholder="输入姓名">
          </div>
          <div class="form-item ml15">
            <span class="item-name">科室</span>
            <x-select v-model='searchData.departmentNow' :options='departments' :styleObj="{'width':'100px','border-radius':0}"></x-select>
          </div>
          <div class="form-item ml15">
            <span class="item-name" style="width:70px">术前诊断</span>
            <input type="text" class="xu-input-tmp" v-model="searchData.opeBefDesc" placeholder="输入术前诊断">
          </div>
          <div class="form-item ml15">
            <span class="item-name" style="width:70px">实施手术</span>
            <input type="text" class="xu-input-tmp" v-model="searchData.opeDesc" placeholder="输入手术名称">
          </div>
          <div class="form-item ml15">
            <x-button :value="'检索'" :size="'default'" :type="'success'" :markerObj="['fa','fa-search']" @click="search"></x-button>
          </div>
          <div class="form-item ml15">
            <x-button :value="'重置'" :size="'default'" :type="'cancel'" :markerObj="['fa','fa-refresh']" @click="reset"></x-button>
          </div>
        </div>
      </div>
      <div class="table-wrapper xu-add-scrollBar">
        <x-table 
            :title="['姓名','性别','体重(kg)','年龄','身高(cm)','术前诊断','实施手术','操作']"
            :size="'sm'"
            :colWidth="['100px','80px','80px','80px','80px','500px','500px']"
            :align="'center'"
            :strip="true">
              <tr v-for="ope in clusterData" :key="ope['#ID']">
                <!-- <td>{{ ope['#ID'] }}</td> -->
                <td>{{ ope['姓名'] }}</td>
                <td>{{ ope['性别'] }}</td>
                <td>{{ ope['年龄'] }}</td>
                <td>{{ ope['体重'] }}</td>
                <td>{{ ope['身高'] }}</td>
                <td>{{ ope['术前诊断'] }}</td>
                <td>{{ ope['实施手术'] }}</td>
                <td>
                  <!-- <x-button :value="'诊断记录'" :size="'sm'" @click="showRecordModal(ope)"></x-button> -->
                  <x-button :value="'生理参数'" :size="'sm'" @click="showCurveModal(ope)"></x-button>
                </td>
              </tr>
        </x-table>
      </div>
      <x-pager 
      :totalElements="totalElements"
      :forceRefresh="toggle" 
      :pageNum="Math.ceil(totalElements / 16)" 
      v-show="totalElements > 16"
      @hasSelectedPage='changePage'
      >
      </x-pager>
      <div style="position:absolute;right:20px;bottom:20px">
          <x-button :value="'科室潜在的联系程度'" :type="'warning'" @click="departmentRelationModalShow = true"></x-button>
      </div>
    </x-box>
    <x-modal v-if="recordModalShow" @close="recordModalShow=false">
      <div class="xu-form-item">
        <span>术前诊断描述：</span>
        <textarea  class="xu-input-textarea" :value="selOpeRecord['术前诊断']"></textarea>
      </div>
      <div class="xu-form-item">
        <span>实施手术：</span>
        <textarea  class="xu-input-textarea" :value="selOpeRecord['实施手术']"></textarea>
      </div>
    </x-modal>
    <x-modal v-if="curveModalShow" @close="curveModalShow = false">
      <monitor-lines :ope="selOpeRecord"></monitor-lines>
    </x-modal>
    <x-modal v-if="departmentRelationModalShow" @close="departmentRelationModalShow = false">
      <heatmap></heatmap>
    </x-modal>
  </div>
</template>

<script>
import xBox from '../x-views/xBox'
import xSelect from '../x-views/xSelect'
import xButton from '../x-views/xButton'
import xTable from '../x-views/xTable'
import axios from 'axios'
import xPager from '../x-views/xPager'
import xModal from '../x-views/xModal'
import MonitorLines from '../components/page-cluster/MonitorLines'
import Heatmap from '../components/page-cluster/Heatmap'
import showAlert from '@/x-views/xAlert/xAlert'
export default {
  components:{xBox,xSelect,xButton,xTable,xPager,xModal,MonitorLines,Heatmap},
  data(){
    Heatmap
    return {
      clusterData:[],
      clusters:['C1','C2','C3','C4','C5','C6','C7','C8','C9','C10','C11','C12','C13','C14','C15'],
      allData:[],
      departments:['口腔科','妇产科','心血管科','整形外科','普通外科','普通胸外科','泌尿外科','眼科','神经内科','神经外科','耳鼻咽喉科','肝胆外科','骨科'],
      clusterNow:'C1',
      recordModalShow:false,
      curveModalShow:false,
      departmentRelationModalShow:false,
      selOpeRecord:{},
      searchData:{
        name:'',
        opeBefDesc:'',
        opeDesc:'',
        departmentNow:'心血管科',
      },
      totalElements:0,
      toggle:true
    }
  },
  methods:{
    getData(){
      axios.get('./predictData.json')
      .then(r => {
        this.clusterData = r.data['聚类']
      })
    },
    showRecordModal(ope){
      this.recordModalShow = true
      this.selOpeRecord = ope
    },
    showCurveModal(ope){
      this.curveModalShow = true
      this.selOpeRecord = ope
    },
    search(){
      console.log(this.searchData)
      this.$http['post']('/search',this.searchData,{headers:{"token":window.sessionStorage['token']}})
      .then(r => {
        const {data:{code,msg}} = r
        if(code === 200){
          this.totalElements = msg.length
          this.allData = msg
          if(msg.length > 16){
            this.clusterData = this.allData.slice(0,16)
          } else {
            this.clusterData = this.allData
          }
          this.toggle = !this.toggle
          showAlert('检索成功','success')
        }
      })
    },
    reset(){
      this.searchData.name = ''
      this.searchData.departmentNow = '心血管科'
      this.searchData.opeBefDesc = ''
      this.searchData.opeDesc = ''
      this.$http['post']('/search',this.searchData,{headers:{"token":window.sessionStorage['token']}})
      .then(r => {
        const {data:{code,msg}} = r
        if(code === 200){
          this.totalElements = msg.length
          this.allData = msg
          if(msg.length > 16){
            this.clusterData = this.allData.slice(0,16)
          } else {
            this.clusterData = this.allData
          }
          this.toggle = !this.toggle
          showAlert('重置成功','success')
        }
      })

    },
    changePage(page){
      console.log(page)
      const start = 16 * (page - 1)
      this.clusterData = this.allData.slice(start,start+16)
    }
  },
  created(){
    this.search()
  }
}
</script>

<style  scoped>
.table-wrapper {
  margin-top: 10px;
  height: 670px;
  font-size: 14px;
  margin-bottom: 15px;
  word-break: keep-all
}
.item-name {
  width: 40px;
  display: inline-block;
  color: #111;
}
.search-wrapper {
  margin-top: 15px;
  font-size: 14px;
}

.xu-input-tmp {
  border: 1px solid #dcdfe6;
  /* border-radius: 4px; */
  font-size: 1em;
  line-height: 1em;
  padding: 6px 6px;
  width: 100px;
  vertical-align: middle;
}
.xu-input-tmp:focus {
  border-color:#3a9fd3;
}
.form-item {
  display: inline-block;

}
.ml15 {
  margin-left: 15px;
}
</style>