<template>
    <div class="main-wrapper">
        <div class="banner">
            <banner></banner>
        </div>
        <div class="main-container xu-add-scrollBar">
            <div class="sidebar-menu-wrapper">
                <side-menu-nav></side-menu-nav>
            </div>
            <div class="router-view-wrapper">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
                <div class="footer-wrapper">
                    <span class="copyright">
                        Copyright©2021 重庆大学微系统研究中心 版权所有 
                        <a href="http://www.beian.miit.gov.cn/">渝ICP备19011317号</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Banner from '@/components/main-layout/Banner.vue'
import SideMenuNav from '@/components/main-layout/SideMenuNav.vue'
export default {
    name: "MainLayout",
    components:{Banner,SideMenuNav},
    methods:{
        test(){
            console.log('click')
        }
    }
}
</script>

<style scoped>
.main-wrapper {
    /* height: 100vh; */
    position: relative;
    overflow: hidden;
}
.banner {
   position: absolute;
   top: 0;
   right: 0;
   left: 0;
   box-sizing: border-box;
   /* background-color: #ffffff; */
}
.main-container{
    margin: 43px auto auto auto;
    /* padding: 0 15px 15px 15px; */
    box-sizing: border-box;
    height: 894px;
    width: 1920px;
    position: relative;
    background-color: #f1f2f7;
}
.sidebar-menu-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 280px;
    box-sizing: border-box;
    background-color: #20335d;
    color: #939daa
}
.router-view-wrapper {
    margin-left: 280px;
    height: 100%;
    background-color:#ecf0f5;
    padding: 15px;
    box-sizing: border-box;
}
.footer-wrapper {
   position: absolute;
   bottom: 0;
   right: 0;
   left: 280px;
   box-sizing: border-box;
   background-color: #3c8dbc;
   text-align: center;
}
.copyright {
    line-height: 32px;
    font-size: 12px;
    color: #f1f1f1;
}
</style>