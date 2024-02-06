<template>
  <div class="common-layout">
    <el-container class="container">
      <el-header>商讯科技公式页面</el-header>
      <el-container>
        <el-main>
          <Main/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Main from "./components/Main.vue";

// 页面初始化


</script>

<style scoped lang="scss">
.container {
  width: 1400px;
  height: 800px;
  margin: 0 auto;

  .el-header {
    background-color: skyblue;
  }


  .el-main {
    background-color: #abadda;
    line-height: 60px;
  }
}
</style>