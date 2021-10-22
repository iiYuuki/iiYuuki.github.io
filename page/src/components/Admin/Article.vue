<template>
  <div class="article-edit-box">
    <div class="toolbar-box row q-py-sm">

      <!-- 切换实时预览模式 -->
      <q-toggle v-model="isShowView"
                class="q-mr-sm"
                label="开启实时预览模式" />

      <!-- 保存 -->
      <q-btn label="保存当前草稿"
             @click="save"
             color="primary" />
      <div class="col"></div>
      <q-btn label="提交"
             class="q-mr-md"
             @click="isSubmit = true"
             color="pink" />
    </div>

    <!-- 编辑器 -->
    <div class="editor-box"
         id="editor-box"
         ref="editorRef"
         :style="`width: ${isShowView ? '49%' : '100%'}`">
      <div id="editor">
      </div>
    </div>

    <!-- 实时预览栏 -->
    <div class="view-box w-e-text"
         id="view-box"
         v-show="isShowView"
         ref="viewRef"
         style="height: 300px"
         v-html="ht"
         :style="`height: ${viewHeight}px`"></div>
  </div>

  <!-- 插入代码弹出框 -->
  <q-dialog v-model="isInsertCode">
    <q-card class="dialog-box">

      <q-card-section>
        <q-form class="form-box"
                @submit="insertCode">
          <q-input v-model="code"
                   outlined
                   type="textarea" />
          <!-- 确认按钮 -->
          <div class="text-right q-mt-md">
            <q-btn class="confirm-button"
                   push
                   v-close-popup
                   label="确认"
                   type="submit"
                   color="primary" />
          </div>

        </q-form>
      </q-card-section>

    </q-card>
  </q-dialog>

  <!-- 提交文章弹出框 -->
  <q-dialog no-backdrop-dismiss
            v-model="isSubmit">
    <ArticleSubmit @dialogClose="isSubmit = false"
                   :id="id"
                   :data="articleData" />
  </q-dialog>

</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css'
import { onBeforeUnmount, onMounted, ref, watch, defineAsyncComponent, reactive, computed } from 'vue'
import colors from '@/utils/font-color'
import { getArticles } from '@/api'
import { useQuasar } from 'quasar'

export default {
  name: 'Admin Article',

  props: ['id'],

  components: {
    ArticleSubmit: defineAsyncComponent(() => import('./ArticleSubmit.vue'))
  },

  setup (props, context) {
    const $q = useQuasar()

    const editorValue = ref('')
    const ht = ref('')
    const code = ref('')
    const viewRef = ref(null)
    const editorRef = ref(null)
    const isShowView = ref(false)
    const isInsertCode = ref(false)
    const isSubmit = ref(false)
    const viewHeight = ref(500)

    const articleData = reactive({
      content: computed(() => ht.value),
      title: '',
      category: '',
      coverURL: ''
    })

    let editor

    function initEditor (height) {
      // eslint-disable-next-line no-undef
      editor = Jodit.make('#editor', {
        height: height || 450,
        autofocus: true,
        uploader: {
          insertImageAsBase64URI: true
        },
        disablePlugins: 'print,preview,about,fullsize,file,class-span,clean-html,source',
        toolbarAdaptive: false,
        language: 'zh_cn',
        showPlaceholder: false,
        extraButtons: [
          {
            name: '插入代码块',
            exec: function (editor) {
              isInsertCode.value = true
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

    function insertCode () {
      const insertCode = `
                <pre><code lang="javascript" class="hljs unselect">${code.value}</code></pre><br>`
      editor.value += insertCode
      setTimeout(() => {
        setHighlight(editorRef.value)
        setHighlight(viewRef.value)
      }, 200)
    }

    function setHighlight (el) {
      const blocks = el.querySelectorAll('pre code')
      blocks.forEach(block => {
        hljs.highlightElement(block)
      })
    }

    function handleResize () {
      if (window.resizeEditorTimer) {
        clearTimeout(window.resizeEditorTimer)
        window.resizeEditorTimer = null
      }
      window.resizeEditorTimer = setTimeout(() => {
        reInitEditor(window.innerHeight - 80)
      }, 100)
    }

    function getArticleData () {
      getArticles()
        .then(res => {
          if (res.code === 200) {
            res.data.some(item => {
              if (item.articleID === props.id - 0) {
                editor.value = item.content
                articleData.title = item.title
                articleData.category = item.category
                articleData.coverURL = item.cover
                return item.articleID === props.id
              }
            })
          } else {
            $q.notify({
              message: '页面发生错误！',
              position: 'top',
              timeout: 1500,
              color: 'green'
            })
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

    watch(isShowView, val => {
      if (isShowView.value) {
        setTimeout(() => {
          reInitEditor(window.innerHeight - 100)
        }, 100)
      }
    })

    onMounted(() => {
      initEditor(window.innerHeight - 80)
      window.addEventListener('resize', handleResize)
      if (props.id) {
        getArticleData()
      }
    })

    onBeforeUnmount(() => {
      editor.destruct()
      editor = null
      removeEventListener('resize', handleResize)
    })

    return {
      editorValue,
      ht,
      isShowView,
      viewHeight,
      isInsertCode,
      isSubmit,
      code,
      viewRef,
      editorRef,
      insertCode,
      initEditor,
      articleData,
      save
    }
  }
}
</script>

<style lang="scss" scoped>
.article-edit-box {
  .toolbar-box {
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
    padding: 0;
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);
    margin-left: 10px;
    background: #fff;
  }
}
.dialog-box {
  :deep(.q-field__control) {
    height: auto;
  }
}
</style>
