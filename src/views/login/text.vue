<template>
    <div :style="{width:videoBox}"> 
     
   <body id="poster">
  
  
    
  
    <el-form class="login-container" label-position="left" label-width="0px"
    :model="loginForm" :rules="loginFormRules" ref="loginForm">
  
      <h3 class="login_title">登录</h3>
      <el-form-item>
    <!--<el-button type="primary" @click="query(1)">查询</el-button>--> 
     <el-button type="success" @click="open">新增</el-button>
  </el-form-item>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"
                  @keyup.enter.native="login"   id="username"
                  @keyup.down.native="focusNext"></el-input>
      </el-form-item>
  
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"
        @keyup.enter.native="login"  id="password"  show-password
        @keyup.up.native="focusUp"></el-input>
      </el-form-item>
  
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  <el-card style="margin-top: 20px">
  <el-table :data="tableData"  style="width: 100%">
  <el-table-column type="selection" width="55"> </el-table-column>
  <el-table-column prop="id" label="日期"> </el-table-column>
  <el-table-column prop="name" label="姓名"> </el-table-column>
  <el-table-column prop="kid" label="地址"> </el-table-column>
  <el-table-column prop="save" label="地址"> </el-table-column>
  <el-table-column prop="m" label="地址"> </el-table-column>
  <el-table-column prop="w" label="地址"> </el-table-column>
  <el-table-column prop="pwd" label="地址"> </el-table-column>
  
          </el-table>
  </el-card>
  <!--
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="dialogClose">
        <el-form ref="book" :model="book">
          <el-form-item  label="书本编号" :label-width="formLabelWidth">
            <el-input readonly="readonly" v-model="book.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="bookname" label="书本名字" :label-width="formLabelWidth">
            <el-input v-model="book.bookname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="price" label="书本价格" :label-width="formLabelWidth">
            <el-input v-model="book.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="booktype" label="书本类型" :label-width="formLabelWidth" >
            <el-select v-model="book.booktype" placeholder="请选择" style="width: 100%">
              <el-option label="玄幻" value="玄幻"></el-option>
              <el-option label="神话" value="神话"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
  --> 
    </body>
  </div>
  </template>
  
  
  <script>
  import loginAxios from "@/network/login/login";           //导入登录的网络请求
  
  export default {
    name: "Login",
    
    data() {
      
      return {
        bookname: '',
          tableData:[],
          page:1,
          rows:10,
          total:0,
          title:'书本新增',
          dialogFormVisible:false,
          book:{
            id:'',
            bookname:'',
            price:'',
            booktype:''
          },
          formLabelWidth:'100px',
          rules: {
            bookname: [
              { required: true, message: '请输入书本名称', trigger: 'blur' },
            ],
            price: [
              { required: true, message: '请输入书本价格', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            booktype: [
              { required: true, message: '请选择书本类型', trigger: 'change' }
            ],
          },
  
        videoBox:"",
        loginForm: {            //表单数据
          username: '',
          password: ''
        },
        loginFormRules:{          //拦截规则
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
          ]
        },
  tableData:[]
  /*
  id: '',
          kid: '',
  m: '',
         name: '',
  pwd: '',
      save: '',
  w: ''
  */
      }
    },
    methods: {
     /* save:function(){
          this.$refs['book'].validate((valid) => {
            if (valid) {
              //定义路径
              let url=this.axios.urls.BOOK_ALL;
              let methodName="addBook";
              if(this.title=="编辑书本"){
                methodName="editBook";
              }
              //定义请求参数
              this.book['methodName']=methodName;
              //ajax请求
              this.axios.post(url,this.book).then(resp=>{
                let data=resp.data;
                this.$message({
                    message: data.msg,
                    type: data.code==1?'success':'error'
                });
                if(data.code==1){
                  //关闭对话框
                  this.dialogFormVisible=false;
                  //刷新数据
                  this.query(this.page);
                }
              }).catch(err=>{
                console.log(err);
              });
            } else {
              alert('格式不正确！');
              return false;
            }
          });
        },
  
      open:function(){
          this.dialogFormVisible=true;
        },
        //关闭对话框事件
        dialogClose:function(){
          //清空表单数据
          this.book={
            id:'',
            bookname:'',
            price:'',
            booktype:''
          };
          //清空表单
          this.$refs['book'].resetFields();
          //重置对话框标题
          this.title="新增书本";
        }, //新增书本事件
        save:function(){
          //定义路径
          let url=this.axios.urls.BOOK_ALL;
          let methodName="addBook";
          if(this.title=="编辑书本"){
             methodName="editBook";
          }
          //定义请求参数
          this.book['methodName']=methodName;
          //ajax请求
          this.axios.post(url,this.book).then(resp=>{
            let data=resp.data;
            this.$message({
                message: data.msg,
                type: data.code==1?'success':'error'
            });
            if(data.code==1){
              //关闭对话框
              this.dialogFormVisible=false;
              //刷新数据
              this.query(this.page);
            }
          }).catch(err=>{
            console.log(err);
          });
        },*/
  
  
  
      
      browserRedirect() {
          var sUserAgent = navigator.userAgent.toLowerCase();
          var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
          var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
          var bIsMidp = sUserAgent.match(/midp/i) == "midp";
          var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
          var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
          var bIsAndroid = sUserAgent.match(/android/i) == "android";
          var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
          var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
          if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        this.videoBox = "75%"
          console.log("动端页面");
           } else {
           //跳转pc端页面
              console.log("pc");
              this.videoBox = "50%"
           }
  },
  
  
      focusNext(){            //光标指向下一个
        document.getElementById('password').focus();
      },
      focusUp(){            //光标指向上一个
        document.getElementById('username').focus();
      },
      login() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {                //合法
            loginAxios("/login",this.loginForm.username,this.loginForm.password).then(result=>{
              if (result.data.code===9000){
                window.sessionStorage.setItem("user",JSON.stringify(result.data.data));
  this.tableData=result.data.data;
  
  console.log(this.tableData);
               // this.$router.push('/home');
                this.$message.success('登录成功！');
              }else {
                this.$message.error(result.data.msg);
              }
            }).catch(error=>{
              this.$message.error("登录时出现错误，请重新尝试！");
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      reset(){                  //重置按钮
        this.$refs.loginForm.resetFields();
      }
    },
    mounted () { //这个属性就可以，在里面声明初始化时要调用的方法即可
        // we can implement any method here like
        this.browserRedirect() 
      }
  }
  </script>
  
  
  