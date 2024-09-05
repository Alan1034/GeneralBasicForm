<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-09 10:01:20
 * @LastEditTime: 2024-09-04 18:43:40
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 手机验证码组件
 * @FilePath: \GeneralBasicForm\src\components\CustomCom\input-mobile-verification\index.vue
 * 
-->

<script setup lang="ts">
import EInput from "../../VBasic/input/index.vue";
import AInput from "../../VABasic/input/index.vue";
import { h, shallowRef } from "vue";
import type { ComponentType } from "../../../types/componentType";
import VerificationButton from "./verification-button.vue";
const { item, componentType = "Element Plus" } = defineProps<{ item: any, componentType?: ComponentType }>();
// 重新赋值一下触发下面的代码，否则响应会在内部进行
const mobileItem = item;
const inputType = shallowRef(EInput)
switch (componentType) {
  case "Element Plus":
    inputType.value = EInput;
    mobileItem.template = {
      append: () => {
        return h(VerificationButton, {
          getSmscode: mobileItem.getSmscode,
        });
      },
    };
    break;
  case "Ant Design Vue":
    inputType.value = AInput
    mobileItem.template = {
      addonAfter: () => {
        return h(VerificationButton, {
          getSmscode: mobileItem.getSmscode,
        });
      },
    };
    break;
  default:
    break;
}
</script>

<template>
  <component :is="inputType" :item="mobileItem" class="input" />
</template>