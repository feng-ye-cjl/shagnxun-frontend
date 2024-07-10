<template>
  <div class="layout">
    <!--侧边导航-->
    <div class="tac">
      <h2 class="mb-2">商讯科技</h2>
      <el-menu
          background-color="#545c64"
          class="el-menu-vertical-demo"
          text-color="#fff"
          :default-active="route.path"
          @select="selectPath"
          style="height: 95vh; width: 140px"
      >
        <el-menu-item v-for="item in routes" :key="item.name" :class="route.path === item.path ? 'is-active' : ''"
                      :index="item.path">
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!--内容区域-->
    <div class="content">
      <el-main>
        <router-view/>
      </el-main>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router";
import _routes from "@/router/routes.js";

const router = useRouter()
const route = useRoute()

// 路由数组
const routes = ref(_routes)

// 动态渲染菜单
// const activeRoute = ref(route.path)

/**
 * 切换路由菜单触发的方法
 * @param index
 */
const selectPath = (index) => {
  router.push(index)
}

// const handleOpen = (key, keyPath) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key, keyPath) => {
//   console.log(key, keyPath)
// }

// const path = computed(() => {
//   let currentUrl = window.location.href;
//   let path = currentUrl.split('/').pop();
//   return  '/' + path;
// });


onMounted(() => {

})

</script>
<style scoped lang="scss">
.layout {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #a1c4fd, #c2e9fb);

  .el-main {
    line-height: 60px;
  }

  h2 {
    height: 32px;
    font-weight: 600;
    line-height: 32px;
    margin-left: 5px;
    padding-left: 5px;
    position: relative;
    color: #000;
    z-index: 0;
  }

  .tac {
    float: left;
    height: 100vh;
    margin-right: 20px;
  }

  .content {
    //float: right;
    margin-top: 35px;
  }
}
</style>
