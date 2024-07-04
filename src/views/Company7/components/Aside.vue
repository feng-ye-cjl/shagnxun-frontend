<template>
  <el-row class="tac">
    <el-col :span="24">
      <h5 class="mb-4">公司列表</h5>
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>公司一</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>公司二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>公司三</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'

</script>

<style lang="scss">

</style>