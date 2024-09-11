<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-12-08 17:45:01
 * @LastEditTime: 2024-09-11 18:32:25
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 对展示描述列表的封装
 * @FilePath: \GeneralBasicForm\src\Descriptions.vue
 * 
-->
<template>
  <component :is="descriptions" :column="1" border class="form-width" v-bind="$attrs">
    <component :is="descriptionsItem" v-for="(item, i) in props.formItem" :key="item.prop" :label="item.label"
      v-bind="item.descriptionsItemProps">
      <RenderComponent v-if="item.render" :i="i" :render="item.render" :formData="formData"></RenderComponent>
      <span v-else>
        {{ formData[item.prop] }}
      </span>
    </component>
  </component>
</template>

<script lang="ts" setup>
import type { PropType, FunctionalComponent, VNode } from "vue";
import { shallowRef } from "vue";
import type { ComponentType } from "./types/componentType"
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
  componentType: {
    type: String as unknown as PropType<ComponentType>,
    default: "Element Plus"
  },
});
const descriptions = shallowRef("el-descriptions-item")
const descriptionsItem = shallowRef("descriptions-item")
switch (props.componentType) {
  case "Element Plus":
    descriptions.value = "el-descriptions-item"
    descriptionsItem.value = "el-descriptions-item"
    break;
  case "Ant Design Vue":
    descriptions.value = "a-descriptions"
    descriptionsItem.value = "a-descriptions-item"
    break;
  default:
    break;
}
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

<style></style>