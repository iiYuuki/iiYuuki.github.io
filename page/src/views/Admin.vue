<template>
  <q-layout class="admin-main-box row"
            :class="$store.state.isAdminSideShow ? 'nav-show' : 'nav-hide'">

    <!-- 左侧导航 -->
    <nav class="column">

      <!-- 切换导航栏显示的按钮 -->
      <div class="sideToggleBtn">
        <q-btn round
               color="black"
               padding="lg xs"
               glossy
               @click="sideToggle"
               icon="arrow_back_ios" />
      </div>

      <!-- 标题盒子 -->
      <div class="title-box flex flex-center">
        <h4>管理界面</h4>
      </div>

      <!-- 导航栏 -->
      <div class="side-nav">
        <q-tabs v-model="tab"
                vertical
                dense
                inline-label
                align="left"
                active-color="white"
                active-bg-color="black">

          <!-- 用户管理 -->
          <q-tab name="/admin/user"
                 no-caps
                 label="用户管理"
                 class="menu-tab">
            <q-icon size="sm"
                    name="event" />
          </q-tab>

          <!-- 文章管理 -->
          <q-tab name="/admin/article"
                 no-caps
                 label="文章管理"
                 class="menu-tab">
            <q-icon size="sm"
                    name="event" />
          </q-tab>
        </q-tabs>
      </div>
    </nav>

    <div class="col">
      <!-- 右侧内容区 -->
      <section class="column">

        <!-- 搜索 -->
        <div></div>
        <div class="search-box"
             v-if="!$router.currentRoute.value.path.includes('/admin/article/')">
          <q-input outlined
                   color="black"
                   bottom-slots
                   v-model="search"
                   counter
                   placeholder="搜索设定"
                   maxlength="12"
                   dense>
            <template v-slot:append>
              <q-icon v-if="search !== ''"
                      name="close"
                      @click="search = ''"
                      class="cursor-pointer" />
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <!-- 管理内容区 -->
        <div class="management-box col">
          <router-view />
        </div>

      </section>
    </div>

  </q-layout>
</template>

<script>
import { onBeforeMount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup () {
    const router = useRouter()
    const store = useStore()

    const tab = ref('/admin/user')
    const search = ref('')

    function onChangeTab (val) {
      router.push(val)
    }

    function sideToggle () {
      store.commit('setAdminSide')
    }

    watch(tab, val => {
      onChangeTab(val)
    })

    watch(() => router, (val) => {
      const path = val.currentRoute.value.path
      if (path.includes('/admin/article/')) {
        store.commit('setAdminSide', false)
      }
    }, { deep: true, immediate: true })

    onBeforeMount(() => {
      tab.value = location.pathname
    })

    console.log(router.currentRoute.value.path)

    return {

      tab,

      search,

      onChangeTab,

      sideToggle

    }
  }
}
</script>

<style lang="scss" scoped>
.admin-main-box {
  height: 100%;
  background-color: #eee;
  overflow: scroll;
  :deep(.q-input .q-field__control) {
    background-color: #fff;
  }
  nav {
    position: sticky;
    top: 0;
    width: 200px;
    height: 100%;
    padding: 0 10px;
    margin-right: 70px;
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);
    background-color: #fff;
    transition: all 0.2s;
    .title-box {
      height: 100px;
      width: 100%;
    }
    .side-nav {
      position: relative;
      :deep(.q-icon) {
        position: absolute;
        left: -34px;
      }
      :deep(.q-tab__indicator) {
        display: none;
      }
      .menu-tab {
        border-radius: 8px;
        margin-bottom: 4px;
      }
    }
    .sideToggleBtn {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 72px;
      width: 32px;
      overflow: hidden;
      transition: all 0.4s;
      .q-btn {
        position: absolute;
        top: 0;
        left: 50%;
        // transform: translateX(50%);
      }
    }
  }
  section {
    height: 100%;
    padding-top: 20px;
    padding-right: 70px;
    margin: auto;
    min-width: 800px;
    max-width: 1200px;
    .search-box {
      margin-bottom: 20px;
    }
  }
  &.nav-show {
    nav {
      margin-left: 0;
    }
  }
  &.nav-hide {
    nav {
      margin-left: -200px;
      .sideToggleBtn {
        transform-origin: right;
        transform: translateY(-50%) rotateY(180deg);
        opacity: 0.7;
        &:hover {
          opacity: 1;
          transform: translateY(-50%) rotateY(180deg) scale(1.5);
        }
      }
    }
  }
}
</style>
