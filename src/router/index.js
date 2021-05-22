import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',//一级router-view组件默认显示的组件
    redirect: '/login',
  },
  {
    path: '/login',//一级router-view组件默认显示的组件
    component: () => import('../views/LoginLayout'),
    meta: {
        title: '手术数据挖掘与分析平台',
        show:true
    },
  },
  {
    path:'/home',
    component:() => import('../views/MainLayout'),
    children:[
      {
        path:'',//二级router-view组件默认显示的组件
        component:() => import('../views/PageHome.vue'),
        meta:{
          auth:true
        }
      },
      {
        path:'/predict',
        component:() => import('../views/PagePredTime.vue'),
        meta:{
          auth:true
        }
      },
      {
        path:'/cluster',
        component:() => import('../views/PagePatientCluster.vue'),
        meta:{
          auth:true
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})


// 路由钩子
router.beforeEach((to,from,next) => {
  document.title = '手术数据挖掘与分析平台'
  if(to.meta.auth){
    sessionStorage['token'] ? next() : next('/login')
  } else {
    next()
  }
}) 

export default router
