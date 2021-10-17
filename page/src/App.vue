<template>
  <q-layout class="main-app bg-theme">

    <!-- 头部 -->
    <header>

      <!-- 背景层 -->
      <div class="bg"></div>

      <!-- 头部主内容盒子 -->
      <div class="w header-box row items-center">

        <!-- 左侧title -->
        <div class="title">
          <span class="text-theme">iYuuki</span>
        </div>
        <div class="col"></div>

        <!-- 右侧导航 -->
        <nav class="header-nav row">
          <router-link :to="{name: 'Home'}">主页</router-link>
          <router-link :to="{name: 'About'}">关于</router-link>
        </nav>
      </div>
    </header>

    <!-- 页面内容区域 -->
    <div class="view-placeholder"></div>
    <div class="view">
      <router-view v-slot="{ Component }">
        <transition name="fade"
                    mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <canvas id="particle"
            class="canvas"></canvas>
  </q-layout>

</template>

<script>
import { onMounted } from 'vue'
import particle from './utils/particle'

export default {
  name: 'LayoutDefault',

  setup () {
    onMounted(() => {
      particle.init('particle')
    })

    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.main-app {
  height: 100%;
}
header {
  position: fixed;
  z-index: 2;
  top: 0;
  height: 100px;
  width: 100%;
  margin-bottom: 30px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #000 10%,
    #000 90%,
    transparent 100%
  );
  filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75));
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
    mask: linear-gradient(
      90deg,
      transparent 0%,
      #000 10%,
      #000 90%,
      transparent 100%
    );
  }
  .header-box {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 0 16px;

    .title {
      span {
        font-size: 18px;
        font-weight: 700;
        cursor: default;
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
      filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 1));
    }
  }
}
.view-placeholder {
  height: 100px;
}
.view {
  position: relative;
  background: transparent;
  z-index: 1;
  height: calc(100% - 100px);
  padding-top: 30px;
  overflow: scroll;
}
#particle {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
