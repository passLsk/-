<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            <div>
              <el-input
                placeholder="请输入内容"
                v-model.number="findGoods"
                class="input-with-select"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="searchGoodsFn"
                ></el-button>
              </el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            <el-button
              type="primary"
              @click="$router.push({ name: 'addgoods' })"
              >添加商品</el-button
            >
          </div>
        </el-col>
      </el-row>
      <el-card class="box-card">
        <template>
          <el-table :data="goodsList" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="600">
            </el-table-column>
            <el-table-column
              prop="goods_price"
              label="商品价格（元）"
            ></el-table-column>
            <el-table-column
              prop="goods_weight"
              label="商品重量"
            ></el-table-column>
            <el-table-column prop="upd_time" label="创建时间">
              <template v-slot="scope">
                {{ scope.row.upd_time | formateDate }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope1">
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-edit"
                  @click="editGoodsFn(scope1)"
                ></el-button>
                <el-button
                  size="small"
                  type="danger"
                  icon="el-icon-delete"
                  class="middle-btn"
                  @click="delGoddsFn(scope1)"
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
    <el-dialog title="添加商品弹出框" :visible.sync="dialogFormAddGoodsVisible">
      <!-- 添加用户 -->

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddGoodsVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClick">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑商品" :visible.sync="dialogFormEditVisible">
      <!-- 编辑商品 -->
      <el-form
        label-position="top"
        label-width="80px"
        :model="editGoodsForm"
        :rules="rules"
      >
        <el-form-item prop="id" label="商品ID">
          <el-input v-model="editGoodsForm.goods_id" disabled></el-input>
        </el-form-item>
        <el-form-item prop="goods_name" label="商品名称">
          <el-input v-model="editGoodsForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item prop="goods_price" label="价格" flex="start">
          <el-input-number
            style="width: 100%"
            :min="0"
            controls-position="right"
            @change="handleChange"
            v-model.number="editGoodsForm.goods_price"
          ></el-input-number>
        </el-form-item>
        <el-form-item prop="goods_number" label="数量">
          <el-input-number
            style="width: 100%"
            :min="0"
            controls-position="right"
            v-model.number="editGoodsForm.goods_number"
          ></el-input-number>
        </el-form-item>
        <el-form-item prop="goods_weight" label="重量">
          <el-input-number
            style="width: 100%"
            :min="0"
            controls-position="right"
            v-model.number="editGoodsForm.goods_weight"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOnClick">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogDelGoodsVisible" width="30%">
      <span>此操作将永久删除该商品，是否继续</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelGoodsVisible = false">取 消</el-button>
        <el-button type="primary" @click="onClickDelGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getGoodsListApi, searchGoodsForIdApi, editGoodsApi, delGoodsApi } from '@/api/goods'
import moment from 'moment'
export default {
  name: 'goodslist',
  created () {
    this.getGoodsListApi()
  },
  data () {
    // const addUserFormMyusername = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('用户名不能为空'))
    //   } else {
    //     if (value.trim().length < 2 || value.trim().length > 7) {
    //       callback(new Error('用户名长度为2-7位'))
    //     }
    //     callback()
    //   }
    // }
    // const addUserFormPassword = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('密码不能为空'))
    //   } else {
    //     if (value.trim().length < 2 || value.trim().length > 7) {
    //       callback(new Error('密码长度为2-7位'))
    //     }
    //     callback()
    //   }
    // }
    // const addUserFormEmail = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('邮箱不能为空'))
    //   } else {
    //     const regex = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    //     if (!(regex.test(value))) {
    //       callback(new Error('邮箱格式不正确'))
    //     }
    //     callback()
    //   }
    // }
    // const addUserFormMobile = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('手机号不能为空'))
    //   } else {
    //     const regex = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
    //     if (!(regex.test(value))) {
    //       callback(new Error('手机号格式不正确'))
    //     }
    //     callback()
    //   }
    // }
    return {
      goodsList: [],
      allGoodsList: [],
      pagenum: 1,
      findGoods: '',
      query: '',
      editGoodsForm: {
        goods_id: '',
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: '',
        pics: '',
        attrs: ''
      },
      rules: {
        goods_id: [{ required: true, message: 'id必填项', trigger: 'blur' }],
        goods_name: [{ required: true, message: '商品名称必填项', trigger: 'blur' }],
        goods_price: [{ required: true, message: '商品价格必填项，类型是数字', trigger: 'blur' }],
        goods_number: [{ required: true, message: '商品数量必填项，类型是数字', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '商品重量必填项，类型是数字', trigger: 'blur' }]
      },
      tableData: [],
      currentPage4: 4,
      total: 0,
      pageSize: 5,
      currentPage: 1,
      dialogFormAddGoodsVisible: false,
      dialogFormEditVisible: false,
      // rules: {
      //   Myusername: [{ validator: addUserFormMyusername, trigger: 'blur' }],
      //   password: [{ validator: addUserFormPassword, trigger: 'blur' }],
      //   email: [{ validator: addUserFormEmail, trigger: 'blur' }],
      //   mobile: [{ validator: addUserFormMobile, trigger: 'blur' }]
      // },
      formLabelWidth: '80px',
      scope1: {},
      dialogDelGoodsVisible: false
    }
  },
  methods: {
    // 商品列表
    async getGoodsListApi () {
      try {
        const res = await getGoodsListApi({ query: this.query, pagenum: this.currentPage, pagesize: this.pageSize })
        this.total = res.data.data.total
        this.goodsList = res.data.data.goods
        console.log('商品列表', res, '所有商品列表', this.allGoodsList)
      } catch (err) {
        console.log(err)
      }
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val
      console.log('this.pageSize', this.pageSize)
      this.getGoodsListApi()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log('this.currentPage', this.currentPage)
      this.getGoodsListApi()
    },
    async onClick () { // 添加商品接口
      this.dialogFormAddGoodsVisible = false
      this.$router.push({ name: 'addgoods' })
    },
    // 编辑商品
    editGoodsFn (scope1) {
      this.dialogFormEditVisible = true
      this.editGoodsForm = { ...scope1.row }
      console.log('编辑商品', scope1.row.goods_id, 'this.editGoodsForm', this.editGoodsForm)
    },
    async editOnClick () {
      this.dialogFormEditVisible = false
      try {
        const res = await editGoodsApi(this.editGoodsForm)
        if (res.data.meta.status === 200) {
          await this.getGoodsListApi()
          this.$message.success('编辑商品成功')
        } else {
          this.$message.error(res.data.meta.msg)
        }
        console.log('请求接口编辑商品', res)
      } catch (err) {
        console.log(err)
      }
    },
    // 编辑商品弹出框里的计数器
    handleChange () {
    },
    // 删除商品
    delGoddsFn (scope1) {
      this.dialogDelGoodsVisible = true
      this.scope1 = scope1.row
    },
    async onClickDelGoods () {
      try {
        const res = await delGoodsApi(this.scope1.goods_id)
        if (res.data.meta.status === 200) {
          await this.getGoodsListApi()
          this.$message.success(res.data.meta.msg)
        } else {
          this.$message.error(res.data.meta.msg)
        }
        console.log('删除商品', res)
      } catch (err) {
        console.log(err)
      }
      this.dialogDelGoodsVisible = false
    },
    // 根据商品id查询商品信息
    async searchGoodsFn () {
      try {
        const res = await searchGoodsForIdApi(this.findGoods)
        // this.goodsList = this.goodsList.filter(item => item.goods_id === this.findGoods)
        if (res.data.meta.status === 200) {
          this.goodsList = [res.data.data]
          this.$message.success('查询成功，刷新既能看到全部数据')
          this.currentPage = 1
          this.pageSize = 1
          this.total = 1
          console.log('根据id查询商品', res)
        } else {
          this.$message.error('查询失败没有此用户')
          this.findGoods = ''
          this.getGoodsListApi()
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {
    formateDate (val) {
      return moment(val * 1000).format('YYYY-MM-DD')
    }
  },
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
:deep(.el-input__inner) {
  text-align: left;
}
</style>
