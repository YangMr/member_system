<template>
  <div class="supplier-wrapper">
    <el-table
      :data="supplierTableData"
      border
      style="width: 100%">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="供应商名称" width="180"></el-table-column>
      <el-table-column prop="linkman" label="联系人"></el-table-column>
      <el-table-column prop="mobile" label="联系电话"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import SupplierModel from "../../api/supplier"
export default {
  name: "index",
  data(){
    return {
      currentPage : 1,
      pageSize : 5,
      total : 0,
      supplierTableData : [],
      searchSupplier : {
        name : "",
        linkman : "",
        mobile : ""
      }
    }
  },
  created() {
    this.initSupplierList()
  },
  methods :{
    async initSupplierList(){
      const response = await SupplierModel.getSupplierList(this.currentPage, this.pageSize, this.searchSupplier)
      console.log(response)
      if(response.error_code === 0){
        const {count, rows} = response.msg
        this.supplierTableData =rows
        this.total = count
      }
    }
  }
}
</script>

<style scoped>

</style>
