<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-12-05 15:09:03
 * @LastEditTime: 2025-02-18 20:11:43
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 公共的无限滚动列表
 * @FilePath: \GeneralBasicForm\src\InfiniteScrollList.vue
 * 
-->
<template>
  <el-checkbox-group v-model="checkedList" v-loading="loading" v-bind="$attrs" v-if="checkbox">
    <ul v-infinite-scroll="loadList" class="list" :infinite-scroll-disabled="ifbottom" :style="{ height }">
      <li v-for="i in list" :key="i[id]" class="list-item">
        <el-checkbox :label="i[id]" class="checkbox">{{ i[name] }}
          <TableColumn :renderFunction="extra" :item="i" v-if="extra"></TableColumn>
        </el-checkbox>
      </li>
    </ul>
  </el-checkbox-group>
  <ul v-infinite-scroll="loadList" class="list" :infinite-scroll-disabled="ifbottom" :style="{ height }" v-else
    v-bind="$attrs">
    <li v-for="i in list" :key="i[id]" class="list-item">
      <div class="checkbox">
        {{ i[name] }}
        <TableColumn :renderFunction="extra" :item="i" v-if="extra"></TableColumn>
      </div>
    </li>
  </ul>
</template>

<script>
import { TableColumn } from "network-spanner"
export default {
  name: "InfiniteScrollList",
  components: {
    TableColumn
  },
  props: {
    search: {
      type: Function,
      required: true,
    },
    checkbox: {
      type: Boolean,
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    extra: {
      type: null,
      required: false,
    },
    defaultSelection: {
      type: Array,
      required: false,
    },
    height: {
      type: String,
      required: false,
      default: "272px"
    },

  },
  data() {
    return {
      list: [],
      page: 1,
      ifbottom: false,//判断是否到底部，是的话就不再请求
      checkedList: [],
      loading: false
    }
  },
  computed: {
    selectInfo() {
      return this.list.filter((item) => this.checkedList.includes(item[this.id]))
    }
  },
  watch: {
    defaultSelection: {
      handler(NewVal = [], oldVal = []) {
        this.updateCheckedList(NewVal);
      },
      immediate: true,
    }
  },
  methods: {
    reset() {
      this.lowReset();
      this.checkedList = [];
    },
    updateCheckedList(newSelection) {

      this.checkedList = newSelection.map((item) => {
        return typeof item === "object" ? item[this.id] : item;
      });
    },
    lowReset() {
      this.page = 1;
      this.list = [];
      this.ifbottom = false;
    },
    async loadList() {
      if (this.loading) {
        return;
      }
      if (this.ifbottom) {
        return;
      }
      this.loading = true;
      const resList = await this.search(this.page);
      if (resList && resList.length > 0) {
        this.list = [...this.list, ...resList];
        this.page += 1;
      } else {
        this.ifbottom = true;
      }
      this.loading = false;
      return
    },
    async refreshList() {
      this.lowReset();
      await this.loadList();
      return
    }
  },
}

</script>

<style lang="less" scoped>
.list {
  overflow: auto;
  padding: 0;
  margin: 0;

  .checkbox {
    width: calc(100% - 32px);
    padding: 0 16px;
  }
}
</style>