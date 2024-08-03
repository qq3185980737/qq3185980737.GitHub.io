// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import { Button, Row } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import formCreate from '@form-create/element-ui'
import store from '@/store';
import axios from 'axios'


Vue.use(ElementUI)

Vue.use(formCreate)
Vue.use(Button)
Vue.use(Row)



// 这里的post设置是原有的, 这里不对post进行修改, 新增一个put请求头的设置, 在实际使用中, 使用put处理该类型的请求


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 挂载store实例
  components: { App },
  template: '<App/>'
})
