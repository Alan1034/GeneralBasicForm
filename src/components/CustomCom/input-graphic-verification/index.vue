<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-09 10:01:20
 * @LastEditTime: 2024-09-04 19:20:04
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 图形验证码组件
 * @FilePath: \GeneralBasicForm\src\components\CustomCom\input-graphic-verification\index.vue
 * 
-->

<script setup lang="ts">
import EInput from "../../VBasic/input/index.vue";
import AInput from "../../VABasic/input/index.vue";
import { inject, shallowRef } from "vue";
import { formLoadingKey } from "../../../injectKey";
import type { InputGraphicVerification } from "../../../types/componentsProps";
import type { ComponentType } from "../../../types/componentType";
const { item, componentType = "Element Plus" } = defineProps<{ item: any, componentType?: ComponentType }>();
const {
  graphicSrc = "",
  graphicAlt = "",
  getGraphic = () => { },
  key,
}: InputGraphicVerification = item;

const { formLoading } = inject<any>(formLoadingKey, false);
const graphicClick = async () => {
  // console.log('click', getGraphic);
  if (getGraphic && !formLoading.value) {
    await getGraphic();
  }
};
const inputType = shallowRef(EInput)
switch (componentType) {
  case "Element Plus":
    inputType.value = EInput
    break;
  case "Ant Design Vue":
    inputType.value = AInput
    break;
  default:
    break;
}
</script>

<template>
  <div class="input-graphic-verification" v-loading="formLoading">
    <component :is="inputType" :item="item" class="input" />
    <img class="graphic" @click="graphicClick" :src="graphicSrc" :alt="graphicAlt || `${key}`" />
  </div>
</template>

<style lang="less" scoped>
.input-graphic-verification {
  display: flex;
  gap: 12px;
  width: 100%;

  .input {
    flex: auto;
  }

  .graphic {
    width: 109px;
    height: 43px;
    object-fit: fill;
    flex: none;
  }
}
</style>