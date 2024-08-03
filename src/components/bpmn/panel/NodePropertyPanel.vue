<template>
  <div>
    <el-form :inline="false"
             label-width="100px"
             size="small"
             label-position="right">
      <el-form-item label="节点类型">
        <el-input v-model="localFormData.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="节点ID">
        <el-input v-model="localFormData.id" @input="updateId"></el-input>
      </el-form-item>
      <el-form-item label="节点名称">
        <el-input v-model="localFormData.name" @input="updateName"></el-input>
      </el-form-item>
      <el-form-item>
    <!--   <el-button type="primary" @click="login">选择</el-button>-->
    </el-form-item>
      <!--usertask-->
      <el-form-item v-if="localFormData.type=='bpmn:UserTask'" label="节点人员">
        <el-select v-model="localFormData.userType" placeholder="请选择" @change="changeUserType">
          <el-option value="assignee" label="指定人员"></el-option>
          <el-option value="candidateUsers" label="候选人员"></el-option>
          <el-option value="candidateGroups" label="角色/岗位"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="指定人员" v-if="localFormData.type=='bpmn:UserTask' && localFormData.userType === 'assignee'">
        <el-button type="primary" @click="login1">选择</el-button>

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


<p>选择的表</p>
<el-card style="margin-top: 20px">

<el-table :data="clist1">
<el-table-column v-for="(item,index) in columns1" :key="index" :prop="item.key" :label="item.title" >

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
添加的人员
<el-card style="margin-top: 20px">
<el-table :data="slist1">
<el-table-column v-for="(item,index) in scolumns1" :key="index" :prop="item.key" :label="item.title" >

<template slot-scope="scope">
  <div v-if="item.operator">
    <template v-for="(o,key) in item.operator">
      <el-button :type="o.type" :key="key" @click="o.click(scope.row,scope.$index)"
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
<el-button type="primary" @click="login11">提交</el-button>
</el-card>
</el-dialog>

       <!--usertask <el-dialog title="流程图" :visible.sync="dialogVisible" width="1100px">
    </el-dialog>-->
       <!-- <el-select
            v-model="localFormData.assignee"
            placeholder="请选择"
            key="1"
            @change="(value) => addUser({assignee: value})"
        >
          <el-option
              v-for="item in bpmnData.assignees"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item label="候选人员" v-else-if="localFormData.type=='bpmn:UserTask' && localFormData.userType === 'candidateUsers'">
    
        <el-button type="primary" @click="login1">多选择</el-button>

<el-dialog title="表查看" :visible.sync="Visible" width="1100px" style="z-index: 990;" class="thisblack-bgc" :model='false'>
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


<p>添加的表</p>
<el-card style="margin-top: 20px">

<el-table :data="clist1">
<el-table-column v-for="(item,index) in columns1" :key="index" :prop="item.key" :label="item.title" >

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
添加的人员
<el-card style="margin-top: 20px">
<el-table :data="slist1">
<el-table-column v-for="(item,index) in scolumns1" :key="index" :prop="item.key" :label="item.title" >

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
<el-button type="primary" @click="login22">提交</el-button>
</el-card>
</el-dialog>

            <!--  <el-select
            v-model="localFormData.candidateUsers"
            placeholder="请选择"
            key="2"
            multiple
            @change="(value) => addUser({candidateUsers: value.join(',') || value})">
        
          <el-option
              v-for="item in bpmnData.candidateUsers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item label="角色/岗位" v-else-if="localFormData.type=='bpmn:UserTask' && localFormData.userType === 'candidateGroups'" >
       
      单选
           <el-select 
            v-model="candidate"
            placeholder="请选择"
            @change="(value) => addUser({candidateGroups: value})"
        >
          <el-option
              v-for="item in bpmnData.roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="login1">多选择</el-button>

        <el-dialog title="表查看" :visible.sync="Visible" width="1100px" style="z-index: 990;" class="thisblack-bgc" :model='false'>
          <el-card style="margin-top: 20px">
            <el-button type="primary" @click="gettablename">返回初始部门</el-button>
<el-table :data="list">
  <el-table-column v-for="(item,index) in columnss99" :key="index" :prop="item.key" :label="item.title" >

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


<p>添加的表</p>
        <el-card style="margin-top: 20px">

    <el-table :data="clist3">
      <el-table-column v-for="(item,index) in columnss98" :key="index" :prop="item.key" :label="item.title" >

        <template slot-scope="scope">
          <div v-if="item.operator">
            <template v-for="(o,key) in item.operator">
              <el-button :type="o.type" :key="key" @click="o.click(scope.row,scope.$index)"
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
    <el-button type="primary" @click="login33">提交</el-button>
  </el-card>
  
  <!--添加的人员
<el-card style="margin-top: 20px">
<el-table :data="slist3">
<el-table-column v-for="(item,index) in scolumns3" :key="index" :prop="item.key" :label="item.title" >

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

