<template>
  <div>
    <el-button type="primary" @click="openqj">返回菜单</el-button>
    <el-dialog title="流程图cds" :visible.sync="Visible1" width="1100px" style="z-index: 20;" class="thisblack-bgc" :model='false'>
    <form-create v-model="yulanform" :rule="formrule" :option="option" @on-submit="onSubmit1" style="width: 80%;margin-top: 20px;">
  </form-create>
  <el-button type="primary" @click="closeNew()">不通过</el-button>
  <el-button type="primary" @click="openNew()">通过</el-button>
  </el-dialog>
    <el-table :data="list">
      <el-table-column v-for="(item,index) in columnss" :key="index" :prop="item.key"
                       :label="item.title" :formatter="item.formatter">
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
    <el-table :data="list1">
      <el-table-column v-for="(item,index) in columnss1" :key="index" :prop="item.key"
                       :label="item.title" :formatter="item.formatter">
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

    




  </div>
</template>

<script>
  import ElementTable from "../../components/element/ElementTable";
  import loginAxios from "@/network/login/login";     
  export default {
    name: "design",
    data() {
      return {
        formrule:[],
        yulanform:{},
        option:{
                    submitBtn: {
                        show: false,
                    },

                },
        total:0,
        list:[],
        list1:[],
        k:'',
        list1:[],
        Visible:false,
        Visible1:false,
        hh:'',
        columnss: [{
          key: 'id',
          title: '流程定义ID'
        },
        /*{
          key: 'taskid',
          title: '任务ID'
        }, {
          key: 'pid',
          title: '流程实例id'
        },*/{
          key: 'taskname',
          title: '流程任务名'
        }, {
          key: 'assignee',
          title: '负责人'
        }, {
          key: 'ora',
          title: '操作',
          operator: [{
            name: "直接通过",
            type: "text",
           click: (row) => {
            this.user = JSON.parse(window.sessionStorage.getItem("user"));
           console.log(this.user)
          // this.user="lisi"
           loginAxios("/etask",row.taskid,this.user).then(result=>{
            if (result.data.code===9000){            
this.list=result.data.data;

            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
           // this.k=row.id
         // this.Visible=true
            },
           
          },  {
            name: "退回任务",
            type: "text",
            click: (row) => {
       
              loginAxios("/thrw",row.taskid).then(result=>{
            if (result.data.code==9000){     
     
              this.$message.success("victory");
             
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
          this.getUserFromSession();
            },
          },
        {
            name: "查看表单",
            type: "text",
            click: (row) => {
              this.hh=row.pid;
              this.Visible1=true;
              this.dialogVisible=false;
              loginAxios("/gbiaodan",row.pid).then(result=>{
            if (result.data.code==9000){     
              //var kk=result.data.data.field  value和field集合
              var k=result.data.data.field
              //console.log("kbshvjgcd"+kk)
              console.log("sxdso"+k)
              this.formrule=JSON.parse(k)
          
              
              console.log("this.formrule"+this.formrule)
              this.$message.success("victory");
             
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
            },
          }]
        }/*{ public String id;
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
        columnss1: [{
          key: 'id',
          title: '流程定义ID'
        },/*{
          key: 'taskid',
          title: '任务ID'
        }, {
          key: 'pid',
          title: '流程实例id'
        },*/{
          key: 'taskname',
          title: '流程任务名'
        }, {
          key: 'assignee',
          title: '负责人'
        }, {
          key: 'ora',
          title: '操作',
          operator: [{
            name: "直接通过",
            type: "text",
           click: (row) => {
            this.user = JSON.parse(window.sessionStorage.getItem("user"));
           console.log(this.user)
          // this.user="lisi"
           loginAxios("/etask",row.taskid,this.user).then(result=>{
            if (result.data.code===9000){            
this.list=result.data.data;

            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
           // this.k=row.id
         // this.Visible=true
            },
           
          },  
          {
            name: "拾取任务",
            type: "text",
           click: (row) => {
            var ll=JSON.parse(window.sessionStorage.getItem("user"));
            console.log("hvgfy"+ll);

            loginAxios("/sqrw",row.taskid,ll).then(result=>{
            if (result.data.code==9000){     
            
              this.$message.success("victory");
             
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
          this.getUserFromSession();
            },
           
          },   {
            name: "查看表单",
            type: "text",
            click: (row) => {
              this.hh=row.taskid;
              this.Visible1=true;
              this.dialogVisible=false;
              loginAxios("/gbiaodan",row.pid).then(result=>{
            if (result.data.code==9000){     
              //var kk=result.data.data.field  value和field集合
              var k=result.data.data.field
              //console.log("kbshvjgcd"+kk)
              console.log("sxdso"+k)
              this.formrule=JSON.parse(k)
          
              
              console.log("this.formrule"+this.formrule)
              this.$message.success("victory");
             
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
            },
          }   ]
        }/*{ public String id;
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
        url:"/showtask",
        user:'',
       
        
      }
    },

    components: {
      ElementTable,
      
    },created(){
      this.getUserFromSession();
    },

    methods: {
closeNew(){
  this.user = JSON.parse(window.sessionStorage.getItem("user"));
       // this.user="lisi"
           loginAxios("/ddddtask",this.hh).then(result=>{
            if (result.data.code===9000){            
              this.$message.success("result.data.msg");

            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
          this.getUserFromSession();
},
      openNew(){
        this.user = JSON.parse(window.sessionStorage.getItem("user"));
      
           loginAxios("/etask",this.hh,this.user).then(result=>{
            if (result.data.code===9000){            
this.list=result.data.data;

            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })},
      onSubmit1(formData){
                alert(JSON.stringify(formData));
                
            },
            openqj() {
        this.$router.push('/firstpage');
      },
      getUserFromSession(){
          this.user = JSON.parse(window.sessionStorage.getItem("user"));
          var bm = JSON.parse(window.sessionStorage.getItem("biaoming"));
           console.log(this.user)
           console.log(bm)
           //this.user="lisi"
           loginAxios("/showtask",this.user,bm).then(result=>{
            if (result.data.code===9000){            
this.list=result.data.data.data;
this.list1=result.data.data.data1;
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
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

},
      openNewDialog() {
        this.dialogVisible = true;
      },
      processSave(data) {
        let that = this;
       // that.post(this.Apis.processBuffer, data, res => {
       //   if (res.code == 200) {
        //    that.$refs.elementTable.reload();
       //   }
       // })
      },
      deploy() {

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
