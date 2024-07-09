<template>
  <el-button @click="buttonClick">{{
    buttonType ? defaultText : buttonText + "s"
  }}</el-button>
</template>

<script>
export default {
  props: {
    verificationSetting: {
      type: Object,
      default: () => {},
    },
    getSmscode: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      defaultText: this.verificationSetting.defaultText || "获取验证码",
      buttonText: this.verificationSetting.defaultText || "获取验证码",
      restTime: this.verificationSetting.restTime || 60,
      timer: null,
    };
  },
  computed: {
    buttonType() {
      return this.buttonText === this.defaultText;
    },
  },
  destroyed() {
    this.reset();
  },
  methods: {
    reset() {
      if (!this.timer) {
        return;
      }
      clearInterval(this.timer);
      this.timer = null;
      this.buttonText = this.defaultText;
    },
    async buttonClick() {
      if (this.buttonText !== this.defaultText) {
        return;
      }
      this.buttonText = this.restTime;
      this.timer = setInterval(() => {
        if (Number(this.buttonText) <= 0 || !this.buttonText) {
          this.reset();
          return;
        } else {
          this.buttonText = Number(this.buttonText) - 1;
        }
      }, 1000);
      if (!this.getSmscode) {
        return;
      } else {
        const statue = await this.getSmscode();
        if (statue === false) {
          this.reset();
        }
      }
    },
  },
};
</script>

<style>
</style>