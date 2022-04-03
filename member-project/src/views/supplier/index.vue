<template>
  <div class="supplier-wrapper">
    <QueryForm @handleReset="handleReset" @handleFormAction="handleFormAction" :formColumns="formColumns"></QueryForm>
    <base-table @handleAction="handleAction" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :pager="pager" :supplier-table-data="supplierTableData" :columns="columns"></base-table>
  </div>
</template>

<script>
import SupplierModel from "../../api/supplier"
import BaseTable from "../../components/common/BaseTable"
import QueryForm from "../../components/common/QueryForm"
export default {
  name: "index",
  data(){
    return {
      pager : {
        currentPage : 1,
        pageSize : 2,
        total : 0,
        pageSizes : [2,10,15,50],
      },
      supplierTableData : [],
      columns : [
        {
          label : "序号",
          type : "index",
          width : "180"
        },
        {
          label : "供应商名称",
          width : "180",
          prop : "name"
        },
        {
          label : "联系人",
          width : "180",
          prop : "linkman"
        },
        {
          label : "联系电话",
          width : "180",
          prop : "mobile"
        },
        {
          label : "备注",
          width : "180",
          prop : "remark"
        },
        {
          type : "action",
          label : "操作",
          width : "180",
          list : [
            {
              action : "edit",
              size : "mini",
              text : "编辑",
              type : "primary"
            },
            {
              action : "delete",
              size : "mini",
              text : "删除",
              type : "danger"
            }
          ]
        }
      ],
      formColumns : [
        {
          prop : "name",
          placeholder : "供应商名称",
          type : "input"
        },
        {

          prop : "linkman",
          placeholder : "联系人",
          type : "input"
        },
        {
          prop : "mobile",
          placeholder : "联系电话",
          type : "input"
        },
        {
          type: "action",
          list: [
            {
              action: "search",
              size: "mini",
              text: "查询",
              type: "primary"
            },
            {
              action: "add",
              size: "mini",
              text: "新增",
              type: "primary"
            },
            {
              action: "reset",
              size: "mini",
              text: "重置",
              type: "default"
            }
          ]
        }
      ],
      searchModelForm : {}
    }
  },
  created() {
    this.initSupplierList()
  },
  methods :{
    /**
     * 获取供应商列表
     * @returns {Promise<void>}
     */
    async initSupplierList(){
      const response = await SupplierModel.getSupplierList(this.pager.currentPage, this.pager.pageSize, this.searchModelForm)
      if(response.error_code === 0){
        const {count, rows} = response.msg
        this.supplierTableData =rows
        this.pager.total = count
      }
    },
    handleAction({action,row}){
      if(action == "edit"){
        this.handleEditSupplier(row.id)
      }else if(action == "delete"){
        this.handleDeleteSupplier(row.id)
      }
    },
    // 编辑供应商的方法
    handleEditSupplier(id){console.log("edit 1")},
    // 删除供应商的方法
    handleDeleteSupplier(id){
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const response = await SupplierModel.deleteSupplier(id)
        if(response.error_code == 0){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.pager.currentPage = 1
          this.initSupplierList()
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 条数发生改变触发的方法
    handleSizeChange(size){
      console.log(size)
      this.pager.pageSize = size
      this.initSupplierList()
    },
    // 页码发生变化会触发的方法
    handleCurrentChange(page){
      console.log(page)
      this.pager.currentPage = page
      this.initSupplierList()
    },
    // 搜索框查询按钮方法
    handleFormAction({action,searchModelForm}){
      if(action == "search"){
        this.searchModelForm = searchModelForm
        this.handleSearchData()
      }else if(action == "add"){
        this.handleAddData()
      }else if(action == "reset"){
        this.handleReset()
      }
    },
    // 查询
    handleSearchData(){
      this.initSupplierList()
    },
    // 新增
    handleAddData(){
      console.log("add")
    },
    // 重置
    handleReset(){
      this.searchModelForm = {}
      this.initSupplierList()
    }
  },
  components : {
    BaseTable,
    QueryForm
  }
}
</script>

<style scoped>
.supplier-wrapper{
  margin-top:20px;
}
</style>


<!--      <el-table-column prop="name" label="供应商名称" width="180"></el-table-column>-->
<!--      <el-table-column prop="linkman" label="联系人"></el-table-column>-->
<!--      <el-table-column prop="mobile" label="联系电话"></el-table-column>-->
<!--      <el-table-column prop="remark" label="备注"></el-table-column>-->
