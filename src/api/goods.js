import request from '@/utils/request'
/**
 * 商品列表数据
 * @param {query查询参数可以为空
pagenum当前页码不能为空
pagesize每页显示条数不能为空} params
 * @returns
 */
export const getGoodsListApi = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'goods',
    params: { query, pagenum, pagesize }
  })
}
/**
 *根据商品id查询商品信息
 * @param {goods_id} id
 * @returns
 */
export const searchGoodsForIdApi = id => {
  return request({
    url: `goods/${id}`
  })
}
/**
 * 编辑商品
 * @param {id商品 ID不能为空携带在url中
goods_name商品名称不能为空
goods_price价格不能为空
goods_number数量不能为空
goods_weight重量不能为空
goods_introduce介绍可以为空
pics上传的图片临时路径（对象可以为空
attrs商品的参数（数组可以为空} data
 * @returns
 */
export const editGoodsApi = data => {
  return request({
    method: 'PUT',
    url: `goods/${data.goods_id}`,
    data
  })
}
/**
 * 删除商品
 * @param {商品id} id
 * @returns
 */
export const delGoodsApi = id => {
  return request({
    method: 'DELETE',
    url: `goods/${id}`
  })
}
/**
 * 添加商品
 * @param {goods_name商品名称不能为空
goods_cat以为','分割的分类列表不能为空
goods_price价格不能为空
goods_number数量不能为空
goods_weight重量不能为空
goods_introduce介绍可以为空
pics上传的图片临时路径（对象）可以为空
attrs商品的参数（数组），包含 动态参数 和 静态属性可以为空} data
 * @returns
 */
export const addGoodsApi = data => {
  return request({
    method: 'POST',
    url: 'goods',
    data
  })
}
