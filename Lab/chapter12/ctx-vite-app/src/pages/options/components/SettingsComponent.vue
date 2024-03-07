<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    labelPosition="left"
    :size="formSize"
    status-icon
  >
    <el-form-item
      label="界面语言"
      prop="source_language"
    >
      <el-select
        v-model="form.source_language"
        placeholder="界面语言"
        clearable
      >
        <el-option
          label="英语"
          value="en-US"
        />
        <el-option
          label="中文"
          value="zh-CN"
        />
      </el-select>
    </el-form-item>


    <el-form-item
      label="目标语言"
      prop="target_language"
    >
      <el-select
        v-model="form.target_language"
        placeholder="目标语言"
        clearable
      >
        <el-option
          label="英语"
          value="en-US"
        />
        <el-option
          label="中文"
          value="zh-CN"
        />
      </el-select>
    </el-form-item>


    <el-form-item
      label="说话人性别"
      prop="gender"
    >
      <el-select
        v-model="form.gender"
        placeholder="说话人性别"
        clearable
      >
        <el-option
          label="女性"
          value="female"
        />
        <el-option
          label="男性"
          value="male"
        />
      </el-select>
    </el-form-item>

    <el-form-item
      label="说话人音色"
      prop="timbre"
    >
      <el-select
        v-model="form.timbre"
        placeholder="说话人音色"
        clearable
      >
        <el-option
          label="莉莎"
          value="lisa"
        />

      </el-select>
    </el-form-item>

    <el-form-item
      label="语速"
      prop="speed"
    >
      <el-select
        v-model="form.speed"
        placeholder="语速"
        clearable
      >
        <el-option
          label="1.0x"
          value="0.0%"
        />
        <el-option
          label="1.2x"
          value="0.2%"
        />

      </el-select>
    </el-form-item>


    <el-form-item
      label="音量"
      prop="volume"
    >
      <el-select
        v-model="form.volume"
        placeholder="音量"
        clearable
      >
        <el-option
          label="1.0x"
          value="0.0%"
        />

      </el-select>
    </el-form-item>


    <el-form-item>
      <el-button
        class="btn"
        type="primary"
        @click="onSubmit(ruleFormRef)"
      >
        保存
      </el-button>
      <el-button
        class="btn"
        type="primary"
        @click="onRest"
      >重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script
  lang="ts"
  setup
>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

interface RuleForm {
  source_language: string;
  target_language: string;
  timbre: string;
  gender: string;
  speed: string;
  volume: string;
}

const form = reactive<RuleForm>({
  source_language: '',
  target_language: '',
  timbre: '',
  gender: '',
  speed: '',
  volume: '',
})

const rules = reactive<FormRules<RuleForm>>({
  source_language: [
    { required: true, message: '请输入界面语言', trigger: 'blur' },
  ],
  target_language: [
    { required: true, message: '请输入目标语言', trigger: 'blur' },
  ],
  timbre: [
    { required: true, message: '请输入说话人音色', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请输入说话人性别', trigger: 'blur' },
  ],
  speed: [
    {
      required: true, message: '请输入语速', trigger: 'blur'
    },
  ],
  volume: [
    { required: true, message: '请输入音量', trigger: 'blur' },
  ],
})

const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      console.log(form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const onRest = () => {
  form.source_language = ''
  form.target_language = ''
  form.timbre = ''
  form.gender = ''
  form.speed = ''
  form.volume = ''
}


</script>
