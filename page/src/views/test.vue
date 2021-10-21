<template>
  <div class="w">
    <div class="mytest">
      <div></div>
    </div>
    <q-btn label="get"
           @click="get"></q-btn>
    <div id="toolbar-container"></div>
    <div class="editor-box"><textarea id="editor"
                name="editor"></textarea></div>

  </div>

</template>

<script>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import service from '@/api'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css'

const fontColorConfig = {
  colors: [
    {
      color: 'hsl(0, 0%, 0%)',
      label: 'Black'
    },
    {
      color: 'hsl(0, 0%, 30%)',
      label: 'Dim grey'
    },
    {
      color: 'hsl(0, 0%, 60%)',
      label: 'Grey'
    },
    {
      color: 'hsl(0, 0%, 90%)',
      label: 'Light grey'
    },
    {
      color: 'hsl(0, 0%, 100%)',
      label: 'White',
      hasBorder: true
    },
    {
      color: 'hsl(0, 75%, 60%)',
      label: 'Red'
    },
    {
      color: 'hsl(30, 75%, 60%)',
      label: 'Orange'
    },
    {
      color: 'hsl(60, 75%, 60%)',
      label: 'Yellow'
    },
    {
      color: 'hsl(90, 75%, 60%)',
      label: 'Light green'
    },
    {
      color: 'hsl(120, 75%, 60%)',
      label: 'Green'
    },
    {
      color: 'hsl(150, 75%, 60%)',
      label: 'Aquamarine'
    },
    {
      color: 'hsl(180, 75%, 60%)',
      label: 'Turquoise'
    },
    {
      color: 'hsl(210, 75%, 60%)',
      label: 'Light blue'
    },
    {
      color: 'hsl(240, 75%, 60%)',
      label: 'Blue'
    },
    {
      color: 'hsl(270, 75%, 60%)',
      label: 'Purple'
    }
  ]
}

export default {

  setup () {
    const editorData = ref('<p>Content of the editor.</p>')
    let editor
    let newVal
    let oldVal

    function initEditor () {
      // eslint-disable-next-line no-undef
      editor = Jodit.make('#editor', {
        autofocus: true,
        uploader: {
          insertImageAsBase64URI: true
        },
        language: 'zh_cn',
        toolbarInlineForSelection: true,
        showPlaceholder: false,
        extraButtons: [
          {
            name: 'code',
            exec: function (editor) {
              editor.s.insertHTML(`
                <pre><code>
    function get () {
      console.log(editor.value)
    }</code></pre>`
              )
            }
          }
        ]
      })
      editor.events.on('change', val => console.log(val))
    }

    function get () {
      console.log(editor.value)
    }

    onMounted(() => {
      // console.log(DecoupledEditor)
      initEditor()
    })

    return {
      editorData,
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
.editor-box {
  background-color: #fff;
}
</style>
