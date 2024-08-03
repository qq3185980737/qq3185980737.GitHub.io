<template>
  <div class="containers">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
    <!--xml-->
    <!--自定义右边属性面板-->
    <div class="custom-properties-panel">
      <div class="empty" v-if="selectedElementsArr.selectedElements.length <= 0"
        >请选择一个元素</div
      >
      <div class="empty" v-else-if="selectedElementsArr.selectedElements.length > 1"
        >只能选择一个元素</div
      >
      <div v-else>
        <fieldset class="element-item">
          <label>节点id</label>
          <span>{{ element.id }}</span>
        </fieldset>
        <fieldset class="element-item">
          <label>名称&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input :value="element.nmae" @change="(event) => changeField(event, 'name')" />
        </fieldset>
        <fieldset class="element-item">
          <label>用户名</label>
          <select
            @change="changeEventType"
            :value="eventType"
            style="width: 182px; border: 1px solid #d9d9d9; border-radius: 5px"
          >
            <option
              v-for="option in eventTypesArr.eventTypes"
              :key="option.value"
              :value="option.value"
              >{{ option.label }}</option
            >
          </select>
        </fieldset>
      </div>
    </div>
    <!--自定义右边属性面板完-->
    <ul class="buttons">
      <li>
        <a-button ref="saveDiagramlink" title="保存为bpmn" @click="getXML()"
          >保存最新的xml文件</a-button
        >
      </li>
    </ul>
  </div>
