<template>
  <div class="w">
    <div class="mytest">
      <div></div>
    </div>
    <q-btn label="get"
           @click="get"></q-btn>
    <input type="file"
           @change="onChange">
    <div id="editor"></div>
  </div>

</template>

<script>
import { onMounted, ref } from 'vue'
import service from '@/api'
import E from 'wangeditor'

export default {

  setup () {

    const editorValue = ref('')

    onMounted(() => {
      const editor = new E('#editor')
      editor.create()
    })

    function get () {
      let link = document.createElement('a')
      link.href = 'http://localhost:3000/'
      link.setAttribute('download', '')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    function onChange (event) {
      let file = event.target.files[0]
      const form = new FormData()
      form.append('file', file)
      service.post('/file', form)
        .then(res => {
          console.log(res)
        })
    }

    return {
      editorValue,
      get,
      onChange
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
</style>
