<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-12-05 15:09:03
 * @LastEditTime: 2024-11-21 19:37:38
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 公共的无限滚动列表
 * @FilePath: \GeneralBasicForm\src\InfiniteScrollList.vue
 * 
-->
<template>
  <el-checkbox-group v-model="checkedList" v-loading="loading" v-bind="props" v-if="props.checkbox">
    <ul v-infinite-scroll="loadList" class="list" :infinite-scroll-disabled="ifbottom" :style="{ height }">
      <li v-for="i in list" :key="i[id]" class="list-item">
        <el-checkbox :value="i[id]" class="checkbox">{{ i[name] }}
          <ExtraComponent :i="i" v-if="props.extra"></ExtraComponent>
        </el-checkbox>
      </li>
    </ul>
  </el-checkbox-group>
  <ul v-infinite-scroll="loadList" class="list" :infinite-scroll-disabled="ifbottom" :style="{ height }" v-else
    v-bind="props">
    <li v-for="i in list" :key="i[id]" class="list-item">
      <div class="checkbox">
        {{ i[name] }}
        <ExtraComponent :i="i" v-if="props.extra"></ExtraComponent>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import type { PropType, FunctionalComponent, VNode } from "vue";
type SearchFunction = (page: Number) => Promise<[]>;
type ExtraFunction = "false" | ((item: any) => VNode | String);
const props = defineProps({
  search: {
    type: Function as PropType<SearchFunction>,
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
    type: null as PropType<ExtraFunction>,
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
});
const { search, id, name, extra, height } = props;
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
  // el-checkbox有固定高度，如果需要配置高度比较高，例如有换行的自定义extra，最好处理一下样式，例子：
  // :deep(.el-checkbox) {
  //   padding: 6px 16px !important;
  //   display: flex;
  //   align-items: baseline;
  //   height: auto;
  // }
  return extra && extra !== "false" ? extra(i) : "";
};
const updateCheckedList = (newSelection: any[]) => {
  checkedList.value = newSelection.map((item) => {
    return typeof item === "object" ? item[id] : item;
  });
};
watch(
  () => props.defaultSelection,
  (NewVal = [], oldVal = []) => {
    updateCheckedList(NewVal);
  },
  { immediate: true }
);
const reset = () => {
  lowReset();
  checkedList.value = [];
};
const lowReset = () => {
  page.value = 1;
  list.value = [];
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
const refreshList = () => {
  lowReset();
  loadList();
};
const selectInfo =
  computed(() =>
    list.value.filter((item) => checkedList.value.includes(item[id]))
  ) || {};
defineExpose({
  reset,
  lowReset,
  loadList,
  selectInfo,
  list,
  ifbottom,
  refreshList,
  loading,
});
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