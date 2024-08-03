<template>
    <el-button type="primary" @click="putList">提交</el-button>
</template>
<script>
 
export default {
    name:'UpList',
    data(){
        return{
        // 数组数据
            jsonList : [
                {
                    paramCode:'abc' ,
                    paramValue:'abcValue'
                },
                {
                    paramCode:'abc1',
                    paramValue:'abcValue1'
                },
                {
                    paramCode:'abc2',
                    paramValue:'abcValue2'
                },
            ]
        }
    },
    methods:{
        putList(){
            // jsonList 就是前端普通的实体类集合数据
            this.$axios.post("http://localhost:8082/springboot/user/upList", this.jsonList)
                .then(response => {
                    const data = response.data;
                    
                    if (data.code === 200) {
                        alert("提交成功")
                        
                    }else{
                        console.log(data.msg)
                        return;
                    }
                   
                })
                .catch(failResponse => {})
        }
    }
    
}
</script>
