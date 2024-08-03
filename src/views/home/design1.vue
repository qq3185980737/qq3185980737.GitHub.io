<template>
  <div>
    <div class="toolbar">
      <el-button type="primary" @click="openqj">返回菜单</el-button>
      <el-dialog title="历史" :visible.sync="Visible2" width="1100px" style="z-index: 20;" class="thisblack-bgc" >
        <el-table :data="list">
      <el-table-column v-for="(item,index) in columnssad" :key="index" :prop="item.key"
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
  </el-dialog>

      <el-button type="primary" @click="getlist()">历史查看</el-button>


      <el-dialog title="详细信息" :visible.sync="Visible21" width="1100px" style="z-index: 20;" class="thisblack-bgc" >
        <el-table :data="list10">
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
  </el-dialog>





   <el-dialog title="请假单" :visible.sync="Visible1" width="1100px" style="z-index: 20;" class="thisblack-bgc" :model='false'>
    请假开始时间<el-date-picker
      v-model="namez1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
     
    请假结束时间 <el-date-picker
      v-model="namez2"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    请假时间<input type="number" id="age" v-model="namez3" auto-complete="off" placeholder="请假时间(天)">
    
    <form-create v-model="yulanform" :rule="formrule" :option="option" @on-submit="onSubmit1" style="width: 80%;margin-top: 20px;">
  </form-create>

      <el-button type="primary" @click="changeindex(0)">立即申请</el-button>
  </el-dialog>
  </div>

  
  <element-table :url="url" :page-size="10" :columns="columns" ref="elementTable" v-on:wxj="getStudentName"></element-table>
   
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
        columnssad:[],
        index2:'',
        formrule:[],
        list:[],
        list10:[],
        namez1:'',
        namez2:'',
        namez3:'',
        mark1:[],
        k:'',
        Visible2:false,
        yulanform:{},
        option:{
                    submitBtn: {
                        show: false,
                    },

                },
                Visible1:false,
        Visible21:false,
        markk:'',
        markkz:'',
        columnss: [
          {
          key: 'assignee',
          title: '候选组'
        },
        {
          key: 'taskname',
          title: '负责人'
        }, {
          key: 'taskid',
          title: '任务'
        }, {
          key: 'pid',
          title: '候选人'
        }, 
       /*  {
          key: 'status',
          title: '状态'
        },
       {
          key: 'ora',
          title: '操作',
          operator: [{
            name: "直接通过",
            type: "text",
           click: (row) => {
           
           // this.k=row.id
         // this.Visible=true
            },
           
          },  
          {
            name: "查看",
            type: "text",
           click: (row) => {
            window.sessionStorage.setItem("user1",row.id);//转换为字符

this.$router.push('/newform');
            },
           
          },   {
            name: "查看表单",
            type: "text",
            click: (row) => {
              this.hh=row.pid;
              this.Visible1=true;
              this.dialogVisible=false;
              loginAxios("/gbiaodan",row.pid).then(result=>{
            if (result.data.code===9000){     
              //var kk=result.data.data.field  value和field集合
              var k=result.data.data.title
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
        }*/
       ],
       columnssad: [
          {
          key: 'assignee',
          title: '负责人员或组'
        },
        {
          key: 'taskname',
          title: '请假类型'
        },/* {
          key: 'pid',
          title: '候选人'
        }, {
          key: 'id',
          title: '候选人'
        }, */
        {
          key: 'status',
          title: '状态'
        }, {
          key: 'ora',
          title: '操作',
          operator: [{
            name: "查看",
            type: "text",
           click: (row) => {
            console.log('App收到了学生名：1')
            this.getStudentName(row.id) 
            console.log('App收到了学生名：12')
           // this.k=row.id
         // this.Visible=true
            },
           
          },  
          ]
        }
       /* {
          key: 'ora',
          title: '操作',
          operator: [{
            name: "直接通过",
            type: "text",
           click: (row) => {
           
           // this.k=row.id
         // this.Visible=true
            },
           
          },  
          {
            name: "查看",
            type: "text",
           click: (row) => {
            window.sessionStorage.setItem("user1",row.id);//转换为字符

this.$router.push('/newform');
            },
           
          },   {
            name: "查看表单",
            type: "text",
            click: (row) => {
              this.hh=row.pid;
              this.Visible1=true;
              this.dialogVisible=false;
              loginAxios("/gbiaodan",row.pid).then(result=>{
            if (result.data.code===9000){     
              //var kk=result.data.data.field  value和field集合
              var k=result.data.data.title
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
        }*/
       ],
        columnsso: [
         /* {
          key: 'id',
          title: '任务'
        },*/
        {
          key: 'taskname',
          title: '流程名'
        }, {
          key: 'status',
          title: '流程状态'
        }, /*{
          key: 'pid',
          title: '候选人'
        }, */ {
          key: 'assignee',
          title: '负责人'
        },
       /*  {
          key: 'status',
          title: '状态'
        },
       {
          key: 'ora',
          title: '操作',
          operator: [{
            name: "直接通过",
            type: "text",
           click: (row) => {
           
           // this.k=row.id
         // this.Visible=true
            },
           
          },  
          {
            name: "查看",
            type: "text",
           click: (row) => {
            window.sessionStorage.setItem("user1",row.id);//转换为字符

this.$router.push('/newform');
            },
           
          },   {
            name: "查看表单",
            type: "text",
            click: (row) => {
              this.hh=row.pid;
              this.Visible1=true;
              this.dialogVisible=false;
              loginAxios("/gbiaodan",row.pid).then(result=>{
            if (result.data.code===9000){     
              //var kk=result.data.data.field  value和field集合
              var k=result.data.data.title
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
        }*/
       ],
        value:'',
        dialogVisible: false,
        url:"/finddifinite",
        mark2:{field:"",value:""},
       columns: [
        //{
        //  key: 'id',
       //   title: '流程定义ID'
       // }, 
       {
          key: 'name',
          title: '请假类型'
        },
        /*{
          key: 'key',
          title: '流程key'
        },
        {
          key: 'version',
          title: '流程实例id'
        }, 
       {
          key: 'kid',
          title: '流程部署id'
        },*/ 
        /*{ public String id;
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
            console.log('App收到了学生名：12')
           // this.k=row.id
         // this.Visible=true
            },
           
          },  
           {
            name: "填写表单并请假",
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
              console.log(this.formrule)
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
        }],
        
      }
    },

    components: {
      ElementTable,
     
    },
   
    methods: {
      openqj() {
        this.$router.push('/firstpage');
      },
  getlist(){ 
    this.Visible2=true
    this.user = JSON.parse(window.sessionStorage.getItem("user"));
    var biaom = JSON.parse(window.sessionStorage.getItem("user1"));
           console.log(this.user)
           //this.user="张三"
           loginAxios("/showtask1",this.user,biaom.tag).then(result=>{
            if (result.data.code===9000){            
this.list=result.data.data;

            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })},

      index(){    
        this.Visible2=true
        this.user = JSON.parse(window.sessionStorage.getItem("user"));
           console.log(this.user)
           this.user="zhangsan"
           loginAxios("/showtask",this.user).then(result=>{
            if (result.data.code===9000){            
this.list=result.data.data;

            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
        },
      changeindex(msg){
        this.Visible1=false
        var j = this.yulanform.model();
      for(let key in j){
       // console.log("1"+key)
        //console.log("2"+j[key])
        for(let m in j[key])
        {console.log("3"+m)
        if(m=='field'){this.mark2.field=j[key][m]}
        else if(m=='value'){this.mark2.value=j[key][m]
        this.mark1.push(this.mark2)}
        //console.log("4"+j[key][m])this.markk实例号markkz定义号
      }
      }
      console.log("45633"+JSON.stringify(this.formrule))
   
        loginAxios("/ttbiaodan",this.markkz,this.markk,JSON.stringify(this.mark1),
        JSON.stringify(this.formrule),this.namez1,this.namez2,this.namez3).then(result=>{
            if (result.data.code==9000){     
            
              this.$message.succuss("victory");
             
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
           // this.$message.error("登录时出现错误，请重新尝试！");
          })
      },
      onSubmit1(formData){
                alert(JSON.stringify(formData));
                loginAxios("/fbiaodan",row.id).then(result=>{
            if (result.data.code===9000){     
              console.log(result.data.data.t2)
              var k=result.data.data.t2
              this.formrule=JSON.parse(k)
              console.log(this.formrule)
             
              
              console.log("this.formrule"+this.formrule)
             
             
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
this.list10=result.data.data;
this.Visible21=true;

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
this.list10=result.data.data;

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
