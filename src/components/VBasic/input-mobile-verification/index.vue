<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-09 10:01:20
 * @LastEditTime: 2023-11-09 17:54:59
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 手机验证码组件
 * @FilePath: \GeneralBasicForm\src\components\VBasic\input-mobile-verification\index.vue
 * 
-->

<script setup lang="ts">
import Input from "../input/index.vue";
import { ref, h } from "vue";
import type { componentsProps } from "../../../types/componentsProps";
import verificationButton from "./verification-button.vue";
const { item } = defineProps<componentsProps>();
// console.log(item);
let buttonText = ref("获取验证码");
item.template = {
  append: () => {
    return h(verificationButton);
  },
};
</script>

<template>
  <Input :item="item" class="input"> </Input>
</template>