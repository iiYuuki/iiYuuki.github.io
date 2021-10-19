<template>
  <q-layout class="main-app bg-theme">

    <!-- 头部 -->
    <Header />

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
import { onMounted, defineAsyncComponent } from 'vue'
import particle from '@/utils/particle'

export default {
  name: 'LayoutDefault',

  components: {
    Header: defineAsyncComponent(() => import('../components/Header.vue'))
  },

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
