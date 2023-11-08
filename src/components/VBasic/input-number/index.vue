<script setup lang="ts">
import { inputDefaultSetting } from "../../setting";
import { ref } from "vue";
import type { componentsProps } from "../../../types/componentsProps";
const { item } = withDefaults(defineProps<componentsProps>(), {
  
});
const inputSetting = ref({
  ...inputDefaultSetting,
  ...item.inputSetting,
});
</script>

<template>
  <el-input-number
    v-if="item.type === 'input-number'"
    v-model="queryParams[item.prop]"
    :size="size"
    v-bind="inputSetting"
  />
</template>