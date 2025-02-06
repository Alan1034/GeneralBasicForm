<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-12-29 17:56:35
 * @LastEditTime: 2025-02-06 18:58:13
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicForm\src\GeneralBasicForm.vue
 * 
-->
<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-08-20 17:14:53
 * @LastEditTime: 2024-12-25 15:40:48
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicForm\src\GeneralBasicForm.vue
 * 
-->
/** 通用基本表单。用在表单页面搜索栏 */

<template>
  <el-form :model="queryParams" ref="queryFormRef" v-show="showSearch" :label-width="labelWidth" v-bind="attrs">
    <el-form-item v-for="item in formItem" :key="item.prop" :rules="getItemRules(item)" v-bind="item">
      <el-input v-if="item.type === 'input'" @keydown.enter.native="getList" v-model="queryParams[item.prop]"
        :size="size" v-bind="getInputSetting(item)" v-on="getInputEvents(item)">
        <template v-for="(templateEle, name) in item.template" #[name]>
          <component :key="name" v-if="templateEle" :is="currentInputComponent()" :templateEle="templateEle" />
        </template>
      </el-input>
      <el-input v-else-if="item.type === 'input-mobile-verification'" @keydown.enter.native="getList"
        v-model="queryParams[item.prop]" :size="size" v-bind="getInputSetting(item)" v-on="getInputEvents(item)">
        <template v-for="(templateEle, name) in item.template" #[name]>
          <component :key="name" v-if="templateEle" :is="currentInputComponent()" :templateEle="templateEle" />
        </template>
        <template slot="append"><verification-button :verificationSetting="item.verificationSetting"
            :getSmscode="item.getSmscode"></verification-button>
        </template>
      </el-input>
      <el-select filterable v-else-if="item.type === 'select'" v-model="queryParams[item.prop]" :size="size"
        v-bind="getSelectSetting(item)" v-on="getSelectEvents(item)">
        <el-option v-for="dict in item.option || []" :key="dict.key || dict.value" :label="dict.label"
          :value="dict.value" />
      </el-select>
      <el-cascader filterable v-else-if="item.type === 'cascader'" v-model="queryParams[item.prop]" :size="size"
        :options="item.options || []" v-bind="getSelectSetting(item)" v-on="getSelectEvents(item)"></el-cascader>
      <el-date-picker v-else-if="item.type === 'date-picker'" v-model="queryParams[item.prop]" :size="size"
        v-bind="getDatePackerSetting(item)" v-on="getDatePackerEvents(item)"></el-date-picker>
      <el-input-number v-if="item.type === 'input-number'" v-model="queryParams[item.prop]" :size="size"
        v-bind="getInputSetting(item)" v-on="getInputEvents(item)" />

      <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="queryParams[item.prop]" :size="size"
        v-bind="getCheckboxGroupSetting(item)" v-on="getCheckboxGroupEvents(item)">
        <el-checkbox v-for="dict in item.option || []" :key="dict.key || dict.value || dict.label"
          v-bind="dict"></el-checkbox>
      </el-checkbox-group>
      <slot v-if="/^form-item-slot$/i.test(item.type)" :name="item.name"></slot>
    </el-form-item>
    <slot></slot>
    <el-form-item v-if="!formOnly">
      <el-button type="primary" icon="el-icon-search" :size="size" @click="handleQuery"
        :loading="formLoading">查询</el-button>
      <el-button icon="el-icon-refresh" :size="size" @click="resetQuery">重置</el-button>
    </el-form-item>
    <slot name="behind-the-button" />
  </el-form>
</template>

