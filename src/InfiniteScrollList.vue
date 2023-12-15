<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-12-05 15:09:03
 * @LastEditTime: 2023-12-15 09:45:41
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 公共的无限滚动列表
 * @FilePath: \GeneralBasicForm\src\InfiniteScrollList.vue
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
          <ExtraComponent :i="i"></ExtraComponent>
        </el-checkbox>
      </li>
    </ul>
  </el-checkbox-group>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import type { PropType, FunctionalComponent, VNode } from "vue";
type SearchFunction = (page: Number) => Promise<[]>;
type ExtraFunction = (item: any) => VNode | String;
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
  defaultSelection: {
    type: Array,
    required: false,
  },
});
const { search, id, name, extra } = props;
const list = ref<any[]>([]);
const page = ref(1);
const ifbottom = ref(false); //判断是否到底部，是的话就不再请求
const checkedList = ref<any[]>([]);
const loading = ref(false);
type ExtraComponentProps = {
  i: any;
};
type Events = {};
// 函数直接返回VNode模板会识别成[object Promise]，因此需要转换成函数式组件
const ExtraComponent: FunctionalComponent<ExtraComponentProps, Events> = (
  props,
  context
) => {
  const { i } = props;
  return extra(i);
};
watch(
  () => props.defaultSelection,
  (NewVal = [], oldVal = []) => {
    checkedList.value = NewVal.map((item) => {
      return typeof item === "object" ? item[id] : item;
    });
  },
  { immediate: true }
);
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
defineExpose({ reset, loadList, selectInfo, list, ifbottom });
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