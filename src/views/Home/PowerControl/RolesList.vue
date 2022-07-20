<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
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
              >添加角色</el-button
            >
          </div>
        </el-col>
      </el-row>
      <el-card class="box-card">
        <el-table
          :data="rolesList"
          style="width: 100%; margin-bottom: 20px"
          border
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column type="expand" prop="id" label="更多" width="50">
            <!-- <template v-slot="scope">
              <div class="col-8-16">
                <el-col class="el-col-f" :span="8">
                  <el-row
                    class="row-f"
                    v-for="(item, index) in scope.row.children"
                    :key="index"
                  >
                    <el-tag>
                      {{ item.authName }}
                      <i class="el-icon-caret-right"></i>
                    </el-tag>
                  </el-row>
                </el-col>
                <el-col class="el-col-f2" :span="16">
                  <el-row class="el-row-aset" v-for="item in scope.row.children.children"
                          :key="item.id">
                    <el-col :span="9">
                        <el-tag
                          type="success"

                        >
                          {{ item.authName }}
                          <i class="el-icon-caret-right"></i>
                        </el-tag>
                    </el-col>
                    <el-col :span="15"
                      ><el-tag
                          type="success"
                          v-for="item in scope.row.children"
                          :key="item.id"
                        >
                          {{ item.authName }}
                          <i class="el-icon-caret-right"></i>
                        </el-tag>
                    </el-col>
                  </el-row>
                  <el-row class="el-row-aset" v-for="item in scope.row.children.children"
                          :key="item.id">
                    <el-col :span="9"
                      ><el-tag
                          type="success"
                        >
                          {{ item.authName }}
                          <i class="el-icon-caret-right"></i>
                        </el-tag></el-col>
                    <el-col :span="15"
                      ><el-tag
                          type="success"
                          v-for="item in scope.row.children"
                          :key="item.id"
                        >
                          {{ item.authName }}
                          <i class="el-icon-caret-right"></i>
                        </el-tag>
                    </el-col>
                  </el-row>
                  <el-row class="el-row-aset">
                    <el-col :span="9"
                      ><el-tag
                          type="success"
                          v-for="item in scope.row.children"
                          :key="item.id"
                        >
                          {{ item.authName }}
                          <i class="el-icon-caret-right"></i>
                        </el-tag></el-col>
                    <el-col :span="15"
                      ><el-tag
                          type="success"
                          v-for="item in scope.row.children"
                          :key="item.id"
                        >
                          {{ item.authName }}
                          <i class="el-icon-caret-right"></i>
                        </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </div>
            </template> -->
            <template v-slot="scope">
              <div
                class="scope"
                v-for="(item1, index) in scope.row.children"
                :key="index"
              >
                <el-col :span="8">
                  <el-row class="el-row-1">
                    <el-tag
                      >{{ item1.authName }} <i class="el-icon-caret-right"></i
                    ></el-tag>
                  </el-row>
                </el-col>
                <el-col :span="16">
                  <el-row
                    class="el-row-2"
                    v-for="(item2, index) in item1.children"
                    :key="index"
                  >
                    <el-col :span="5">
                      <el-tag type="success"
                        >{{ item2.authName }} <i class="el-icon-caret-right"></i
                      ></el-tag>
                    </el-col>
                    <el-col :span="19" ref="delTag">
                      <el-row>
                        <el-tag
                          v-for="item3 in item2.children"
                          :key="item3.id"
                          closable
                          :disable-transitions="false"
                          @close="
                            delTagFn(item3, scope, item3.id, item2.children)
                          "
                          :ref="'del' + index"
                          >{{ item3.authName }}</el-tag
                        >
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称"></el-table-column>
          <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope1">
              <el-button
                size="small"
                type="primary"
                icon="el-icon-edit"
                @click="editFn(scope1)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                class="middle-btn"
                @click="delUserFn(scope1)"
                >删除</el-button
              >
              <el-button
                size="small"
                type="warning"
                icon="el-icon-setting"
                @click="setCheckedNodes(scope1)"
                >分配权限</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
    <!-- 添加角色 -->
    <el-dialog title="添加角色对话框" :visible.sync="dialogFormVisible">
      <!-- 添加用户 -->
      <el-form :model="addUserForm" :rules="rules">
        <el-form-item
          label="角色名"
          prop="Myusername"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addUserForm.Myusername"></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClick">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="dialogFormEditVisible">
      <!-- 编辑角色 -->
      <el-form :model="editUserForm" :rules="rules">
        <el-form-item
          label="用户名称"
          prop="Myusername"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editUserForm.Myusername"></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editUserForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOnClick">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogDelUserVisible" width="30%">
      <!-- 删除角色 -->
      <span>此操作将永久删除该用户，是否继续</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickDelUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色权限 -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogSetRoleVisible"
      width="30%"
    >
      <el-tree
        :data="rightList1"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :default-checked-keys="rids"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSetRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleControl">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { getMenusApi, getRolesApi, getRightListApi } from '@/api/user'
