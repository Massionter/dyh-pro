<!--
 * @Author: daiyonghong
 * @Date: 2020-12-31 10:49:58
 * @LastEditors: daiyonghong
 * @LastModifiedBy: daiyonghong
 * @LastEditTime: 2020-12-31 19:05:00
 * @FilePath: \dyh-pro\src\views\mrmib\weixin.vue
 * @Description: 描述
-->
<template>
  <div>
    <page-header-wrapper>
      <a-card :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="6" :sm="24">
                <a-form-item label="旺旺ID">
                  <a-input v-model="searchParams.queryMap.nickname" placeholder=""/>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item label="姓名">
                  <a-input v-model="searchParams.queryMap.name" placeholder=""/>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item label="支付宝账号">
                  <a-input v-model="searchParams.queryMap.accountNumber" placeholder=""/>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                  <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  <a-button style="margin-left: 8px" @click="() => this.searchParams.queryMap = {}">重置</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>

        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
          <a-popconfirm placement="topLeft" ok-text="Yes" cancel-text="No" @confirm="confirm">
            <a-button>删除</a-button>
          </a-popconfirm>
          <!-- <a-dropdown>
            <a-menu slot="overlay" @click="clickDropdown">
              <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
              <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              批量操作 <a-icon type="down" />
            </a-button>
          </a-dropdown> -->
        </div>

        <s-table
          ref="table"
          size="default"
          :columns="renderColumns(columns)"
          :data="loadData"
          :tableData="tableData"
          :alert="true"
          :rowSelection="rowSelection"
          showPagination="auto"
          style="color:red"
        >
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <!-- <span slot="status" slot-scope="text">
            <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
          </span> -->
          <span slot="reason" slot-scope="text">
            <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
          </span>

          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="handleEdit(record)">修改</a>
            </template>
          </span>
        </s-table>

        <create-form
          ref="createModal"
          :visible="visible"
          :loading="confirmLoading"
          :model="mdl"
          @cancel="handleCancel"
          @ok="handleOk"
        />
      </a-card>
    </page-header-wrapper>
  </div>
</template>
<script>
import * as api from '@/api/mrmib'
import { paged } from '@/api/mrmib'
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList } from '@/api/manage'
import CreateForm from './modules/CreateForm'
const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '创建日期',
    dataIndex: 'createTime'
  },
  {
    title: '客服代号',
    dataIndex: 'createPeople'
  },
  {
    title: '旺旺ID',
    dataIndex: 'nickname'
    // scopedSlots: { customRender: 'description' }
  },
  {
    title: '支付宝账号',
    dataIndex: 'accountNumber'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '返款金额',
    dataIndex: 'money'
  },
  {
    title: '返款原因',
    dataIndex: 'reason'
  },
  {
    title: '经手人',
    dataIndex: 'middlePerson'
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime'
  },
  {
    title: '返款状态',
    dataIndex: 'status'
  },
  {
    title: '返款失败原因',
    dataIndex: 'failReason'
  },
  {
    title: '备注',
    dataIndex: 'content'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  data () {
    this.columns = columns
    return {
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      // queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.searchParams)
        return paged(requestParameters).then(res => {
          return res.bizdata
        })
      },
      tableData: [],
      selectedRowKeys: [],
      selectedRows: [],
      api,
      searchParams: {
        queryMap: {
        }
      }
    }
  },
  components: {
    STable,
    Ellipsis,
    CreateForm
    // StepByStepModal
  },
  // filters: {
  //   statusFilter (type) {
  //     return statusMap[type].text
  //   },
  //   statusTypeFilter (type) {
  //     return statusMap[type].status
  //   }
  // },
  created () {
    getRoleList({ t: new Date() })
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    renderColumns (columns) {
      const _this = this
      return columns.map(item => {
        return {
          ...item,
          customCell (record, rowIndex) {
            if (item.dataIndex === 'accountNumber') {
              if (record.repeatAccount === 1) {
                 return {
                    style: {
                          // display: 'block',
                          color: '#FF5733',
                          backgroudColor: '#FF5733'
                        }
                }
              }
            }
            if (item.dataIndex === 'name') {
              if (record.repeatName === 1) {
                return {
                    style: {
                          color: '#bd7def',
                          backgroudColor: '#bd7def'
                        }
                }
              }
            }
              if (item.dataIndex === 'nickname') {
              if (record.repeatName === 1) {
                return {
                    style: {
                          color: '#eab558',
                          backgroudColor: '#eab558'
                        }
                }
              }
            }
          }
        }
      })
    },

    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            this.api.updated(values).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            this.api.created(values).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetSearchForm () {
      this.searchParams.queryMap = {
        date: moment(new Date())
      }
    },
    confirm (val) {
      const deleteIds = this.selectedRows.map(val => val.id.toString())
      this.api.deleteByIds(deleteIds).then(res => {
        this.$message.info(res.bizdata)
        this.$refs.table.refresh()
      })
    },
    rowClassName (row) {
      console.log(row)
      if (row.repeatAccount === 1) {
        console.log('重复', row.accountNumber)
        return 'row-class'
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="less">
.row-class {
  background-color: #915850;
}
</style>
