/**
 * @author YangLing
 * @date 2022/3/29 2:35 PM
 */

import request from "../utils/request"

const addStaff = (data)=>{
  return request({url : "/staff", method : "POST", data})
}

const editStaff = (id,data)=>{
  return request({url : `/staff/${id}`, method : "PUT", data})
}

const findStaff = (id)=>{
  return request({url : `staff/${id}`, method : "GET"})
}

const deleteStaff = (id)=>{
  return request({url : `staff/${id}`, method : "DELETE"})
}

const getStaffList = (currentPage,pageSize,data)=>{
  return request({url : `/staff/list/search/${currentPage}/${pageSize}`, method : "POST", data})
}

export default {
  addStaff,
  editStaff,
  findStaff,
  deleteStaff,
  getStaffList
}
