<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-12-08 17:45:01
 * @LastEditTime: 2023-12-08 18:34:41
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 对展示描述列表的封装
 * @FilePath: \GeneralBasicForm\src\Descriptions.vue
 * 
-->
<template>
  <el-descriptions :column="1" border class="form-width" v-bind="props">
    <el-descriptions-item
      v-for="(item, $index) in props.formItem"
      :key="item.prop"
      :label="item.label"
      v-bind="props.descriptionsItemProps"
    >
      {{
        item.render
          ? item.render({
              row: formData,
              $index,
            })
          : formData[item.prop]
      }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import type { ItemType } from "./types/basicFrom";
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  descriptionsItemProps: {
    type: Object,
    required: false,
  },
  formItem: {
    type: Array as unknown as PropType<ItemType[]>,
    required: true,
  },
});
</script>

<style>
</style>