import {request} from "../request";

export default function loginAxios(kk,username,password,k1,k2,k3,k4,k5,k6,k7,k8,k9) {
    return request({
        url:'/user'+kk,
        params:{
            username,
            password,
            k1,
            k2,
            k3,
            k4,
            k5,
            k6,
            k7,
            k8,
            k9
        }
    })
}
