import request from '@/utils/request'
/**
 *
 * @param {登录 参数 username password} param0
 * @returns
 */
export const loginApi = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username, password
    }
  })
}
/**
 * 用户列表数据请求接口
 * @param {query查询参数可以为空
           pagenum当前页码不能为空
           pagesize每页显示条数不能为空} param0
 * @returns
 */
export const getUserListApi = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: {
      query, pagenum, pagesize
    }
  })
}
/**
 * 添加用户
 * @param {username用户名称不能为空
password用户密码不能为空
email邮箱可以为空
mobile手机号可以为空} data
 * @returns
 */
export const addUserApi = (data) => {
  return request({
    method: 'POST',
    url: 'users',
    data
  })
}
/**
 * 修改用户状态
 * @param {uId用户 ID不能为空携带在url中
type用户状态不能为空携带在url中，值为 true 或者 false} param0
 * @returns
 */
export const putUserStateApi = ({ uId, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`,
    params: {
      uId, type
    }
  })
}
/**
 * 根据用户id查询信息
 * @param {id用户 ID不能为空携带在url中} param0
 * @returns
 */
export const queryUserApi = (id) => {
  return request({
    url: `users/${id}`
  })
}
/**
 * 编辑用户信息
 * @param {id用户 id不能为空 参数是url参数:id
email邮箱可以为空
mobile手机号可以为空} param0
 * @returns
 */
export const editUserApi = data => {
  return request({
    method: 'PUT',
    url: `users/${data.id}`,
    data
  })
}
/**
 *删除用户
 * @param {id用户 id不能为空参数是url参数:id} data
 * @returns
 */
export const delUserApi = data => {
  return request({
    method: 'DELETE',
    url: `users/${data.id}`,
    data
  })
}
/**
 *
 * @returns 获取用户角色列表
 */
export const getRolesApi = () => {
  return request({
    url: 'roles'
  })
}
/**
 * 分配用户角色
 * @param {id用户 ID不能为空参数是url参数:id
rid角色 id不能为空参数body参数} param0
 * @returns
 */
export const setRolesApi = ({ id, rid }) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}
/**
 *
 * @returns 左侧菜单权限
 */
export const getMenusApi = () => {
  return request({
    url: 'menus'
  })
}
/**
 *所有权限列表
 * @param {type类型值 list 或 tree , list 列表显示权限, tree 树状显示权限,参数是url参数:type} params
 * @returns
 */
export const getRightListApi = (params) => {
  return request({
    url: `rights/${params}`
  })
}
