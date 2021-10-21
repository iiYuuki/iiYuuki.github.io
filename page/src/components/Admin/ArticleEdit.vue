<template>
  <div class="article-edit-box">
    <div class="show-view-box">
      <q-toggle v-model="isShowView"
                class="q-mr-sm"
                label="开启实时预览模式" />
      <q-btn label="保存当前草稿"
             @click="save"
             color="primary" />
    </div>

    <div class="editor-box"
         id="editor-box"
         :style="`width: ${isShowView ? '49%' : '100%'}`"
         v-highlight>
      <div id="editor">
      </div>
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

    function initEditor (height) {
      // eslint-disable-next-line no-undef
      editor = Jodit.make('#editor', {
        height: height || 450,
        autofocus: true,
        uploader: {
          insertImageAsBase64URI: true
        },
        disablePlugins: 'print,preview,about',
        toolbarAdaptive: false,
        language: 'zh_cn',
        showPlaceholder: false,
        extraButtons: [
          {
            name: '插入代码块',
            exec: function (editor) {
              editor.s.insertHTML(`
                <pre><code class="hljs unselect">function get () {
      console.log(editor.value)
    }</code></pre>`)
            }
          }
        ],
        allowResizeY: false,
        allowResizeX: false
      })
      editor.events.on('change', val => {
        ht.value = val
      })
      setViewHeight()
    }

    function setViewHeight () {
      let editorEle = document.getElementById('editor-box')
      while (!editorEle) {
        setTimeout(() => {
          editorEle = document.getElementById('editor-box')
        }, 10)
      }
      console.log(editorEle.clientHeight)
      viewHeight.value = editorEle.clientHeight
    }

    function reInitEditor (height) {
      editor.destruct()
      initEditor(height)
    }

    function save () {

    }

    watch(isShowView, val => {
      if (isShowView.value) {
        setTimeout(() => {
          reInitEditor(window.innerHeight - 100)
        }, 100)
      }
    })

    onMounted(() => {
      initEditor(window.innerHeight - 80)
      window.addEventListener('resize', () => {
        if (window.resizeEditorTimer) {
          clearTimeout(window.resizeEditorTimer)
          window.resizeEditorTimer = null
        }
        window.resizeEditorTimer = setTimeout(() => {
          reInitEditor(window.innerHeight - 80)
        }, 100)
      })
    })

    onBeforeUnmount(() => {
      editor.destruct()
      editor = null
    })

    return {
      editorValue,
      ht,
      isShowView,
      viewHeight,
      initEditor,
      save
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
  .editor-box {
    float: left;
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);
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