</template>
<script setup>
  // import { workFlowApi} from '/@/api/bnpm/bnpm'
  import { workFlowApi } from '../../../api/bnpm/bnpm'
  import { ref, onMounted, reactive } from 'vue'
  // import { message } from 'ant-design-vue'
  // import { ElMessage } from 'element-plus'
  import BpmnModeler from 'bpmn-js/lib/Modeler'

  import { useRouter } from 'vue-router'
  import { xmlStr } from '../../../mock/xmlStr'
  //右侧属性栏
  import propertiesPanelModule from 'bpmn-js-properties-panel'
  import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
  import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

  //引入mitt
  // import emitter from '../../../utils/mitt/bus'
  import { vmviewdata, vmviewname } from '../bnpmtext/index.vue'

  import { ElMessage, ElMessageBox } from 'element-plus'
  // import type { Action } from 'element-plus'

  // 汉化组件
  import customTranslate from './customTranslate'
  // import { BpmnpropertiesProviderModule, BpmnpropertiesPanelModule } from 'bpmn-js-properties-panel'
  // bpmn建模器
  let bpmnModeler = reactive({})
  // let container = ref(null)
  let canvas = ref()
  let dataONE = reactive({})
  const saveDiagramlink = ref()
  const form = reactive({
    region: '',
  })

  // let defaultXML = ref()
  // 自定义右边属性面板属性定义
  //当前选择的元素合集
  let selectedElementsArr = reactive({
    selectedElements: [],
  })

  let element = ref(null)
  let eventType = ref()

  //邮件发送参数
  // let recipientmail = reactive({
  //   recipient: ['dingzicool@sina.com', 'dingzicool@sina.com'],
  // })

  let eventTypesArr = reactive({
    eventTypes: [
      { label: '请选择用户', value: '' },
      { label: '张三', value: 'bpmn:MessageEventDefinition' },
      { label: '李四', value: 'bpmn:TimerEventDefinition' },
      { label: '王五', value: 'bpmn:ConditionalEventDefinition' },
    ],
  })
  const router = useRouter()

  //保存最新的bpmn文件
  let bnpmXML = reactive({
    workname: '',
    content: '',
  })

  //let content =ref()
  //挂载时初始化
  onMounted(() => {
    init()
  })

  function init() {
    //汉化组件的引入使用
    const customTranslateModule = {
      translate: ['value', customTranslate],
    }

    //可操作时候创建实例为BpmnModeler
    bpmnModeler = new BpmnModeler({
      container: canvas.value,
      //添加控制板
      //添加控制板
      propertiesPanel: {
        parent: '#js-properties-panel',
      },
      additionalModules: [
        // 右边的属性栏
        propertiesPanelModule,
        propertiesProviderModule,
        //汉化
        customTranslateModule,
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
        // authority: authorityModdleDescriptor,
      },
    })
    createNewDiagram()
    //  createNewDiagram(zhangcheng)

    // selection.changed监听选中的元素
    bpmnModeler.on('selection.changed', (e) => {
      // console.log('###HH', e)
      selectedElementsArr.selectedElements = e.newSelection // 数组, 可能有多个
      // console.log('###H', selectedElementsArr.selectedElements)
      console.log(element, e.newSelection[0])
      element = e.newSelection[0] // 默认取第一个
    })

    //使用element.changed监听发生改变的元素
    bpmnModeler.on('element.changed', (e) => {
      const { element } = e
      console.log('@@@$$$', element)
      // const { element: currentElement } = this
      // 如果没有 element
      if (!element.value) {
        return
      }
      if (element.id === element.value.id) {
        element.value = element
      }
    })
  }

  //自定义面板内容
  /**
   * 更新元素属性
   * @param { Object } 要更新的属性, 例如 { name: '', id: '' }
   *
   */

  function updateProperties(properties) {
    const modeling = bpmnModeler.get('modeling')
    console.log(element, properties)
    modeling.updateProperties(element, properties)
  }

  /**
   * 改变控件触发的事件
   * @param { Object } input的Event
   * @param { String } 要修改的属性的名称
   *
   *
   */
  // 当控件内的内容发生改变时, 同步更新element.
  function changeField(event, type) {
    const value = event.target.value
    let properties = {}
    properties[type] = value
    element[type] = value
    updateProperties(properties) // 调用属性更新方法
  }

  // 用户下拉菜单
  function changeEventType(event) {
    const value = event.target.value
    const bpmnReplace = bpmnModeler.get('bpmnReplace')
    eventType.value = value
    bpmnReplace.replaceElement(element, {
      type: element.value.businessObject.$type,
      eventDefinitionType: value,
    })
  }

  function createNewDiagram() {
    // console.log('我是数据', vmviewdata)
    if (vmviewdata.value == undefined || vmviewdata.value == '') {
      // 新增操作时，界面的初始化
      bpmnModeler.importXML(xmlStr, (err) => {
        if (err) {
          // console.error(err)
        } else {
          // 这里是成功之后的回调, 可以在这里做一系列事情
          success()
        }
        // 让图能自适应屏幕
        var canvas = bpmnModeler.get('canvas')
        canvas.zoom('fit-viewport')
      })
    } else {
      // 修改操作时，界面的初始化
      bpmnModeler.importXML(vmviewdata.value, (err) => {
        if (err) {
          // console.error(err)
        } else {
          // 这里是成功之后的回调, 可以在这里做一系列事情
          success()
        }
        // 让图能自适应屏幕
        var canvas = bpmnModeler.get('canvas')
        canvas.zoom('fit-viewport')
      })
    }
  }

  function success() {
    // console.log('创建成功!')
    addBpmnListener()
  }

  function addBpmnListener() {
    // 给图绑定事件，当图有发生改变就会触发这个事件
    bpmnModeler.on('commandStack.changed', () => {
      saveDiagram(function (err, xml) {
        bnpmXML.content = xml
        // 这里获取到的就是最新的xml信息
        console.log('zx', xml)
        //setEncoded(saveDiagramlink, 'diagram.bpmn', err ? null : xml)
      })

      // //邮件发送
      // getSendmail(recipientmail).then((res) => {
      //   console.log('邮件发送', res)
      // })
    })
  }

  //绘制图形保存最新的xml
  function getXML() {
    if (vmviewdata.value == undefined || vmviewdata.value == '') {
      ElMessageBox.prompt('请输入保存的文件名称', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        inputErrorMessage: '文件名称不能为空',
      })
        .then(({ value }) => {
          // ElMessage({
          //   type: 'success',
          //   message: `Your email is:${value}`,
          // })
          bnpmXML.workname = value
          workFlowApi(bnpmXML).then((res) => {
            ElMessage({
              type: 'success',
              message: '成功',
            })

            if (res) {
              router.push({
                name: 'bnpmtext',
              })
            }
            console.log('bj', res)
          })

          bnpmXML.content = ''
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '保存失败',
          })
        })
    } else {
      // 修改时的文件名
      let xmlName = vmviewname.value
      // 文件名去除前缀和后缀的字符 /bpmn .
      let name = xmlName
        .replace(/bpmn/g, '')
        .replace(/\//g, '')
        .replace(/\\/g, '')
        .replace(/\./g, '')

      ElMessageBox.prompt('请输入修改的文件名称', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        inputErrorMessage: '文件名称不能为空',
        inputValue: name, // 赋值文本框
      })
        .then(({ value }) => {
          bnpmXML.workname = value
          // ElMessage({
          //   type: 'success',
          //   message: `Your email is:${value}`,
          // })

          // value = vmviewname
          workFlowApi(bnpmXML).then((res) => {
            ElMessage({
              type: 'success',
              message: '成功',
            })

            if (res) {
              router.push({
                name: 'bnpmtext',
              })
            }

            // 保存后清空原有的文件名和xml内容
            vmviewdata.value = ''
            vmviewname.value = ''

            console.log('bj', res)
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '保存失败',
          })
        })
    }

    console.log('weihao:', bnpmXML.content)
  }

  // 下载为bpmn格式,done是个函数，调用的时候传入的
  function saveDiagram(done) {
    //console.log("weu",done)
    // 把传入的done再传给bpmn原型的saveXML函数调用
    bpmnModeler.saveXML({ format: true }, function (err, xml) {
      // return (urlq = xml)
      //console.log('iiii', urlq)
      done(err, xml)
    })
  }
  function setEncoded(link, name, data) {
    //   console.log('222223333', data)
    dataONE = data
    // console.log('dataONE', dataONE)

    // const dataONE = data
    // 把xml转换为URI，下载要用到的
    const encodedData = encodeURIComponent(data)
    //console.log('222224444', encodedData)
    // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
    //  console.log('hahhah', link, name, data)
    let xmlFile = new File([data], 'test.bpmn')
    //console.log('22222222222222222', xmlFile)
    // if (data) {
    //   link.className = 'active'
    //   link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
    //   link.download = name
    // }
  }
</script>

