<template>
  <div class="tree-box">
    <div class="left-box">
      <el-text class="v-tree-transfer-title" size="large">{{transferTitleLeft}}</el-text>
      <el-input placeholder="输入关键字进行过滤" v-model="sourceFilterText" v-if="filterable">
      </el-input>
      <!--  数据源 -->
      <el-tree :data="dataSource" ref="sourceTree" :filter-node-method="sourceFilterNode"
        v-bind="{ ...defaultTreeAttributes }">
      </el-tree>
    </div>

    <div class="mid-box">
      <el-button :icon="ArrowRightBold" circle @click="getSelectedData"></el-button>
      <el-button :icon="ArrowLeftBold" circle @click="removeSelectedData"></el-button>
    </div>
    <div class="right-box">
      <el-text class="v-tree-transfer-title" size="large">{{transferTitleRight}}</el-text>
      <el-input placeholder="输入关键字进行过滤" v-model="selectedFilterText" v-if="filterable">
      </el-input>
      <!--  已选 -->
      <el-tree :data="selectedList" ref="selectTree" :filter-node-method="sourceFilterNode"
        v-bind="{ ...defaultTreeAttributes }">
      </el-tree>

    </div>
  </div>
</template>
<script>
import { nextTick } from "vue";
import { ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'

export default {
  props: {
    treeAttributes: {
      type: Object,
      default: () => { },
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    checkedKeys: {
      type: Array,
      default: () => [],
    },
    transferTitleLeft: {
      type: String,
      default: "",
    },
    transferTitleRight: {
      type: String,
      default: "",
    },
  },
  watch: {
    sourceFilterText(val) {
      this.$refs.sourceTree.filter(val);
    },
    selectedFilterText(val) {
      this.$refs.selectTree.filter(val);
    },
    checkedKeys(val) {
      this.$refs["sourceTree"].setCheckedKeys(val)
      nextTick(() => {
        this.getSelectedData()
        this.$refs["selectTree"].setCheckedKeys(val)
      })

    }
  },
  data() {
    return {

      defaultTreeAttributes: {
        "default-expand-all": true,
        "show-checkbox": true,
        "node-key": "id",
        ...this.treeAttributes,
      },
      selectedList: [],
      sourceFilterText: "",
      selectedFilterText: "",
      ArrowRightBold,
      ArrowLeftBold,
    }
  },
  methods: {

    sourceFilterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getSelectedData() {
      let leafOnly = true
      let includeHalfChecked
      const data = this.$refs["sourceTree"].getCheckedNodes(leafOnly, includeHalfChecked)
      this.selectedList = data
    },
    removeSelectedData() {
      let leafOnly
      let includeHalfChecked
      const data = this.$refs["selectTree"].getCheckedNodes(leafOnly, includeHalfChecked)
      const dictionary = {}
      console.log(data, "data")
      const key = this.defaultTreeAttributes["nodeKey"] || this.defaultTreeAttributes["node-key"]
      data.forEach(element => {

        dictionary[element[key]] = element
      });
      console.log(dictionary, "dictionary")
      this.selectedList = this.selectedList.filter((item) => {
        console.log(item, "itemitem")
        return !dictionary[item[key]]
      })
      console.log(this.selectedList, "this.selectedList")
    }
  },
}

</script>
<style lang="scss" scoped>
.tree-box {
  display: flex;

  .left-box {
    width: 45%;
  }

  .mid-box {
    flex: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    .el-button {
      margin: 0px;
    }
  }

  .right-box {
    width: 45%;
  }
}
</style>