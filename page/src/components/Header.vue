<template>
  <!-- 头部 -->
  <header>

    <!-- 背景层 -->
    <div class="bg"></div>

    <!-- 头部主内容盒子 -->
    <div class="w header-box row items-center">

      <!-- 左侧title -->
      <div class="title">
        <span class="text-theme">{{ title }}</span>
      </div>
      <div class="col"></div>

      <!-- 右侧导航 -->
      <nav class="header-nav row">
        <router-link :to="{name: 'Home'}">主页</router-link>
        <router-link :to="{name: 'About'}">关于</router-link>
        <router-link v-if="isAdmin"
                     to="/admin">管理界面</router-link>
        <router-link v-if="isAdmin"
                     :to="{name: 'Test'}">Test Page</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { getUserTitle } from '@/api'
import { useStore } from 'vuex'

export default {
  setup () {
    const $q = useQuasar()
    const store = useStore()

    const title = ref('')
    const isAdmin = store.state.isAdmin

    function getTitle () {
      getUserTitle()
        .then(res => {
          if (res.code !== 200) {
            $q.notify({
              message: '页面发生错误！',
              position: 'top',
              timeout: 1500,
              color: 'green'
            })
          } else {
            title.value = res.title
          }
        }).catch(err => {
          console.log(err)
          $q.notify({
            message: '页面发生错误！',
            position: 'top',
            timeout: 1500,
            color: 'green'
          })
        })
    }

    onMounted(() => {
      getTitle()
    })

    return {

      title,

      isAdmin

    }
  }
}
</script>

<style lang="scss" scoped>
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
    background-image: url("../assets/home-hotpoint-bg.png");
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
</style>
