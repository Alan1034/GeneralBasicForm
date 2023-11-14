<script setup lang="ts">
import { ref, computed, onBeforeUnmount, Ref } from "vue";
import type { InputMobileVerification } from "../../../types/componentsProps";
const { getSmscode } = defineProps<{ getSmscode: Function }>();

const defaultText = "获取验证码";
const restTime = 60;
const buttonText: Ref<string | number> = ref(defaultText);
const timer = ref(null);
const buttonType = computed(() => buttonText.value === defaultText);
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
</script>

<template>
  <el-button
    class="verifiaction-button"
    :style="{
      color: buttonType
        ? 'var(--color-primary, #409EFF)'
        : 'var(--text-color-placeholder, #A8ABB2)',
      cursor: buttonType ? 'pointer' : 'default',
    }"
    @click="buttonClick"
    >{{ buttonType ? defaultText : buttonText + "s" }}</el-button
  >
</template>

<style lang="less" scoped>
.verifiaction-button {
  width: 109px;
}
</style>