<script>
import VerificationButton from "./components/VBasic/input-mobile-verification/verification-button.vue";
import { ObjectStoreInUrl, HandleParamsData } from "network-spanner"
import { Schemas, HandleTable } from "general-basic-indexdb"
const { getData } = HandleTable
const { formSchema } = Schemas
export default {
  name: "GeneralBasicForm",
  components: {
    InputArchive: (props) => {
      const { templateEle } = props;
      return templateEle();
    },
    VerificationButton,
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
      type: Array,
      default: () => [],
    },
    size: {
      // 控制按钮大小 vue2 medium / small / mini
      type: String,
      default: "",
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
    },

  },
  data() {
    return {
      queryParams: this.initQueryParams(), // form表单数据
      formLoading: this.loading || false,
      selectSetting: {
        placeholder: "请选择",
        filterable: true,
        clearable: true,
        style: "width: 200px",
      },
      inputSetting: {
        placeholder: "请输入",
        style: "width: 200px",
        clearable: true,
      },
      datePackerSetting: {
        style: "width: 227px",
        "start-placeholder": "开始日期",
        "end-placeholder": "结束日期",
        type: "daterange",
      },
      attrs: {
        inline: true,
        "label-position": "left"
      }
    };
  },
  // setup(props) {
  //设置默认值
  //   console.log(props);
  //   // const { formItem } = toRefs(props);
  //   const { formItem } = props;
  //   console.log(formItem);
  //   const queryParams = {};
  //   formItem.forEach((item) => {
  //     queryParams[item.prop] = "";
  //   });
  //   return {
  //     queryParams,
  //   };
  // },
  watch: {
    formData: {
      handler(val, oldVal) {
        if (JSON.stringify(val) !== JSON.stringify(this.queryParams)) {
          this.queryParams = {
            ...this.queryParams,
            ...val,
          };
        }

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
    $attrs: {
      handler(val) {
        this.attrs = {
          ...this.attrs,
          ...val
        }
      },
      immediate: true,
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
  methods: {
    /** 搜索按钮操作 */
    async handleQuery(queryParameter = {}) {
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
    initQueryParams() {
      let queryParams = {
        [this.pageSizeKey]: this.defPageSize
      }
      if (this.parametersType === "url") {
        queryParams = { ...queryParams, ...ObjectStoreInUrl.queryToData(this.$route?.query) }
      }
      if (this.parametersType === "indexDB") {
        getData(
          {
            tableName: "formParams",
            propertiesKey: this.$route.path || "defQueryParams",
            primaryKey: this.DBPrimaryKey || "default",
            mapDB: formSchema
          }, (DBParams) => {
            if (!DBParams) { return }
            this.queryParams = { ...queryParams, ...DBParams }
            if (this.queryWhenReady) {
              this.$nextTick(() => {
                this.handleQuery({ defaultPageFirst: false })
              })
            }
          }
        )

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
    currentInputComponent() {
      return "input-archive";
    },
    getItemRules(item) {
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
    getInputSetting(item) {
      const { inputSetting, setting } = item;
      return {
        ...this.inputSetting,
        ...inputSetting,
        ...setting,
      };
    },
    defaultFunction() {

    },
    getInputEvents(item) {
      return {
        blur: item['blur'] || this.defaultFunction,
        focus: item['focus'] || this.defaultFunction,
        change: item['change'] || this.defaultFunction,
        input: item['input'] || this.defaultFunction,
        clear: item['clear'] || this.defaultFunction,
      };
    },
    getSelectSetting(item) {
      const { selectSetting, setting } = item;
      return {
        ...this.selectSetting,
        ...selectSetting,
        ...setting,
      };
    },
    getSelectEvents(item) {
      return {
        change: item['change'] || this.defaultFunction,
        "visible-change": item['visible-change'] || this.defaultFunction,
        "remove-tag": item['remove-tag'] || this.defaultFunction,
        "expand-change": item['expand-change'] || this.defaultFunction,
        clear: item['clear'] || this.defaultFunction,
        blur: item['blur'] || this.defaultFunction,
        focus: item['focus'] || this.defaultFunction,
      };
    },
    getDatePackerSetting(item) {
      const { datePackerSetting, setting } = item;
      return {
        ...this.datePackerSetting,
        ...datePackerSetting,
        ...setting,
      };
    },
    getDatePackerEvents(item) {
      return {
        change: item['change'] || this.defaultFunction,
        blur: item['blur'] || this.defaultFunction,
        focus: item['focus'] || this.defaultFunction,
      };
    },
    getCheckboxGroupSetting(item) {
      const { checkboxGroupSetting, setting } = item;
      return {
        ...checkboxGroupSetting,
        ...setting,
      };
    },
    getCheckboxGroupEvents(item) {
      return {
        change: item['change'] || this.defaultFunction,
      };
    },
  },
};
</script>

<style scoped></style>
