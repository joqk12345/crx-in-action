<template>
  <el-form
    ref="ruleFormRef"
    :model="formData"
    :rules="rules"
    labelPosition="left"
    status-icon
  >
    <div class="P-login">
      <img
        src="./logo.png"
        class="logo"
      />
      <div class="ipt-con">
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            placeholder="用户名"
          />
        </el-form-item>
      </div>
      <div class="ipt-con">
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="formData.password"
            placeholder="密码"
            show-password
          />
        </el-form-item>
      </div>
      <div class="ipt-con-btn">
        <el-button
          style="width: 100%"
          @click="registerForm()"
        >注册</el-button>
        <el-button
          style="width: 100%"
          @click="submitForm(ruleFormRef)"
        >登录</el-button>
      </div>
    </div>

  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

// router钩子，返回路由器实例
//const router = useRouter()

const ruleFormRef = ref<FormInstance>()
interface RuleForm {
  username: string;
  password: string;
}
const formData = reactive<RuleForm>({
  username: '',
  password: '',
})
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应该在3-10个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码',trigger: 'blur' },
    { min: 3, max: 10, message: '长度应该在3-10个字符之间', trigger: 'blur' },
  ],
})
/*
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log('submit!')
      // console.log(formData)
      //登录校验
      let config: Config = {
        data: {
          username: formData.username,
          password: formData.password
        },
        success: (res: LoginResult) => {
          console.log(res)
          if (res?.code === 0) {
            console.log('res.data', res.data)
            setToken(res.data)
            // localStorage.setItem('userInfo', JSON.stringify(formData))
            router.push('/home')
          } else {
            alert(res.msg)
            removeToken()
            router.push('/login')
          }
        },
        fail: (res: LoginResult) => {
          console.log("登录失败", res)
          router.push('/login')
        }
      }
      apiReqs.signIn(config)
      router.push('/home')
    } else {
      console.log('error submit!', fields)
      router.push('/login')
    }
  })
}

const registerForm = async () => {
  console.log("register")
}
*/
</script>


<style scoped lang="stylus">
.P-login
    position: absolute
    width: 350px
    height: 280px
    background: #14C9C9
    .logo
        display: block
        margin: 10px auto 
        width: 96px
        height : 96px
    .ipt-con
        margin: 0 auto 20px
        width: 250px
        text-align: center
    .ipt-con-btn
        display: flex
        margin: 0 auto 20px
        width: 250px
        
</style>
