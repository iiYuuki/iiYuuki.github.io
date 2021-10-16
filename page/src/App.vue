<template>
  <div class="main-app">

    <!-- 头部 -->
    <header class="shadow">

      <!-- 背景层 -->
      <div class="bg"></div>

      <!-- 头部主内容盒子 -->
      <div class="w header-box row items-center">

        <!-- 左侧title -->
        <div class="title">
          <span>iYuuki</span>
        </div>
        <div class="col"></div>

        <!-- 右侧导航 -->
        <nav class="header-nav row">
          <router-link to="/">主页</router-link>
          <router-link to="/about">关于</router-link>
        </nav>
      </div>
    </header>

    <!-- 页面内容区域 -->
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

</template>

<script>
export default {
  name: 'LayoutDefault',

  setup () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.main-app {
  height: 100%;
  background-color: #eddfd2;
}
header {
  position: relative;
  height: 100px;
  background-color: rgba(0, 0, 0, 1);
  margin-bottom: 30px;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.9;
    z-index: 0;
    background-image: url("./assets/home-hotpoint-bg.png");
    background-repeat: no-repeat;
    background-color: rgb(51, 48, 73);
    background-size: 2860px;
    background-position-x: 50%;
  }
  .header-box {
    position: relative;
    z-index: 1;
    height: 100%;
    .title {
      span {
        font-size: 18px;
        font-weight: 700;
        color: #eddfd2;
      }
    }
    .header-nav {
      :deep(a) {
        margin-right: 10px;
        color: #eddfd2;
      }
      :deep(a:hover) {
        color: tomato;
      }
    }
  }
}
</style>
