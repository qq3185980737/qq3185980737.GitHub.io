<template>

  <div :style="{width:videoBox}" > 
    <el-button type="primary" @click="openqj">返回菜单</el-button>
   
    <el-card v-if="flag100"  style="margin-top: 20px">
  权限为1是学生,权限为2是教师
</el-card>
<el-dialog title="" :visible.sync="Visible10" width="280px" style="z-index: 20;" class="thisblack-bgc" :model='false'>
    {{"主表"+bokks.table1}}
<el-card   style="margin-top: 20px">
  <element-table1 :list="list98" :page-size="10" :columns="columnssspp1" ref="elementTable"></element-table1>
</el-card>
{{"关联表"+bokks.table2}}
<element-table1 :list="list" :page-size="10" :columns="columnsspp" ref="elementTable"></element-table1>
<element-table1 :list="list99" :page-size="10" :columns="columnssspp" ref="elementTable"></element-table1>
<el-card   style="margin-top: 20px" >
{{"主表"+bokks.table1+"属性"+bokks.value1+"关联表"+bokks.table2+"属性"+bokks.value2}}
</el-card>
<el-button type="primary" @click="craete1" >建立上下级关系</el-button>
</el-dialog>
    <el-dialog title="" :visible.sync="Visible6" width="280px" style="z-index: 20;" class="thisblack-bgc" :model='false'>
      选择关联表1
         <el-select 
          v-model="Groups1"
          placeholder="请选择"
          @change="(value) => addname(value)"
         >
        <el-option
            v-for="item in list"
            :key="item.procId"
            :label="item.procId"
            :value="item.procId"
        ></el-option>

      </el-select>
      选择关联属性1
      <el-select 
          v-model="Groups2"
          placeholder="请选择"
          @change="(value) => re(value)"
         >
        <el-option
            v-for="item in column1"
            :key="item.title"
            :label="item.title"
            :value="item.title"
        ></el-option>

      </el-select>
      选择关联表2
         <el-select 
          v-model="Groups3"
          placeholder="请选择"
          @change="(value) => addname1(value)"
         >
        <el-option
            v-for="item in list"
            :key="item.procId"
            :label="item.procId"
            :value="item.procId"
        ></el-option>
      </el-select>
      选择关联属性2
      <el-select 
          v-model="Groups4"
          placeholder="请选择"
          @change="(value) => re(value)"
         >
        <el-option
            v-for="item in column2"
            :key="item.title"
            :label="item.title"
            :value="item.title"
        ></el-option>
        
      </el-select>
      <el-button type="success"  @click="edit1">建立关联</el-button>
</el-dialog>
   
      <p>部门查看</p>
     
   
    <el-dialog title="" :visible.sync="Visible7" width="1100px" style="z-index: 20;" class="thisblack-bgc" :model='false'>
          选择关联表
          <div v-for="(item,index) in list3" :key="index">
              <input type="radio" :label="item" :value="item" v-model="Groups5" >
              <label>{{  "链接表:"+item.name2+'---->查询方式:'+item.key1+'='+item.key2}}</label>
            </div>
            <div v-if="mm">
            {{"表"+queryData[0].name1   }}
            <div v-for="(item,index) in queryData" :key="index">
{{"加链接表"+queryData[index].name2+"查询方式表"+queryData[index].name1+"属性"+queryData[index].key1+"="+"表"+queryData[index].name2+"属性"+queryData[index].key2  }}</div></div>
<el-button type="primary" @click="additem()">添加查找</el-button>
<el-button type="primary" @click="clearitem()">查询语句清零</el-button>
<el-button type="primary" @click="changeindex3(0)">立即查找</el-button>
</el-dialog>
        <el-dialog title="" :visible.sync="Visible3" width="1100px" style="z-index: 20;" class="thisblack-bgc" :model='false'>
 查找      <Biaodan :formItems="formrule2" :page-size="10" :formValues="formValues" ref="elementTable" @updata="updata1"></Biaodan>


</el-dialog>

        <el-dialog title="" :visible.sync="Visible2" width="1100px" style="z-index: 20;" class="thisblack-bgc" :model='false'>
          修改
