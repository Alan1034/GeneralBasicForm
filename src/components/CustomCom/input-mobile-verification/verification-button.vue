<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-09-03 15:58:20
 * @LastEditTime: 2024-09-18 10:54:40
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicForm\src\components\CustomCom\input-mobile-verification\verification-button.vue
 * 
-->
<script setup lang="ts">
import { ref, computed, onBeforeUnmount, Ref, shallowRef } from "vue";
import type { ComponentType } from "../../../types/componentType";
const { getSmscode, componentType = "Element Plus", item } = defineProps<{ getSmscode: Function, componentType?: ComponentType, item: any }>();

const defaultText = "获取验证码";
const restTime = 60;
const buttonText: Ref<string | number> = ref(defaultText);
const timer = ref(null);
const buttonType = computed(() => buttonText.value === defaultText);
const buttonName = shallowRef("el-button")
switch (componentType) {
  case "Element Plus":
    buttonName.value = "el-button"
    break;
  case "Ant Design Vue":
    buttonName.value = "a-button"
    break;
  default:
    break;
}
const reset = () => {
  if (!timer) {
    return;
  }
  clearInterval(timer.value);
  timer.value = null;
  buttonText.value = defaultText;
};
const buttonClick = async () => {
  if (buttonText.value !== defaultText) {
    return;
  }
  buttonText.value = restTime;
  timer.value = setInterval(() => {
    if (Number(buttonText.value) <= 0 || !buttonText.value) {
      reset();
      return;
    } else {
      buttonText.value = Number(buttonText.value) - 1;
    }
  }, 1000);
  if (!getSmscode) {
    return;
  } else {
    const statue = await getSmscode();
    if (statue === false) {
      reset();
    }
  }
};
onBeforeUnmount(() => {
  reset();
});
const buttonSetting = { ...item.buttonSetting }
</script>

<template>
  <component :is="buttonName" class="verifiaction-button" :style="{
    color: buttonType
      ? 'var(--color-primary, #409EFF)'
      : 'var(--text-color-placeholder, #A8ABB2)',
    cursor: buttonType ? 'pointer' : 'default',
  }" @click="buttonClick" v-bind="buttonSetting">{{ buttonType ? defaultText : buttonText + "s" }}</component>
</template>

<style lang="less" scoped>
.verifiaction-button {
  width: 109px;
}
</style>