import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Datalist from '@/components/Datalist'
import Airline from '@/components/Airline'
import Form from '@/components/Form'
import Charts from '@/components/Charts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path:"/datalist",
          name:"Datalist",
          component: Datalist,
        },
        {
          path:"/airline",
          name:"Airline",
          component: Airline,
        },
        {
          path:"/form",
          name:"From",
          component: Form,
        },
        {
          path:"/charts",
          name:"Charts",
          component: Charts,
        }
      ]
    }
  ]
})
