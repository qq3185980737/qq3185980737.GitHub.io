




<template>
    <div>
      <form>
        <div v-for="(item, index) in formItems" :key="index">
          <label>{{ item.title }}</label>
          <template v-if="item.type === 'input'">
            <input type="text" :value="item.value" @input="updateValue(index, $event.target.value)">
          </template>
          <template v-if="item.type === 'inputNumber'">
            <input type="number" :value="item.value" @input="updateValue(index, $event.target.value)">
          </template>
          <template v-if="item.type === 'radio'">
            <div v-for="(option, i) in item.options" :key="i">
              <input type="radio" :value="option.value" :checked="item.value === option.value" @change="updateValue(index, option.value)">
              <label>{{ option.label }}</label>
            </div>
          </template>
          <template v-if="item.type === 'select'" >
          <select :id="item.field" v-model="str4" @change="updateValue(index, str4)">
            <option v-for="option in item.options" :value="option.value" >{{ option.label }}</option>
          </select>
        </template>
        <template v-else-if="item.type === 'checkbox'">
          <div v-for="option in item.options" :key="option.value">
            <input type="checkbox" :id="option.value" :value="option.value" v-model="formItems[index].value" >
            <label :for="option.value">{{ option.label }}</label>
          </div>

        </template>
        <template v-else-if="item.type === 'file'">
          <input type="file"  @change="getFile(index, $event.target.files[0]) "/>

        </template>
        <template v-else-if="item.type === 'rate'">
    <el-rate   v-model="formItems[index].value" />
  </template>
        </div>
      </form>

      <button @click="submitForm">提交</button>
      <div v-if="showResult">
        <h3>用户输入内容：</h3>
        <ul>
          <li v-for="(value, key) in formValues" :key="key">{{ key }}: {{ value }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        str:"",
					str1:"",
					str2:[],
					str3:"",
					str4:[],

        formValues: {},
        showResult: false,
      };
    },
    props: {
      formItems:Array,
      pageSize: Number,
      formValues: Object
    },
    methods: {
      getFile (index,file) {

  this.formItems[index].name = file.name
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = () => {
    this.formItems[index].value = reader.result}

},
post() {
        this.$emit('updata',this.formItems)
      },
      updateValue(index, value) {
        this.formItems[index].value = value;
      },
      submitForm() {
        this.formItems.forEach((item) => {
          this.formValues[item.field] = item.value;
        });
        this.showResult = true;
        this.post();
      },
    },
  };
  </script>
  