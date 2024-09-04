<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-08 18:03:42
 * @LastEditTime: 2023-12-07 17:06:11
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicForm\src\components\VBasic\cascader\index.vue
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
  <el-cascader
    v-model="queryParams[item.prop]"
    :size="size"
    :options="item.options || []"
    v-bind="selectSetting"
  ></el-cascader>
</template>