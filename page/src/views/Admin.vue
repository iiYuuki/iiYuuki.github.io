<template>
  <q-layout class="admin-main-box row">

    <!-- 左侧导航 -->
    <nav class="column">

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
          <q-tab name="user"
                 no-caps
                 label="用户管理"
                 class="menu-tab">
            <q-icon size="sm"
                    name="event" />
          </q-tab>

          <!-- 文章管理 -->
          <q-tab name="article"
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
        <div class="search-box">
          <q-input filled
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
import { ref } from 'vue'

export default {
  setup () {
    const tab = ref('user')
    const search = ref('')

    return {

      tab,

      search

    }
  }
}
</script>

<style lang="scss" scoped>
.admin-main-box {
  height: 100%;
  nav {
    width: 200px;
    height: 100%;
    margin-left: 20px;
    margin-right: 70px;
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
  }
  section {
    height: 100%;
    padding-top: 20px;
    padding-right: 20px;
    margin: auto;
    min-width: 800px;
    max-width: 1000px;
    .search-box {
      margin-bottom: 20px;
    }
  }
}
</style>
