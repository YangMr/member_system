<template>
  <div class="staff-wrapper">
    <QueryForm @handleReset="handleReset" @handleFormAction="handleFormAction" :formColumns="formColumns"></QueryForm>
    <base-table @handleAction="handleAction" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :pager="pager" :table-data="staffTableData" :columns="columns"></base-table>
    <Dialog ref="dialog" :dialog-columns="dialogColumns" :diaLogForm="diaLogForm" @handleDialogAction="handleDialogAction"></Dialog>
  </div>
</template>

<script>
import StaffModel from "../../api/staff"
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
      staffTableData : [],
      columns : [
        {
          label : "序号",
          type : "index",
          width : "80"
        },
        {
          label : "账号",
          prop : "username",
          width: "100"
        },
        {
          label : "姓名",
          prop : "name"
        },
        {
          label : "年龄",
          prop : "age"
        },
        {
          label : "电话",
          prop : "mobile"
        },
        {
          label : "薪酬",
          prop : "salary"
        },
        {
          label : "入职时间",
          prop : "entryDate"
        },
        {
          type : "action",
          label : "操作",
          width : "200",
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
          prop : "username",
          placeholder : "账号",
          type : "input"
        },
        {

          prop : "name",
          placeholder : "姓名",
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
      dialogColumns : {
        ref : "diaLogForm",
        title : "供应商新增",
        dialogFormVisible : false,
        width : "500px",
        rules : {
          username : [{required : true, message : "账号不能为空", trigger : "blur"}],
          name : [{required : true, message : "姓名不能为空", trigger : "blur"}]
        },
        labelWidth : "100px",
        formList : [
          {
            prop : "username",
            label : "账号",
            type : "input"
          },
          {
            prop : "name",
            label : "姓名",
            type : "input"
          },
          {
            prop : "age",
            label : "年龄",
            type : "input"
          },
          {
            prop : "mobile",
            label : "电话",
            type : "input"
          },
          {
            prop : "salary",
            label : "薪酬",
            type : "input"
          },
          {
            prop : "entryDate",
            label : "入职时间",
            type : "date"
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

      },
      diaLogForm : {},
    }
  },
  created() {
    this.initList()
  },
  methods :{
    /**
     * 获取员工列表
     * @returns {Promise<void>}
     */
    async initList(){
      const response = await StaffModel.getStaffList(this.pager.currentPage, this.pager.pageSize, this.searchModelForm)
      if(response.error_code === 0){
        const {count, rows} = response.msg
        this.staffTableData =rows
        console.log(this.staffTableData)
        this.pager.total = count
      }
    },
    handleAction({action,row}){
      if(action == "edit"){
        this.handleEditDialog(row.id)
      }else if(action == "delete"){
        this.handleDeleteSupplier(row.id)
      }
    },
    // 员工编辑的方法
    handleEditDialog(id){
      this.dialogColumns.dialogFormVisible = true
      this.dialogColumns.title = "员工编辑"
      this.handleFind(id)
    },
    // 删除供应商的方法
    handleDeleteSupplier(id){
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const response = await StaffModel.deleteSupplier(id)
        if(response.error_code == 0){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.pager.currentPage = 1
          this.initList()
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
      this.initList()
    },
    // 页码发生变化会触发的方法
    handleCurrentChange(page){
      this.pager.currentPage = page
      this.initList()
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
    // 查询
    handleSearchData(){
      this.pager.currentPage = 1
      this.initList()
    },
    // 新增
    handleOpenDialog(){
      this.dialogColumns.dialogFormVisible = true
      this.dialogColumns.title = "员工新增"
    },
    // 查询表单重置
    handleReset(){
      this.searchModelForm = {}
      this.initList()
    },
    /**
     * dialog弹窗提交数据方法
     */
    handleSubmitData(){
      this.$refs["dialog"].$refs["diaLogForm"].validate( async valid => {
        const id = this.diaLogForm.id
        if(!id){
          // 新增提交数据
          const response = await StaffModel.addStaff(this.diaLogForm)
          if(response.error_code == 0){
            this.handleDialogReset()
            this.initList()
          }
        }else{
          console.log("123")
          // 编辑提交数据
          const response = await StaffModel.editStaff(id,this.diaLogForm)
          if(response.error_code == 0){
            this.handleDialogReset()
            this.initList()
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
     * 获取单个员工的数据
     */
    async handleFind(id){
      const response = await StaffModel.findStaff(id)
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
.staff-wrapper{
  margin-top:20px;
}
</style>


<!--      <el-table-column prop="name" label="供应商名称" width="180"></el-table-column>-->
<!--      <el-table-column prop="linkman" label="联系人"></el-table-column>-->
<!--      <el-table-column prop="mobile" label="联系电话"></el-table-column>-->
<!--      <el-table-column prop="remark" label="备注"></el-table-column>-->
