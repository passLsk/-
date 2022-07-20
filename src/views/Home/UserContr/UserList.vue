<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <div>
              <el-input
                placeholder="请输入内容"
                v-model.number="findUser"
                class="input-with-select"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="searchUserFn"
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
      <el-card class="box-card">
        <template>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="role_name" label="角色"></el-table-column>
            <el-table-column prop="mg_state" label="状态">
              <template v-slot="scope">
                <el-switch v-model="scope.row.mg_state"> </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope1">
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-edit"
                  @click="editFn(scope1)"
                ></el-button>
                <el-button
                  size="small"
                  type="danger"
                  icon="el-icon-delete"
                  class="middle-btn"
                  @click="delUserFn(scope1)"
                ></el-button>
                <el-button
                  size="small"
                  type="warning"
                  icon="el-icon-setting"
                  @click="setUserFn(scope1)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="page">
          <span class="demonstration"></span>
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </el-card>
    </el-card>
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
    <el-dialog title="编辑用户" :visible.sync="dialogFormEditVisible">
      <!-- 编辑用户 -->
      <el-form :model="editUserForm" :rules="rules">
        <el-form-item
          label="用户名称"
          prop="Myusername"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editUserForm.Myusername" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="mobile"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOnClick">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogDelUserVisible" width="30%">
      <span>此操作将永久删除该用户，是否继续</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickDelUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="分配角色"
      :visible.sync="dialogSetUserVisible"
      width="30%"
    >
      <h4>当前的用户：<span ref="setusername">admin</span></h4>
      <h4>当前的角色：<span ref="setrolename">超级管理员</span></h4>
      <h4>
        分配新角色：<el-select
          @change="rolesIdChange"
          v-model="value"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in rolesList"
            :key="index"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </h4>
      <!-- <el-form :model="rolesForm">
        <el-form-item label="分配新角色：">
          <el-select v-model="rolesForm.region" placeholder="请选择活动区域">
            <el-option
              v-for="(item, index) in rolesList"
              :key="index"
              :label="item.roleName"
              value="item.roleName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSetUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickSetUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// create_time: 1486720211
// email: null
// id: 500
// mg_state: true
// mobile: null
// role_name: "超级管理员"
// username: "admin"
import {
  getUserListApi, addUserApi, putUserStateApi, queryUserApi, editUserApi, delUserApi,
  getRolesApi, setRolesApi
} from '@/api/user'
export default {
  name: 'userlist',
  created () {
    this.getUserListApi()
    this.putUserStateApi()
  },
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
      findUser: '',
      tableData: [],
      query: '',
      currentPage4: 4,
      total: 0,
      pageSize: 5,
      currentPage: 1,
      dialogFormVisible: false,
      dialogFormEditVisible: false,
      addUserForm: {
        Myusername: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
        Myusername: '',
        email: '',
        mobile: ''
      },
      rules: {
        Myusername: [{ validator: addUserFormMyusername, trigger: 'blur' }],
        password: [{ validator: addUserFormPassword, trigger: 'blur' }],
        email: [{ validator: addUserFormEmail, trigger: 'blur' }],
        mobile: [{ validator: addUserFormMobile, trigger: 'blur' }]
      },
      formLabelWidth: '80px',
      scope1: {},
      dialogDelUserVisible: false,
      rolesList: [],
      dialogSetUserVisible: false,
      value: '',
      rid: ''
    }
  },
  methods: {
    async getUserListApi () {
      try {
        const res = await getUserListApi({ query: this.query, pagenum: this.currentPage, pagesize: this.pageSize })
        this.$store.getUserListApi = res
        this.tableData = res.data.data.users
        this.total = res.data.data.total
        console.log('用户列表', res, 'store', this.$store.getUserListApi)
      } catch (err) {
        console.log(err)
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      console.log('this.pageSize', this.pageSize)
      this.getUserListApi()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log('this.currentPage', this.currentPage)
      this.getUserListApi()
    },
    async onClick () { // 添加用户接口
      this.dialogFormVisible = false
      try {
        const res = await addUserApi({
          username: this.addUserForm.Myusername,
          password: this.addUserForm.password,
          email: this.addUserForm.email,
          mobile: this.addUserForm.mobile
        })
        if (res.data.meta.status === 400) {
          this.$message.error('用户名已经存在，添加用户失败')
          return
        }
        this.$message.success('添加用户成功')
        this.getUserListApi()
        console.log(res)
      } catch (err) {
        this.$message.error('添加用户失败')
        console.log(err)
      }
    },
    // 编辑用户
    editFn (scope1) {
      this.dialogFormEditVisible = true
      this.editUserForm.Myusername = scope1.row.username
      this.editUserForm.email = scope1.row.email
      this.editUserForm.mobile = scope1.row.mobile
      this.scope1 = scope1.row
    },
    async editOnClick () {
      this.dialogFormEditVisible = false
      try {
        const res = await editUserApi({ id: this.scope1.id, email: this.editUserForm.email, mobile: this.editUserForm.mobile })
        this.getUserListApi()
        this.$message.success('修改信息成功')
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 删除用户
    delUserFn (scope1) {
      this.dialogDelUserVisible = true
      this.scope1 = scope1.row
    },
    async onClickDelUser () {
      this.dialogDelUserVisible = false
      console.log(this.scope1.id)
      try {
        await delUserApi({ id: this.scope1.id })
        this.getUserListApi()
        if (this.scope1.id !== 500) { this.$message.success('成功删除该用户') } else (this.$message.error('admin账号不能删除'))
      } catch (err) {
        console.log(err)
      }
    },
    async putUserStateApi () { // 修改用户状态接口
      try {
        await putUserStateApi({ uId: 2199, type: true })
        this.getUserListApi()
      } catch (err) {
        console.log(err)
      }
    },
    async searchUserFn () { // 根据用户id查询用户信息
      try {
        const res = await queryUserApi(this.findUser)
        if (res.data.data) {
          this.tableData = [res.data.data]
          this.pageSize = 1
          this.currentPage = 1
          this.total = 1
          this.$message.success('查询成功，想看全部数据请刷新')
        } else {
          this.$message.error('没有此用户')
        }
        console.log('查询用户信息', res)
      } catch (err) {
        console.log(err)
      }
    },
    // 分配角色权限
    async setUserFn (scope1) {
      this.dialogSetUserVisible = true
      this.scope1 = scope1
      this.$nextTick(() => {
        this.$refs.setusername.innerHTML = scope1.row.username
        this.$refs.setrolename.innerHTML = scope1.row.role_name
      })
      try {
        const res = await getRolesApi()
        this.rolesList = res.data.data
        console.log('获取角色列表', res, this.rolesList)
      } catch (err) {
        console.log(err)
      }
    },
    async onClickSetUser () {
      this.dialogSetUserVisible = false
      console.log(this.scope1)
      try {
        const res = await setRolesApi({ id: this.scope1.row.id, rid: this.rid })
        this.getUserListApi()
        console.log('分配角色', res, this.scope1.row.id, this.rid)
      } catch (err) {
        console.log(err)
      }
    },
    rolesIdChange (val) {
      this.rid = val
      console.log(this.rid)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-card {
  margin: 15px 0;
}
/deep/.data-v-1315e3e8 {
  margin-top: 0;
}
.page {
  margin-top: 10px;
}
</style>
