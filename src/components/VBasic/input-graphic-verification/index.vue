<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-09 10:01:20
 * @LastEditTime: 2023-11-16 10:52:01
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 图形验证码组件
 * @FilePath: \GeneralBasicForm\src\components\VBasic\input-graphic-verification\index.vue
 * 
-->

<script setup lang="ts">
import Input from "../input/index.vue";
import { inject } from "vue";
import { formLoadingKey } from "../../../injectKey";
import type {
  BasicFormComponentsProps,
  InputGraphicVerification,
} from "../../../types/componentsProps";
const { item } = defineProps<{ item: any }>();
const { graphicSrc = "", getGraphic = () => {} }: InputGraphicVerification =
  item;

const { formLoading, updateFormLoading } = inject<any>(formLoadingKey);
// console.log(formLoading.value, "formLoading.value");
const graphicClick = async () => {
  // console.log('click', getGraphic);
  if (getGraphic && !formLoading.value) {
    await getGraphic();
  }
};
</script>

<template>
  <div class="input-graphic-verification" v-loading="formLoading">
    <Input :item="item" class="input" />
    <img class="graphic" @click="graphicClick" :src="graphicSrc" />
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