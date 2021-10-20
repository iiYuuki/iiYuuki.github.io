<template>
  <div class="article-edit-box">
    <div class="show-view-box">
      <q-toggle v-model="isShowView"
                class="q-mr-sm"
                label="开启实时预览模式" />
      <q-btn label="保存当前草稿"
             color="primary" />
    </div>

    <div id="editor"
         :style="`width: ${isShowView ? '49%' : '100%'}`">
    </div>
    <div class="view-box w-e-text"
         id="view-box"
         v-if="isShowView"
         v-highlight
         style="height: 300px"
         v-html="ht"
         :style="`height: ${viewHeight}px`"></div>

  </div>
</template>

<script>
import E from 'wangeditor'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import colors from '@/utils/font-color'

export default {
  setup () {
    const editorValue = ref('')
    const ht = ref('')
    const isShowView = ref(false)
    const viewHeight = ref(500)

    let editor

    const onChange = newHtml => {
      console.log(newHtml)
      ht.value = newHtml
    }

    function initEditor (eleID, height, htmlText) {
      editor = new E(eleID)
      editor.config.height = height || 500
      editor.config.placeholder = '开始编辑文章吧~'
      editor.config.colors = colors
      editor.config.uploadImgServer = 'http://' + location.hostname + ':3000/file/'
      editor.config.uploadFileName = 'file'
      editor.config.onchange = onChange

      editor.create()
      htmlText && editor.txt.html(htmlText)
      setViewHeight()
    }

    function setViewHeight () {
      let editorEle = document.getElementById('editor')
      while (!editorEle) {
        setTimeout(() => {
          editorEle = document.getElementById('editor')
        }, 10)
      }
      viewHeight.value = editorEle.clientHeight
    }

    function reInitEditor (height) {
      const ht = editor.txt.html()
      editor.destroy()
      editor = null
      initEditor('#editor', height, ht)
    }

    function get () {
      return editor.txt.html()
    }

    watch(isShowView, val => {
      if (isShowView.value) {
        setTimeout(() => {
          reInitEditor(window.innerHeight - 185)
        }, 100)
      }
    })

    onMounted(() => {
      initEditor('#editor', window.innerHeight - 185)
      window.addEventListener('resize', () => {
        if (window.resizeEditorTimer) {
          clearTimeout(window.resizeEditorTimer)
          window.resizeEditorTimer = null
        }
        window.resizeEditorTimer = setTimeout(() => {
          reInitEditor(window.innerHeight - 185)
        }, 100)
      })
    })

    onBeforeUnmount(() => {
      editor.destroy()
      editor = null
    })

    return {
      editorValue,
      ht,
      isShowView,
      viewHeight,
      initEditor,
      get
    }
  },
  directives: {
    highlight: el => {
      const blocks = el.querySelectorAll('pre code')
      blocks.forEach(block => {
        hljs.highlightBlock(block)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-edit-box {
  .show-view-box {
    background: #fff;
  }
  #editor {
    float: left;
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);
    :deep(.w-e-toolbar),
    :deep(.w-e-text-container) {
      border: none !important;
    }
  }
  .view-box {
    float: right;
    overflow: scroll;
    white-space: normal;
    width: 49%;
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);
    margin-left: 10px;
    background: #fff;
  }
}
</style>
