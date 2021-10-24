<template>
  <router-view />
</template>

<script>
import { inject, onBeforeMount } from 'vue'
import { getLoginInfo } from '@/api'
import { useStore } from 'vuex'

export default {
  name: 'app',

  setup () {
    const store = useStore()

    const allowIps = inject('allowIps')

    onBeforeMount(() => {
      // 根据登录IP判断是否为admin进行登录
      getLoginInfo()
        .then(res => {
          if (allowIps.includes(res.ip)) {
            store.commit('setIsAdmin', true)
          } else {
            store.commit('setIsAdmin', false)
          }
        })
    })

    return {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
