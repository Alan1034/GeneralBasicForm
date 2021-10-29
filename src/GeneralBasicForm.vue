<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2021-08-20 17:14:53
 * @LastEditTime: 2021-10-28 16:25:24
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
      <el-input
        v-if="item.type === 'input'"
        @keydown.enter="getList"
        v-model="queryParams[item.prop]"
        :size="size"
        v-bind="inputSetting"
        :placeholder="item.placeholder || inputSetting.placeholder"
        :maxlength="item.maxlength"
      >
        <template
          v-for="(templateEle, name) in item.template"
          :key="name"
          #[name]
        >
          <component
            v-if="templateEle"
            :is="currentInputComponent()"
            :templateEle="templateEle"
          />
        </template>
      </el-input>
      <el-select
        filterable
        v-else-if="item.type === 'select'"
        v-model="queryParams[item.prop]"
        :size="size"
        v-bind="selectSetting"
        :placeholder="item.placeholder || selectSetting.placeholder"
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
        v-bind="selectSetting"
        :options="item.options || []"
        :placeholder="item.placeholder || selectSetting.placeholder"
      ></el-cascader>
      <el-date-picker
        v-else-if="item.type === 'date-picker'"
        v-model="queryParams[item.prop]"
        :size="size"
        v-bind="datePackerSetting"
        :start-placeholder="
          item['start-placeholder'] || datePackerSetting['start-placeholder']
        "
        :end-placeholder="
          item['end-placeholder'] || datePackerSetting['end-placeholder']
        "
        :value-format="item['value-format']"
      ></el-date-picker>
      <el-input-number
        v-if="item.type === 'input-number'"
        v-model="queryParams[item.prop]"
        :size="size"
        v-bind="inputSetting"
        :min="item.min"
        :max="item.max"
        :controls-position="item['controls-position']"
      />
    </el-form-item>
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
    <slot></slot>
  </el-form>
</template>

<script>
export default {
  name: "GeneralBasicForm",
  components: {
    InputArchive: (props) => {
      const { templateEle } = props;
      return templateEle();
    },
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
    formItem: {
      // 定义表单的数据
      type: Array,
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
      default: {},
    },
  },
  data() {
    return {
      queryParams: {
        ...(this.noUrlParameters ? {} : this.$route?.query),
      }, // form表单数据
      selectSetting: {
        placeholder: "请选择",
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
      this.handleQuery();
    },
    currentInputComponent() {
      return "input-archive";
    },
  },
};
</script>

<style lang="scss" scoped>
:deep {
  .el-form-item {
    margin-bottom: 3px;
  }
}
</style>
