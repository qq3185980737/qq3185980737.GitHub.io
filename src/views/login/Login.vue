<template>
  <div :style="{width:videoBox}"> 
    <div class="login_container">
    <div class="login_form">
      <p class="login_title">请假管理系统</p>
      <el-form
      model="loginForm" 
      rules="loginFormRules"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
        ref="loginForm"
      >

     
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号"
          @keyup.enter.native="login"   id="username"
                @keyup.down.native="focusNext"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
             @keyup.enter.native="login"  id="password"  show-password
      @keyup.up.native="focusUp"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
      <el-button type="info" @click="reset">重置</el-button>
     
        </el-form-item>
        院委会10001 123456
      学生会20001
      教导处30001
      </el-form>
    </div>
  </div>

</div>
</template>


<script>
import loginAxios from "@/network/login/login";           //导入登录的网络请求

export default {
  name: "Login",
  
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    
 


      bookname: '',
       // tableData:[],
        page:1,
        rows:10,
        total:0,
   
        dialogFormVisible:false,
        book:{
          id:'',
          bookname:'',
          price:'',
          booktype:''
        },
        formLabelWidth:'100px',
       

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

    }
  },
  methods: {
 
 
    // 提交登录表单的数据
    submitFormData(){
      this.$refs['formName'].validate((valid) => {
        if (valid) {
          this.$http.post("/user/login", this.form)
            .then((res) => {
              if(res.data.code === 200){
                // 表示登录成功
                // 1.存储相关的token信息  token信息在响应的header中
console.log(res.headers.authorization);
                sessionStorage.setItem("token",res.headers.authorization)
                sessionStorage.setItem("username",this.form.username)
                // 2.路由到主页面
                this.$router.push("/")
              }else{
                // 表示登录失败
                this.$message.error(res.data.msg)
              }
            });
        } else {
          // console.log('error submit!!');
          return false;
        }
      })},




    
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
			this.videoBox = "100%"
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
              //if (result.data.code===9000){}
              console.log("result.data.data.codes"+result.data.data.codes)
              window.sessionStorage.setItem("user1",JSON.stringify(result.data.data));//转换为字符
              window.sessionStorage.setItem("user",JSON.stringify(result.data.data.username));//转换为字符
              window.sessionStorage.setItem("biaoming",JSON.stringify(result.data.data.tag));//转换为字符
              window.sessionStorage.setItem("quanxian",JSON.stringify(result.data.data.codes));//转换为字符
             this.$router.push('/firstpage');
              this.$message.success('登录成功！');
            } else if(result.data.code==1){
             
              this.$message.error('用户名或密码错误！');
         }
            
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
        } else {
          console.log('输入格式错误');
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

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background-color: rgba(242, 242, 242, 1);
  background-image: url(../../assets/login_bg.jpg);
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 1278px 559px;
  border: none;
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_form {
    width: 510px;
    margin: 0px auto;
    padding: 0 55px 15px 35px;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    // 添加阴影效果
    box-shadow: 0 0 25px #cac6c6;
    .login_title {
      font-family: "微软雅黑 Bold", "微软雅黑";
      font-weight: 700;
      text-decoration: none;
      color: rgb(0, 121, 254);
      font-size: 32px;
      margin-top: 50px;
      margin-bottom: 30px;
      text-align: center;
    }
  }
}



</style>
