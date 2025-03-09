<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-08-20 17:14:53
 * @LastEditTime: 2025-03-09 17:08:02
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicForm\src\GeneralBasicForm.vue
 * 
-->
/** 通用基本表单。用在表单页面搜索栏 */

<template>
  <el-form :model="queryParams" ref="queryFormRef" v-show="showSearch" inline label-position="left"
    :label-width="labelWidth" v-bind="$attrs">
    <el-form-item v-for="item in formItem" :label="item.label" :prop="item.prop" :key="item.prop"
      :rules="getItemRules(item)">
      <Input v-if="/^input$/i.test(item.type)" :item="item" />
      <Radio v-if="/^radio$/i.test(item.type)" :item="item" />
      <Select v-if="/^select$/i.test(item.type)" :item="item" />
      <Divider v-if="/^divider$/i.test(item.type)" :item="item" />
      <Cascader v-if="/^cascader$/i.test(item.type)" :item="item" />
      <Checkbox v-if="/^checkbox$/i.test(item.type)" :item="item" />
      <DatePicker v-if="/^date-picker$/i.test(item.type)" :item="item" />
      <InputNumber v-if="/^input-number$/i.test(item.type)" :item="item" />
      <slot v-if="/^form-item-slot$/i.test(item.type)" :name="item.name"></slot>
      <InputMobileVerification v-if="/^input-mobile-verification$/i.test(item.type)" :item="item" />
      <InputGraphicVerification v-if="/^input-graphic-verification$/i.test(item.type)" :item="item" :key="item.key" />
    </el-form-item>
    <slot></slot>
    <el-form-item v-if="!formOnly">
      <el-button type="primary" :size="size" @click="handleQuery" v-loading="formLoading">查询</el-button>
      <el-button :size="size" @click="resetQuery">重置</el-button>
    </el-form-item>
    <slot name="behind-the-button" />
  </el-form>
</template>

