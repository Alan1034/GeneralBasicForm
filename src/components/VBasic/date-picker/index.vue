<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-08 18:03:42
 * @LastEditTime: 2023-12-07 16:49:21
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicForm\src\components\VBasic\date-picker\index.vue
 * 
-->
<script setup lang="ts">
import { datePackerDefaultSetting } from "../../setting";
import { ref, inject } from "vue";
import { BasicFormComponentsProps } from "../../../types/componentsProps";
const { item } = defineProps<{ item: any }>();
const queryParams = inject("queryParams", {});
const size = inject("size");
const datePackerSetting = ref({
  ...datePackerDefaultSetting,
  ...item.datePackerSetting,
});
</script>

<template>
  <el-date-picker
    v-model="queryParams[item.prop]"
    :size="size"
    v-bind="datePackerSetting"
  />
</template>