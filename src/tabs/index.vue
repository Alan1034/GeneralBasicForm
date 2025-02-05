<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2025-01-07 09:43:47
 * @LastEditTime: 2025-01-27 15:21:39
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \GeneralBasicForm\src\tabs\index.vue
 * 
-->
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" v-bind="$attrs">
    <el-tab-pane v-for="item in tabPanes" :key="item.name" v-bind="item">
      {{ item.render && item.render(item) }}
    </el-tab-pane>
    <slot></slot>
  </el-tabs>
</template>
<script>
import { ObjectStoreInUrl, HandleParamsData } from "network-spanner"
import { Schemas, HandleTable } from "general-basic-indexdb"
const { getData } = HandleTable
const { formSchema } = Schemas

export default {
  name: "VTabs",
  data() {
    return {
      activeName: this.activeNameInit()
    };
  },
  props: {
    tabPanes: {
      // 定义标签页的数据
      type: Array,
      default: () => [],
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
    activeNameKey: {
      type: String,
      default: "activeName",
    },
    defActiveName: {
      type: String,
    },
    getList: {
      // 查找数据调用的函数
      type: Function,
      default: () => { },
    },
  },
  watch: {
    defActiveName: {
      handler(val, oldVal) {
        if (JSON.stringify(val) !== JSON.stringify(this.activeName)) {
          this.activeName = val;
        }
        // console.log(this.queryParams);
      },
      immediate: true,
    },
    activeName: {
      handler(val) {
        this.$emit(`update:${this.activeNameKey}`, val);
      },
    }
  },
  methods: {
    async handleClick(tab, event) {
      // console.log(tab, event);
      const searchParams = await HandleParamsData.makeParamsByType({
        [this.activeNameKey]: this.activeName,
      }, this)
      await HandleParamsData.saveParamsByType(searchParams, this)
      this.getList({
        ...searchParams,
      });
    },
    activeNameInit() {
      let activeName = ''
      if (this.tabPanes[0]?.name) {
        activeName = this.tabPanes[0]?.name
      }
      const urlActiveName = ObjectStoreInUrl.queryToData(Number(this.$route?.query[this.activeNameKey]))
      if (this.parametersType === "url" && urlActiveName) {
        activeName = urlActiveName
      }
      if (this.parametersType === "indexDB") {
        getData(
          {
            tableName: "formParams",
            propertiesKey: this.$route.path || "defQueryParams",
            primaryKey: this.DBPrimaryKey || "default",
            mapDB: formSchema
          }, (DBParams) => {
            if (!DBParams?.[this.activeNameKey]) { return }
            this.activeName = DBParams?.[this.activeNameKey]
          }
        )

      }
      if (this.defActiveName) {
        activeName = this.defActiveName
      }
      return `${activeName}`
    }
  },
}
</script>
<style scoped></style>