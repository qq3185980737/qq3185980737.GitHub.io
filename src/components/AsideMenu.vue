<template>
    <div class="asideContianer">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="rgb(50, 65, 87)"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <h3>请假系统</h3>
        <!--没有二级菜单-->
        <el-menu-item
          v-for="item in noChildren"
          :key="item.name"
          :index="item.name"
          @click="clickMenu(item)"
        >
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <!--有二级菜单-->
        <el-submenu
          v-for="item in hasChildren"
          :key="item.name"
          :index="item.name"
        >
          <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
          </template>
  
          <el-menu-item-group
            v-for="subItem in item.children"
            :key="subItem.name"
            
          >
            <el-menu-item :index="subItem.name" @click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </template>
  <style lang="less" scoped>
  .el-menu {
    height: 100vh;
    border-right: none;
    h3 {
      color: #fff;
      text-align: center;
      line-height: 48px;
      font-size: 22px;
      font-weight: 400;
      padding: 0 20px;
    }
  }
  </style>
  
  <script>
  export default {
    name: "Aside",
    data() {
      return {
        
        //isCollapse: false,
        menuData: [
          {
            path: "/",
            name: "main",
            label: "返回登录",
            
          },
          {
            label: "组管理",
            icon: "user",
            name: "system",
            children: [
              {
                path: "/createtable",
                name: "sysUser",
                label: "组管理",
                
              }
            ],
          },
          {
            label: "流程管理",
            icon: "user",
            name: "customer",
            children: [
              {
                path: "/design",
                name: "customerList",
                label: "流程设计",
                
              },
              {
                path: "/design1",
                name: "commonCustomer1",
                label: "请假申请",
                
              },
              {
                path: "/task",
                name: "commonCustomer",
                label: "请假审批",
                
              },
            ],
          },
          {
            label: "个人信息",
            icon: "s-order",
            name: "myOrder",
            children: [
              
              {
                path: "/MyOrder",
                name: "myOrder",
                label: "信息",
                
              },
            ],
          },
          {
            label: "公告",
            icon: "s-order",
            name: "gg",
            children: [
              
              {
                path: "/ggf",
                name: "ggf",
                label: "公告查看",
                
              },
              {
                path: "/gge",
                name: "gge",
                label: "公告编辑",
                
              },
            ],
          },
        ],
      }
      user:{
            type:Object
          }
    },
    methods: {
      clickMenu(item){
          // 如果需要更新的路由和当前路由不一致就更新
         if(item.path=='/'){
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
           })}
           else{
            this.user = JSON.parse(window.sessionStorage.getItem("user1"));
            if(this.user.codes==2||this.user.codes==0)
            {this.$router.push(item.path)}
            else{
            if(this.user.codes==1&&item.path=='/design1')
            {this.$router.push(item.path)}
            else {this.$message.error('权限不足');}}
          }
          this.$store.commit('menuChange',item)
      }
    },
    computed: {
      hasChildren() {
      // 过滤获取所有的有二级菜单的数据
      return this.menuData.filter((item) => item.children);
    },
    noChildren() {
      // 过滤所有只有一级菜单的数据
      return this.menuData.filter((item) => !item.children);
    },isCollapse(){
      return this.$store.state.tab.isCollapse
    },
      hasChildren() {
        // 过滤获取所有的有二级菜单的数据
        return this.menuData.filter((item) => item.children);
      },
      noChildren() {
        // 过滤所有只有一级菜单的数据
        return this.menuData.filter((item) => !item.children);
      }
    },
  };
  </script>