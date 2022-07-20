<template>
  <div class="login-container">
    <div class="login-box">
      <el-form
        label-width="auto"
        :model="loginForm"
        :rules="rules"
        ref="loginFormReset"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-btn-item">
          <el-button type="primary" @click="loginFn">登录</el-button>
          <el-button type="info" @click="resetFn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api/user'
export default {
  name: 'Login',
  created () { },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 3, max: 8, message: '用户名长度3-8', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 3, max: 8, message: '密码长度3-8', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetFn () {
      // 表单重置方法 loginFormReset form表单的ref属性
      this.$refs.loginFormReset.resetFields()
    },
    async loginFn () {
      try {
        await this.$refs.loginFormReset.validate()
        try {
          const res = await loginApi(this.loginForm)
          console.log(this.$store)
          this.$store.commit('setUser', res.data.data)
          if (this.$store.state.user && this.$store.state.user.token) {
            this.$router.push({ name: 'home' })
            console.log('login and token', res)
          } else {
            this.$message.error('登录失败，请输入正确的账号密码')
            this.$refs.loginFormReset.resetFields()
          }
        } catch (err) {
          console.log(err)
        }
        console.log('登录检验通过')
      } catch (err) {
        this.$message.error('登录检验未通过')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #2a4b6a;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 450px;
    height: 200px;
    background-color: #fff;
    border-radius: 6px;
    padding: 25px 15px;
    box-sizing: border-box;
    .login-btn-item {
      text-align: right;
    }
  }
}
</style>