</el-card>-->
    </el-dialog>
    
      </el-form-item>
    
      <el-form-item v-if="localFormData.type=='bpmn:SequenceFlow'" label="分支条件">
        <el-button type="primary" @click="tjtj">添加条件</el-button>
        <el-dialog title="表查看" :visible.sync="Visible1" width="1100px" style="z-index: 990;" class="thisblack-bgc" :model='false'>
        <el-select 
            v-model="SequenceFlow1"
            placeholder="请选择"
        >
          <el-option
              v-for="item in bpmnData.select"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>
        <el-input v-model="SequenceFlow2" ></el-input>
        <el-button type="primary" @click="tj1">添加</el-button>
        {{ SequenceFlow1+SequenceFlow2 }}
      </el-dialog>
          <!--sequenceFlow
        <el-button type="primary" @click="xz">添加选择</el-button>
       
        <div v-for="(item, index)  in SequenceFlow" :key="index">
          {{ SequenceFlow[index].name }}
       
        <el-select 
            v-model="SequenceFlow[index].name"
            placeholder="请选择"
        >
          <el-option
              v-for="item in bpmnData.select"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          ></el-option>
        </el-select>
        <el-input v-model="SequenceFlow[index].key" @input="updateSequenceFlow(SequenceFlow[index].name,SequenceFlow[index])"></el-input>
   
      </div>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ElementTable from "../../element/ElementTable";
