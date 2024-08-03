<template>
    <el-button type="primary" @click="putList">提交</el-button>
</template>
<script>
  import loginAxios from "@/network/login/login"; 
export default {
    name:'UpList',
    data(){
        return{
        // 数组数据
        u:'0',
            jsonList : []
        }
    },
    methods:{
        putList(){
      
                     //合法
          loginAxios("/List",this.u).then(result=>{
            if (result.data.code===9000){
              window. localStorage.setItem("user",JSON.stringify(result.data.data));
              console.log("JSON.stringify(result.data.data)"+JSON.stringify(result.data.data));     
this.jsonList=result.data.data;

console.log("result.data.data"+this.jsonList);
this.$router.push('/newform');
             // this.$router.push('/home');
              this.$message.success('登录成功！');
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
    
       
        }
    }
    
}
</script>
