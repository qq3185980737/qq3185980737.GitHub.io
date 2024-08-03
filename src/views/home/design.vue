<template>
  <div>
    <div class="toolbar">
      <el-button type="primary" @click="openNewDialog">设计请假流程</el-button>
     
      <el-button type="primary" @click="openqj">设计请假单</el-button>
      <el-button type="primary" @click="openqj2">设计销假单</el-button>
      <el-button type="primary" @click="openqj1">返回菜单</el-button>
   <el-dialog title="表单" :visible.sync="Visible1" width="1100px" style="z-index: 20;" class="thisblack-bgc" :model='false'>
    <form-create v-model="yulanform" :rule="formrule" :option="option" @on-submit="onSubmit1" style="width: 80%;margin-top: 20px;">
  </form-create>
  </el-dialog>
  </div>
  <element-table :url="url" :page-size="10" :columns="columns"   ref="elementTable" v-on:wxj="getStudentName"></element-table>
  
    <el-dialog title="请假流程图" :visible.sync="dialogVisible" width="1100px" style="z-index: 20;" class="thisblack-bgc" :model='false'>
      <slot name="-" style="border: none;padding: 0px;margin: 0px;">
        <vue-bpmn style="overflow: hidden;height: 700px;" product="flowable" @processSave="processSave"></vue-bpmn>
      </slot>
    </el-dialog>
    
    <el-dialog title="选择表" :visible.sync="Visible" width="1100px" style="z-index: 990;" class="thisblack-bgc" :model='false'>
  <el-card style="margin-top: 20px">
<el-table :data="list">
<el-table-column v-for="(item,index) in columnss" :key="index" :prop="item.key" :label="item.title" >

<template slot-scope="scope">
<div v-if="item.operator">
<template v-for="(o,key) in item.operator">
  <el-button :type="o.type" :key="key" @click="o.click(scope.row)"
             size="small" v-if="!o.hidden || !o.hidden(scope.row)">{{o.name}}
  </el-button>
</template>
</div>
<div v-else>
<span v-if="!item.formatter">
  <template v-if="item.type">
    {{item.type=='date'?dateFormat(scope.row[item.key],"YYYY-MM-DD"):dateFormat(scope.row[item.key])}}
  </template>
  <template v-else>
    {{scope.row[item.key]}}
  </template>
</span>
<span v-else v-html="item.formatter(scope.row,item.key,scope.row[item.key],index)"></span>
</div>
</template>
</el-table-column>
</el-table>
</el-card>
</el-dialog>


  </div>
</template>

