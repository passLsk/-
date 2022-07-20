<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <div>
            <el-input
              placeholder="请输入内容"
              v-model.number="find"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchFn"
              ></el-button>
            </el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          <el-button type="primary" @click="dialogFormVisible = true"
            >添加用户</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-dialog title="添加用户对话框" :visible.sync="dialogFormVisible">
      <!-- 添加用户 -->
      <el-form :model="addUserForm" :rules="rules">
        <el-form-item
          label="用户名"
          prop="Myusername"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addUserForm.Myusername"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="mobile"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
  },
  created () { },
  data () {
    const addUserFormMyusername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'))
      } else {
        if (value.trim().length < 2 || value.trim().length > 7) {
          callback(new Error('用户名长度为2-7位'))
        }
        callback()
      }
    }
    const addUserFormPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        if (value.trim().length < 2 || value.trim().length > 7) {
          callback(new Error('密码长度为2-7位'))
        }
        callback()
      }
    }
    const addUserFormEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('邮箱不能为空'))
      } else {
        const regex = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        if (!(regex.test(value))) {
          callback(new Error('邮箱格式不正确'))
        }
        callback()
      }
    }
    const addUserFormMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else {
        const regex = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
        if (!(regex.test(value))) {
          callback(new Error('手机号格式不正确'))
        }
        callback()
      }
    }
    return {
      find: '',
      dialogFormVisible: false,
      addUserForm: {
        Myusername: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        Myusername: [{ validator: addUserFormMyusername, trigger: 'blur' }],
        password: [{ validator: addUserFormPassword, trigger: 'blur' }],
        email: [{ validator: addUserFormEmail, trigger: 'blur' }],
        mobile: [{ validator: addUserFormMobile, trigger: 'blur' }]
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    searchFn () {
    }
    // async onClick () { // 添加用户接口
    //   this.dialogFormVisible = false
    //   try {
    //     const res = await addUserApi({
    //       username: this.addUserForm.Myusername,
    //       password: this.addUserForm.password,
    //       email: this.addUserForm.email,
    //       mobile: this.addUserForm.mobile
    //     })
    //     if (res.data.meta.status === 400) {
    //       this.$message.error('用户名已经存在，添加用户失败')
    //       return
    //     }
    //     this.$message.success('添加用户成功')
    //     this.getUserListApi()
    //     console.log(res)
    //   } catch (err) {
    //     this.$message.error('添加用户失败')
    //     console.log(err)
    //   }
    // }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
</style>
