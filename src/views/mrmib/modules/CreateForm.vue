<template>
  <a-modal
    title="新建规则"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="
      () => {
        $emit('ok')
      }
    "
    @cancel="
      () => {
        $emit('cancel')
      }
    "
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id']" disabled />
        </a-form-item>
        <a-form-item label="客服代号">
          <a-input v-decorator="['createPeople']" />
        </a-form-item>
        <a-form-item label="旺旺ID">
          <a-input v-decorator="['createPeople']" />
        </a-form-item>
        <a-form-item label="支付宝账号">
          <a-input v-decorator="['accountNumber']" />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-decorator="['name']" />
        </a-form-item>
        <a-form-item label="返款金额">
          <a-input v-decorator="['money']" />
        </a-form-item>
        <a-form-item label="返款原因">
          <a-input v-decorator="['reason']" />
        </a-form-item>
        <a-form-item label="备注">
          <a-input v-decorator="['content']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'createPeople', 'nickname', 'accountNumber', 'name', 'money', 'reason', 'content']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      form: this.$form.createForm(this)
    }
  },
  created () {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))
    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  method: {
  }
}
</script>
