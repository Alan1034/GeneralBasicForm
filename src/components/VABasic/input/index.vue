<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-09-04 18:01:00
 * @LastEditTime: 2024-09-09 19:37:36
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicForm\src\components\VABasic\input\index.vue
 * 
-->
<template>
  <a-input @keydown.enter="getList" @change="onInputChange" :value="queryParams[item.prop]" :size="size"
    v-bind="inputSetting">
    <template v-for="(templateEle, name) in item.template" #[name]>
      <component :key="name" v-if="templateEle" :is="currentInputComponent()" :templateEle="templateEle" />
    </template>
  </a-input>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { inputDefaultSetting } from "../../setting";

export default defineComponent({
  components: {
    InputArchive: (props) => {
      const { templateEle } = props;
      return templateEle();
    },
  },
  props: {
    item: null, // null就是any
  },
  setup() {
    const queryParams = inject("queryParams", {});
    const getList = inject("getList", () => { });
    const size = inject("size", "default");
    const Form = inject("Form") as any;
    const formItemContext = Form.useInjectFormItemContext();
    return { queryParams, getList, size, formItemContext };
  },
  data() {
    return {
      inputSetting: {
        ...inputDefaultSetting,
        ...this.item.inputSetting,
        ...this.item.setting,
      },
    };
  },
  // created() {
  //   console.log("new", this.item);
  //   console.log("new", this.inputSetting);
  // },
  methods: {
    currentInputComponent() {
      return "input-archive";
    },
    onInputChange(e: any) {
      this.queryParams[this.item.prop] = (e.target as any).value
      this.formItemContext.onFieldChange();
    }
  },
  // watch: {
  //   item(val) {
  //     console.log("item", val);
  //   },
  //   size(val) {
  //     console.log(val);
  //   },
  // },
});
</script>

<style></style>