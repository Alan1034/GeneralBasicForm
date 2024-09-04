<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-08 18:03:42
 * @LastEditTime: 2023-12-07 17:03:07
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicForm\src\components\VBasic\select\index.vue
 * 
-->
<script setup lang="ts">
import { selectDefaultSetting } from "../../setting";
import { ref, inject } from "vue";
import { BasicFormComponentsProps } from "../../../types/componentsProps";
const { item } = defineProps<{ item: any }>();
const queryParams = inject("queryParams", {});
const size = inject("size");
const selectSetting = ref({
  ...selectDefaultSetting,
  ...item.selectSetting,
  ...item.setting,
});
</script>

<template>
  <el-select
    v-model="queryParams[item.prop]"
    :size="size"
    v-bind="selectSetting"
  >
    <el-option
      v-for="dict in item.option || []"
      :key="dict.value"
      v-bind="dict"
    />
  </el-select>
</template>