import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/index.vue'
import map from "../pages/map.vue"
import Login from "../pages/login.vue"
import Academy from "../pages/academy.vue"
import Academy_2 from "../pages/academy_2.vue"
import House from "../pages/house.vue"
import Screen from "../components/screen.vue"

// view
import Book from "../views/book.vue"
import Floor from "../views/floor.vue"
import Videostudy from "../views/videostudy.vue"
import History from "../views/history.vue"
import Working from '../views/working.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Index',
    component:Index
  },
  {
    path:'/map',
    name:"Map",
    component:map
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/academy',
    name:'Academy',
    component:Academy
  },
  {
    path:'/academy_2',
    component:Academy_2
  },
  {
    path:'/house',
    component:House,
    // children:[
    //   {
    //     path:'screen',
    //     component:Screen,
    //     children:[
    //       {
    //         path:'',
    //         redirect:'videostudy'
    //       },
    //       {
    //         path:'videostudy',
    //         component:Videostudy
    //       },
    //       {
    //         path:'book',
    //         component:Book
    //       },
    //       {
    //         path:'floor',
    //         component:Floor
    //       },
    //     ]
    //   },
    // ]
  },
  {
    path:'/screen',
    component:Screen,
    children:[
      {
        path:'',
        redirect:'videostudy'
      },
      {
        path:'videostudy',
        component:Videostudy
      },
      {
        path:'book',
        component:Book
      },
      {
        path:'floor',
        component:Floor
      },
      {
        path:'history',
        component:History
      },
      {
        path:'working',
        component:Working
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
