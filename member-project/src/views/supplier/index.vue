<template>
  <div>供应商管理</div>
</template>

<script>
import MemberModel from "../../api/member"
export default {
  name: "index",
  async created() {
   const res = await MemberModel.getMemberList(1,10,{})
  }
}
</script>

<style scoped>

</style>