import { addRoleApi, findRoleApi, editRoleApi, delRoleApi, setRoleApi, delRoleControl } from '@/api/role'
import _ from 'lodash'
export default {
  name: 'roleslist',
  created () {
    this.getMenusApi()
    this.getRolesApi()
    this.getRightListApi()
  },
  data () {
    return {
      findUser: '',
      tableData: [{
        more: 1,
        order: 1,
        roleName: 'yasuo',
        roleDescribe: 'hello'
      }],
      scope1: {},
      rightList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rightList1: [],
      rolesList: [],
      goodsList: [],
      pagenum: 1,
      pagesize: 8,
      dialogFormVisible: false,
      dialogFormEditVisible: false,
      dialogDelUserVisible: false,
      dialogSetRoleVisible: false,
      addUserForm: {
        Myusername: '',
        password: ''
      },
      editUserForm: {
        Myusername: '',
        password: ''
      },
      rules: {
        Myusername: [{ required: true, message: '角色名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
      },
      formLabelWidth: '80px',
      scope: {},
      rids: [],
      isShow: false
    }
  },
  methods: {
    async onClick () { // 添加角色接口
      this.dialogFormVisible = false
      try {
        const res = await addRoleApi({
          roleName: this.addUserForm.Myusername,
          roleDesc: this.addUserForm.password
        })
        console.log('添加角色', res)
        if (res.data.meta.status === 201) {
          this.$message.success('添加角色成功')
          this.getRolesApi()
        } else {
          this.$message.error('添加角色失败')
        }
      } catch (err) {
        this.$message.error('添加用户失败')
        console.log(err)
      }
    },
    addRoleFn () {
      this.dialogFormVisible = true
    },
    async searchUserFn () { // 根据角色id查询角色信息
      try {
        const res = await findRoleApi(this.findUser)
        if (res.data.meta.status === 200) {
          // this.rolesList = [res.data.data]
          this.rolesList = this.rolesList.filter(item => item.id === this.findUser)
          this.$message.success('查询成功，想看全部数据请刷新')
        } else {
          this.$message.error('没有此用户')
        }
        console.log('查询角色信息', res, 'this.rolesList', this.rolesList)
      } catch (err) {
        console.log(err)
      }
    },
    // 编辑
    editFn (scope1) {
      this.scope = scope1
      this.dialogFormEditVisible = true
    },
    // 编辑请求数据
    async editOnClick () {
      this.dialogFormEditVisible = false
      try {
        const res = await editRoleApi({ id: this.scope.row.id, roleName: this.editUserForm.Myusername, roleDesc: this.editUserForm.password })
        if (res.data.meta.status === 200) {
          this.$message.success('编辑用户信息成功')
        } else {
          this.$message.error('编辑用户失败')
        }
        this.getRolesApi()
        console.log('edit角色', res)
      } catch (err) {
        console.log(err)
      }
    },
    // 删除
    delUserFn (scope1) {
      this.scope = scope1
      this.dialogDelUserVisible = true
    },
    async onClickDelUser () {
      this.dialogDelUserVisible = false
      try {
        const res = await delRoleApi(this.scope.row.id)
        await this.getRolesApi()
        if (res.data.meta.status === 200) {
          this.$message.success('删除角色成功')
        } else {
          this.$message.error('删除角色失败')
        }
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    getCheckedKeys () {
      console.log('getCheckedKeys', this.$refs.tree.getCheckedKeys(), this.$refs.tree.getHalfCheckedNodes())
    },
    resetChecked () {
      this.$refs.tree.setCheckedKeys([])
    },
    // 分配权限
    // this.getRolesApi()
    setCheckedNodes (scope1) {
      this.scope = scope1
      this.dialogSetRoleVisible = true
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
        this.rids = []
        console.log('scope1', scope1, 'this.rolesList', this.rolesList)
        // scope1 用这个foreach
        scope1.row.children.forEach(item => {
          this.rids.push(item.id)
          item.children.forEach(item1 => {
            this.rids.push(item1.id)
            item1.children.forEach(item2 => {
              this.rids.push(item2.id)
            })
          })
        })
        console.log('roleId', scope1.row.id, 'rid', this.rids)
      })
    },
    // 分配权限
    async setRoleControl () {
      this.getCheckedKeys()
      const halfkey = []
      await this.$refs.tree.getHalfCheckedNodes().forEach(item => {
        halfkey.push(item.id)
      })
      this.rids = await this.$refs.tree.getCheckedKeys()
      await this.rids.push(...halfkey)
      this.dialogSetRoleVisible = false
      try {
        const res = await setRoleApi({ roleId: this.scope.row.id, rids: this.rids.toString() })
        if (res.data.meta.status === 200) {
          this.$message.success('权限分配成功')
        } else {
          this.$message.error('权限分配失败')
          return
        }
        this.getRolesApi()
        console.log('分配角色权限', res, this.scope.row.id)
      } catch (err) {
        console.log(err)
      }
    },
    // 删除权限
    async delTagFn (obj, scope, index, arr) {
      console.log('obj', obj, 'scope', scope, 'index', index, 'arr', arr)
      try {
        const res = await delRoleControl({ roleId: scope.row.id, rightId: obj.id })
        if (res.data.meta.status === 200) {
          this.$message.success('删除角色权限成功')
          const ind = arr.findIndex(item => item.id === index)
          arr.splice(ind, 1)
        } else {
          this.$message.error('删除角色权限失败')
        }
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // getCheckedKeys (leafOnly) {
    //   console.log('key,data', leafOnly)
    // },
    // check (data, obj) {
    //   console.log('arr', obj.checkedKeys)
    // },
    //  左侧菜单权限
    async getMenusApi () {
      try {
        const res = await getMenusApi()
        console.log('menus', res)
      } catch (err) {
        console.log(err)
      }
    },
    // 角色列表
    async getRolesApi () {
      try {
        const res = await getRolesApi()
        this.rolesList = res.data.data
        // const rids = []
        // this.rolesList.forEach(item => {
        //   item.children.forEach(item1 => {
        //     rids.push(item1.id)
        //     item1.children.forEach(item2 => {
        //       rids.push(item2.id)
        //     })
        //   })
        // })
        // this.rids = rids
        // console.log('roles-rids', this.rids)
        console.log('获取角色列表', res, this.rolesList)
      } catch (err) {
        console.log(err)
      }
    },
    // 所有权限列表
    async getRightListApi () {
      try {
        const res = await getRightListApi('list')
        const res1 = await getRightListApi('tree')
        this.rightList = res.data.data
        this.rightList1 = res1.data.data
        // const rids = []
        // this.rightList1.forEach(item => {
        //   rids.push(item.id)
        //   item.children.forEach(item1 => {
        //     rids.push(item1.id)
        //     item1.children.forEach(item2 => {
        //       rids.push(item2.id)
        //     })
        //   })
        // })
        // this.rids = rids.toString()
        console.log('rightlist', res, 'rightlisttree', res1)
      } catch (err) {
        console.log(err)
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
.el-card {
  margin: 15px 0;
}
.el-col-f {
  // display: flex;
  // align-items: center;
  padding-left: 10px;
}
.el-tag {
  margin-right: 8px;
  margin-bottom: 10px;
}
.el-row-aset {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  padding-top: 10px;
}
.col-8-16 {
  display: flex;
  align-items: center;
  .el-col-f {
    flex: 1;
    // display: flex;
    // align-items: center;
  }
  .el-col-f2 {
    flex: 2;
  }
}
.scope {
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-bottom: 1px solid #eeeeee;
  .el-row-2 {
    display: flex;
    flex-flow: wrap;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    padding-top: 8px;
  }
}
</style>
