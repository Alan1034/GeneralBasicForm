<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-09 10:01:20
 * @LastEditTime: 2023-11-14 15:35:16
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 手机验证码组件
 * @FilePath: \GeneralBasicForm\src\components\VBasic\input-mobile-verification\index.vue
 * 
-->

<script setup lang="ts">
import Input from "../input/index.vue";
import { h, watch, onBeforeUpdate, nextTick } from "vue";
import { BasicFormComponentsProps } from "../../../types/componentsProps";
import VerificationButton from "./verification-button.vue";
const { item } = defineProps<{item:any}>();
// 重新赋值一下触发下面的代码，否则响应会在内部进行
const mobileItem = item;
mobileItem.template = {
  append: () => {
    return h(VerificationButton, {
      getSmscode: mobileItem.getSmscode,
    });
  },
};
</script>

<template>
  <Input :item="mobileItem" class="input"> </Input>
</template>