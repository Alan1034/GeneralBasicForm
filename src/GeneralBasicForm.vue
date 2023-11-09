<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-08-20 17:14:53
 * @LastEditTime: 2023-11-09 16:58:47
 * @LastEditors: 陈德立*******419287484@qq.com
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
      <InputGraphicVerification
        v-if="item.type === 'input-graphic-verification'"
        :item="item"
      />
      <InputMobileVerification
        v-if="item.type === 'input-mobile-verification'"
        :item="item"
      />
      <el-select
        filterable
        v-else-if="item.type === 'select'"
        v-model="queryParams[item.prop]"
        :size="size"
        v-bind="item.selectSetting || selectSetting"
      >
        <el-option
          v-for="dict in item.option || []"
          :key="dict.value"
          :label="dict.desc"
          :value="dict.value"
        />
      </el-select>
      <el-cascader
        filterable
        v-else-if="item.type === 'cascader'"
        v-model="queryParams[item.prop]"
        :size="size"
        :options="item.options || []"
        v-bind="item.selectSetting || selectSetting"
      ></el-cascader>
      <el-date-picker
        v-else-if="item.type === 'date-picker'"
        v-model="queryParams[item.prop]"
        :size="size"
        v-bind="item.datePackerSetting || datePackerSetting"
      ></el-date-picker>
      <InputNumber v-if="item.type === 'input-number'" :item="item" />
    </el-form-item>
    <slot></slot>
    <el-form-item v-if="!formOnly">
      <el-button
        type="primary"
        icon="el-icon-search"
        :size="size"
        @click="handleQuery"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh" :size="size" @click="resetQuery"
        >重置</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { provide, ref, PropType, defineComponent } from "vue";
import type { itemType, formType } from "./types/basicFrom";
import { useRoute } from "vue-router";
import Input from "./components/VBasic/input";
import InputNumber from "./components/VBasic/input-number";
import InputGraphicVerification from "./components/VBasic/input-graphic-verification";
import InputMobileVerification from "./components/VBasic/input-mobile-verification";

export default defineComponent({
  name: "GeneralBasicForm",
  components: {
    Input,
    InputNumber,
    InputGraphicVerification,
    InputMobileVerification,
  },
  props: {
    showSearch: {
      // 是否展示所有元素
      type: Boolean,
      default: true,
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
      type: Array as unknown as PropType<itemType[]>,
      default: [],
    },
    size: {
      // 控制按钮大小
      type: String,
      default: "medium",
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
      selectSetting: {
        placeholder: "请选择",
        clearable: true,
        style: "width: 200px",
      },
      datePackerSetting: {
        style: "width: 227px",
        "start-placeholder": "开始日期",
        "end-placeholder": "结束日期",
        type: "daterange",
      },
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
    formData(val) {
      this.queryParams = {
        ...(this.noUrlParameters ? {} : this.queryParams),
        ...val,
      };
    },
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
