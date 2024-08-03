import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// 导入 自定义的组件
import NewForm from '@/views/NewForm'
import NewForm2 from '@/views/NewForm2'
import Custome from '@/views/customer'
import example from '@/views/example'
import Order from '@/views/order'
import Main from '@/views/main.vue'
//import Map1 from '@/views/main1.vue'
//import Map2 from '@/views/main2.vue'
import form from '@/views/form-create'
import Home from '@/views/home/Home.vue'
import Login from '@/views/login/Login.vue'
import New from '@/views/new.vue'
import apc from '@/views/apc.vue'
import Lct from '@/components/bpmn'
import design from '@/views/home/design.vue'
import design1 from '@/views/home/design1.vue'
import task from '@/views/home/task.vue'
import Show from '@/views/show.vue'
import biaodan from '@/components/element/biaodan.vue'
import createtable from '@/views/login/createtable.vue'
import text from '@/views/login/text.vue'
import Ggf from '@/views/ggf'
import Gge from '@/views/gge'
import MyOrder from '@/views/MyOrder'
import FirstPage from '@/components/FirstPage.vue'
Vue.use(Router)
export default new Router({
  routes: [

{
      path: '',
      redirect: '/login'
},
{
      path: '/',
      redirect: '/login'
 },
{
path: '/main',
name: 'Main',
component: Main,
children:[ // 子路�?
{ // 添加对应�?路由映射关系
path: '/customer',
name: 'Custome',
component: Custome
}, {
path: '/order',
name: 'Order',
component: Order
},      {
      path: '/ggf',
      name: 'Ggf',
      component: Ggf
},
{
      path: '/gge',
      name: 'Gge',
      component: Gge
},
{
      path: '/myOrder',
      name: 'MyOrder',
      component: MyOrder
},
{
      path: '/biaodan',
      name: 'biaodan',
      component: biaodan
},
{
      path: '/design1',
      name: 'design1',
      component: design1
},
/* {
      path: '/map2',
      name: 'Map2',
      component: Map2
},*/
{
      path: '/task',
      name: 'task',
      component: task
},
/*  {
      path: '/map1',
      name: 'Map1',
      component: Map1
},*/{
      path: '/FirstPage',
      name: 'firstPage',
      component: FirstPage
    },
{
      path: '/form',
      name: 'form',
      component: form
},
{
      path: '/example',
      name: 'example',
      component: example
},

{
      path: '/NewForm',
      name: 'NewForm',
      component: NewForm
},
{
      path: '/NewForm2',
      name: 'NewForm2',
      component: NewForm2
},
{
path: '/createtable',
name: 'createtable',
component: createtable
},
{
path: '/design',
name: 'design',
component: design
},

]
}
,{
  path: '/helloWorld',
  name: 'helloWorld',
  component: HelloWorld
  },{
path: '/login',
name: 'Login',
component: Login
}
,{
path: '/Home',
name: 'Home ',
component: Home
},{
path: '/new',
name: 'new',
component: New
},{
path: '/lct',
name: 'Lct',
component: Lct
},{
  path: '/show',
  name: 'show',
  component: Show
  },{
  path: '/apc',
  name: 'apc',
  component: apc
  },{
    path: '/text',
    name: 'text',
    component: text
    },


]})
