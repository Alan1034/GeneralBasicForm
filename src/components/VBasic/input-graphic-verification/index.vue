<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-09 10:01:20
 * @LastEditTime: 2023-11-09 16:50:16
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 图形验证码组件
 * @FilePath: \GeneralBasicForm\src\components\VBasic\input-graphic-verification\index.vue
 * 
-->

<script setup lang="ts">
import Input from "../input/index.vue";
import { ref } from "vue";
import type { componentsProps } from "../../../types/componentsProps";
const { item } = defineProps<componentsProps>();

let url = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
);
</script>

<template>
  <div class="input-graphic-verification">
    <Input :item="item" class="input" />
    <el-image
      class="graphic"
      @click="
        () => {
          url =
            'https://img2.baidu.com/it/u=935733873,1141828557&fm=253&fmt=auto&app=120&f=JPEG?w=679&h=500';
        }
      "
      loading="lazy"
      :src="url"
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