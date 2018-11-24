import Vue from 'vue'
import Router from 'vue-router'

import Movie from '../pages/movie/Root'
// 路由懒加载模式

// import Cinema from '../pages/cinema/Root'
// import Mine from '../pages/mine/Root'
// import Login from '../pages/mine/account/Login'
// import Register from '../pages/mine/account/Register'
// import Search from '../pages/common/Search'
// import CityList from '../pages/common/CityList'
// 电影详情
import MovieDetail from '../pages/common/Moviedetail'
import MoreDetail from '../pages/common/Moredetail'

// 影院详情
import Cinemadetail from '../pages/common/Cinemadetail'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      name:'movie',
      path: '/movie',
      component: Movie,
      children:[
        {
          path:'search',
          component:()=> import('../pages/common/Search'),
          props:{
            stype:-1
          }
        },
        {
          path:'citylist',
          component:()=> import('../pages/common/CityList')
        },
        {
          name:'moviedetail',
          path:'moviedetail/:title',
          component:MovieDetail,
        },
        {
          name:'moredetail',
          path:'moredetail',
          component:MoreDetail,
        }
      ]
    },
    {
      path: '/cinema',
      component: ()=> import('../pages/cinema/Root'),
      children:[
        {
          path:'search',
          component:()=> import('../pages/common/Search'),
          props:{
            stype:2
          }
        },
        {
          path:'citylist',
          component:()=> import('../pages/common/CityList')
        },
        {
          name:'cinemadetail',
          path:'cinemadetail',
          component:Cinemadetail
        }
      ]
    },
    {
      path: '/mine',
      component: ()=> import('../pages/mine/Root'),
      children:[
        {
          path:'login',
          component:()=> import('../pages/mine/account/Login')
        },
        {
          path:'register',
          component:()=> import('../pages/mine/account/Register')
        }
      ]
    },
    {
      path: '**',
      redirect: '/movie'
    }
  ]
})

export default router;
// 全局守卫

router.beforeEach((to,from,next)=>{
  let obj = {}
  let _cookie = document.cookie.split('; ');
  for(var i = 0; i < _cookie.length; i++) {
      var arr = _cookie[i].split('=');
      obj[arr[0]] = arr[1];
  }
  if(to.path == '/mine'){
    // 判断是否登录了
      if(obj.token){
        next();
      }else{
        next('/mine/login')
      }
    }
    else{
      next()
    }
})
