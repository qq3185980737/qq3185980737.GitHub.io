

<template>
  <div>
   <div class="super-flow-demo1">
      <div class="node-container">
        <div
            class="node-item"
            v-for="item in nodeItemList"
            @mousedown="evt => nodeItemMouseDown(evt, item.value)">
			<div
				v-if="item.label == '开始'" 
				class="node-item-img" 
				:style="{ backgroundImage: 'url(' + require('./img/ico_start.png') + ')' }">
        </div>
			<div
				v-if="item.label == '结束'" 
				class="node-item-img node-item-img-2" 
				:style="{ backgroundImage: 'url(' + require('./img/ico_end.png') + ')' }"></div>
			<div
				v-if="item.label == '请假'" 
				class="node-item-img" 
				:style="{ backgroundImage: 'url(' + require('./img/ico_juece.png') + ')' }"></div>
			<div
				v-if="item.label == '审批'" 
				class="node-item-img" 
				:style="{ backgroundImage: 'url(' + require('./img/ico_fenpai.png') + ')' }"></div>
          {{ item.label }}
        </div>
      </div>
      <div
          class="flow-container"
          ref="flowContainer">
        <super-flow
            ref="superFlow"
            :graph-menu="graphMenu"
            :node-menu="nodeMenu"
            :link-menu="linkMenu"
            :link-base-style="linkBaseStyle"
            :link-style="linkStyle"
            :link-desc="linkDesc">
          <template v-slot:node="{meta}">
			  <div 
				@mouseup="nodeMouseUp"
                @click="nodeClick"
				class="flow-node ellipsis"
				>
				<div 
					v-if="meta.label == '开始'" 
					class="flow-node-img" 
					:style="{ backgroundImage: 'url(' + require('./img/ico_start.png') + ')' }"></div>
				<div
					v-if="meta.label == '结束'" 
					class="flow-node-img flow-node-img-2" 
					:style="{ backgroundImage: 'url(' + require('./img/ico_end.png') + ')' }"></div>
				<div
					v-if="meta.label == '请假'" 
					class="flow-node-img" 
					:style="{ backgroundImage: 'url(' + require('./img/ico_juece.png') + ')' }"></div>
				<div
					v-if="meta.label == '审批'" 
					class="flow-node-img" 
					:style="{ backgroundImage: 'url(' + require('./img/ico_fenpai.png') + ')' }"></div>
				{{meta.name}}
			</div>
          </template>
        </super-flow>
      </div>
    </div>
 <!-- 修改节点弹出框 -->
    <el-dialog
        :title="drawerConf.title"
        :visible.sync="drawerConf.visible"
        :close-on-click-modal="false"
        width="500px">
      <el-form
          @keyup.native.enter="settingSubmit"
          @submit.native.prevent
          v-show="drawerConf.type === drawerType.node"
          ref="nodeSetting"
          :model="nodeSetting">
        <el-form-item
            label="节点名称"
            prop="name">
          <el-input
              v-model="nodeSetting.name"
              placeholder="请输入节点名称"
              maxlength="30">
          </el-input>
        </el-form-item>
        <el-form-item
            label="节点描述"
            prop="desc">
          <el-input
              v-model="nodeSetting.desc"
              placeholder="请输入节点描述"
              maxlength="30">
          </el-input>
        </el-form-item>
      </el-form>
      <el-form
          @keyup.native.enter="settingSubmit"
          @submit.native.prevent
          v-show="drawerConf.type === drawerType.link"
          ref="linkSetting"
          :model="linkSetting">
        <el-form-item
            label="连线描述"
            prop="desc">
          <el-input
              v-model="linkSetting.desc"
              placeholder="请输入连线描述">
          </el-input>
        </el-form-item>
      </el-form>
      <span
          slot="footer"
          class="dialog-footer">
        <el-button
            @click="drawerConf.cancel">
          取 消
        </el-button>
        <el-button
            type="primary"
            @click="settingSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
	import SuperFlow from 'vue-super-flow' 
	import 'vue-super-flow/lib/index.css'
const drawerType = {
  node: 0,
  link: 1
}
 
