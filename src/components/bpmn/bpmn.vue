<template>
  <div id="app">
    <div class="container">
      <!-- 创建一个canvas画布 npmn-js是通过canvas实现绘图的，并设置ref让vue获取到element -->
      <div class="bpmn-container">
        <div class="bpmn-canvas" ref="canvas"></div>
        <!-- 工具栏显示的地方 -->
        <div class="bpmn-js-properties-panel" id="js-properties-panel"></div>
      </div>

      <!-- 把操作按钮写在这里面 -->
      <div class="action">
        <el-upload action class="upload-demo" :before-upload="openBpmn">
          <el-button icon="el-icon-folder-opened"></el-button>
        </el-upload>
        <el-button class="new" icon="el-icon-circle-plus" @click="newDiagram"></el-button>
        <el-button icon="el-icon-download" @click="downloadBpmn"></el-button>
        <el-button icon="el-icon-picture" @click="downloadSvg"></el-button>
        <el-button icon="el-icon-post" @click="post"></el-button>
        <a hidden ref="downloadLink"></a>
      </div>
<el-dialog :title="dataDialogForm.roleId === 0 ? '新增角色' : '更新角色'" width="35%"
        :visible.sync="dialogFormVisible" @close="closeDialog()"  >
        <el-form :model="dataDialogForm" :rules="rules" ref="ruleForm">
          <el-form-item label="角色名称" label-width="120px" prop="roleName">
            <el-input v-model="dataDialogForm.roleName" placeholder="角色名称" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="描述信息" label-width="120px" prop="remark">
            <el-input type="textarea" v-model="dataDialogForm.remark" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="类型" label-width="120px" prop="text">
            <el-checkbox-group v-model="text1">
              <el-checkbox v-for="item in situations" :key="item.value"
