<!--
 * @Author: daiyonghong
 * @Date: 2020-12-31 10:49:58
 * @LastEditors: daiyonghong
 * @LastModifiedBy: daiyonghong
 * @LastEditTime: 2020-12-31 10:58:57
 * @FilePath: \dyh-pro\src\views\mrmib\weixin.vue
 * @Description: 描述
-->
<template>
  <div>
    微信表
  </div>
</template>
<script>
import * as api from '@/api/mrmib'

export default {
  data () {
    return {
      api,
      pageParams: {
        pageNo: 1,
        pageSize: 10,
        queryMap: {}
      }
    }
  },
  created () {
    this.paged()
  },
  methods: {
    paged () {
      this.api.paged(this.pageParams).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
