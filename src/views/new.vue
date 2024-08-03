<template>
    <div>欢迎来到主页
      <h1>{{user.username}},欢迎来到主页</h1>
      <el-button @click="find()">查看</el-button>
<el-card style="margin-top: 20px">
<el-table :data="tableData" stripe style="width: 100%">
<el-table-column prop="date" label="日期"> </el-table-column>
<el-table-column prop="name" label="姓名"> </el-table-column>
<el-table-column prop="address" label="地址"> </el-table-column>
</el-table>
</el-card>



    </div>
</template>
<script>
    export default {
      name: "Home",
tableData: [
{
date: "2016-05-02",
name: "王小虎",
address: "上海市普陀区金沙江路 1518 弄",
},
{
date: "2016-05-04",
name: "王小虎",
address: "上海市普陀区金沙江路 1517 弄",
},
{
date: "2016-05-01",
name: "王小虎",
address: "上海市普陀区金沙江路 1519 弄",
},
{
date: "2016-05-03",
name: "王小虎",
address: "上海市普陀区金沙江路 1516 弄",
},
]
,
      data(){
        return{
          user:{
            type:Object
          },
loginForm: {            //表单数据
        username: '',
        password: '',
        save: '',
        m: '',
        w: '',
        password: '',
        username: '',
        password: '',
        username: '',
        password: '',
        username: '',
       
      },
      loginFormRules:{          //拦截规则
       
      }
    
        }
      },
      mounted() {
        this.getUserFromSession();
 this.getUserFromSession1()
      },
      methods:{
 getUserFromSession1(){
           this.tableData = tableData;
         },
         getUserFromSession(){
           this.user = JSON.parse(window.sessionStorage.getItem("user"));
         },
         find(){
            const params = {
        params: {
          page: 0,
        },
      };
console.log(params);
this.$refs.params.validate((valid) => {
        if (valid) {
loginAxios(this.params.page).then(result=>{
            if (result.data.code===9000){
              window.sessionStorage.setItem("emp",JSON.stringify(result.data.data));
this.ruleForm =JSON.parse(window.sessionStorage.getItem("user"));
 console.log(this.ruleForm);
             this.ruleForm = result.data;
 console.log(this.ruleForm);
              this.$message.success('登录成功！');
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
        }  else {
          console.log('error submit!!');
          return false;
        }
      });
    },}
         
      
    }
</script>

<style scoped>
