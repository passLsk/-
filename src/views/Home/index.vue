<template>
  <el-container class="container">
    <el-header>
      <div class="left-logo">
        <img src="@/assets/logo.png" alt="" />
        <span>工商管理系后台系统</span>
      </div>
      <el-button type="primary" @click="homeBtnOut">退出</el-button>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>确定退出吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="outToLogin">确 定</el-button>
        </span>
      </el-dialog>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div
          class="toggleMenu"
          :width="isCollapse ? '64px' : '200px'"
          @click="toggleMenuFn"
        >
          |||
        </div>
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i
              ><span @click="$router.push({ name: 'userlist' })"
                >用户列表</span
              ></el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template #title>
              <i class="el-icon-s-claim"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i
              ><span @click="$router.push({ name: 'roleslist' })"
                >角色列表</span
              >
            </el-menu-item>
            <el-menu-item index="2-2"
              ><i class="el-icon-menu"></i
              ><span @click="$router.push({ name: 'powerList' })"
                >权限列表</span
              ></el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template #title>
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item
              index="3-1"
              @click="$router.push({ name: 'goodslist' })"
            >
              <i class="el-icon-menu"></i>商品列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template #title>
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">111</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template #title>
              <i class="el-icon-s-marketing"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">111</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      dialogVisible: false,
      isCollapse: false
    }
  },
  methods: {
    async homeBtnOut () {
      this.dialogVisible = true
      // this.$store.commit('setUser', {})
      // this.$router.push({ name: 'login' })
    },
    outToLogin () {
      this.$store.commit('setUser', {})
      this.$router.push({ name: 'login' })
    },
    toggleMenuFn () {
      this.isCollapse = !this.isCollapse
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60%;
}
.left-logo {
  width: 291px;
  height: 56px;
  display: flex;
  align-items: center;
  img {
    width: 61px;
    height: 56px;
  }
  span {
    width: 220px;
    height: 29px;
    font-size: 22px;
    margin-left: 10px;
    color: #fff;
  }
}
.container {
  height: 100vh;
  .el-header {
    background-color: #383d41;
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu {
  border-right: none;
}
.toggleMenu {
  width: 100%;
  height: 40px;
  background-color: #ff69b4;
  line-height: 40px;
  text-align: center;
  color: #fff;
  user-select: none;
  letter-spacing: 5px;
  cursor: pointer;
}
</style>
