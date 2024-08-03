<template>
  <div class="container">
    <div class="bpmn-viewer">
      <vue-header class="bpmn-viewer-header" :processData="initData" :modeler="bpmnModeler" @restart="restart"
                  @handleExportSvg="handleExportSvg" @handleExportBpmn="handleExportBpmn" @processSave="processSave" 
                  @postBpmn="postBpmn"></vue-header>
                  <el-upload action class="upload-demo" :before-upload="imports">
          <el-button icon="el-icon-folder-opened"></el-button>
        </el-upload>
      <div class="bpmn-viewer-container">
        <div class="bpmn-viewer-content" ref="bpmnViewer"></div>
      </div>
    </div>
    <bpmn-panel v-if="bpmnModeler" :modeler="bpmnModeler" :process="initData"></bpmn-panel>
  </div>
</template>

<script>
import loginAxios from "@/network/login/login";  
  import templateXml from "./data/template";
  import BpmnModeler from 'bpmn-js/lib/Modeler'//'jeeplus-bpmn/lib/Modeler''bpmn-js/lib/Modeler'
  import customTranslate from "./data/translate/customTranslate";
  import VueHeader from "./Header";
  import BpmnPanel from "./panel/index";
  import activitiModele from './data/activiti.json'
  import './assets/css/vue-bmpn.css'
  import './assets/css/font-awesome.min.css'

  export default {
    name: "VueBpmn",
    data() {
      return {
        svg1:'',
        xml1:'',
        userpp:'',
        userqq:'',
        bpmnModeler: null,
        initTemplate: "",
        initData: {}
      }
    },
    props: {
      product: String
    },
    components: {
      VueHeader, BpmnPanel
    },
    mounted() {
      let processId = new Date().getTime();
      this.initTemplate = templateXml.initTemplate(processId)
      this.initData = {key: "process" + processId, name: "process" + processId, xml: this.initTemplate}
      this.init();
    },
    methods: {
      init() {
      
        let _moddleExtensions = this.getModdleExtensions();
        // 获取画布 element
        this.canvas = this.$refs.bpmnViewer;
        
        // 创建Bpmn对象
        this.bpmnModeler = new BpmnModeler({
          container: this.canvas,
          additionalModules: [
            {
              translate: ['value', customTranslate]
            }
          ],
          moddleExtensions: _moddleExtensions
        });

        /*let _tag = document.getElementsByClassName("djs-overlay-container")[0];
        if (_tag) {
          _tag.style.width = "100%";
          _tag.style.height = "100%";
        }*/

        // 初始化建模器内容
        this.initDiagram(this.initTemplate);
      },
      initDiagram(xml) {
        this.bpmnModeler.importXML(xml, err => {
          if (err) {
            // this.$Message.error("打开模型出错,请确认该模型符合Bpmn2.0规范");
          }
          let _tag = document.getElementsByTagName("svg")[0];
          if (_tag) {
            _tag.style.width = "100%";
            _tag.style.height = "700px";
          }
        });
      },
      postBpmn() {
        const _this = this;
        let _xml;
        let _svg;
        this.bpmnModeler.saveSVG((err, svg) => {
          if (err) {
            console.error(err)
          }
          _svg = svg;
        })
        this.bpmnModeler.saveXML(function (err, xml) {
          if (err) {
            console.error(err)
          }
          _xml = xml;
        });
        this.userpp = window.sessionStorage.getItem("userpp");
        this.userqq = window.sessionStorage.getItem("userqq");
        console.log(this.userpp);
        loginAxios("/postbpmn",this.xml1,this.svg1,this.userpp,this.userqq,_xml,_svg,).then(result=>{
          
          if (result.data.code===9000){
          console.log(result.data.code);
          
            this.$message.success('成功！');
          }else {
            this.$message.error(result.data.msg);
          }
        }).catch(error=>{
          this.$message.error("登录时出现错误，请重新尝试！");
        })
      },

      imports(file) {
      const reader = new FileReader();
      // 读取File对象中的文本信息，编码格式为UTF-8
      reader.readAsText(file, "utf-8");
      reader.onload = () => {
        //读取完毕后将文本信息导入到Bpmn建模器
        this.bpmnModeler.importXML(reader.result, err => {
        if (err) {
          this.$Message.error("打开模型出错,请确认该模型符合Bpmn2.0规范");
        }
      });
      };
      return false;
    },
      handleExportBpmn() {
        const _this = this;
        this.bpmnModeler.saveXML(function (err, xml) {
          if (err) {
            console.error(err)
          }
          let {filename, href} = _this.setEncoded('BPMN', xml);
          if (href && filename) {
            let a = document.createElement('a');
            a.download = filename; //指定下载的文件名
            a.href = href; //  URL对象
            a.click(); // 模拟点击
            URL.revokeObjectURL(a.href); // 释放URL 对象
          }
        });
      },
      handleExportSvg() {
        const _this = this;
        this.bpmnModeler.saveSVG(function (err, svg) {
          if (err) {
            console.error(err)
          }
          let {filename, href} = _this.setEncoded('SVG', svg);
          if (href && filename) {
            let a = document.createElement('a');
            a.download = filename;
            a.href = href;
            a.click();
            URL.revokeObjectURL(a.href);
          }
        });
      },
      setEncoded(type, data) {
        const encodedData = encodeURIComponent(data);
        if (data) {
          if (type === 'XML') {
            return {
              filename: 'diagram.bpmn20.xml',
              href: "data:application/bpmn20-xml;charset=UTF-8," + encodedData,
              data: data
            }
          }
          if (type === 'BPMN') {
            return {
              filename: 'diagram.bpmn',
              href: "data:application/bpmn20-xml;charset=UTF-8," + encodedData,
              data: data
            }
          }
          if (type === 'SVG') {
            this.initData.svg = data;
            return {
              filename: 'diagram.svg',
              href: "data:application/text/xml;charset=UTF-8," + encodedData,
              data: data
            }
          }
        }
      },
      processSave(data){
        let initData = this.initData;
        data.procId = initData.key;
        data.name = initData.name;
        this.$emit("processSave",data);
      },
      restart() {
        let _xml;
        let _svg;
        this.bpmnModeler.saveSVG((err, svg) => {
          if (err) {
            console.error(err)
          }
          _svg = svg;
        })
        this.bpmnModeler.saveXML(function (err, xml) {
          if (err) {
            console.error(err)
          }
          _xml = xml;
        });
       this.xml1=_xml;
       this.svg1=_svg;
        let processId = new Date().getTime();
        this.initTemplate = templateXml.initTemplate(processId)
        this.initData = {key:  + processId, name:  + processId, xml: this.initTemplate}//{key: "process" + processId, name: "process" + processId, xml: this.initTemplate}
        this.initDiagram(this.initTemplate)
      },
      open() {
        
        let processId = new Date().getTime();
        this.initTemplate = templateXml.initTemplate(processId)
        this.initData = {key:  + processId, name:  + processId, xml: this.initTemplate}//{key: "process" + processId, name: "process" + processId, xml: this.initTemplate}
        this.initDiagram(this.initTemplate)
      },
      getModdleExtensions() {
        let moddleExtensions = {};
        //if (this.product == "flowable") {
         // moddleExtensions = {
        //    flowable: flowableModdle
        //  }
       // }
       // if (this.product == "activiti") {
          moddleExtensions = {
            activiti: activitiModele
          }
      //  }
        return moddleExtensions;
      }
    }
  }
</script>

<style scoped>

</style>
