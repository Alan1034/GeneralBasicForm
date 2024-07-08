<template>
  <el-button>{{ buttonType ? defaultText : buttonText + "s" }}</el-button>
</template>

<script>
export default {
  props: {
    verificationSetting: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      defaultText: this.verificationSetting.defaultText || "获取验证码",
      buttonText: this.verificationSetting.defaultText || "获取验证码",
      restTime: this.verificationSetting.restTime || 60,
    };
  },
  computed: {
    buttonType() {
      return this.buttonText === this.defaultText;
    },
  },
};
</script>

<style>
</style>