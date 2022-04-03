<template>
  <div>
    <el-table
      :data="supplierTableData"
      border
      style="width: 100%">
      <template v-for="(item,index) in columns">
        <el-table-column v-if="item.type == 'index'" :type="item.type" :label="item.label" :width="item.width"></el-table-column>
        <el-table-column v-else-if="!item.type" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
        <el-table-column v-if="item.type == 'action'" :label="item.label">
          <template slot-scope="scope" >
            <template v-for="(item,index) in item.list">
              <el-button :size="item.size" :type="item.type" @click="handleAction(item.action,scope.row)">{{item.text}}</el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <el-pagination
      v-if="pager"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pager.currentPage"
      :page-sizes="pager.pageSizes"
      :page-size="pager.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pager.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  props : {
    supplierTableData : {
      type : Array,
      default : []
    },
    columns : {
      type : Array,
      default : []
    },
    pager : {
      type : Object
    }
  },
  methods : {
    handleAction(action,row){
      this.$emit("handleAction",{action,row})
    },
    handleSizeChange(size){
      this.$emit("handleSizeChange",size)
    },
    handleCurrentChange(page){
      this.$emit("handleCurrentChange",page)
    }
  }
}
</script>

<style scoped>

</style>
