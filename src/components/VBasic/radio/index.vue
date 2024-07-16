<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-08 18:03:42
 * @LastEditTime: 2024-01-09 11:38:11
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 单选框组件
 * @FilePath: \GeneralBasicForm\src\components\VBasic\radio\index.vue
 * 
-->
<script setup lang="ts">
import { ref, inject } from "vue";
// import { BasicFormComponentsProps } from "../../../types/componentsProps";
const { item } = defineProps<{ item: any }>();
const queryParams = inject("queryParams", {});
const size = inject("size");
const radioGroupSetting = ref({
  ...item.radioGroupSetting,
});
</script>

<template>
  <el-radio-group
    v-model="queryParams[item.prop]"
    :size="size"
    v-bind="radioGroupSetting"
  >
    <el-radio
      v-for="dict in item.option || []"
      :size="size"
      :key="dict.value"
      v-bind="dict"
      >{{ dict.label }}</el-radio
    >
  </el-radio-group>
</template>