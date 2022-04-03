<template>
  <div>
    <el-form :inline="true" ref="searchModelForm" :model="searchModelForm">
      <template v-for="(item,index) in formColumns">
        <el-form-item v-if="item.type == 'input'"  v-bind="item">
          <el-input v-model="searchModelForm[item.prop]" :placeholder="item.placeholder"></el-input>
        </el-form-item>

        <el-form-item v-else-if="item.type == 'select'" v-bind="item">
          <el-select v-model="searchModelForm[item.prop]" :placeholder="item.placeholder">
            <el-option v-for="(item,index) in item.options" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="item.type == 'action'">
          <el-button v-for="(item,index) in item.list" :key="index" :type="item.type" @click="handleFormAction(item.action)">{{item.text}}</el-button>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "QueryForm",
  props : {
    formColumns : {
      type : Array,
      default : []
    }
  },
  data(){
    return {
      searchModelForm : {}
    }
  },
  methods : {
    handleFormAction(action){
      if(action !== "reset"){
        this.$emit("handleFormAction",{action,searchModelForm : this.searchModelForm})
      }else if(action == "reset"){
        this.$refs["searchModelForm"].resetFields()
      }
    },
  }
}
</script>

<style scoped>

</style>
