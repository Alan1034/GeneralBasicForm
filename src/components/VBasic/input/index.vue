<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-09-04 19:17:23
 * @LastEditTime: 2024-09-10 09:51:10
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicForm\src\components\VBasic\input\index.vue
 * 
-->
<template>
  <el-input @keydown.enter="getList" v-model="queryParams[item.prop]" :size="size" v-bind="inputSetting">
    <template v-for="(templateEle, name) in item.template" #[name]>
      <component :key="name" v-if="templateEle" :is="currentInputComponent()" :templateEle="templateEle" />
    </template>
  </el-input>
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
    const getList = inject("getList");
    const size = inject("size", 'default');
    return { queryParams, getList, size };
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