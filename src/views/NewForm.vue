<template>
  <div>
<div v-if="index2==0">
    <el-card class="box-card"  style="width: 80%;margin-left: 10%;min-height: 150px;margin-top: 10px;">
      <div>
        <el-button type="primary" @click="kkk()">返回修改</el-button>
      </div>
      
      <el-input class="radio1"
        placeholder="请输入表单主题"
        v-model="title"
        clearable
        style="width: 100%;font-size: 28px;">
      </el-input>
      <el-input class="textarea"
        type="textarea"
        :rows="2"
        placeholder="请输入表单描述"
        v-model="miaoshu"
        style="width: 100%;font-size: 16px;margin-top: 10px;">
      </el-input>
    </el-card>
    <el-card class="box-card" style="width: 80%;margin-left: 10%;min-height: 150px;margin-top: 10px;" v-for="i in num" :key ="i"
             :id="i">
      <div>
        <el-tag >{{i}}</el-tag>
        <el-input
          placeholder="请输入内容"
          v-model="inputBT[i]"
          clearable
          style="width: 75%;">
        </el-input>

        <el-select v-model="value[i]" placeholder="请选择" style="width: 18%;float:right;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

      </div>
      <div style="width: 100%;height: 0;margin-top:5px;border: solid 0.5px lightgrey"></div>
      <div v-if="value[i]=='input'" style="color: grey;margin-top: 20px;">
        待填写者写入文本
      </div>

      <div v-if="value[i]=='InputNumber'" style="color: grey;margin-top: 20px;">
        待填写者写入数字
      </div>
      <div class="radio" v-if="value[i]=='radio'" style="color: grey;margin-top: 20px;">

        <div v-for="j in radionum[i]" :id="j">
          ○
          <el-input
            placeholder="请输入选项名"
            v-model="radioname[i][j]"
            clearable
            style="width: 80%;">
          </el-input>

        </div>
        <div>
          <el-button type="text" @click="addradio(i)"><i class="el-icon-circle-plus-outline"
                                                         style="font-size: 20px;margin-top: 10px"></i></el-button>
          <el-button type="text" @click="deleteradio(i)"><i class="el-icon-remove-outline"
                                                            style="font-size: 20px;margin-top: 10px"></i></el-button>
        </div>

      </div>

      <div class="radio" v-if="value[i]=='checkbox'" style="color: grey;margin-top: 20px;">

        <div v-for="j in checkboxnum[i]" :id="j" :key ="j">
          □
          <el-input
            placeholder="请输入选项名"
            v-model="checkboxname[i][j]"
            clearable
            style="width: 80%;">
          </el-input>

        </div>
        <div>
          <el-button type="text" @click="addcheckbox(i)"><i class="el-icon-circle-plus-outline"
                                                            style="font-size: 20px;margin-top: 10px"></i></el-button>
          <el-button type="text" @click="deletecheckbox(i)"><i class="el-icon-remove-outline"
                                                               style="font-size: 20px;margin-top: 10px"></i></el-button>
        </div>

      </div>
      <div class="radio" v-if="value[i]=='select'" style="color: grey;margin-top: 20px;">

        <div v-for="j in selectnum[i]" :id="j" :key ="j">
          {{j}}、
          <el-input
            placeholder="请输入选项名"
            v-model="selectname[i][j]"
            clearable
            style="width: 80%;">
          </el-input>

        </div>
        <div>
          <el-button type="text" @click="addselect(i)"><i class="el-icon-circle-plus-outline"
                                                          style="font-size: 20px;margin-top: 10px"></i></el-button>
          <el-button type="text" @click="deleteselect(i)"><i class="el-icon-remove-outline"
                                                             style="font-size: 20px;margin-top: 10px"></i></el-button>
        </div>

      </div>


    </el-card>
    <div style="text-align: right;width:80%;margin-left: 10%;margin-top: 10px;">
      <el-tooltip class="item" effect="light" content="添加新组件" placement="top">
        <el-button type="text" @click="adddiv" style="font-size: 30px;"><i class="el-icon-circle-plus"></i></el-button>
      </el-tooltip>

      <el-tooltip class="item" effect="light" content="删除组件" placement="top">
        <el-button type="text" @click="delectdiv" style="font-size: 30px;"><i class="el-icon-remove"></i></el-button>
      </el-tooltip>


    </div>
    <div style="text-align: center;">
      <el-button type="primary" @click="tijiao()">预览发布</el-button>
    </div>
  </div>
  <div v-if="index2==1">
    <div style="width: 80%;margin-left: 10%;margin-top: 10px;font-size: 28px;" v-html="title">

    </div>
    <div style="width: 80%;margin-left: 10%;margin-top: 10px;font-size: 16px;" v-html="miaoshu">

    </div>
    <form-create v-model="yulanform" :rule="formrule" :option="option" @on-submit="onSubmit1" style="width: 80%;margin-top: 20px;">
    </form-create>

    <div style="text-align: center;">
      <el-button type="primary" @click="changeindex2(0)">返回修改</el-button>
      <el-button type="primary" @click="changeindex(0)">确认</el-button>
    </div>
  </div>
  

