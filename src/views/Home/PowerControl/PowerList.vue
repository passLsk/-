<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="rightList" border style="width: 100%">
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level * 1 === 0">等级一</el-tag>
            <el-tag v-else-if="scope.row.level * 1 === 1" type="success"
              >等级二</el-tag
            >
            <el-tag v-else type="warning">等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRightListApi } from '@/api/user'
export default {
  created () {
    this.getRightListApi()
  },
  data () {
    return {
      rightList: [],
      rightList1: []
    }
  },
  methods: {
    // 所有权限列表
    async getRightListApi () {
      try {
        const res = await getRightListApi('list')
        const res1 = await getRightListApi('tree')
        this.rightList = res.data.data
        this.rightList1 = res1.data.data
        console.log('rightlist', res, res1)
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
.box-card {
  margin-top: 10px;
}
</style>
