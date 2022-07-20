import request from '@/utils/request'
/**
 *添加角色
 * @param {roleName角色名称不能为空
roleDesc角色描述可以为空} data
 * @returns
 */
export const addRoleApi = (data) => {
  return request({
    method: 'POST',
    url: 'roles',
    data
  })
}
/**
 *根据角色id查询角色信息
 * @param {角色id} id
 * @returns
 */
export const findRoleApi = (id) => {
  return request({
    url: `roles/${id}`
  })
}
/**
 *编辑角色
 * @param {:id角色 ID不能为空携带在url中
roleName角色名称不能为空
roleDesc角色描述可以为空} param0
 * @returns
 */
export const editRoleApi = ({ id, roleName, roleDesc }) => {
  return request({
    method: 'PUT',
    url: `roles/${id}`,
    data: {
      id, roleName, roleDesc
    }
  })
}
/**
 *删除角色
 * @param {roleid} id
 * @returns
 */
export const delRoleApi = id => {
  return request({
    method: 'DELETE',
    url: `roles/${id}`
  })
}
/**
 *分配角色权限
 * @param {:roleId角色 ID不能为空携带在url中
rids权限 ID 列表（字符串）以 , 分割的权限 ID 列表（获取所有被选中、叶子节点的 key 和半选中节点的 key, 包括 1，2，3 级节点）} param0
 * @returns
 */
export const setRoleApi = ({ roleId, rids }) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}

export const delRoleControl = ({ roleId, rightId }) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