</div>
</template>

<script>
  import axios from 'axios'
  import loginAxios from "@/network/login/login"; 
    export default {
        name: "NewForm",
        data() {
            return {
              
u:"",
                index2:0,
                title:'',
                miaoshu:'',
                //卡片的个数
                num: 1,
                //输入框
                inputBT: [],
                //下拉选择框
                options: [{
                    value: 'input',
                    label: '文本'
                }, {
                    value: 'InputNumber',
                    label: '数字'
                }, {
                    value: 'radio',
                    label: '单选按钮'
                }, {
                    value: 'checkbox',
                    label: '多选按钮'
                }, {
                    value: 'select',
                    label: '下拉选择'
                }, {
                    value: 'rate',
                    label: '评分'
                }],
                value: [],

                //下面待优化
                //单选按钮的选项个数
                    radionum: [2],
                    //单选按钮名字
                    radioname: [[]],

                    //多选按钮的选项个数
                    checkboxnum: [2],
                    //多选按钮名字
                    checkboxname: [[]],

                    //下拉框的选项个数
                    selectnum: [2],
                    //下拉框名字
                    selectname: [[]],

                //生成的表单规则
                formrule:[],
                //表单实例对象
                yulanform:{},

                option:{
                    submitBtn: {
                        show: false,
                    },

                },
            }
        },
        methods: {
          kkk(){
          /*   loginAxios("/List").then(result=>{
            if (result.data.code===9000){
              window. localStorage.setItem("user",JSON.stringify(result.data.data));
              console.log("JSON.stringify(result.data.data)"+JSON.stringify(result.data.data));     


             // this.$router.push('/home');
              this.$message.success('登录成功！');
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
                       var formrule1=[],
                        formrule1 = window.localStorage.getItem("user");
                        console.log(" window.sessionStorage.getItem(user)"+formrule1);
                        formrule1 = JSON.parse(window.localStorage.getItem("user"));
                        console.log("JSON.parse(window.sessionStorage.getItem(user));"+formrule1);
                        this.index2=1;
                        this.formrule=formrule1;
                console.log("vgxe"+this.formrule)*/
                this.$router.push('/design');
    
          },
           //增加组件
            adddiv() {
               /* this.form.num += 1;
                this.form.inputBT.push()
                this.form.radionum.push(2);
                this.form.radioname.push([])
                this.form.checkboxnum.push(2);
                this.form.checkboxname.push([])
                this.form.selectnum.push(2);
                this.form.selectname.push([]);*/
                this.num += 1;
                this.inputBT.push()
                this.radionum.push(2);
                this.radioname.push([])
                this.checkboxnum.push(2);
                this.checkboxname.push([])
                this.selectnum.push(2);
                this.selectname.push([]);



            },
            //删除组件
            delectdiv() {
              /*  if(this.form.num>1){
                    this.form.num -= 1;
                    this.form.inputBT.pop();
                    this.form.radionum.pop();
                    this.form.radioname.pop();
                    this.form.checkboxnum.pop();
                    this.form.checkboxname.pop()
                    this.form.selectnum.pop();
                    this.form.selectname.pop();*/
                    if(this.num>1){
                    this.num -= 1;
                    this.inputBT.pop();
                    this.radionum.pop();
                    this.radioname.pop();
                    this.checkboxnum.pop();
                    this.checkboxname.pop()
                    this.selectnum.pop();
                    this.selectname.pop();
                }

            },
            //增加单选按钮选项，实时更新数组用$set
            addradio(i) {
              console.log(this.num);
                this.$set(this.radionum, i, this.radionum[i] + 1)
                // this.radionum[i] +=1;

            },
            deleteradio(i) {
              console.log(this.num);
                this.$set(this.radionum, i, this.radionum[i] - 1)
            },

            //增加多选按钮选项
            addcheckbox(i) {
              console.log(this.num);
                this.$set(this.checkboxnum, i, this.checkboxnum[i] + 1)
                // this.radionum[i] +=1;

            },
            onSubmit:function (formData,fApi) {
                alert(JSON.stringify(formData));
            },
            deletecheckbox(i) {
              console.log(this.num);
                this.$set(this.checkboxnum, i, this.checkboxnum[i] - 1)
            },

            //增加下拉框选项
            addselect(i) {
              console.log(this.num);
                this.$set(this.selectnum, i, this.selectnum[i] + 1)
                // this.radionum[i] +=1;

            },
            deleteselect(i) {
              console.log(this.num);
                this.$set(this.selectnum, i, this.selectnum[i] - 1)
            },

            tijiao() {
                console.log(this.inputBT)
                console.log(this.value)
                console.log(this.radioname)
                console.log(this.checkboxname)
                console.log(this.selectname)
                this.formrule=[];
                for(let i=1;i<this.inputBT.length;i++){
                    console.log(this.value[i])

                    if(this.value[i]=='radio'){

                        let h = (this.radioname[i].length)//3

                        let options=[];
                        for(let j =1;j<h;j++){
                            options.push(
                                {value:this.radioname[i][j],label:this.radioname[i][j]},
                            )


                        }


                        this.formrule.push({
                            type:this.value[i],
                            field:this.inputBT[i],
                            title:this.inputBT[i],
                            value:null,
                            options:options,

                        },)



                    }else if(this.value[i]=='checkbox'){
                        let h = (this.checkboxname[i].length)//3

                        let options=[];
                        for(let j =1;j<h;j++){
                            options.push(
                                {value:this.checkboxname[i][j],label:this.checkboxname[i][j]},
                            )


                        }


                        this.formrule.push({
                            type:this.value[i],
                            field:this.inputBT[i],
                            title:this.inputBT[i],
                            value:null,
                            options:options,

                        },)

                    }else if(this.value[i]=='select'){
                        let h = (this.selectname[i].length)//3

                        let options=[];
                        for(let j =1;j<h;j++){
                            options.push(
                                {value:this.selectname[i][j],label:this.selectname[i][j]},
                            )


                        }


                        this.formrule.push({
                            type:this.value[i],
                            field:this.inputBT[i],
                            title:this.inputBT[i],
                            value:null,
                            options:options,

                        },)

                    }else {
                        this.formrule.push({
                            type:this.value[i],
                            field:this.inputBT[i],
                            title:this.inputBT[i],
                            value:null,
                        },)

                        


                    }
                }
                this.index2=1;
                console.log("this.formrule"+this.formrule)
                console.log("this.formrule"+JSON.stringify(this.formrule))
                var b=window.sessionStorage.getItem("user1")
               /* loginAxios("/biaodan1",b,JSON.stringify(this.formrule)).then(result=>{
            if (result.data.code===9000){            
              this.$message.error("victory");
              this.$router.push('/design');
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })*/

            },
            onSubmit1(formData){
                alert(JSON.stringify(formData));
                
            },
            changeindex2(msg){
                this.index2=msg;
                
            },
            changeindex(msg){
              window.sessionStorage.setItem("userpp",JSON.stringify(this.formrule));//转换为字符
              console.log(JSON.stringify(this.formrule));
              this.$router.push('/design');
             /* console.log(this.yulanform.model())
              console.log(JSON.stringify(this.yulanform.model()))
              //  this.$emit("NewIndex",msg)
              axios.post('http://localhost:8082/springboot/user/dList',JSON.stringify(this.yulanform.model()),{
          headers: {
            "Content-Type":"application/json"
          },
         
      }).then(res =>{
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
        })*/
                
            },
           
        }, 
       

    }
</script>

<style>
  .radio .el-input__inner {
    width: 220px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    /*outline: medium;*/
  }
  .radio1 .el-input__inner {
    width: 100%;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    /*outline: medium;*/
  }
  .textarea .el-textarea__inner {
    width: 100%;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    /*outline: medium;*/
  }
</style>

