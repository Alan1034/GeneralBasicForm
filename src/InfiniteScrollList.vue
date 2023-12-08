<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-12-05 15:09:03
 * @LastEditTime: 2023-12-05 17:09:42
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 公共的无限滚动列表
 * @FilePath: \deal-front-end\src\components\InfiniteScrollList.vue
 * 
-->
<template>
  <el-checkbox-group v-model="checkedList" v-loading="loading" v-bind="props">
    <ul
      v-infinite-scroll="loadList"
      class="list"
      :infinite-scroll-disabled="ifbottom"
    >
      <li v-for="i in list" :key="i[id]" class="list-item">
        <el-checkbox :label="i[id]" class="checkbox"
          >{{ i[name] }}
          {{ extra && extra(i) }}
        </el-checkbox>
      </li>
    </ul>
  </el-checkbox-group>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, computed, defineExpose } from "vue";
import type { PropType } from "vue";
type SearchFunction = (page: Number) => Promise<[]>;
type ExtraFunction = (item: any) => Node | String;
const props = defineProps({
  search: {
    type: Function as unknown as PropType<SearchFunction>,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  extra: {
    type: Function as unknown as PropType<ExtraFunction>,
    required: false,
  },
});
const { search, id, name, extra } = props;
const list = ref<any[]>([]);
const page = ref(1);
const ifbottom = ref(false); //判断是否到底部，是的话就不再请求
const checkedList = ref<any[]>([]);
const loading = ref(false);
const reset = () => {
  page.value = 1;
  list.value = [];
  checkedList.value = [];
  ifbottom.value = false;
};
const loadList = async () => {
  if (loading.value) {
    return;
  }
  if (ifbottom.value) {
    return;
  }
  loading.value = true;
  const resList = await search(page.value);
  if (resList && resList.length > 0) {
    list.value = [...list.value, ...resList];
    page.value += 1;
  } else {
    ifbottom.value = true;
  }
  loading.value = false;
};
const selectInfo =
  computed(() =>
    list.value.filter((item) => checkedList.value.includes(item[id]))
  ) || {};
defineExpose({ reset, loadList, selectInfo });
</script>

<style lang="less" scoped>
.list {
  height: 272px;
  overflow: auto;
  padding: 8px 0px;
  .checkbox {
    width: calc(100% - 32px);
    padding: 0 16px;
  }
}
</style>