<script>
  import ElementTable from "../../components/element/ElementTable";
 
  import VueBpmn from "../../components/bpmn/VueBpmn";
  import loginAxios from "@/network/login/login";     
  export default {
    name: "design",
    data() {
      return {
        tag:null,
        index2:'',
        dialogVisiblekk:false,
        formrule:[],
        list:[],
        k:'',
        mz:'',
        yulanform:{},
        option:{
                    submitBtn: {
                        show: false,
                    },

                },
                Visible1:false,
        Visible:false,
        columnss: [{
          key: 'taskid',
          title: '任务ID'
        }, {
          key: 'pid',
          title: '流程实例id'
        },{
          key: 'taskname',
          title: '流程任务名'
        }, {
          key: 'assignee',
          title: '负责人'
        },  {
          key: 'ora',
          title: '操作',
          operator: [
            {
            name: "删除流程实例",
            type: "text",
            click: (row) => {

              this.Visible1=true;
              this.dialogVisible=false;
              this.formrule=[];
              loginAxios("/dlchsl",row.pid).then(result=>{
            if (result.data.code===9000){     
              
              this.$message.success("victory");
             
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
          this.getStudentName1(this.mz)
          

//this.getStudentName1(this.mz)
          this.dialogVisible=false;
          
            },
          
          }]
        } /*{ public String id;
    public String name;
    public String key;
    public String version;
    public String kid;
    
          key: 'status',
          title: '状态',
          formatter: (row, key) => {
            if (row[key] == 0) {
              return "未发布";
            }
            return "已发布"
          }
        }, */ ],
        dialogVisible: false,
        url:"/finddifinite",
       columns: [
        {
          key: 'name',
          title: '流程名称'
        },
        /*{
          key: 'id',
          title: '流程定义ID'
        }, {
          key: 'key',
          title: '流程定义ID'
        }, {
          key: 'version',
          title: '流程版本'
        }, {
          key: 'kid',
          title: '流程部署id'
        }, { public String id;
    public String name;
    public String key;
    public String version;
    public String kid;
    
          key: 'status',
          title: '状态',
          formatter: (row, key) => {
            if (row[key] == 0) {
              return "未发布";
            }
            return "已发布"
          }
        }, */ {
          key: 'ora',
          title: '操作',
          operator: [{
            name: "查看",
            type: "text",
           click: (row) => {
            console.log('App收到了学生名：1')
            this.getStudentName(row.id) 
            this.mz=row.id
            console.log('App收到了学生名：12')
           

            
           // this.k=row.id
         // this.Visible=true
            },
           
          },  
          {
            name: "删除流程定义和流程实例",
            type: "text",
           click: (row) => {

            this.user = JSON.parse(window.sessionStorage.getItem("user1"));
            if(this.user.codes==2||this.user.codes==1)
            {this.$message.error("权限不足");}
            else {
            console.log(row.id)
            loginAxios("/dlchdy",row.kid).then(result=>{
            if (result.data.code===9000){     
             
              this.$message.success("victory");
             
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })}

            },
           
          }, 
        /*  {
            name: "设计表单",
            type: "text",
           click: (row) => {
            window.sessionStorage.setItem("user1",row.id);//转换为字符
            console.log(row.id)
this.$router.push('/newform');
            },
           
          },  */    {
            name: "查看表单",
            type: "text",
            click: (row) => {
              this.markk=row.version;
              this.markkz=row.id;
              this.Visible1=true;
              this.dialogVisible=false;
              loginAxios("/fbiaodan",row.version).then(result=>{
            if (result.data.code===9000){     
              console.log(result.data.data.field)
              var k=result.data.data.field
              this.formrule=JSON.parse(k)
              for(let key in this.formrule){
                this.$message.success("victory");
        console.log("1"+key)
      
        for(let m in this.formrule[key])
        {console.log("3"+m)
       if(m=='value'){this.formrule[key][m]=''
       }
        //console.log("4"+j[key][m])this.markk实例号markkz定义号
      }
      }
              console.log(this.formrule)
             
              
              console.log("this.formrule"+this.formrule)
              //this.$message.success("victory");
             
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
           // this.$message.error("登录时出现错误，请重新尝试！");
          })
            },
         
          }]
        }],
        
      }
    },

    components: {
      ElementTable,
  
      VueBpmn
    },   
    created() {
 
    },
   
    methods: {

      onSubmit1(formData){
                alert(JSON.stringify(formData));
                
            },
      getStudentName(name) {
        console.log('App收到了学生名：')
console.log('App收到了学生名：', name)
loginAxios("/findtask",name).then(result=>{
            if (result.data.code===9000){            
this.list=result.data.data;
this.Visible=true;

            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })

},      getStudentName1(name) {
       
loginAxios("/findtask",name).then(result=>{
            if (result.data.code==9000){            
this.list=result.data.data;
this.dialogVisible=false;
this.Visible1=false;
this.Visible=false;
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })

},
      openNewDialog() {
        this.dialogVisible = true;
      }, 
      openNewDialogkk() {
        this.dialogVisiblekk = true;
      },
      openqj() {
        this.$router.push('/newform');
      },
      openqj2() {
        this.$router.push('/newform2');
      },
      processSave(data) {
        let that = this;
       // that.post(this.Apis.processBuffer, data, res => {
       //   if (res.code == 200) {
        //    that.$refs.elementTable.reload();
       //   }
       // })
      },
    
      openqj1() {
        this.$router.push('/firstpage');
      },
      findtask() {
        
        loginAxios("/findtask",name).then(result=>{
            if (result.data.code===9000){            
this.list=result.data.data;

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

<style>
.thisblack-bgc {
  background-color: rgba(255, 251, 251, 0.5);
}
</style>
