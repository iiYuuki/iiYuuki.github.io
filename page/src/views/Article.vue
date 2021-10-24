<template>
  <div class="article-main-box">
    <article class="shadow">
      <h1 class="title">{{ title }}</h1>
      <div class="time">{{ time ? formattedTime(time) : ''}}</div>
      <div class="content"
           ref="articleContentRef"
           v-html="content"></div>
    </article>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { useQuasar, QSpinnerIos } from 'quasar'
import { getArticle } from '@/api'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css'

export default {
  props: ['id'],

  setup (props, context) {
    const $q = useQuasar()

    const title = ref('')
    const category = ref('')
    const content = ref('')
    const time = ref('')
    const articleContentRef = ref(null)

    const formattedTime = computed(() => time => {
      const t = new Date(time * 1000)
      const Y = t.getFullYear()
      const M = (t.getMonth() + 1).toString().padStart(2, 0)
      const D = t.getDate().toString().padStart(2, 0)
      const h = t.getHours().toString().padStart(2, 0)
      const m = t.getMinutes().toString().padStart(2, 0)
      const s = t.getSeconds().toString().padStart(2, 0)
      return `${Y}-${M}-${D} ${h}:${m}:${s}`
    })

    function getArticleData () {
      $q.loading.show({
        spinner: QSpinnerIos,
        spinnerColor: 'white',
        spinnerSize: 140
      })

      getArticle({
        articleID: props.id - 0
      })
        .then(res => {
          $q.loading.hide()
          if (res.code === 200) {
            title.value = res.data.title
            category.value = res.data.category
            content.value = res.data.content
            time.value = res.data.createTime
          } else {
            $q.notify({
              message: '页面发生错误！',
              position: 'top',
              timeout: 1500,
              color: 'green'
            })
          }
        }).catch(err => {
          $q.loading.hide()
          console.log(err)
          $q.notify({
            message: '页面发生错误！',
            position: 'top',
            timeout: 1500,
            color: 'green'
          })
        })
    }

    function setHighlight (el) {
      const blocks = el.querySelectorAll('pre code')
      blocks.forEach(block => {
        hljs.highlightElement(block)
      })
    }

    onMounted(() => {
      getArticleData()
      setHighlight(articleContentRef.value)
    })

    return {
      title,
      category,
      time,
      content,
      formattedTime,
      articleContentRef

    }
  }
}
</script>

<style lang="scss" scoped>
.article-main-box {
  article {
    max-width: 800px;
    min-width: 600px;
    min-height: 500px;
    margin: auto;
    background-color: #fff;
    border-radius: 8px;
    padding: 30px;
    .title {
      text-align: center;
      font-weight: 700;
      margin-bottom: 10px;
      margin-top: 0;
      letter-spacing: 2px;
    }
    .time {
      text-align: right;
      color: #888;
      margin-bottom: 50px;
    }
  }
}
</style>
