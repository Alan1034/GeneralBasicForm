<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-12-08 17:45:01
 * @LastEditTime: 2024-01-03 09:05:06
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 对展示描述列表的封装
 * @FilePath: \GeneralBasicForm\src\Descriptions.vue
 * 
-->
<template>
  <el-descriptions :column="1" border class="form-width" v-bind="props">
    <el-descriptions-item
      v-for="(item, i) in props.formItem"
      :key="item.prop"
      :label="item.label"
      v-bind="item.descriptionsItemProps"
    >
      <RenderComponent
        v-if="item.render"
        :i="i"
        :render="item.render"
        :formData="formData"
      ></RenderComponent>
      <span v-else>
        {{ formData[item.prop] }}
      </span>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import type { PropType, FunctionalComponent, VNode } from "vue";
import type { ItemType } from "./types/basicFrom";
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  formItem: {
    type: Array as unknown as PropType<ItemType[]>,
    required: true,
  },
});
type RenderComponentProps = {
  i: any;
  formData: Object;
  render: (item: any) => VNode | String;
};
type Events = {};
// 函数直接返回VNode模板会识别成[object Promise]，因此需要转换成函数式组件
const RenderComponent: FunctionalComponent<RenderComponentProps, Events> = (
  props,
  context
) => {
  const { i, render, formData } = props;
  return render({
    row: formData,
    $index: i,
  });
};
</script>

<style>
</style>