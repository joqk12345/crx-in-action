<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    :size="formSize"
    labelPosition="left"
    status-icon
  >
    <el-form-item
      label="用户名"
      prop="username"
    >
      <el-input v-model="ruleForm.username" />
    </el-form-item>

    <el-form-item
      label="邮箱"
      prop="email"
    >
      <el-input v-model="ruleForm.email" />
    </el-form-item>

    <el-form-item
      label="电话"
      prop="phone"
    >
      <el-input v-model="ruleForm.phone" />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(ruleFormRef)"
      >修改</el-button>
    </el-form-item>

  </el-form>
</template>

<script
  lang="ts"
  setup
>
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  username: string,
  email: string,
  phone: string,
}
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive<RuleForm>({
  username: '',
  email: '',
  phone: '',
})

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应为3至10个字符', trigger: 'blur' },
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur',
    },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] },
  ]
});


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      console.log(ruleForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
