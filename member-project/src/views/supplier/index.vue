<template>
  <div class="supplier-wrapper">
    <QueryForm @handleReset="handleReset" @handleFormAction="handleFormAction" :formColumns="formColumns"></QueryForm>
    <base-table @handleAction="handleAction" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :pager="pager" :supplier-table-data="supplierTableData" :columns="columns"></base-table>
    <Dialog ref="dialog" :dialog-columns="dialogColumns" :diaLogForm="diaLogForm" @handleDialogAction="handleDialogAction"></Dialog>
  </div>
</template>

<script>
import SupplierModel from "../../api/supplier"
import BaseTable from "../../components/common/BaseTable"
import QueryForm from "../../components/common/QueryForm"
import Dialog from "../../components/common/Dialog"
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
      searchModelForm : {},
      dialogFormVisible : true,
      diaLogForm : {},
      // rules : {
      //   name : [{required : true, message : "供应商不能为空", trigger : "blur"}],
      //   linkman : [{required : true, message : "联系人不能为空", trigger : "blur"}]
      // },
      dialogColumns : {
        ref : "diaLogForm",
        title : "供应商新增",
        dialogFormVisible : false,
        width : "500px",
        rules : {
          name : [{required : true, message : "供应商不能为空", trigger : "blur"}],
          linkman : [{required : true, message : "联系人不能为空", trigger : "blur"}]
        },
        labelWidth : "100px",
        formList : [
          {
            prop : "name",
            label : "供应商名称",
            type : "input",
            placeholder : ""
          },
          {
            prop : "linkman",
            label : "联系人",
            type : "input",
            placeholder : ""
          },
          {
            prop : "mobile",
            label : "联系电话",
            type : "input",
            placeholder : ""
          },
          {
            prop : "remark",
            label : "备注",
            type : "textarea",
            placeholder : ""
          }
        ],
        buttonGroup : {
            type : "action",
            list : [
              {
                action : "cancel",
                text : "取消",
                type : "default",
              },
              {
                action : "confirm",
                text : "确定",
                type : "primary",
              }
            ]
          }

      }
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
    /**
     * 表格的按钮执行方法 edit 点击的是编辑按钮  delete 点击的是删除按钮
     * @param action
     * @param row
     */
    handleAction({action,row}){
      if(action == "edit"){
        this.handleEditDialog(row.id)
      }else if(action == "delete"){
        this.handleDeleteSupplier(row.id)
      }
    },
    // 编辑供应商的方法
    handleEditDialog(id){
      this.dialogColumns.dialogFormVisible = true
      this.dialogColumns.title = "供应商编辑"
      this.handleFindSupplier(id)
    },
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
        this.handleOpenDialog()
      }else if(action == "reset"){
        this.handleReset()
      }
    },
    /**
     * 表单查询方法
     */
    handleSearchData(){
      this.initSupplierList()
    },
    /**
     * 打开弹窗方法
     */
    handleOpenDialog(){
      this.dialogColumns.dialogFormVisible = true
      this.dialogColumns.title = "供应商新增"
    },
    /**
     * 查询表单的重置方法
     */
    handleReset(){
      this.searchModelForm = {}
      this.initSupplierList()
    },
    /**
     * dialog弹窗提交数据方法
     */
    handleSubmitData(){
      this.$refs["dialog"].$refs["diaLogForm"].validate( async valid => {
        const id = this.diaLogForm.id
        if(!id){
          // 新增提交数据
          const response = await SupplierModel.addSupplier(this.diaLogForm)
          if(response.error_code == 0){
            this.handleDialogReset()
            this.initSupplierList()
          }
        }else{
          // 编辑提交数据
          const response = await SupplierModel.editSupplier(id,this.diaLogForm)
          if(response.error_code == 0){
            this.handleDialogReset()
            this.initSupplierList()
          }
        }
      })
    },
    /**
     * 隐藏并重置dialog弹窗方法
     */
    handleDialogReset(){
      this.dialogColumns.dialogFormVisible = false
      this.$refs["dialog"].$refs["diaLogForm"].resetFields()
    },
    /**
     * 点击弹窗按钮告诉你点击的是哪一个的方法
     * @param action
     */
    handleDialogAction(action){
      if(action == 'confirm'){
         this.handleSubmitData()
      }else if(action == 'cancel'){
        this.handleDialogReset()
      }
    },
    /**
     * 获取当个供应商的数据
     */
    async handleFindSupplier(id){
      const response = await SupplierModel.findSupplier(id)
      if(response.error_code == "0"){
        this.diaLogForm = response.msg
      }
    }
  },
  components : {
    BaseTable,
    QueryForm,
    Dialog
  }
}
</script>

<style scoped>
.supplier-wrapper{
  margin-top:20px;
}
</style>