export default {
	components: {
		SuperFlow,
	},
  data () {
    return {
      drawerType,
      drawerConf: {
        title: '',
        visible: false,
        type: null,
        info: null,
        open: (type, info) => {
          const conf = this.drawerConf
          conf.visible = true
          conf.type = type
          conf.info = info
          if (conf.type === drawerType.node) {
            conf.title = '节点'
            if (this.$refs.nodeSetting) this.$refs.nodeSetting.resetFields()
            this.$set(this.nodeSetting, 'name', info.meta.name)
            this.$set(this.nodeSetting, 'desc', info.meta.desc)
          } else {
            conf.title = '连线'
            if (this.$refs.linkSetting) this.$refs.linkSetting.resetFields()
            this.$set(this.linkSetting, 'desc', info.meta ? info.meta.desc : '')
          }
        },
        cancel: () => {
          this.drawerConf.visible = false
          if (this.drawerConf.type === drawerType.node) {
            this.$refs.nodeSetting.clearValidate()
          } else {
            this.$refs.linkSetting.clearValidate()
          }
        }
      },
      linkSetting: {
        desc: ''
      },
      nodeSetting: {
        name: '',
        desc: ''
      },
 
      dragConf: {
        isDown: false,
        isMove: false,
        offsetTop: 0,
        offsetLeft: 0,
        clientX: 0,
        clientY: 0,
        ele: null,
        info: null
      },
      // 左边按钮菜单集合
      nodeItemList: [
        {
          label: '开始',
          value: () => ({
            width: 45,
            height: 70,
            meta: {
              label: '开始',
              name: '开始'
            }
          })
        },
        {
          label: '结束',
          value: () => ({
            width: 45,
            height: 70,
            meta: {
              label: '结束',
              name: '结束'
            }
          })
        },
        {
          label: '请假',
          value: () => ({
            width: 45,
            height: 70,
            meta: {
              label: '请假',
              name: '请假'
            }
          })
        },
        {
          label: '审批',
          value: () => ({
            width: 45,
            height: 70,
            meta: {
              label: '审批',
              name: '审批'
            }
          })
        }
      ],
 
      graphMenu: [
        [
          {
            // 选项 label
            label: '开始',
            // 选项是否禁用
            disable (graph) {
              return !!graph.nodeList.find(node => node.meta.label === '1')
            },
            // 选项选中后回调函数
            selected (graph, coordinate) {
              graph.addNode({
                width: 45,
                height: 70,
                coordinate,
                meta: {
                  label: '开始',
                  name: '开始'
                }
              })
            }
          },
          {
            label: '结束',
            selected (graph, coordinate) {
              graph.addNode({
                width: 45,
                height: 70,
                coordinate,
                meta: {
                  label: '结束',
                  name: '结束'
                }
              })
            }
          },
          {
            label: '请假',
            selected (graph, coordinate) {
              graph.addNode({
                width: 45,
                height: 70,
                coordinate,
                meta: {
                  label: '请假',
                  name: '请假'
                }
              })
            }
          },
          {
            label: '审批',
            selected (graph, coordinate) {
              graph.addNode({
                width: 45,
                height: 70,
                coordinate,
                meta: {
                  label: '审批',
                  name: '审批'
                }
              })
            }
          }
        ],
        [
          {
            label: '全选',
            selected: graph => {
              graph.selectAll()
            }
          }
        ]
      ],
	  // 按钮右键菜单
      nodeMenu: [
        [
          {
            label: '删除',
            selected: node => {
              node.remove()
            }
          },
          {
            label: '编辑',
            selected: node => {
              this.drawerConf.open(drawerType.node, node)
            }
          }
        ]
      ],
	  // 线条右键菜单
      linkMenu: [
        [
          {
            label: '删除',
            selected: link => {
              link.remove()
            }
          },
          {
            label: '编辑',
            selected: link => {
              this.drawerConf.open(drawerType.link, link)
            }
          }
        ]
      ],
	  // 线条样式
      linkBaseStyle: {
        color: '#666666',           // line 颜色
        hover: '#FF0000',           // line hover 的颜色
        textColor: '#666666',       // line 描述文字颜色
        textHover: '#FF0000',       // line 描述文字 hover 颜色
        font: '14px Arial',         // line 描述文字 字体设置 参考 canvas font
        dotted: false,              // 是否是虚线
        lineDash: [4, 4],           // 虚线时生效
        background: 'rgba(255,255,255,0.6)'    // 描述文字背景色
      },
	  // 字体样式
      fontList: [
        '14px Arial',
        'italic small-caps bold 12px arial'
      ]
    }
  },
  mounted () {
    document.addEventListener('mousemove', this.docMousemove)
    document.addEventListener('mouseup', this.docMouseup)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('mousemove', this.docMousemove)
      document.removeEventListener('mouseup', this.docMouseup)
    })
  },
  methods: {
    flowNodeClick (meta) {
      console.log(this.$refs.superFlow.graph)
    },
    linkStyle (link) {
      if (link.meta && link.meta.desc === '1') {
        return {
          color: 'red',
          hover: '#FF00FF',
          dotted: true
        }
      } else {
        return {}
      }
    },
    linkDesc (link) {
      return link.meta ? link.meta.desc : ''
    },
    settingSubmit () {
      const conf = this.drawerConf
      if (this.drawerConf.type === drawerType.node) {
        if (!conf.info.meta) conf.info.meta = {}
        Object.keys(this.nodeSetting).forEach(key => {
          this.$set(conf.info.meta, key, this.nodeSetting[key])
        })
        this.$refs.nodeSetting.resetFields()
      } else {
        if (!conf.info.meta) conf.info.meta = {}
        Object.keys(this.linkSetting).forEach(key => {
          this.$set(conf.info.meta, key, this.linkSetting[key])
        })
        this.$refs.linkSetting.resetFields()
      }
      conf.visible = false
    },
    nodeMouseUp (evt) {
		// 取消这个事件的默认操作
      evt.preventDefault()
    },
    nodeClick () {
      console.log(arguments)
    },
    docMousemove ({ clientX, clientY }) {
      const conf = this.dragConf
 
      if (conf.isMove) {
 
        conf.ele.style.top = clientY - conf.offsetTop + 'px'
        conf.ele.style.left = clientX - conf.offsetLeft + 'px'
 
      } else if (conf.isDown) {
 
        // 鼠标移动量大于 5 时 移动状态生效
        conf.isMove =
            Math.abs(clientX - conf.clientX) > 5
            || Math.abs(clientY - conf.clientY) > 5
 
      }
    },
    docMouseup ({ clientX, clientY }) {
      const conf = this.dragConf
      conf.isDown = false
 
      if (conf.isMove) {
        const {
          top,
          right,
          bottom,
          left
        } = this.$refs.flowContainer.getBoundingClientRect()
 
        // 判断鼠标是否进入 flow container
        if (
            clientX > left
            && clientX < right
            && clientY > top
            && clientY < bottom
        ) {
 
          // 获取拖动元素左上角相对 super flow 区域原点坐标
          const coordinate = this.$refs.superFlow.getMouseCoordinate(
              clientX - conf.offsetLeft,
              clientY - conf.offsetTop
          )
 
          // 添加节点
          this.$refs.superFlow.addNode({
            coordinate,
            ...conf.info
          })
 
        }
 
        conf.isMove = false
      }
 
      if (conf.ele) {
        conf.ele.remove()
        conf.ele = null
      }
    },
    nodeItemMouseDown (evt, infoFun) {
      const {
        clientX,
        clientY,
        currentTarget
      } = evt
 
      const {
        top,
        left
      } = evt.currentTarget.getBoundingClientRect()
 
      const conf = this.dragConf
      const ele = currentTarget.cloneNode(true)
 
      Object.assign(this.dragConf, {
        offsetLeft: clientX - left,
        offsetTop: clientY - top,
        clientX: clientX,
        clientY: clientY,
        info: infoFun(),
        ele,
        isDown: true
      })
 
      ele.style.position = 'fixed'
      ele.style.margin = '0'
      ele.style.top = clientY - conf.offsetTop + 'px'
      ele.style.left = clientX - conf.offsetLeft + 'px'
 
      this.$el.appendChild(this.dragConf.ele)
    }
  }
}
</script>
 