<script lang="ts">
import { provide, ref, PropType, defineComponent, computed } from "vue";
import type { ItemType } from "./types/basicFrom";
// import { useRoute } from "vue-router";
import Input from "./components/VBasic/input/index.vue";
import InputNumber from "./components/VBasic/input-number/index.vue";
import InputGraphicVerification from "./components/CustomCom/input-graphic-verification/index.vue";
import InputMobileVerification from "./components/CustomCom/input-mobile-verification/index.vue";
import Divider from "./components/VBasic/divider/index.vue";
import Radio from "./components/VBasic/radio/index.vue";
import Checkbox from "./components/VBasic/checkbox/index.vue";
import DatePicker from "./components/VBasic/date-picker/index.vue";
import Select from "./components/VBasic/select/index.vue";
import Cascader from "./components/VBasic/cascader/index.vue";
import { formLoadingKey } from "./injectKey";
import { ObjectStoreInUrl, HandleParamsData } from "network-spanner"
import { Schemas, HandleTable } from "general-basic-indexdb"
const { getData } = HandleTable
const { formSchema } = Schemas
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
      default: () => { },
    },
    afterReset: {
      // 在重置按钮点击完后但还没重新请求时触发的的函数
      type: Function,
      default: () => { },
    },
    formItem: {
      // 定义表单的数据
      type: Array as unknown as PropType<ItemType[]>,
      default: () => [],
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
    parametersType: {
      type: String,
      default: "url",
    },
    DBPrimaryKey: {
      // indexDB的primaryKey，一般配合parametersType==="indexDB"使用
      type: [String, Number],
      required: false,
    },
    formData: {
      // 外部传入的表单数据，用于回填
      type: Object,
      default: () => { },
    },
    noInputBlank: {
      // 用于判断input框是否校验仅空格
      type: Boolean,
      default: () => false,
    },
    currentPageKey: {
      type: String,
      default: "page",
    },
    pageSizeKey: {
      type: String,
      default: "limit",
    },
    defCurrentPage: {
      type: Number,
      default: 1,
    },
    defPageSize: {
      type: Number,
      default: 10,
    },
    queryWhenReady: {
      // 初始化完成后自动触发查找数据函数
      type: Boolean,
      default: () => false,
    }
  },
  data() {
    return {
      formLoading: this.loading || false,
      trimRegex: /\S/,
      queryParams: this.initQueryParams(), // form表单数据
    };
  },
  setup(props) {
    const { size, getList } = props;
    provide(/* 注入名 */ "size", /* 值 */ size);
    provide(/* 注入名 */ "getList", /* 值 */ getList);
  },
  watch: {
    formData: {
      handler(val, oldVal) {
        if (JSON.stringify(val) !== JSON.stringify(this.queryParams)) {
          this.queryParams = {
            ...this.queryParams,
            ...val,
          };
        }
        // console.log(this.queryParams);
      },
      // watch 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。举例来说，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。
      // https://cn.vuejs.org/guide/essentials/watchers.html#deep-watchers
      immediate: true,
      deep: true,
    },
    queryParams: {
      handler(val) {
        this.$emit("update:formData", { ...val });
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
      queryParams: this.queryParams,
    };
  },
  methods: {
    /** 搜索按钮操作 */
    async handleQuery(queryParameter = <any>{}) {
      queryParameter.defaultPageFirst ??= true
      const params = { [this.currentPageKey]: this.defCurrentPage };
      let searchParams = {
        ...params,
        ...this.queryParams,
      }
      searchParams = await HandleParamsData.makeParamsByType(searchParams, this)
      if (queryParameter.defaultPageFirst) {
        searchParams = {
          ...searchParams,
          ...params,
        }
      }
      await HandleParamsData.saveParamsByType(searchParams, this)
      this.getList({
        ...searchParams,
      });
    },
    /** 重置按钮操作 */
    async resetQuery() {
      this.$refs.queryFormRef.resetFields();
      const DBParams = await HandleParamsData.makeParamsByType({}, this)
      const params = { [this.currentPageKey]: this.defCurrentPage, [this.pageSizeKey]: DBParams?.[this.pageSizeKey] || this.defPageSize };
      await HandleParamsData.saveParamsByType(params, this)
      this.queryParams = { ...params };
      this.afterReset();
      this.handleQuery();
    },
    async initQueryParams() {
      let queryParams = {
        [this.pageSizeKey]: this.defPageSize
      }
      if (this.parametersType === "url") {
        queryParams = { ...queryParams, ...ObjectStoreInUrl.queryToData(this.$route?.query) }
      }
      if (this.parametersType === "indexDB") {
        const DBParams = await getData(
          {
            tableName: "formParams",
            propertiesKey: this.$route.path || "defQueryParams",
            primaryKey: this.DBPrimaryKey || "default",
            mapDB: formSchema
          }, (DBParams) => {
            if (DBParams) {
              this.queryParams = { ...queryParams, ...DBParams }
            }
            if (this.queryWhenReady) {
              this.$nextTick(() => {
                this.handleQuery({ defaultPageFirst: false })
              })
            }
          }
        )
        this.queryParams = { ...queryParams, ...DBParams }
      }
      if (this.queryWhenReady && this.parametersType !== "indexDB") {
        // console.log({ ...this.queryParams }, "queryParams")
        this.$nextTick(() => {
          // console.log({ ...this.queryParams }, "queryParams112")
          this.handleQuery({ defaultPageFirst: false })
        })
      }
      return queryParams
    },
    getItemRules(item: any) {
      const { type, rules = [] } = item;
      const newRules = [...rules];
      if (this.noInputBlank && type === "input") {
        newRules.push({
          pattern: this.trimRegex,
          message: "请输入（不能仅输入空格）",
          trigger: "blur",
        });
        return newRules;
      }

      return newRules;
    },
  },
});
</script>

<style scoped></style>