import loginAxios from "@/network/login/login";     
  export default {
    name: "NodePropertyPanel",
    data() {
      return {
        g1:null,
      g2:null,
      link:[],
        SequenceFlow1:'',
        SequenceFlow2:'',
        SequenceFlow:[],
      clist:[],
        list:[//{
           // procId:"北京1",},
          // { procId:"北京2",}
            ],//表名数据
            scolumns1: [],//表项数据
            
            columns1: [],//表项数据
            count: ['hsvg'],//表项数据
       
            clist3:[],
            slist1:[],//表的数据
        
      
              columnss: [ {
          key: 'procId',
          title: '表名',
       
        },{
          key: "ora",
          title: "操作",
          operator: [        {
            name: "选择",
            type: "text",
            click: (row) => {
              // TODO
              console.log(row)
              loginAxios("/tableshow",row).then(result=>{
            if (result.data.code===9000){
            // list1.add(list())

            this.clist1=result.data.data.data1;
           
this.columns1=result.data.data.data;
let scolumns1=this.columns1;
this.scolumns1=scolumns1;
this.columns1.push({//操作按钮
          key: "ora",
          title: "操作",
          operator: [{
            name: "选择",
            type: "text",
            click: (row) => {
              // TODO
              this.slist1.push(row)
              console.log(row)
          
            }
          }]
        });
        this.scolumns1.push({//操作按钮
          key: "ora",
          title: "操作",
          operator: [{
            name: "删除",
            type: "text",
            click: (row,index) => {
              // TODO
              this.slist1.splice(index, 1)
              console.log(row)
              
    
            }
          }]
        });
console.log(row)

            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })  }
          }]
        }],
        columnss99: [ {
          key: 'procId',
          title: '表名',
       
        },{
          key: "ora",
          title: "操作",
          operator: [{
          name: "查看下属部门",
          type: "text",
          click: (row) => {
            // TODO
            this.link.push(row.procId)
            this.g1=row.procId
            this.gettablename00(row.procId) 
            console.log(row.procId)
          }
        },{
          name: "返回",
          type: "text",
          click: (row) => {
            // TODO
            var user = JSON.parse(window.sessionStorage.getItem("user1"));
            var g=this.link.pop()
            console.log("返回"+g)
            if(g!=null)
           { if(g==this.g1){
           g=this.link.pop()
      } if(g==null){this.gettablename()}else{


  console.log(g)
           this.gettablename00(g) }
           }
           else 
           {this.gettablename()}
          }
        },{
            name: "选择",
            type: "text",
            click: (row) => {
              // TODO
              this.clist3.push(row)
              console.log(row)}}]
             
        }],
        columnss98: [ {
          key: 'procId',
          title: '表名',
       
        },{
          key: "ora",
          title: "操作",
          operator: [{
            name: "delete",
            type: "text",
            click: (row,index) => {
              // TODO
              this.clist3.splice(index,1)
              console.log(row)}}]
             
        }],
        candidate:'',
       mark:[],
        column:[],
        Visible:false,
        Visible1:false,
        bpmnData: {
          assignees: [{
            value: "${assignee}",
            label: "表达式"
          }, {
            value: "1001",
            label: "张三"
          }, {
            value: "1002",
            label: "李四"
          }, {
            value: "1003",
            label: "王五"
          }],
          candidateUsers:[{
            value: "1001",
            label: "张三"
          }, {
            value: "1002",
            label: "李四"
          }, {
            value: "1003",
            label: "王五"
          }],
          roles: [
            {
              value: "manager",
              label: "经理"
            },
            {
              value: "personnel",
              label: "人事"
            },
            {
              value: "charge",
              label: "主管"
            }
          ],  
          select: [
            {
              value: "evection.num",
              label: "请假时间"
            },
            {
              value: "evection.start",
              label: "开始时间"
            },
            {
              value: "evection.end",
              label: "结束时间"
            }
          ]
        }
      }
    },
    props: {
      modeler: {
        type: Object,
        required: true
      },
      nodeElement: {
        type: Object,
        required: true
      },
      formData:{
        type: Object,
        required: true
      }
    },
components: {
      ElementTable,
      
    },
    computed:{
      localFormData:{
        get(){
          return this.formData
        }
      }
    },
    watch:{
      nodeElement:{
        handler(){
          if(this.nodeElement.type=="bpmn:StartEvent"){
            this.updateName("开始");
          }
          if(this.nodeElement.type=="bpmn:EndEvent"){
            this.updateName("结束");
          }
        }
      }
    },
    created: function () {

this.gettablename();
},
    methods: {
      login1(){
        this.Visible=true;
      },
      tj1(){
        this.updateSequenceFlow(this.SequenceFlow1,this.SequenceFlow2);
    this.Visible1=false
      },
      login11(){
        if(this.slist1.length==1){
this.Visible=false;
 var mark1='';
var k=this.slist1[0].keys;
  for(let key in this.slist1[0]){
    //for循环let key是对象里面的键，再通过,[]的形式this.objNum[item]去获取对象的value值
      console.log('key',key);
      console.log('value',this.slist1[0][key]);
      mark1=this.slist1[0][key]
      break
    }
this.addUser({assignee:mark1});
this.slist1=[];
      }
    else {this.$message.error("选择组超过一个，请重新尝试！");}},
      login22(){
this.mark=[];
this.Visible=false;
console.log(this.mark);
for( var i in this.slist1)
{var k=this.slist1[i].keys;
  for(let key in this.slist1[i]){
    //for循环let key是对象里面的键，再通过,[]的形式this.objNum[item]去获取对象的value值
      console.log('key',key);
      console.log('value',this.slist1[i][key]);
      this.mark.push(this.slist1[i][key])
      break
    }

//console.log(y);
}
let y=this.mark.join()
this.addUser({candidateUsers:y});
this.mark=[];
this.slist1=[];
      },
      login33(){
        if(this.clist3.length==1){
var value;
this.Visible=false;
var mark1
var k=this.clist3[0].keys;
  for(let key in this.clist3[0]){
    //for循环let key是对象里面的键，再通过,[]的形式this.objNum[item]去获取对象的value值
      console.log('key',key);
      console.log('value',this.clist3[0][key]);
      mark1=this.clist3[0][key]
      break
    }
this.addUser({candidateGroups:mark1});
this.clist3=[];}
else {this.$message.error("选择组超过一个，请重新尝试！");}
      },
    /*  login(){
console.log(this.localFormData)
this.Visible=false;
      },*/
   xz(){this.SequenceFlow.push({
          key: 'procId',
          name: '表名',
       
        })},
        gettablename00(tablename){
        this.g2=tablename
        console.log(tablename)
 loginAxios("/tablename00",tablename).then(result=>{
          if (result.data.code==9000){
           
this.list=result.data.data;

//console.log(this.list);

          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
      },
        tjtj(){this.Visible1=true},
      gettablename(){
      /*  loginAxios("/tablename1").then(result=>{//单选
            if (result.data.code===9000){
             
this.bpmnData.roles=result.data.data;

            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误112，请重新尝试！");
          });*/
          var user = JSON.parse(window.sessionStorage.getItem("user1"));
          if (user.codes==0){  loginAxios("/tablename").then(result=>{
            if (result.data.code===9000){
             
//this.bpmnData.roles=result.data.data;
this.list=result.data.data;
console.log(this.list);

            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误111，请重新尝试！");
          })}
          else{
          
          loginAxios("/tablename00",user.tag).then(result=>{
          if (result.data.code==9000){
           
this.list=result.data.data;

//console.log(this.list);

          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })}
      },
      updateProperties(properties){
        this.modeler.get("modeling").updateProperties(this.nodeElement, properties);
      },
      updateId(name) {
        this.updateProperties({id: name});
      },
      updateName(name) {
        this.updateProperties({name: name});
      },
      changeUserType() {
      },
      updateSequenceFlow(val,val1){

        let newCondition = this.modeler.get("moddle").create('bpmn:FormalExpression', {
          //body: val.name+val.key
          body: "${"+val+val1+"}"
        });
        this.updateProperties({conditionExpression:newCondition});
      },
      addUser(properties){
        this.updateProperties(properties);
        Object.assign(properties, {
          userType: Object.keys(properties)[0]
        });
        this.$emit('modifyFormData',properties);
      }
    }
  }
</script>


<style>
.thisblack-bgc {
  background-color: rgba(255, 251, 251, 0.5);
}
</style>