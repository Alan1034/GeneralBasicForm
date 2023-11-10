<script setup lang="ts">
import { ref, h, onBeforeUnmount, Ref } from "vue";

const defaultText = "获取验证码";
const restTime = 60;
const buttonText: Ref<string | number> = ref(defaultText);
const timer = ref(null);

const buttonClick = () => {
  if (buttonText.value !== defaultText) {
    return;
  }
  buttonText.value = restTime;
  timer.value = setInterval(() => {
    if (Number(buttonText.value) <= 0 || !buttonText.value) {
      clearInterval(timer.value);
      timer.value = null;
      buttonText.value = defaultText;
      return;
    } else {
      buttonText.value = Number(buttonText.value) - 1;
    }
  }, 1000);
};
onBeforeUnmount(() => {
  clearInterval(timer.value);
  timer.value = null;
});
</script>

<template>
  <el-button
    class="verifiaction-button"
    :style="{
      color:
        buttonText === defaultText
          ? 'var(--color-primary, #409EFF)'
          : 'var(--text-color-placeholder, #A8ABB2)',
    }"
    @click="buttonClick"
    >{{
      buttonText === defaultText ? defaultText : buttonText + "s"
    }}</el-button
  >
</template>

<style lang="less" scoped>
.verifiaction-button {
  width: 109px;
}
</style>