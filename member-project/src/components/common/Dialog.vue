<template>
  <div>
    <el-dialog :title="dialogColumns.title" :visible.sync="dialogColumns.dialogFormVisible" :width="dialogColumns.width">
      <el-form ref="diaLogForm" :model="diaLogForm" :rules="dialogColumns.rules" style="width:400px" :label-width="dialogColumns.labelWidth">
        <template v-for="(item,index) in dialogColumns.formList">
          <el-form-item v-if="item.type == 'input' || item.type == 'textarea'" :label="item.label" :prop="item.prop">
            <el-input :type="item.type" v-model.trim="diaLogForm[item.prop]" autocomplete="off" :placeholder="item.placeholder"></el-input>
          </el-form-item>
          <el-form-item v-else-if="item.type == 'date'" :label="item.label" :prop="item.prop">
            <el-date-picker :value-format="item.valueFormat" v-model="diaLogForm[item.prop]" type="date" :placeholder="item.placeholder"></el-date-picker>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" v-if="dialogColumns.buttonGroup.type == 'action'" class="dialog-footer">
        <el-button v-for="(item,index) in dialogColumns.buttonGroup.list" :key="index" v-bind="item" @click="handleDialogAction(item.action)">{{item.text}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props : {
    dialogColumns : Object,
    diaLogForm : Object
  },
  data(){
    return {
    }
  },
  mounted() {

  },
  methods : {
    handleDialogAction(action){
      this.$emit("handleDialogAction",action)
    }
  }
}
</script>

<style scoped>

</style>
