<template>
  <div class="w">
    <div class="mytest">
      <div></div>
    </div>
    <q-btn label="get"
           @click="get"></q-btn>
    <input type="file"
           @change="onChange">
    <div id="editor">
      <p>初始化的内容</p>
      <p>初始化的内容</p>
    </div>
    <div class="content"
         style="background: #fff"
         v-html="ht"
         v-highlight>
    </div>
  </div>

</template>

<script>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import service from '@/api'
import E from 'wangeditor'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css'

export default {

  setup () {
    const editorValue = ref('')
    const ht = ref('')
    let editor

    function initEditor (eID) {
      editor = new E(eID)
      editor.config.height = 500
      editor.config.placeholder = '开始编辑文章吧~'
      editor.config.uploadImgServer = 'http://localhost:3000/file/'
      editor.config.uploadFileName = 'file'
      editor.create()
    }

    function initMarked (h) {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
          return hljs.highlightAuto(code).value
        }
      })
      const markedData = marked(h, { breaks: true }).replace(/<pre>/g, "<pre class='hljs'>")
      console.log(markedData)
      ht.value = markedData
    }

    onMounted(() => {
      initEditor('#editor')
    })

    function get () {
      const h = editor.txt.html()
      initMarked(h)
    }
    function onChange (event) {
      const file = event.target.files[0]
      const form = new FormData()
      form.append('file', file)
      service.post('/file', form)
        .then(res => {
          console.log(res)
        })
    }

    onBeforeUnmount(() => {
      editor.destroy()
      editor = null
    })

    return {
      editorValue,
      ht,
      get,
      onChange
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
.mytest {
  margin: auto;
  margin-bottom: 20px;
  filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75));
  div {
    height: 300px;
    width: 300px;
    background-color: #fff;
    mask: linear-gradient(
      90deg,
      transparent 0%,
      #000 10%,
      #000 90%,
      transparent 100%
    );
  }
}
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
.editor-box {
  width: 400px;
  height: 300px;
  background-color: #fff;
}
code {
  background: #ccc;
}
</style>
