<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-09 10:01:20
 * @LastEditTime: 2023-11-10 16:51:18
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 分割线
 * @FilePath: \deal-front-endd:\work\GeneralBasicForm\src\components\VBasic\divider\index.vue
 * 
-->

<template>
  <el-divider v-bind="dividerSetting">
    <template v-for="(templateEle, name) in item.template" #[name]>
      <component
        :key="name"
        v-if="templateEle"
        :is="currentInputComponent()"
        :templateEle="templateEle"
      />
    </template>
  </el-divider>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    slotArchive: (props) => {
      const { templateEle } = props;
      return templateEle();
    },
  },
  props: {
    item: null, // null就是any
  },
  setup() {},
  data() {
    return {
      dividerSetting: {
        ...this.item.dividerSetting,
      },
    };
  },
  methods: {
    currentInputComponent() {
      return "slot-archive";
    },
  },
});
</script>