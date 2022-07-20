<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        center
        :closable="false"
        show-icon
      >
      </el-alert>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="基本信息" style="flex-basis: 16.6667%"></el-step>
        <el-step title="商品参数" style="flex-basis: 16.6667%"></el-step>
        <el-step title="商品属性" style="flex-basis: 16.6667%"></el-step>
        <el-step title="商品图片" style="flex-basis: 16.6667%"></el-step>
        <el-step title="商品内容" style="flex-basis: 16.6667%"></el-step>
        <el-step
          title="完成"
          style="flex-basis: 16.6667%; max-width: 16.6667%"
        ></el-step>
      </el-steps>
      <el-form
        label-position="top"
        label-width="80px"
        :model="editGoodsForm"
        :rules="rules"
      >
        <el-tabs
          tab-position="left"
          style="height: 200px"
          @tab-click="tabClick"
        >
          <el-tab-pane label="基本信息"> </el-tab-pane>
          <el-tab-pane label="商品参数"></el-tab-pane>
          <el-tab-pane label="商品属性"></el-tab-pane>
          <el-tab-pane label="商品图片"></el-tab-pane>
          <el-tab-pane label="商品内容"></el-tab-pane>
        </el-tabs>
        <div class="box" :style="active === 0 ? '' : 'display:none'">
          <el-form-item prop="id" label="商品ID">
            <el-input v-model="editGoodsForm.goods_id" disabled></el-input>
          </el-form-item>
          <el-form-item prop="goods_name" label="商品名称">
            <el-input v-model="editGoodsForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item prop="goods_price" label="商品价格" flex="start">
            <el-input-number
              style="width: 100%"
              :min="0"
              controls-position="right"
              @change="handleChange"
              v-model.number="editGoodsForm.goods_price"
            ></el-input-number>
          </el-form-item>
          <el-form-item prop="goods_weight" label="商品重量">
            <el-input-number
              style="width: 100%"
              :min="0"
              controls-position="right"
              v-model.number="editGoodsForm.goods_weight"
            ></el-input-number>
          </el-form-item>
          <el-form-item prop="goods_number" label="商品数量">
            <el-input-number
              style="width: 100%"
              :min="0"
              controls-position="right"
              v-model.number="editGoodsForm.goods_number"
            ></el-input-number>
          </el-form-item>
          <el-form-item prop="attrs" label="商品分类">
            <el-select v-model="editGoodsForm.attrs" placeholder="请选择">
              <!-- <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> -->
              <el-option label="衣服" value="衣服"> </el-option>
              <el-option label="裤子" value="裤子"> </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div :style="active === 1 ? '' : 'display:none'">
          <el-form-item prop="attrs" label="1312312">
            <el-checkbox-group v-model="editGoodsForm.attrs">
              <el-checkbox checked label="333" border></el-checkbox>
              <el-checkbox checked label="213" border></el-checkbox>
              <el-checkbox checked label="321" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item prop="attrs" label="321">
            <el-checkbox-group v-model="editGoodsForm.attrs">
              <el-checkbox checked border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item prop="attrs" label="321">
            <el-checkbox-group v-model="editGoodsForm.attrs">
              <el-checkbox checked border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item prop="attrs" label="5656">
            <el-checkbox-group v-model="editGoodsForm.attrs">
              <el-checkbox checked border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="box" :style="active === 2 ? '' : 'display:none'">
          <el-form-item prop="attribute" label="端口-模拟RF接口">
            <el-input v-model="editGoodsForm.attribute"
              >有 123 456 456</el-input
            >
          </el-form-item>
        </div>
        <div :style="active === 3 ? '' : 'display:none'">
          <el-form-item prop="pics">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <div :style="active === 4 ? '' : 'display:none'" class="box">
          <QuillEditor></QuillEditor>
          <el-button type="primary">添加商品</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import QuillEditor from './QuillEditor.vue'
export default {
  created () { },
  data () {
    return {
      active: 0,
      editGoodsForm: {
        goods_id: '',
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: '',
        pics: '',
        attrs: '',
        attribute: '有 123 456 456'
      },
      //  // 上传图片
      //   fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      rules: {
        goods_id: [{ required: true, message: 'id必填项', trigger: 'blur' }],
        goods_name: [{ required: true, message: '商品名称必填项', trigger: 'blur' }],
        goods_price: [{ required: true, message: '商品价格必填项，类型是数字', trigger: 'blur' }],
        goods_number: [{ required: true, message: '商品数量必填项，类型是数字', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '商品重量必填项，类型是数字', trigger: 'blur' }],
        attrs: [{ required: true, message: '商品分类必填项', trigger: 'blur' }]
      },
      value: ''
    }
  },
  methods: {
    tabClick (tabPane) {
      this.active = Number(tabPane.index)
    },
    handleChange () {

    },
    // 上传图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { QuillEditor }
}
</script>

<style scoped lang='less'>
.el-steps {
  justify-content: center;
  margin: 15px 0;
}
.el-card {
  margin: 15px 0;
}
.el-form {
  display: flex;
  .editflex {
    flex: 1;
  }
}
:deep(.el-input-number .el-input__inner) {
  text-align: left;
}
.box {
  flex: 1;
}
</style>
