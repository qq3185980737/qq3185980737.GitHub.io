<template>
    <div>
      <h1>{{user.username}},欢迎来到主页</h1>
      
      <el-button @click="logout">退出登录</el-button>
    </div>
</template>

<script>
    export default {
      name: "Home",
      data(){
        return{
          user:{
            type:Object
          }
        }
      },
      mounted() {
        this.getUserFromSession();
      },
      methods:{
         getUserFromSession(){
           this.user = JSON.parse(window.sessionStorage.getItem("user"));
         },
         logout(){
           this.$confirm('正在离开本页面，本页面内所有未保存数据都会丢失', '警告', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           }).then(() => {
             window.sessionStorage.clear();
             this.$router.push('/login');
             this.$message.success('退出登录成功');
           }).catch((error) => {
             console.log(error);
           })
         }
      }
    }
</script>

<style scoped>

</style>
