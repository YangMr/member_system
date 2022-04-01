<template>
  <div class="member-wrapper">
    <!--会员列表-->
    <el-table
      :data="memberListData"
      border
      height="380"
      style="width: 100%;">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
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
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger" >删除</el-button>
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
  </div>
</template>

<script>
import MemberModel from "../../api/member"
const payType = [
  {
    type : 1,
    name : "现金"
  },
  {
    type : 2,
    name : "微信"
  },
  {
    type : 3,
    name : "支付宝"
  },
  {
    type : 4,
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
      searchMemberData : {},
      memberListData : []
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
      if(response.flag){
        const {rows,total} = response.data
        this.memberListData = rows
        this.total = total
        console.log(rows)
        console.log(total)
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
    }
  }
}
</script>

<style scoped>

</style>
