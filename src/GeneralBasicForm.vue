<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-08-20 17:14:53
 * @LastEditTime: 2024-01-09 16:35:27
 * @LastEditors: yuanzeyu
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicForm\src\GeneralBasicForm.vue
 * 
-->
/** 通用基本表单。用在表单页面搜索栏 */

<template>
  <el-form
    :model="queryParams"
    ref="queryFormRef"
    v-show="showSearch"
    inline
    label-position="left"
    :label-width="labelWidth"
    v-bind="$attrs"
  >
    <el-form-item
      v-for="item in formItem"
      :label="item.label"
      :prop="item.prop"
      :key="item.prop"
      :rules="item.rules"
    >
      <Input v-if="item.type === 'input'" :item="item" />
      <Radio v-if="item.type === 'radio'" :item="item" />
      <Select v-if="item.type === 'select'" :item="item" />
      <Divider v-if="item.type === 'divider'" :item="item" />
      <Cascader v-if="item.type === 'cascader'" :item="item" />
      <Checkbox v-if="item.type === 'checkbox'" :item="item" />
      <DatePicker v-if="item.type === 'date-picker'" :item="item" />
      <InputNumber v-if="item.type === 'input-number'" :item="item" />
      <slot v-if="item.type === 'form-item-slot'" :name="item.name"></slot>
      <InputMobileVerification
        v-if="item.type === 'input-mobile-verification'"
        :item="item"
      />
      <InputGraphicVerification
        v-if="item.type === 'input-graphic-verification'"
        :item="item"
        :key="item.key"
      />
    </el-form-item>
    <slot></slot>
    <el-form-item v-if="!formOnly">
      <el-button
        type="primary"
        :size="size"
        @click="handleQuery"
        v-loading="formLoading"
        >查询</el-button
      >
      <el-button :size="size" @click="resetQuery">重置</el-button>
    </el-form-item>
    <slot name="behind-the-button" />
  </el-form>
</template>

<script lang="ts">
import { provide, ref, PropType, defineComponent, computed } from "vue";
import type { ItemType } from "./types/basicFrom";
import { useRoute } from "vue-router";
import Input from "./components/VBasic/input/index.vue";
import InputNumber from "./components/VBasic/input-number/index.vue";
import InputGraphicVerification from "./components/VBasic/input-graphic-verification/index.vue";
import InputMobileVerification from "./components/VBasic/input-mobile-verification/index.vue";
import Divider from "./components/VBasic/divider/index.vue";
import Radio from "./components/VBasic/radio/index.vue";
import Checkbox from "./components/VBasic/checkbox/index.vue";
import DatePicker from "./components/VBasic/date-picker/index.vue";
import Select from "./components/VBasic/select/index.vue";
import Cascader from "./components/VBasic/cascader/index.vue";
import { formLoadingKey } from "./injectKey";

export default defineComponent({
  name: "GeneralBasicForm",
  components: {
    Input,
    InputNumber,
    InputGraphicVerification,
    InputMobileVerification,
    Divider,
    Radio,
    Checkbox,
    DatePicker,
    Select,
    Cascader,
  },
  props: {
    showSearch: {
      // 是否展示所有元素
      type: Boolean,
      default: true,
    },
    loading: {
      // 加载动画
      type: Boolean,
      default: false,
    },
    formOnly: {
      // 是否只展示表单不展示按钮
      type: Boolean,
      default: false,
    },
    getList: {
      // 查找数据调用的函数
      type: Function,
      default: () => {},
    },
    afterReset: {
      // 在重置按钮点击完后但还没重新请求时触发的的函数
      type: Function,
      default: () => {},
    },
    formItem: {
      // 定义表单的数据
      type: Array as unknown as PropType<ItemType[]>,
      default: [],
    },
    size: {
      // 控制按钮大小
      type: String,
      default: "default",
    },
    labelWidth: {
      // 表单文字宽度
      type: String,
      default: "90px",
    },
    noUrlParameters: {
      // 不接受和不改变url的参数
      type: Boolean,
      default: () => false,
    },
    formData: {
      // 外部传入的表单数据，用于回填
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formLoading: this.loading || false,
    };
  },
  setup(props) {
    const { size, noUrlParameters, getList } = props;
    const route = useRoute();
    const queryParams = ref({
      ...(noUrlParameters ? {} : route?.query),
    }); // form表单数据
    provide(/* 注入名 */ "queryParams", /* 值 */ queryParams);
    provide(/* 注入名 */ "size", /* 值 */ size);
    provide(/* 注入名 */ "getList", /* 值 */ getList);
    // const { formItem } = toRefs(props);
    // const { formItem } = props;
    // console.log(formItem);
    // const queryParams = {};
    // formItem.forEach((item) => {
    //   queryParams[item.prop] = "";
    // });
    return {
      queryParams,
    };
  },
  watch: {
    formData: {
      handler(val, oldVal) {
        if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
          this.queryParams = {
            ...(this.noUrlParameters ? {} : this.queryParams),
            ...val,
          };
        }
        // console.log(this.queryParams);
      },
      // watch 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。举例来说，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。
      // https://cn.vuejs.org/guide/essentials/watchers.html#deep-watchers
      immediate: true,
      // deep: true,
    },
    queryParams: {
      handler(val) {
        this.$emit("update:formData", val);
      },
      deep: true,
    },
    loading(val) {
      // console.log("loading", val);
      if (this.formLoading === val) {
        return;
      }
      this.formLoading = val;
    },
    formLoading(val) {
      // console.log("formLoading", val);
      if (this.loading === val) {
        return;
      }
      this.$emit("update:loading", val);
    },
  },
  provide() {
    return {
      // 显式提供一个计算属性
      [formLoadingKey]: {
        formLoading: computed(() => this.formLoading),
        updateFormLoading: (val) => {
          this.formLoading = val;
        },
      },
    };
  },
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      const params = { page: 1, limit: 10 };
      const searchParams = {
        ...this.$route?.query,
        ...this.queryParams,
        ...params,
      };
      if (!this.noUrlParameters) {
        this.$router.push({
          query: { ...searchParams },
        });
      }
      this.getList({
        ...searchParams,
      });
    },
    /** 重置按钮操作 */
    async resetQuery() {
      this.$refs.queryFormRef.resetFields();
      const params = { page: 1 };
      if (!this.noUrlParameters) {
        await this.$router.push({
          query: { ...params },
        });
      }
      this.queryParams = {
        ...(this.noUrlParameters ? {} : this.$route?.query),
      };
      this.afterReset();
      this.handleQuery();
    },
  },
});
</script>

<style scoped>
</style>
