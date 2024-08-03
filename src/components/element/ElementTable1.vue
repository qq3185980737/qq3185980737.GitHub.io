<template>
  <div style="background-color: #ffffff;text-align: right;padding: 8px 0;">
    <el-table :data="list" :cell-style="rowStyle">
      <el-table-column v-for="(item,index) in columns" :key="index" :prop="item.key" :align="center"
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
import loginAxios from "@/network/login/login";    
  export default {
   
    name: "ElementTable",
    data() {
      return {
       
        
        data: {
          total: 0
        },
        page: 1
      }
    },
    props: {
      list:Array,
      pageSize: Number,
      columns: Array
    },
    created() {
      //this.reload(this.page);
    },
    methods: {
      rowStyle(){
    	return "text-align:left"
    	},
     /* reload(page) {
        if (!this.url) {
          return;
        }
        let that = this;
        this.page = page;
        loginAxios(this.url).then(result=>{
            if (result.data.code===9000){            

that.list=result.data.data;
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })
        //this.get(this.url, {page: this.page, pageSize: this.pageSize}, res => {
        //  that.data = res.data;
        //})
      }, */
      deploy(row) {
        console.log(row)
      },
      open() {
        console.log("d")
      }
    }
  }
</script>

<style >
.cell{
  white-space: pre-wrap !important;
}
</style>