<style lang="less">
 
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
}
 
.link-base-style-form {
  .el-form-item {
    margin-bottom: 12px;
  }
 
  padding-bottom: 20px;
  border-bottom: 1px solid #DCDCDC;
}
 
.super-flow-demo1 {
  margin-top: 20px;
  width: 100%;
  height: 800px;
  background-color : #f5f5f5;
  @list-width: 200px;
 
 
  > .node-container {
    width: @list-width;
    float: left;
    height: 100%;
    text-align: center;
    background-color: #FFFFFF;
  }
 
  > .flow-container {
    width: calc(100% - @list-width);
    float: left;
    height: 100%;
    overflow: hidden;
  }
 
  .super-flow__node {
	box-shadow: none;
	background-color: transparent;
	border: none;
	font-size: 14px;
    .flow-node {
      box-sizing  : border-box;
      width: 42px;
      height: 100%;
      font-size: 14px;
	  text-align: center;
	  line-height: 30px;
	  .flow-node-img {
		  background: no-repeat;
		  background-size: cover;
		  height: 41px;
		  display: block;
	  }
	  .flow-node-img-2{
		  height: 42px !important;
	  }
    }
  }
}
 
.node-item {
  @node-item-height: 30px;
 
  font-size: 14px;
  display: inline-block;
  height: 60px;
  width: 42px;
  margin: 20px 25px;
  background-color: #FFFFFF;
  line-height: 30px;
  cursor: pointer;
  user-select: none;
  text-align: center;
  z-index: 6;
  box-sizing: border-box;
  
  .node-item-img {
	background: no-repeat;
	background-size: cover;
	height: 41px;
	display: block;
  }
  .node-item-img-2{
  	height: 42px !important;
  }
}
 
</style>
