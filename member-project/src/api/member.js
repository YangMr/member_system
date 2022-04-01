/**
 * @author YangLing
 * @date 2022/3/29 2:35 PM
 */

// 引入request ， axiso的二次封装
import request from "../utils/request";

/**
 * 获取会员列表分页查询接口
 * @param page
 * @param size
 * @param data
 * @returns {AxiosPromise}
 */
const getMemberList = (page = 1,size = 10,data = {})=>{
  return request({
    url : `/member/list/search/${page}/${size}`,
    method : "POST",
    data
  })
}

/**
 * 删除会员接口
 * @param id
 * @returns {AxiosPromise}
 */
const deleteMember = (id)=>{
  return request({
    url : `/member/${id}`,
    method : "DELETE"
  })
}

/**
 * 新增会员接口
 * @param data
 * @returns {AxiosPromise}
 */
const addMember = (data = {})=>{
  return request({
    url : "/member",
    method : "POST",
    data
  })
}

/**
 * 查询单条会员接口
 * @param id
 * @returns {AxiosPromise}
 */
const findMember = (id) =>{
  return request({
    url : `/member/${id}`,
    method : "GET"
  })
}

/**
 * 编辑会员接口
 * @param id
 * @param data
 * @returns {AxiosPromise}
 */
const editMember = (id,data = {})=>{
  return request({
    url : `/member/${id}`,
    method : "PUT",
    data
  })
}

/**
 * 导出会员模块增删改查等接口方法
 */
export default {
  getMemberList,
  deleteMember,
  addMember,
  findMember,
  editMember
}