<Biaodan :formItems="formrule1" :page-size="10" :formValues="formValues" ref="elementTable" @updata="updata2"></Biaodan>

</el-dialog>
        <el-dialog title="" :visible.sync="Visible1" width="1100px" style="z-index: 20;" class="thisblack-bgc" :model='false'>
          发布
<Biaodan :formItems="formrule" :page-size="10" :formValues="formValues" ref="elementTable" @updata="updata3"></Biaodan>

</el-dialog>
<el-dialog title="" :visible.sync="Visible5" width="1100px" style="z-index: 20;" class="thisblack-bgc" :model='false'>
  表名 <el-input v-show="flag2" type="text" v-model="name10" auto-complete="off" placeholder="表名"></el-input>
  <el-button type="success" v-show="flag2" @click="edit">修改表</el-button>
  <el-button type="success" @click="flag1 = true">新增表</el-button>
  表名 <el-input v-show="flag1" type="text" v-model="name" auto-complete="off" placeholder="表名"></el-input>
  <!--<el-button type="success" @click="add">增加表</el-button>-->

  <div v-show="flag1">
  <p>添加的表项</p>
<el-card  style="margin-top: 20px">
  <element-table1 :list="list1" :page-size="10" :columns="columns" ref="elementTable"></element-table1>
</el-card>
<el-button type="primary" @click="select1">关联属性选择</el-button>
<el-card  v-show="Visible9" style="margin-top: 20px">
  <element-table1 :list="list7" :page-size="10" :columns="columns7" ref="elementTable"></element-table1>
</el-card>
{{"主表"+bokks.table1}}
<el-card  v-show="Visible9" style="margin-top: 20px">
  <element-table1 :list="list8" :page-size="10" :columns="columns8" ref="elementTable"></element-table1>
</el-card>
{{"关联表"+bokks.table2}}
<el-card  v-show="Visible9" style="margin-top: 20px">
  <element-table1 :list="list9" :page-size="10" :columns="columns9" ref="elementTable"></element-table1>
</el-card>
<el-card  v-show="Visible9" style="margin-top: 20px" >
{{"主表"+bokks.table1+"属性"+bokks.value1+"关联表"+bokks.table2+"属性"+bokks.value2}}
</el-card>


      <el-form ref="book" :model="book">
        <el-form-item  label="字段名" >
          <el-input type="text" v-model="book.procId" auto-complete="off" placeholder="字段名"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="能否为空（默认可以为空）">
          <el-select v-model="book.name" placeholder="请选择" style="width: 100%">
              <el-option label="空" value="NULL"></el-option>
            <el-option label="非空" value="NOT NULL"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="booktype" label="备注"  >
          <el-input type="text" v-model="book.status" auto-complete="off" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button type="primary" @click="craete" >found</el-button>
        <el-button type="primary" @click="reload">reload</el-button>
      </div>
  </div>
</el-dialog>
<el-dialog title="" :visible.sync="flag2" width="1100px" style="z-index: 20;" class="thisblack-bgc" :model='false'>
  表名 <el-input  type="text" v-model="name10" auto-complete="off" placeholder="表名"></el-input>
  <el-button type="success"  @click="edit">修改表</el-button>
</el-dialog>

 

<el-card style="margin-top: 20px" >
  <element-table1 :list="list2" :page-size="10" :columns="columnsss" ref="elementTable"></element-table1>
</el-card>

</div>
</template>

