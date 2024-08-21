<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-12-08 17:45:01
 * @LastEditTime: 2024-08-21 10:08:57
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 对展示描述列表的封装
 * @FilePath: \GeneralBasicForm\src\Descriptions.vue
 * 
-->
<template>
  <el-descriptions :column="1" border class="form-width" v-bind="props">
    <el-descriptions-item v-for="(item, i) in props.formItem" :key="item.prop" :label="item.label"
      v-bind="item.descriptionsItemProps">
      <template slot-scope="scope">
          <DescriptionsColumn v-if="item.render" :column="item" :scope="scope" />
          <span v-else>{{ scope.row[item.prop] }}</span>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import DescriptionsColumn from "./components/VDescriptions/DescriptionsColumn";

export default {
  name: "Descriptions",
  components: {
    DescriptionsColumn
  }
}
</script>
<style lang="">

</style>