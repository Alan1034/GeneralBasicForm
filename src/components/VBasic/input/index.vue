<template>
  <el-input
    @keydown.enter="getList"
    v-model="queryParams[item.prop]"
    :size="size"
    v-bind="inputSetting"
  >
    <template v-for="(templateEle, name) in item.template" #[name]>
      <component
        :key="name"
        v-if="templateEle"
        :is="currentInputComponent()"
        :templateEle="templateEle"
      />
    </template>
  </el-input>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { inputDefaultSetting } from "../../setting";
export default defineComponent({
  components: {
    InputArchive: (props) => {
      const { templateEle } = props;
      return templateEle();
    },
  },
  props: {
    item: null, // null就是any
  },
  setup() {
    const queryParams = inject("queryParams", {});
    const getList = inject("getList");
    const size = inject("size");
    return { queryParams, getList, size };
  },
  data() {
    return {
      inputSetting: {
        ...inputDefaultSetting,
        ...this.item.inputSetting,
      },
    };
  },
  // created() {
  //   console.log("new", this.item);
  //   console.log("new", this.inputSetting);
  // },
  methods: {
    currentInputComponent() {
      return "input-archive";
    },
  },
  // watch: {
  //   item(val) {
  //     console.log("item", val);
  //   },
  //   size(val) {
  //     console.log(val);
  //   },
  // },
});
</script>

<style>
</style>