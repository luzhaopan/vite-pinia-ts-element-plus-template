<template>
  <div>
    <el-button type="primary" size="small" @click="handleAdd({})"> add </el-button>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="state" label="State" width="120" />
      <el-table-column prop="city" label="City" width="120" />
      <el-table-column prop="address" label="Address" width="600" />
      <el-table-column prop="zip" label="Zip" width="120" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default="scope">
          <!-- <el-button link type="primary" size="small" @click="handleDetail"> Detail </el-button> -->
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
            Edit
          </el-button>
          <el-button link type="primary" size="small" @click="handleDel(scope.row)">
            delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="Edit" width="500" :before-close="handleClose">
      <el-form
        status-icon
        ref="ruleFormRef"
        label-width="auto"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        :size="formSize"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="State" prop="state">
          <el-input v-model="ruleForm.state" />
        </el-form-item>
        <el-form-item label="City" prop="city">
          <el-input v-model="ruleForm.city" />
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input v-model="ruleForm.address" />
        </el-form-item>
        <el-form-item label="Date" prop="date">
          <el-date-picker
            v-model="ruleForm.date"
            type="date"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            placeholder="Pick a day"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
      <!-- <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
        </div>
      </template> -->
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getTableData, editData, add, deleteData } from '@/api/home'

const tableData = ref([])
const loading = ref(false)
const dialogVisible = ref(false)

const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = ref({})
const isAdd = ref(false)

const rules = reactive({
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  date: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change'
    }
  ]
})

// const handleDetail = () => {
//   console.log('click')
// }

const handleAdd = (row) => {
  isAdd.value = true
  ruleForm.value = { ...row }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isAdd.value = false
  console.log('click', row)
  ruleForm.value = { ...row }
  dialogVisible.value = true
}

const handleDel = async (row) => {
  const res = await deleteData({ id: row._id })
  if (res.code === 200) {
    fetchTableData()
  }
}

const handleClose = () => {
  dialogVisible.value = false
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!', ruleForm.value)
      let res = {}
      if (isAdd.value) {
        res = await add(ruleForm.value)
      } else {
        res = await editData(ruleForm.value)
      }

      if (res.code === 200) {
        fetchTableData()
        dialogVisible.value = false
      } else {
        ElMessage.error(res.msg)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const fetchTableData = async () => {
  loading.value = true
  const res = await getTableData()
  tableData.value = res.data
  loading.value = false
}

onMounted(() => {
  fetchTableData()
})
</script>
