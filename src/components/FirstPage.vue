<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
          <div class="user">
            <img src="@/assets/images/user1.png" />
            <div class="userinfo">
              <p class="name">{{user.username}}</p>
              <p class="access">{{user.tag1}}</p>
            </div>
          </div>
          <div class="login-info">
            <p>登录的身份:<span>{{user.tag2}}</span></p>
            <p>登录的部门:<span>{{user.tag}}</span></p>
          </div>
        </el-card>

      </el-col>
      <el-col :span="16" style="padding-left: 20px">
        <el-card class="box-card system_bulletin" style="margin-bottom: 20px">
          <div slot="header" class="system_title">
            <span>系统公告</span>
          </div>
          <div
            v-for="item in systemData"
            :key="item.title"
            class="system_context item"
          >
            <div>
              {{ item.title }}
            </div>
            <div>
              <i :class="`el-icon-${item.icon}`"> {{ item.date }}</i>
            </div>
          </div>
        </el-card>
       
      </el-col>
    </el-row>
  </div>
</template>
<script>
import loginAxios from "@/network/login/login";  
import * as echarts from "echarts";
export default {
  name: "firstPage",
  data() {
    return {
      columnsss:[],
      list2:[],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      systemData: [
        {
          id: 1,
          date: "2022-10-21 09:00",
          title: "【内部分享】如何建立良好的客户关系",
          icon: "timer",
        },
        {
          id: 2,
          date: "2022-10-21 09:00",
          title: "【内部分享】如何建立良好的客户关系",
          icon: "timer",
        },
        {
          id: 3,
          date: "2022-10-21 09:00",
          title: "【内部分享】如何建立良好的客户关系",
          icon: "timer",
        },
        {
          id: 4,
          date: "2022-10-21 09:00",
          title: "【内部分享】如何建立良好的客户关系",
          icon: "timer",
        },
        {
          id: 5,
          date: "2022-10-21 09:00",
          title: "【内部分享】如何建立良好的客户关系",
          icon: "timer",
        },
        {
          id: 6,
          date: "2022-10-21 09:00",
          title: "【内部分享】如何建立良好的客户关系",
          icon: "timer",
        },
      ],
    };
  },
  created: function () {
   
this.getUserFromSession();
},
  mounted() {
    this.gettablename();
    var mycharts1 = echarts.init(this.$refs.echarts1);
    var mycharts2 = echarts.init(this.$refs.echarts2);
    var mycharts3 = echarts.init(this.$refs.echarts3);
    // 指定图表的配置项和数据
    var option1 = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    var option2 = {
      title: {
        text: "Stacked Area Chart",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };

    // prettier-ignore
    const hours = [
    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p'
];
    // prettier-ignore
    const days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
];
    // prettier-ignore
    const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
    const title = [];
    const singleAxis = [];
    const series = [];
    days.forEach(function (day, idx) {
      title.push({
        textBaseline: "middle",
        top: ((idx + 0.5) * 100) / 7 + "%",
        text: day,
      });
      singleAxis.push({
        left: 150,
        type: "category",
        boundaryGap: false,
        data: hours,
        top: (idx * 100) / 7 + 5 + "%",
        height: 100 / 7 - 10 + "%",
        axisLabel: {
          interval: 2,
        },
      });
      series.push({
        singleAxisIndex: idx,
        coordinateSystem: "singleAxis",
        type: "scatter",
        data: [],
        symbolSize: function (dataItem) {
          return dataItem[1] * 4;
        },
      });
    });
    data.forEach(function (dataItem) {
      series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
    });
    var option3 = {
      tooltip: {
        position: "top",
      },
      title: title,
      singleAxis: singleAxis,
      series: series,
    };

    mycharts1.setOption(option1);
    mycharts2.setOption(option2);
    mycharts3.setOption(option3);
  },  
  methods:{
    gettablename(){
  this.user = JSON.parse(window.sessionStorage.getItem("user1"));
  

loginAxios("/tableshowzz",'公告').then(result=>{
            if (result.data.code===9000){          
             // this.list2=result.data.data.data1;
             this.systemData= []
              console.log(result.data.data.data1)
  var kl=[];
  var l=result.data.data.data1;
  for(var i=0;i<l.length;i++){
  this.systemData.push({'date':l[i].发布时间,'title':'【'+l[i].公告标题+'】 ' +l[i].公告内容,'icon':"timer"
},)}
console.log(this.list2)
//this.list2=kl;

  this.columnsss=[{"key":"公告","title":"公告"}];
  //result.data.data.data;



  var m={"code":9000,"data":{"data":[{"key":"公告标题","title":"公告标题"},
  {"key":"公告内容","title":"公告内容"},{"key":"发布时间","title":"发布时间"}],
  "data1":[{"公告标题":"请假格式","公告内容":"请假时请写入请假事件","发布时间":"2022-10-21 09:00"}]}}
       
  console.log("this.columnsss"+JSON.stringify(this.columnsss))
            }else {
              this.$message.error(result.data.msg);
            }
          }).catch(error=>{
            this.$message.error("登录时出现错误，请重新尝试！");
          })



      },
         getUserFromSession(){
            this.user = JSON.parse(window.sessionStorage.getItem("user1"));
            this.ll=JSON.parse(window.sessionStorage.getItem("user"));
           console.log(this.user)
         },
        
      },
};
</script>
<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #999;
  display: flex;
  align-items: center;
  img {
    margin-left: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    margin-left: 40px;
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
      margin-top: 0px;
    }
  }
}
.login-info {
  p {
    font-size: 14px;
    color: #999999;
    line-height: 28px;
    span {
      color: #666666;
      margin-left: 20px;
    }
  }
}

.system_bulletin {
  .system_title {
    font-size: 22px;
    color: #000000;
  }
  .system_context {
    padding-bottom: 10px;
    border-bottom: 1px #f2f2f2 solid;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>