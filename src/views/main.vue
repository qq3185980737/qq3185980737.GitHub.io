<template>

  <div>
  <div class="hello">
    <el-container>
      <el-aside width="auto" >
        <aside-menu></aside-menu>
      </el-aside>
      <el-container>
        <el-header>
          
          <Header></Header>
        </el-header>
        <common-tab></common-tab>
       
          <el-main>
           
              <!-- 路由的出口 -->
              <router-view></router-view>
          </el-main>
        
      </el-container>
    </el-container>
  </div>
  
    <!--      <el-header>{{user.username+user.tag1}},欢迎来到主页</el-header>-->
             
      
    <!--   <el-button @click="logout">退出登录</el-button>
      <textarea v-model="message2" placeholder="多行文本输入……"></textarea>-->
    




</div>

</template>
<script>
import Header from '@/components/Header.vue'
import CommonTab from '@/components/CommonTab.vue';
import AsideMenu from '@/components/AsideMenu.vue';
export default {
name: 'Main',
data () {
return {
ll:'',
msg: 'Welcome to Your Vue.js App'
}
user:{
            type:Object
          }
},
created: function () {

	this.getUserFromSession();
},
      methods:{
         getUserFromSession(){
            this.user = JSON.parse(window.sessionStorage.getItem("user1"));
            this.ll=JSON.parse(window.sessionStorage.getItem("user"));
           console.log(this.user)
         },
        
      },components:{
      
    Header,
    CommonTab,
    AsideMenu}
 
}
</script>

<style scoped>
  .el-header{
    padding: 0;
  }
</style>