<template>
  <div class="search-box">
    <el-input v-model="keyWord" @keydown.enter.native="search" :size="size" :style="{ ...inputstyle }" v-bind="attrs">
      <svg slot="prefix" class="el-input__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        viewBox="0 0 16 16" fill="none">
        <path
          d="M9.51033 10.2186C8.69189 10.8814 7.64943 11.2784 6.51424 11.2784C3.88302 11.2784 1.75 9.14541 1.75 6.51421C1.75 3.88301 3.88302 1.75 6.51424 1.75C9.14545 1.75 11.2785 3.88301 11.2785 6.51421C11.2785 7.64942 10.8814 8.69189 10.2186 9.51034L13.75 13.0417L13.0417 13.75L9.51033 10.2186ZM10.2768 6.51421C10.2768 4.43623 8.59224 2.75168 6.51424 2.75168C4.43623 2.75168 2.75168 4.43623 2.75168 6.51421C2.75168 8.59219 4.43623 10.2767 6.51424 10.2767C8.59224 10.2767 10.2768 8.59219 10.2768 6.51421Z"
          fill="#959A9F" />
      </svg>
    </el-input>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    query: {
      type: Object,
      default: () => ({
        prefCode: sessionStorage.getItem('prefCode')
      })
    },
    // 搜索后跳转
    routePath: {
      type: String,
      default: () => ('/search/searchDetail')
    },
    inputstyle: {
      type: Object,
      default: () => ({
        width: '1280px'
      })
    },
    // 是否在新标签页中打开搜索结果
    openHref: {
      type: Boolean,
      default: () => false
    },
    size: {
      type: String,
      default: () => ('medium')
    }
  },
  data() {
    return {
      keyWord: this.$route?.query?.keyWord || '',
      attrs: {}
    }
  },
  watch: {
    $attrs: {
      handler(val) {
        this.attrs = {
          ...this.attrs,
          ...val
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    search() {
      const route = { path: this.routePath, query: { ...this.query, keyWord: this.keyWord, } }
      if (this.openHref) {
        const routeData = this.$router.resolve(route)
        window.open(routeData.href, '_blank');
      } else {
        this.$router.push(route)
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.search-box {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%) translateY(-50%);

  :deep(.el-input) {

    font-size: 16px;
    font-weight: 400;
    line-height: 24px;

    svg {
      width: 32px;
      height: 100%;
    }

    .el-input__prefix {
      left: 24px;
      font-size: 32px;

    }

    .el-input__suffix {
      right: 24px;
      font-size: 32px;
    }

    .el-input__icon {
      line-height: 60px;
    }

    .el-input__inner {
      padding: 14px 24px 14px 72px;
      height: 60px;
      border-radius: 37px;
      background: #FFF;
      /* 第一级/shadow-1-down */
      box-shadow: 0px 0px 8px 0px rgba(43, 46, 49, 0.02), 0px 6px 8px 0px rgba(43, 46, 49, 0.08);
      border-color: #FFF;
    }

    .el-input__inner::placeholder {
      color: #959A9F;
    }

    .el-input__inner:hover {
      border: 1px solid #00B5F2;
    }
  }
}
</style>