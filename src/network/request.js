//网络请求的封装（对axios的一层封装）
import Axios from "axios";
// import Vue from "vue";

export function request(config) {
    const instance = Axios.create({     
        method: 'post',   //120.78.222.17
        baseURL:'http://localhost:8082/springboot',
        timeout:10000
    })

    // instance.interceptors.request.use(config=>{
    //     Vue.prototype.$loading.show();
    //     return config;
    // },error => {
    //
    // })
    //
    // instance.interceptors.response.use(result=>{
    //     Vue.prototype.$loading.hide();
    //     return result;
    // },error => {
    //
    // })

    instance.defaults.withCredentials = true;
    return instance(config);
}
