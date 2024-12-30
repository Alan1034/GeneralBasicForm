<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" v-bind="$attrs">
    <el-tab-pane v-for="item in tabPanes" :key="item.name" v-bind="item">
      {{ item.context && item.context() }}
    </el-tab-pane>
    <slot></slot>
  </el-tabs>
</template>
<script>
import { ObjectStoreInUrl } from "network-spanner"
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
    noUrlParameters: {
      // 不接受和不改变url的参数
      type: Boolean,
      default: () => false,
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
        if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
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
    handleClick(tab, event) {
      // console.log(tab, event);
      const searchParams = ObjectStoreInUrl.paramsToQuery(
        {
          ...this.$route?.query,
          [this.activeNameKey]: this.activeName,
        }
      );
      if (!this.noUrlParameters) {
        this.$router.push({
          query: { ...searchParams },
        });
      }
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
      if (!this.noUrlParameters && urlActiveName) {
        activeName = urlActiveName
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