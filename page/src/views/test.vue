<template>
  <div>
    <div class="mytest">
      <div></div>
    </div>
    <q-btn label="get"
           @click="get"></q-btn>
    <input type="file"
           @change="onChange">
  </div>

</template>

<script>
import { onMounted } from 'vue'
import service from '@/api'

export default {
  setup () {
    onMounted(() => {

    })

    function get () {
      service.get('/')
        .then(res => {
          if (res.code === -1) {
            console.log('err')
          } else {
            window.open('http://localhost:3000')
          }
        })
    }
    function onChange (event) {
      let file = event.target.files[0]
      console.log(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        let base64 = e.target.result
        service.post('/file', {
          file: base64
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    }

    return {
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
</style>
