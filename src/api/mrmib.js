/*
 * @Author: daiyonghong
 * @Date: 2020-12-31 10:45:16
 * @LastEditors: daiyonghong
 * @LastModifiedBy: daiyonghong
 * @LastEditTime: 2020-12-31 19:08:33
 * @FilePath: \dyh-pro\src\api\mrmib.js
 * @Description: 描述
 */
import request from '@/utils/request'

export function paged (data) {
  return request({
    url: '/account/paged',
    method: 'post',
    data
  })
}

export function created (data) {
  return request({
    url: '/account/created',
    method: 'post',
    data
  })
}

export function updated (data) {
  return request({
    url: '/account/updated',
    method: 'post',
    data
  })
}

export function deleteByIds (data) {
  return request({
    url: '/account/deleteByIds',
    method: 'post',
    data
  })
}

export function importExcel (file) {
  const formData = new FormData()
  formData.append('excelFile', file)
  return request({
    url: '/account/excelPut',
    method: 'post',
    data: formData
  })
}
