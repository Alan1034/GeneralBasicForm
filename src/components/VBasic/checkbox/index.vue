<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-08 18:03:42
 * @LastEditTime: 2023-12-28 14:51:25
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 单选框组件
 * @FilePath: \GeneralBasicForm\src\components\VBasic\checkbox\index.vue
 * 
-->
<script setup lang="ts">
import { ref, inject } from "vue";
// import { BasicFormComponentsProps } from "../../../types/componentsProps";
const { item } = defineProps<{ item: any }>();
const queryParams = inject("queryParams", {});
const size = inject("size");
const checkboxGroupSetting = ref({
  ...item.checkboxGroupSetting,
  ...item.setting,
});
</script>

<template>
  <el-checkbox-group
    v-model="queryParams[item.prop]"
    :size="size"
    v-bind="checkboxGroupSetting"
  >
    <el-checkbox
      v-for="dict in item.option || []"
      :size="size"
      :key="dict.value"
      v-bind="dict"
      >{{ dict.label }}</el-checkbox
    >
  </el-checkbox-group>
</template>