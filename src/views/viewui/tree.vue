<!--
 * @Author: daiyonghong
 * @Date: 2021-01-06 11:16:41
 * @LastEditors: daiyonghong
 * @LastModifiedBy: daiyonghong
 * @LastEditTime: 2021-01-06 11:18:50
 * @FilePath: \dyh-pro\src\views\viewui\index.vue
 * @Description: 描述
-->
<template>
  <Tree :data="data6" @on-contextmenu="handleContextMenu">
    <template slot="contextMenu">
      <DropdownItem @click.native="handleContextMenuEdit">编辑</DropdownItem>
      <DropdownItem @click.native="handleContextMenuDelete" style="color: #ed4014">删除</DropdownItem>
    </template>
  </Tree>
</template>
<script>
export default {
  data () {
    return {
      data6: [
        {
          title: 'parent 1',
          expand: true,
          contextmenu: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              contextmenu: true,
              children: [
                {
                  title: 'leaf 1-1-1',
                  contextmenu: true
                },
                {
                  title: 'leaf 1-1-2',
                  contextmenu: true
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              contextmenu: true,
              children: [
                {
                  title: 'leaf 1-2-1',
                  contextmenu: true
                },
                {
                  title: 'leaf 1-2-1',
                  contextmenu: true
                }
              ]
            }
          ]
        }
      ],
      contextData: null
    }
  },
  methods: {
    handleContextMenu (data) {
      this.contextData = data
    },
    handleContextMenuEdit () {
      this.$Message.info('Click edit of' + this.contextData.title)
    },
    handleContextMenuDelete () {
      this.$Message.info('Click delete of' + this.contextData.title)
    }
  }
}
</script>
