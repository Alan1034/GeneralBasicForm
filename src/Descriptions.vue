<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-12-08 17:45:01
 * @LastEditTime: 2024-10-21 17:12:26
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 对展示描述列表的封装
 * @FilePath: \GeneralBasicForm\src\Descriptions.vue
 * 
-->
<template>
  <el-descriptions v-bind="attrs">
    <el-descriptions-item v-for="(item, i) in formItem" :key="item.prop" :label="item.label"
      v-bind="item.descriptionsItemProps">
      <DescriptionsColumn v-if="item.render" :column="item" :formData="formData" />
      <span v-else>{{ formData[item.prop] }}</span>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import DescriptionsColumn from "./components/VDescriptions/DescriptionsColumn";

export default {
  name: "Descriptions",
  components: {
    DescriptionsColumn
  },
  data() {
    return {
      attrs: {
        border: true,
        class: "v-descriptions"
      }
    }
  },
  props: {
    formItem: {
      // 定义表单的数据
      type: Array,
      default: () => [],
    },
    formData: {
      // 外部传入的表单数据，用于回填
      type: Object,
      default: () => { },
    },

  },
  watch: {
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
  }
}
</script>
<style lang="">

</style>