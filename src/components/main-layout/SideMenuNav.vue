<template>
  <div class="nav-wrapper">
    <div class="avatar-wrapper">
      <img src="../../assets/doctor.png" alt="" width="120px">
    </div>
    <ul class="nav-links-wrapper">
      <router-link tag="li" to='/home' active-class="active" exact class="nav-link">
        <i class="fa fa-th-large fa-fw"></i>
        <span>探索性分析</span>
      </router-link>
      <router-link tag="li" to='/predict' active-class="active" exact class="nav-link">
        <i class="fa fa-th-large fa-fw"></i>
        <span>SDOR预测</span>
      </router-link>
      <router-link tag="li" to='/cluster' active-class="active" exact class="nav-link">
        <i class="fa fa-th-large fa-fw"></i>
        <span>信息聚类与科室关系发现</span>
      </router-link>
    </ul>
  </div>
</template>

<script>

export default {
  data(){
    return {
    }
  },
  methods:{

  },
}
</script>

<style scoped>
.avatar-wrapper {
  padding: 40px 25px 40px 25px;
  border-bottom:1px solid #566579;
  text-align: center;
}
.nav-links-wrapper {
  font-size: 14px;
}
.nav-link {
  padding: 10px 0 10px 15px;
  border-bottom:1px solid #566579
}
.nav-link:hover {
  color: #ffffff;
  cursor: pointer;
}
.nav-link > i {
  margin-right: 10px;
  font-size: 16px;
}
.arrow {
  float: right;
  font-size: 14px;
  margin-right: 10px;
  margin-top: 3px;
}
.active {
  color: #ffffff;
  background-color: #157dba;
}
.shrink-links-wrapper {
  height: 0;
}
.spread-links-wrapper {
  height: 260px; 
}

</style>