<template>
  <div class="member-wrapper">
    <!--会员查询-->
    <el-form :inline="true" :model="searchMemberData" ref="searchMember" class="search-member-from">
      <el-form-item prop="cardNum">
        <el-input v-model.trim="searchMemberData.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model.trim="searchMemberData.name" placeholder="会员姓名"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMemberData.payType" placeholder="支付类型">
          <el-option :label="item.name" v-for="(item,index) in payType" :key="index" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker value-format="yyyy-MM-dd" v-model="searchMemberData.birthday" type="date" placeholder="出生日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchMember">查询</el-button>
        <el-button type="primary" @click="handleOpenAddDialog">新增</el-button>
        <el-button @click="handleSearchReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!--会员列表-->
    <el-table
      :data="memberListData"
      border
      height="380"
      style="width: 100%;">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日">
        <template slot-scope="scope">
          {{$Time.timeFormat(scope.row.birthday)}}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="110"></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
           {{scope.row.payType|filterPayType}}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleOpenEditDialog(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDeleteMember(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>


    <!--新增会员弹窗-->
    <el-dialog title="新增会员" :visible.sync="dialogAddFormVisible" width="500px">
      <el-form ref="addMemberForm" :model="addMemberForm" :rules="rules" style="width: 400px" label-width="120px">
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="addMemberForm.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="addMemberForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker value-format="yyyy-MM-dd" v-model="addMemberForm.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="addMemberForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="addMemberForm.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="addMemberForm.integral" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="addMemberForm.payType" placeholder="支付类型" style="width:120px;">
            <el-option v-for="(item,index) in payType" :key="index" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="addMemberForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addMemberForm')">取 消</el-button>
        <el-button type="primary" @click="handleSubmitMember">确 定</el-button>
      </div>
    </el-dialog>


    <!--编辑会员弹窗-->
    <el-dialog title="编辑会员" :visible.sync="dialogEditFormVisible" width="500px">
      <el-form ref="editMemberForm" :model="editMemberForm" :rules="rules" style="width: 400px" label-width="120px">
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="editMemberForm.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="editMemberForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker value-format="yyyy-MM-dd" v-model="editMemberForm.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="editMemberForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="editMemberForm.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="editMemberForm.integral" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="editMemberForm.payType" placeholder="支付类型" style="width:120px;">
            <el-option v-for="(item,index) in payType" :key="index" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="editMemberForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editMemberForm')">取 消</el-button>
        <el-button type="primary" @click="handleSubmitEditMember">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MemberModel from "../../api/member"
const payType = [
  {
    type : 0,
    name : "现金"
  },
  {
    type : 1,
    name : "微信"
  },
  {
    type : 2,
    name : "支付宝"
  },
  {
    type : 3,
    name : "银行卡"
  }
]
export default {
  name: "index",
  data(){
    return {
      page : 1,
      size : 10,
      total : 0,
      searchMemberData : {
        cardNum : "",
        name : "",
        payType : "",
        birthday : ""
      },
      memberListData : [],
      payType,
      dialogAddFormVisible : false,
      addMemberForm : {
        cardNum : "",
        name : "",
        birthday : "",
        phone : "",
        money : 0,
        integral : 0,
        payType : "",
        address : ""
      },
      dialogEditFormVisible : false,
      editMemberForm : {
        cardNum : "",
        name : "",
        birthday : "",
        phone : "",
        money : 0,
        integral : 0,
        payType : "",
        address : ""
      },
      rules : {
        cardNum : [
          {required : true, message : "卡号不能为空",trigger: "blur"},
          {min :5, max : 20, message: "长度在 5 到 20 个字符",trigger: "blur"}
        ],
        name : [
          {required : true, message : "姓名不能为空",trigger: "blur"},
          {min :2, max : 10, message: "长度在 2 到 10 个字符",trigger: "blur"}
        ],
        payType : [
          {required : true, message : "支付类型不能为空",trigger: "change"},
        ]
      }
    }
  },
  created() {
    this.initMemberList()
  },
  filters : {
    filterPayType(value){
      const obj = payType.find(item=>item.type == value)
      return obj.name
    }
  },
  methods : {
    /**
     * 获取会员列表数据
     * @returns {Promise<void>}
     */
    async initMemberList(){
      const response = await MemberModel.getMemberList(this.page,this.size, this.searchMemberData)
      console.log(response.msg)
      if(response.error_code == 0){
        const {count,rows} = response.msg
        this.memberListData = rows
        this.total = count
      }
    },
    /**
     * 点击页码切换会触发的方法
     * @param page
     */
    handleCurrentChange(page){
      this.page = page
      this.initMemberList()
    },
    /**
     * 点击条数切换会触发的方法
     * @param size
     */
    handleSizeChange(size){
      this.size = size
      this.initMemberList()
    },
    /**
     * 会员查询
     */
    handleSearchMember(){
      this.initMemberList()
    },
    /**
     * 会员查询表单重置
     */
    handleSearchReset(){
      this.$refs["searchMember"].resetFields()
    },
    /**
     * 会员删除功能
     * @param row
     */
    handleDeleteMember(row){
      const id = row.id
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const response = await MemberModel.deleteMember(id)
        if(response.error_code == 0){
          this.initMemberList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    /**
     * 打开新增会员弹窗
     */
    handleOpenAddDialog(){
      this.dialogAddFormVisible = true
    },
    /**
     * 新增会员功能
     */
    handleSubmitMember(){
      this.$refs["addMemberForm"].validate(async valid=>{
        if(!valid) return
        const response = await MemberModel.addMember(this.addMemberForm)
        if(response.error_code == 0){
          this.$message("新增成功")
          this.dialogAddFormVisible = false
          this.$refs["addMemberForm"].resetFields()
          this.initMemberList()
        }
      })
    },
    /**
     * 打开编辑弹窗
     * @param row
     * @returns {Promise<void>}
     */
    async handleOpenEditDialog(row){
      const memberId = row.id
      const response = await MemberModel.findMember(memberId)
      if(response.error_code == 0){

          const value= response.msg.payType
          const obj = payType.find(item=>item.type == value)

          this.editMemberForm = response.msg
          this.editMemberForm.payType = obj.name
      }
      this.dialogEditFormVisible = true
    },
    /**
     * 编辑会员功能
     */
    handleSubmitEditMember(){
      const memberId = this.editMemberForm.id
      this.$refs["editMemberForm"].validate(async valid =>{
        if(!valid) return
        const response = await MemberModel.editMember(memberId,this.editMemberForm)
        if(response.error_code == 0){
          this.$message("更新成功")
          this.dialogEditFormVisible = false
          this.$refs["editMemberForm"].resetFields()
          this.initMemberList()
        }
      })
    },
    /**
     * 表单重置方法
     * @param formName
     */
    resetForm(formName){
      this.$refs[formName].resetFields()
      if(formName === "addMemberForm"){
        this.dialogAddFormVisible = false
      }else{
        this.dialogEditFormVisible = true
      }

    }
  }
}
</script>

<style scoped>
.search-member-from{
  margin-top: 20px;
}
</style>
