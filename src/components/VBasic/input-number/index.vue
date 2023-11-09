<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-08 18:03:42
 * @LastEditTime: 2023-11-09 16:51:20
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicForm\src\components\VBasic\input-number\index.vue
 * 
-->
<script setup lang="ts">
import { inputDefaultSetting } from "../../setting";
import { ref, inject } from "vue";
import type { componentsProps } from "../../../types/componentsProps";
const { item } = defineProps<componentsProps>();
const queryParams = inject("queryParams", {});
const size = inject("size");
const inputSetting = ref({
  ...inputDefaultSetting,
  ...item.inputSetting,
});
</script>

<template>
  <el-input-number
    v-model="queryParams[item.prop]"
    :size="size"
    v-bind="inputSetting"
  />
</template>