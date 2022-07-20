import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: () => import('@/views/Login') },
  {
    path: '/home',
    redirect: '/welcome',
    name: 'home',
    component: () => import('@/views/Home'),
    children: [
      { path: '/welcome', name: 'welcome', component: () => import('@/views/Home/components/Welcome.vue') },
      { path: '/userlist', name: 'userlist', component: () => import('@/views/Home/UserContr/UserList.vue') },
      { path: '/roleslist', name: 'roleslist', component: () => import('@/views/Home/PowerControl/RolesList.vue') },
      { path: '/powerList', name: 'powerList', component: () => import('@/views/Home/PowerControl/PowerList.vue') },
      { path: '/goodslist', name: 'goodslist', component: () => import('@/views/Home/GoodsControl/GoodsList.vue') },
      { path: '/goodslist/add', name: 'addgoods', component: () => import('@/views/Home/GoodsControl/AddGoods.vue') }
    ]
  }
]
const router = new VueRouter({
  routes
})
export default router
