/*
 * @Author: daiyonghong
 * @Date: 2020-12-31 10:45:16
 * @LastEditors: daiyonghong
 * @LastModifiedBy: daiyonghong
 * @LastEditTime: 2020-12-31 10:46:46
 * @FilePath: \dyh-pro\src\api\mrmib.js
 * @Description: 描述
 */
import request from '@/utils/request'

export function paged (data) {
  return request({
    url: '/api/account/paged',
    method: 'post',
    data
  })
}

export function created (data) {
  return request({
    url: '/api/account/created',
    method: 'post',
    data
  })
}
