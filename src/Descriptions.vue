<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-12-08 17:45:01
 * @LastEditTime: 2024-09-25 18:14:06
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 对展示描述列表的封装
 * @FilePath: \GeneralBasicForm\src\Descriptions.vue
 * 
-->
<template>
  <component :is="descriptions" :column="1" border class="form-width" v-bind="$attrs">
    <component :is="descriptionsItem" v-for="(item, i) in renderFormItem" :key="item.prop" :label="item.label"
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
import { shallowRef, watch, ref } from "vue";
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
  strict: {
    // 使用strict参数后，如果formData内的某个字段没有值，对应的描述元素将不会展示（包括标签文字），但有render的字段仍然会展示
    type: Boolean,
    default: false
  },
});
const renderFormItem = ref<ItemType[]>([])
watch(
  () => [props.formData, props.formItem],
  ([NewFormData = {}, NewFormItem = <any>[]]) => {
    let PhasedFormItem = NewFormItem
    if (props.strict) {
      // strict严格模式过滤formItem
      console.log(NewFormData)
      console.log(PhasedFormItem)
      for (const key in NewFormData) {
        if (Object.prototype.hasOwnProperty.call(NewFormData, key)) {
          const element = NewFormData[key];
          if (!element) {
            PhasedFormItem = PhasedFormItem.filter((item) => {
              return ((item.prop !== key) || (item.render))
            })
          }
        }
      }


    }
    console.log(PhasedFormItem)
    renderFormItem.value = PhasedFormItem
  },
  { immediate: true }
);
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