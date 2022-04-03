/**
 * @author YangLing
 * @date 2022/3/29 2:35 PM
 */

import request from "../utils/request";

/**
 * 新增供应商
 * @param data Object {name,linman,mobile,remark}
 * @returns {AxiosPromise}
 */
const addSupplier = (data)=>{
  return request({url : "/supplier", method : "POST", data})
}

/**
 * 获取/查询 供应商列表分页接口
 * @param currentPage
 * @param pageSize
 * @param data Object {name, linman, mobile}
 * @returns {AxiosPromise}
 */
const getSupplierList = (currentPage = 1,pageSize = 3,data = {})=>{
  return request({url : `/supplier/list/search/${currentPage}/${pageSize}`, method : "POST", data})
}

/**
 * 编辑供应商接口
 * @param id 供应商id
 * @param data Object {name,linman,mobile,remark}
 * @returns {AxiosPromise}
 */
const editSupplier = (id,data)=>{
  return request({url : `/supplier/${id}`, method : "PUT", data})
}

/**
 * 查询单个供应商数据接口
 * @param id
 * @returns {AxiosPromise}
 */
const findSupplier = (id)=>{
  return  request({url : `/supplier/${id}`, method : "GET"})
}

/**
 * 删除供应商接口
 * @param id
 * @returns {AxiosPromise}
 */
const deleteSupplier = (id)=>{
  return  request({url : `/supplier/${id}`, method : "DELETE"})
}

/**
 * 导出供应商所有接口
 */
export default {
  addSupplier,
  getSupplierList,
  editSupplier,
  findSupplier,
  deleteSupplier
}
