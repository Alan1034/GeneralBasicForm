<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-09 10:01:20
 * @LastEditTime: 2023-11-14 15:36:26
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 图形验证码组件
 * @FilePath: \GeneralBasicForm\src\components\VBasic\input-graphic-verification\index.vue
 * 
-->

<script setup lang="ts">
import Input from "../input/index.vue";
// import { ref, computed, PropType, toRefs } from "vue";
import type {
  BasicFormComponentsProps,
  InputGraphicVerification,
} from "../../../types/componentsProps";
const { item } = defineProps<{ item: any }>();
const { graphicUrl = "", getGraphic = () => {} }: InputGraphicVerification =
  item;
</script>

<template>
  <div class="input-graphic-verification">
    <Input :item="item" class="input" />
    <el-image
      class="graphic"
      @click="
        () => {
          if (getGraphic) {
            getGraphic();
          }
        }
      "
      loading="lazy"
      :src="graphicUrl"
      fit="fill"
    />
  </div>
</template>

<style lang="less" scoped>
.input-graphic-verification {
  display: flex;
  gap: 12px;
  width: 100%;
  .input {
    flex: auto;
  }
  .graphic {
    width: 109px;
    height: 43px;
    flex: none;
  }
}
</style>