:value="item.value" :label="item.label"></el-checkbox>
            </el-checkbox-group>
            <el-button size="mini" type="primary" @click="handle()">编辑</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmitFormData('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script>
import BpmnModeler from "bpmn-js/lib/Modeler";
// 工具栏相关
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import propertiesPanelModule from "bpmn-js-properties-panel";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
/* bpmn-js 左侧工具栏 */
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
/* bpmn-js 右侧属性栏 */
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
// 汉化
import customTranslate from "./customTranslate";
import loginAxios from "@/network/login/login";    
import Axios from "axios";
export default {
  data() {
    return {
dataDialogForm: {
          roleId: 0,
          roleName: "",
          remark: "",
          text:"",
        },
      svg:null,
      bpmn:null,
      bpmnModeler: null,
      element:null,
      canvas: null,
      bpmnTemplate: `
         <?xml version="1.0" encoding="UTF-8"?>
          <definitions 
              xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" 
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
              xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
              xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" 
              xmlns:camunda="http://camunda.org/schema/1.0/bpmn" 
              xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
              xmlns:activiti="http://activiti.org/bpmn" 
              id="m1577635100724" 
              name="" 
              targetNamespace="http://www.activiti.org/testm1577635100724"
            >

            <process id="process1" processType="None" isClosed="false" isExecutable="true">
              <extensionElements>
                <camunda:properties>
                  <camunda:property name="a" value="1" />
                </camunda:properties>
              </extensionElements>
              <startEvent id="_2" name="start" />
            </process>
            <bpmndi:BPMNDiagram id="BPMNDiagram_leave">
              <bpmndi:BPMNPlane id="BPMNPlane_leave" bpmnElement="leave">
                <bpmndi:BPMNShape id="BPMNShape__2" bpmnElement="_2">
                  <omgdc:Bounds x="144" y="368" width="32" height="32" />
                  <bpmndi:BPMNLabel>
                    <omgdc:Bounds x="149" y="400" width="23" height="14" />
                  </bpmndi:BPMNLabel>
                </bpmndi:BPMNShape>
              </bpmndi:BPMNPlane>
            </bpmndi:BPMNDiagram>
          </definitions>
      `
    };
  },
  methods: {

    post() {
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (!err) {
          // 获取文件名
          const name1 = `${this.getFilename(xml)}.bpmn`;
          // 将文件名以及数据交给下载方法
          console.log(xml);
          console.log(name1);
          const name = `${this.getFilename(xml)}.svg`;
          console.log(name);
          // 从建模器画布中提取svg图形标签
          let context = "";
          const djsGroupAll = this.$refs.canvas.querySelectorAll(".djs-group");
          for (let item of djsGroupAll) {
            context += item.innerHTML;
          }
          // 获取svg的基本数据，长宽高
          const viewport = this.$refs.canvas
            .querySelector(".viewport")
            .getBBox();

          // 将标签和数据拼接成一个完整正常的svg图形
          const svg = `
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="${viewport.width}"
              height="${viewport.height}"
              viewBox="${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}"
              version="1.1"
              >
              ${context}
            </svg>
          `;
          // 将文件名以及数据交给下载方法
         
         console.log(svg);
         
         loginAxios("/upload",svg,xml,name,name1).then(result=>{
            if (result.data.code===9000){
              //window.sessionStorage.setItem("user",JSON.stringify(result.data.data));
//this.tableData=result.data.data;

//console.log(this.tableData);
             // this.$router.push('/home');
              this.$message.success('成功！');
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
        }
      });
     
                     //合法
          
        } 
      ,
    newDiagram() {
      this.createNewDiagram(this.bpmnTemplate);
    },

    downloadBpmn() {
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (!err) {
          // 获取文件名
          const name = `${this.getFilename(xml)}.bpmn`;
          // 将文件名以及数据交给下载方法
          this.download({ name: name, data: xml });
        }
      });
    },
    downloadSvg() {
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (!err) {
          // 获取文件名
          const name = `${this.getFilename(xml)}.svg`;

          // 从建模器画布中提取svg图形标签
          let context = "";
          const djsGroupAll = this.$refs.canvas.querySelectorAll(".djs-group");
          for (let item of djsGroupAll) {
            context += item.innerHTML;
          }
          // 获取svg的基本数据，长宽高
          const viewport = this.$refs.canvas
            .querySelector(".viewport")
            .getBBox();

          // 将标签和数据拼接成一个完整正常的svg图形
          const svg = `
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="${viewport.width}"
              height="${viewport.height}"
              viewBox="${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}"
              version="1.1"
              >
              ${context}
            </svg>
          `;
          // 将文件名以及数据交给下载方法
          this.download({ name: name, data: svg });
        }
      });
    },

    openBpmn(file) {
      const reader = new FileReader();
      // 读取File对象中的文本信息，编码格式为UTF-8
      reader.readAsText(file, "utf-8");
      reader.onload = () => {
        //读取完毕后将文本信息导入到Bpmn建模器
        this.createNewDiagram(reader.result);
      };
      return false;
    },

    getFilename(xml) {
      let start = xml.indexOf("process");
      let filename = xml.substr(start, xml.indexOf(">"));
      filename = filename.substr(filename.indexOf("id") + 4);
      filename = filename.substr(0, filename.indexOf('"'));
      return filename;
    },

    download({ name = "diagram.bpmn", data }) {
      // 这里就获取到了之前设置的隐藏链接
      const downloadLink = this.$refs.downloadLink;
     
      // 把数据转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data);

      if (data) {
        // 将数据给到链接
        downloadLink.href =
          "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        // 设置文件名
        downloadLink.download = name;
        // 触发点击事件开始下载
        downloadLink.click();
      }
    },
    handleModeler() {
 this.bpmnModeler.on('root.added', e => {
    if (e.element.type === 'bpmn:Process') {
      this.element = null
      this.$nextTick().then(() => {
        this.element = e.element
        //console.log(this.element);
        
      })
    }
  })
  this.bpmnModeler.on('element.click', e => {
    const { element } = e
    //console.log(element)
    if (element.type === 'bpmn:Process') {
      this.element = element
      console.log(this.element);
 this.dialogFormVisible = true;
        this.dataDialogForm.roleId = 0;
        this.dataDialogForm.roleName = "";
        this.dataDialogForm.remark = "";
       
    }
  })
  this.bpmnModeler.on('selection.changed', e => {
    // hack 同类型面板不刷新
    this.element = null
    const element = e.newSelection[0]
    if (element) {
      this.$nextTick().then(() => {
        this.element = element
        console.log(this.element);
 this.dialogFormVisible = true;
        this.dataDialogForm.roleId = 0;
        this.dataDialogForm.roleName = "";
        this.dataDialogForm.remark = "";
       
      })
    }
  })
},


    async init() {
      // 获取画布 element
      this.canvas = this.$refs.canvas;

      // 将汉化包装成一个模块
      const customTranslateModule = {
        translate: ["value", customTranslate]
      };

      // 创建Bpmn对象
      this.bpmnModeler = new BpmnModeler({
        // 设置bpmn的绘图容器为上门获取的画布 element
        container: this.canvas,

        // 加入工具栏支持
        propertiesPanel: {
          parent: "#js-properties-panel"
        },
        additionalModules: [
          // 工具栏模块
          propertiesProviderModule,
          propertiesPanelModule,
          // 汉化模块
          customTranslateModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        },
        
      });

      await this.createNewDiagram(this.bpmnTemplate);
    },
    async createNewDiagram(bpmn) {
      // 将字符串转换成图显示出来;
      this.bpmnModeler.importXML(bpmn, err => {
        if (err) {
          this.$Message.error("打开模型出错,请确认该模型符合Bpmn2.0规范");
        }
      });
    }
  },
  mounted() {

    this.init();
    this.handleModeler();
  }
};
</script>

<style>
.bpmn-container {
  width: 100%;
  height: 100vh;
  display: flex;
}

.bpmn-canvas {
  width: calc(100% - 300px);
  height: 100vh;
}

.bpmn-js-properties-panel {
  width: 320px;
  height: inherit;
  overflow-y: auto;
}

.action {
  position: fixed;
  bottom: 10px;
  left: 10px;
  display: flex;
}
.upload-demo {
  margin-right: 10px;
}
</style>