<script>
import axios from 'axios'
import loginAxios from "@/network/login/login";           //导入登录的网络请求
import ElementTable1 from "../components/element/ElementTable1";
import Biaodan from "../components/element/biaodan";
export default {
  name: "Login",
  data() {
    return {
    
    ll:"",
    formItems: [
          { type: "input", field: "goods_name", title: "商品名称", value: "mi" },
          { type: "inputNumber", field: "goods_price", title: "商品价格", value: 12 },
          {
            type: "radio",
            field: "sex",
            title: "性 别：",
            value: 0,
            options: [
              { label: "先 生", value: 1 },
              { label: "女 士", value: 2 },
              { label: "人 妖", value: 3 },
              { label: "未 知", value: 0 },
            ],
          },{"type": "file","field": "imgFile","title": "图片上传：","value":[],"name":''},
          {"type": "select","field": "address","title": "想去哪里：","value": '',"options": [{ label: "内国走走", value: 1 },{ label: "呆在公司", value: 2, disabled: true },{ label: "非洲美洲", value: 3 }, { label: "港澳台游", value: 4 },{ label: "东南亚游", value: 5 },{ label: "澳洲旅游", value: 6 },{ label: "自驾游", value: 7 }]}
          ,{"type":"checkbox","field":"bgfbgfb","title":"bgfbgfb","value": [],"options":[{"value":"fb","label":"fb"},{"value":"bv","label":"bv"}]},
          {"type":"rate","field":"bgbgf","title":"bgbgf"},
        
        ],
        valueone:'',
        valetwo:'',
        tablename1:'',
        tablename2:'',
    option:[],
    Groups1:'',
    Groups2:'',
    Groups3:'',
    Groups4:'',
    Groups5:{},
    formValues:{},
    Visible10:false,
    Visible9:false,
    Visible8:false,
    Visible7:false,
    Visible6:false,
    Visible5:false,
    Visible4:false,
    Visible3:false,
    Visible2:false,
    Visible1:false,
    tableid1:'',
    tableid:'',
    yulanform1:[],
    yulanform2:[],
    formrule:[],
    formrule1:[],
    formrule2:[],
    yulanform:[],
    column1:[],
    column2:[],
    columnsss:[],
    uo:[],
    g:'',
    link:[],
    list2:[],
    list99:[],
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
        ] ,
      name:'',
      ml:'',
      g1:null,
      flag100:false,
      g2:null,
     // g5:null,
      flag1:false,
      flag2:false,
      falg5:false,
      columnssspp:[],
      columnssspp1:[],
      list:[//{
         // procId:"北京1",},
        // { procId:"北京2",}
          
          ],
  
      list1:[],
      list3:[],
      list98:[],
      mark1:[],
     name10:'',
      columnss: [ {
        key: 'procId',
        title: '表名',
     
      },
      {
        key: "ora",
        title: "操作",
        operator: [

        {
          name: "多表查找",
          type: "text",
          click: (row) => {
            // TODO
            this.kj=row.procId
            this.Visible7=true
            this.tableshowq(); 
          }
        },
        {
          name: "查看下属部门",
          type: "text",
          click: (row) => {
            // TODO
            this.link.push(row.procId)
            this.g1=row.procId
            this.gettablename00(row.procId) 
          }
        },{
          name: "返回",
          type: "text",
          click: (row) => {
            // TODO
            
            var g=this.link.pop()
            console.log(g)
            if(this.g1!=null)
           { if(g==this.g1){
           g=this.link.pop()}}
           console.log(g)
           this.gettablename00(g) 
          }
        },
        /*{
          name: "设置查询",
          type: "text",
          click: (row) => {
      this.Visible6=true
           }}
           ,*/
           {
          name: "设置查询",
          type: "text",
          click: (row) => {



            this.columnssspp1=[ {
        key: 'procId',
        title: '字段名',
      },{
          key: "ora",
        title: "操作",
        operator: [{
          name: "添加1",
          type: "text",
          click: (row) => {
            // TODO
            this.bokks.table1=this.g2
            this.bokks.value1=row.procId    
           
          }
        }
      ]}]
      
      
      this.Visible10=true
      var com=[];
     
     loginAxios("/tableshowll",this.g2).then(result=>{
         if (result.data.code===9000){            
com=result.data.data.data;
console.log(com)
console.log(com.length)
this.list98=[]
for(var i=0;i<com.length;i++)
     { let bokk={procId:''}
       console.log(com[i])
       bokk.procId=com[i].key
  
     this.list98.push(bokk)
     
    }
}else {  this.$message.error(result.data.msg);
         }
       }).catch(error=>{
         this.$message.error("登录时出现错误，请重新尝试！");
       })
           }}
           ,{
          name: "增加表",
          type: "text",
          click: (row) => {
      this.Visible5=true
            //this.g5=row.procId
           }},{
          name: "查看",
          type: "text",
          click: (row) => {
            // TODO
            this.Visible4=true
            console.log(JSON.stringify(row))
            this.kj=row.procId;
            loginAxios("/tableshow",row).then(result=>{
          if (result.data.code===9000){            
this.list2=result.data.data.data1;
this.columnsss=result.data.data.data;
this.columnsss.push({
          key: "ora",
        title: "操作",
        operator: [{
          name: "查找公告",
          type: "text",
          click: (row) => {
            // TODO
            console.log(row)
     this.falg5=true
   
            for(let key in row){
              console.log('key',key)
             
              this.uo.push(key)
              console.log("this.uo"+JSON.stringify(this.uo))
            }

            loginAxios("/adtable",this.kj).then(result=>{
          if (result.data.code===9000){  
            console.log(result.data.data)
this.formrule2=result.data.data
console.log("this.formrule2"+JSON.stringify(this.formrule2))
this.Visible3=true
            this.$message.success("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
           
          }
        },{
          name: "删除公告",
          type: "text",
          click: (row) => {
            // TODO
            var a
            var b
            for(let key in row){
              console.log('key',key)
              a=key
              console.log('value',row[key])
              b=row[key]
              break
            }
            loginAxios("/deletetabledata",this.kj,a,b).then(result=>{
          if (result.data.code===9000){            
            this.$message.successr("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
          }},{
          name: "增加公告",
          type: "text",
          click: (row) => {
            // TODO
            loginAxios("/adtable",this.kj).then(result=>{
          if (result.data.code===9000){  
            console.log(result.data.data)
this.formrule=result.data.data
console.log("this.formrule"+JSON.stringify(this.formrule))
this.Visible1=true
            this.$message.success("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
            
           }},{
          name: "编辑公告",
          type: "text",
          click: (row) => {
            // TODO
            var a
            var b
            for(let key in row){
              console.log('key',key)
              a=key
              console.log('value',row[key])
              b=row[key]
              break
            }
            console.log("userll"+a+b)
            window.sessionStorage.setItem("userll",a);//转换为字符
            window.sessionStorage.setItem("userlx",b);//转换为字符
            loginAxios("/adtable",this.kj).then(result=>{
          if (result.data.code===9000){  
            console.log(result.data.data)
this.formrule1=result.data.data
this.Visible2=true
            this.$message.success("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
            
           }}
      ]})
     
console.log("this.columnsss"+JSON.stringify(this.columnsss))
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
        console.log(JSON.stringify(this.columnsss))
///////////
          }
          
        },{
          name: "删除表",
          type: "text",
          click: (row) => {
            // TODO
            console.log(row)
            loginAxios("/deletetable",row.procId).then(result=>{
          if (result.data.code===9000){            
            this.$message.successr("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
            
          }
        },{
          name: "修改表名",
          type: "text",
          click: (row) => {
            // TODO
            console.log(row)
            this.flag2=true
        this.g=row.procId
            
          }
        }]
      }],

















      
       columnsspp: [ {
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

          }
        },{
          name: "返回",
          type: "text",
          click: (row) => {
            // TODO
            
            var g=this.link.pop()
            console.log(g)
            if(this.g1!=null)
           { if(g==this.g1){
           g=this.link.pop()}}
           console.log(g)
           this.gettablename00(g) 
          }
        },{
          name: "查看",
          type: "text",
          click: (row) => {
            // TODO
            this.ppp=row.procId;
            console.log(JSON.stringify(row))
            
            loginAxios("/tableshow",row).then(result=>{
          if (result.data.code===9000){            
this.columnsss=result.data.data.data;
var com=[]; 
com=this.columnsss;
console.log(com)
console.log(com.length)
this.list99=[]
for(var i=0;i<com.length;i++)
     { let bokk={procId:''}
       console.log(com[i])
       bokk.procId=com[i].key
   
     this.list99.push(bokk)}
     

this.columnssspp=[ {
        key: 'procId',
        title: '字段名',
      },{
          key: "ora",
        title: "操作",
        operator: [{
          name: "添加",
          type: "text",
          click: (row) => {
            // TODO
            this.bokks.table2=this.ppp
         
            this.bokks.value2=row.procId
        
          }
        }
      ]}]
     
console.log("this.columnsss"+JSON.stringify(this.columnsss))
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
        console.log(JSON.stringify(this.columnsss))
///////////
          }
          
        }]
      }],
       bokks:{table1:'',value1:'',table2:'',value2:''},
      columns: [
      {
        key: 'procId',
        title: '字段名',
      },
      {
        key: 'properts',
        title: '属性',
      }, {
        key: 'name',
        title: '类型'
      }, {
        key: 'status',
        title: '备注',
      },{
        key: "ora",
        title: "操作",
        operator: [{
          name: "删除公告",
          type: "text",
          click: (row) => {
this.list1.pop();

          }
        }]
      }],
      list7:[],
      list8:[],
      list9:[],
      columns7:[
      {
        key: 'procId',
        title: '字段名',
      },
     {
        key: "ora",
        title: "操作",
        operator: [{
          name: "选择公告",
          type: "text",
          click: (row) => {
            if(this.name==null&&this.name=='')
            { this.$message.error("请先输入表名");}
            this.bokks.table2=this.name//当前表名
            this.bokks.value2=row.procId

          }
        }]}],
      columns8: [{
        key: 'procId',
        title: '字段名',
      },
     {
        key: "ora",
        title: "操作",
        operator: [{
          name: "选择人员",
          type: "text",
          click: (row) => {
            this.bokks.table1=this.g2
            this.bokks.value1=row.procId
          }
        }]}],
      columns9: [],
      bookname: '',
    
      bb:'',
        tableData:[],
        dialogFormVisible:false,
        book:{
          procId:'',
          properts:'varchar(255)',
          name:'',
          status:''
        },
        
        rules: {
         
        },
        books:{
          procId:'',
        },
        
        rules: {
         
        },

      videoBox:"",
     
      queryData:[],   
tableData:[],
mm:false
    }
  },
  components: {
    ElementTable1,
Biaodan,
      
     
    },
  methods: {
    additem(){  
      this.mm=true
       this.kj=this.Groups5.name2
      this.queryData.push(this.Groups5) 
      console.log(JSON.stringify(this.queryData))    
                   this.tableshowq(); },
    select1(){
      var com=[];
     
      loginAxios("/tableshowll",this.g2).then(result=>{
          if (result.data.code===9000){            
com=result.data.data.data;
console.log(com)
console.log(com.length)
for(var i=0;i<com.length;i++)
      { let bokk={procId:''}
        console.log(com[i])
        bokk.procId=com[i].key
      this.list8.push(bokk)}
}else {  this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
this.Visible9=true


      this.list7=this.list1
     
     

     // console.log(this.columnsss)
    },
    tableshowq() {      

          loginAxios("/tableshowq",'公告').then(result=>{
          if (result.data.code===9000){            

this.list3=result.data.data;
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })},
    addname1(value) {      
this.tableid1=value
if(this.tableid==this.tableid1){this.$message.error("这是多表查询，不能建立单表查询");}
          loginAxios("/tableshowp",value).then(result=>{
          if (result.data.code===9000){            

this.column2=result.data.data.data;
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })},
   addname(value) { 
    this.tableid=value    
if(this.tableid==this.tableid1){this.$message.error("这是多表查询，不能建立单表查询");}
           loginAxios("/tableshowp",value).then(result=>{
          if (result.data.code===9000){            

this.column1=result.data.data.data;
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })},
    find(){       loginAxios("/tableshow",row).then(result=>{
          if (result.data.code===9000){            
this.list2=result.data.data.data1;
this.columnsss=result.data.data.data;
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })},
        openqj() {
        this.$router.push('/firstpage');
      },
    edit1(){
      loginAxios("/fquery",this.Groups1,this.Groups2,this.Groups3,this.Groups4).then(result=>{
          if (result.data.code===9000){            
            this.$message.successr("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
        this.gettablename()
this.Visible6=false
    }, edit(){
      loginAxios("/renametable",this.g,this.name10).then(result=>{
          if (result.data.code===9000){            
            this.$message.successr("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
        this.gettablename()
this.flag2=false
    },  changeindex3(msg){
  
      
      loginAxios("/u1",this.mm,JSON.stringify(this.queryData)).then(result=>{
          if (result.data.code==9000){     
            this.list2=result.data.data.data1;
this.columnsss=result.data.data.data;
this.columnsss.push({
          key: "ora",
        title: "操作",
        operator: [{
          name: "查找",
          type: "text",
          click: (row) => {
            // TODO
            console.log(row)

           
          }
        }
      ]})
console.log(this.columnsss)
console.log(this.list2)
            this.$message.succuss("victory");
           
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
    },
      updata3(updata){
        var mark11=[];
      this.formItems=updata
      console.log("hcfxjhguct"+JSON.stringify(this.formItems))
        for(var i=0;i<this.formItems.length;i++){
     var mark2={field:"",value:""}
      for(let m in this.formItems[i])
      {
      if(m=='field'){mark2.field=this.formItems[i][m]}
      else if(m=='value'){mark2.value=this.formItems[i][m]
       
      }
      console.log("4"+this.formItems[i][m])
    }if(mark2.value==null){}else{
      mark11.push(mark2)
      }
      console.log("3"+JSON.stringify(mark11))
    
    
    }
      loginAxios("/ttbiaodan1",'公告',JSON.stringify(mark11)).then(result=>{
          if (result.data.code==9000){     
            this.Visible1=false
          this.Visible2=false
            this.$message.succuss("victory");
           
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
    },  updata2(updata){
      var mark11=[];
      this.formItems=updata
      console.log("hcfxjhguct"+JSON.stringify(this.formItems))
    for(var i=0;i<this.formItems.length;i++){
     var mark2={field:"",value:""}
      for(let m in this.formItems[i])
      {
      if(m=='field'){mark2.field=this.formItems[i][m]}
      else if(m=='value'){mark2.value=this.formItems[i][m]
       
      }
      console.log("4"+this.formItems[i][m])
    }if(mark2.value==null){}else{
      mark11.push(mark2)
      }
      console.log("3"+JSON.stringify(mark11))
    
    
    }
    var b1= window.sessionStorage.getItem("userll");
    var b2= window.sessionStorage.getItem("userlx");
      loginAxios("/ttbiaodan2",this.kj,JSON.stringify(mark11),b1,b2).then(result=>{
          if (result.data.code==9000){     
          this.Visible1=false
          this.Visible2=false
            this.$message.succuss("victory");
           
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
    }, 
  updata1(updata){
      var mark11=[];
      this.formItems=updata
      console.log("hcfxjhguct"+JSON.stringify(this.formItems))
     
    for(var i=0;i<this.formItems.length;i++){
     var mark2={field:"",value:""}
      for(let m in this.formItems[i])
      {
      if(m=='field'){mark2.field=this.formItems[i][m]}
      else if(m=='value'){mark2.value=this.formItems[i][m]
       
      }
      console.log("4"+this.formItems[i][m])
    }if(mark2.value==null){}else{
      mark11.push(mark2)
      }
      console.log("3"+JSON.stringify(mark11))
    
    
    }
    console.log("/tableshowzz"+this.user.tag);
 


    }, 
      add(){this.books.procId=this.name;
            this.list.push(this.books);
            },
    
      show1:function(){
          //console.log(typeof this.flag)
          if(this.name!=''){
              this.flag=true;
          //console.log(this.flag);
          //console.log(typeof this.flag)
      }
          
      },

    save:function(){
        this.$refs.book.validate((valid) => {
          if (valid) {
            //定义路径
            
            
           this.list1.push(this.book);

this.book={
          id:'',
          properts:'varchar(255)',
          comment:'',
          type:''
        };
        this.flag = false,
        this.flag2 = false
        //清空表单
        this.$refs.book.resetFields();
           // this.$router.push('/home');
            this.$message.success('登录成功！');
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
         
        },reload(){
          this.list1=[]
        },

        craete1(){
          
          let params = {
                   
                    k1:this.bokks.table1,
                    k2:this.bokks.value1,
                    k3:this.bokks.table2,
                    k4:this.bokks.value2
                  }
                  //console.log(this.list1)
      axios.post('http://localhost:8082/springboot/user/tablecreate1',this.list1, {params:params},{
        headers: {
          "Content-Type":"application/json"
        },
       
    },this.name).then(res =>{
        // 请求成功状态为200说明添加成功
        if(res.data.status===9000){
          // 关闭用户新增表单弹窗
           this.dialogFormVisible=false,
           // 添加成功提示
          this.$message({showClose: true, message: '添加成功！',type: 'success', duration:2000,center:true});
          // 重新刷新列表数据
         
        }
      }).catch(error =>{
          console.log(error)
      })
      this.dialogClose();
      this.add();
      },
        craete(){
          
          let params = {
                    name:this.name,
                    password:this.g2,
                    k1:this.bokks.table1,
                    k2:this.bokks.value1,
                    k3:this.bokks.table2,
                    k4:this.bokks.value2
                  }
                  //console.log(this.list1)
      axios.post('http://localhost:8082/springboot/user/tablecreate', this.list1,{params:params},{
        headers: {
          "Content-Type":"application/json"
        },
       
    },this.name).then(res =>{
        // 请求成功状态为200说明添加成功
        if(res.data.status===9000){
          // 关闭用户新增表单弹窗
           this.dialogFormVisible=false,
           // 添加成功提示
          this.$message({showClose: true, message: '添加成功！',type: 'success', duration:2000,center:true});
          // 重新刷新列表数据
         
        }
      }).catch(error =>{
          console.log(error)
      })
      this.dialogClose();
      this.add();
      },
     
      dialogClose:function(){
        //清空表单数据
        this.book={
          procId:'',
          properts:'varchar(255)',
          comment:'',
          type:''
        };
        //清空表单
        this.$refs['book'].resetFields();
        //重置对话框标题
        this.title="新增书本";
      },
  
      openqjmm(){
        this.flag100=true
            // TODO
            this.Visible4=true
            var row1="activiti.功能"
            this.kj=row1;
            loginAxios("/tableshowj",row1).then(result=>{
          if (result.data.code===9000){            
this.list2=result.data.data.data1;
this.columnsss=result.data.data.data;
this.columnsss.push({
          key: "ora",
        title: "操作",
        operator: [{
          name: "查找",
          type: "text",
          click: (row) => {
            // TODO
            console.log(row)
     this.falg5=true
   
            for(let key in row){
              console.log('key',key)
             
              this.uo.push(key)
              console.log("this.uo"+JSON.stringify(this.uo))
            }

            loginAxios("/adtable",'公告').then(result=>{
          if (result.data.code===9000){  
            console.log(result.data.data)
this.formrule2=result.data.data
console.log("this.formrule2"+JSON.stringify(this.formrule2))
this.Visible3=true
            this.$message.success("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
           
          }
        },{
          name: "删除公告",
          type: "text",
          click: (row) => {
            // TODO
            var a
            var b
            for(let key in row){
              console.log('key',key)
              a=key
              console.log('value',row[key])
              b=row[key]
              break
            }
            loginAxios("/deletetabledata",'公告',a,b).then(result=>{
          if (result.data.code===9000){            
            this.$message.successr("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
          }},{
          name: "增加公告",
          type: "text",
          click: (row) => {
            // TODO
            loginAxios("/adtable",'公告').then(result=>{
          if (result.data.code===9000){  
            console.log(result.data.data)
this.formrule=result.data.data
console.log("this.formrule"+JSON.stringify(this.formrule))
this.Visible1=true
            this.$message.success("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
            
           }},{
          name: "编辑公告",
          type: "text",
          click: (row) => {
            // TODO
            var a
            var b
            for(let key in row){
              console.log('key',key)
              a=key
              console.log('value',row[key])
              b=row[key]
              break
            }
            console.log("userll"+a+b)
            window.sessionStorage.setItem("userll",a);//转换为字符
            window.sessionStorage.setItem("userlx",b);//转换为字符
            loginAxios("/adtable",'公告').then(result=>{
          if (result.data.code===9000){  
            console.log(result.data.data)
this.formrule1=result.data.data
this.Visible2=true
            this.$message.success("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
            
           }}
      ]})
     
console.log("this.columnsss"+JSON.stringify(this.columnsss))
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
        console.log(JSON.stringify(this.columnsss))
///////////
          },
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
       // console.log("动端页面");
         } else {
         //跳转pc端页面
           // console.log("pc");
            this.videoBox = "100%"
         }
},init(){this.flag1=false;
  this.flag=false;


},
re(value){
  console.log(value)
},
clearitem(){this.queryData=[]},
gettablename(){
  this.user = JSON.parse(window.sessionStorage.getItem("user1"));
  if(this.user.codes==0)
  {loginAxios("/tablename").then(result=>{
          if (result.data.code==9000){
           
this.list=result.data.data;

//console.log(this.list);

          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })}
        else{this.link.push(this.user.tag)
          this.g2=this.user.tag
          loginAxios("/tablename00",this.user.tag).then(result=>{
          if (result.data.code==9000){
           
this.list=result.data.data;

//console.log(this.list);

          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        }) }







        
this.user = JSON.parse(window.sessionStorage.getItem("user1"));
  

loginAxios("/tableshowzz",'公告').then(result=>{
            if (result.data.code===9000){          

              console.log(result.data.data.data1)
  var kl=[];
  var l=result.data.data.data1;
  for(var i=0;i<l.length;i++){
  this.list2.push({'公告标题':l[i].公告标题,'公告':'【'+l[i].公告标题+'】 ' +l[i].公告内容+'              '+'发布时间 : '+l[i].发布时间
},)}
console.log(this.list2)


//this.list2=kl;

  this.columnsss=[{"key":"公告","title":"公告"}];
  //result.data.data.data;
  this.columnsss.push({
          key: "ora",
        title: "操作",
        operator: [{
          name: "查找",
          type: "text",
          click: (row) => {
            // TODO
            console.log(row)
     this.falg5=true
   
            for(let key in row){
              console.log('key',key)
             
              this.uo.push(key)
              console.log("this.uo"+JSON.stringify(this.uo))
            }

            loginAxios("/adtable",'公告').then(result=>{
          if (result.data.code===9000){  
            console.log(result.data.data)
this.formrule2=result.data.data
console.log("this.formrule2"+JSON.stringify(this.formrule2))
this.Visible3=true
            this.$message.success("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
           
          }
        },{
          name: "删除公告",
          type: "text",
          click: (row) => {
            // TODO
            var a
            var b
            for(let key in row){
              console.log('key',key)
              a=key
              console.log('value',row[key])
              b=row[key]
              break
            }
            loginAxios("/deletetabledata",'公告',a,b).then(result=>{
          if (result.data.code===9000){            
            this.$message.successr("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
          }},{
          name: "增加公告",
          type: "text",
          click: (row) => {
            // TODO
            loginAxios("/adtable",'公告').then(result=>{
          if (result.data.code===9000){  
            console.log(result.data.data)
this.formrule=result.data.data
console.log("this.formrule"+JSON.stringify(this.formrule))
this.Visible1=true
            this.$message.success("成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
            
           }},{
          name: "编辑公告",
          type: "text",
          click: (row) => {
            // TODO
            var a
            var b
            for(let key in row){
              console.log('key',key)
              a=key
              console.log('value',row[key])
              b=row[key]
              break
            }
            console.log("userll"+a+b)
            window.sessionStorage.setItem("userll",a);//转换为字符
            window.sessionStorage.setItem("userlx",b);//转换为字符
            loginAxios("/adtable",'公告').then(result=>{
              this.$message.success("对方的成功！");
          if (result.data.code===9000){  
            console.log(result.data.data)
this.formrule1=result.data.data
this.Visible2=true
            this.$message.success("对方的成功！");
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
            
           }}
      ]})
     


  var m={"code":9000,"data":{"data":[{"key":"公告标题","title":"公告标题"},
  {"key":"公告内容","title":"公告内容"},{"key":"发布时间","title":"发布时间"}],
  "data1":[{"公告标题":"请假格式","公告内容":"请假时请写入请假事件","发布时间":"2022-10-21 09:00"}]}}
       

            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })



      },








      
      gettablename00(tablename){
        this.g2=tablename
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
      see(msg){
        console.log(JSON.stringify(msg))
        console.log(JSON.stringify(this.Groups5))
       
      }


},
created: function () {

this.gettablename();
},

    

  mounted () { //这个属性就可以，在里面声明初始化时要调用的方法即可
      this.init();// we can implement any method here like
    this.browserRedirect();

    }
  }
</script>


