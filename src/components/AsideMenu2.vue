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
            label: "任务处理",
            icon: "user",
            name: "system",
            children: [
              {
                path: "/design1",
                name: "sysUser",
                label: "请假",
                
              },
              {
                path: "/SysRole",
                name: "sysRole",
                label: "组人员管理",
               
              },
            /* {
                path: "/SysMenu",
                name: "sysMenu",
                label: "流程管理",
               
              },*/
              {
                path: "/SysLog",
                name: "sysLog",
                label: "系统日志",
               
              }
            ],
          },
         
          {
            label: "历史管理",
            icon: "s-order",
            name: "order",
            children: [
              {
                path: "/AllOrder",
                name: "allOrder",
                label: "流程历史",
               
              },
              {
                path: "/MyOrder",
                name: "myOrder",
                label: "人员管理历史",
                
              },
            ],
          },
          {
            label: "个人信息",
            icon: "s-order",
            name: "order",
            children: [
              
              {
                path: "/MyOrder",
                name: "myOrder",
                label: "信息",
                
              },
            ],
          },
        ],
      };
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
           else
            this.$router.push(item.path)
        
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
      }
    },
  };
  </script>