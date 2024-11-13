<template>
  <div class="tree-box">
    <div class="left-box">
      <el-input placeholder="输入关键字进行过滤" v-model="sourceFilterText" v-if="filterable">
      </el-input>
      <!--  数据源 -->
      <el-tree :data="dataSource" ref="sourceTree" :filter-node-method="sourceFilterNode" :nodeKey="nodeKey"
        v-bind="{ ...defaultTreeAttributes }">
      </el-tree>
    </div>
    <div class="mid-box">
      <el-button icon="el-icon-arrow-right" circle @click="getSelectedData"></el-button>
      <el-button icon="el-icon-arrow-left" circle @click="removeSelectedData"></el-button>
    </div>
    <div class="right-box">
      <el-input placeholder="输入关键字进行过滤" v-model="selectedFilterText" v-if="filterable">
      </el-input>
      <!--  已选 -->
      <el-tree :data="selectedList" ref="selectTree" :filter-node-method="sourceFilterNode" :nodeKey="nodeKey"
        v-bind="{ ...defaultTreeAttributes }">
      </el-tree>

    </div>
  </div>
</template>
<script>
import { nextTick } from "vue";
export default {
  props: {
    nodeKey: {
      type: String,
      default: "id",
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
      },
      selectedList: [],
      sourceFilterText: "",
      selectedFilterText: "",
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
      data.forEach(element => {
        dictionary[element[this.nodeKey]] = element
      });
      this.selectedList = this.selectedList.filter((item) => {
        return !dictionary[item[this.nodeKey]]
      })
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