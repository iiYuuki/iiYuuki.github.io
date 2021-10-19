<template>
  <q-card class="dialog-box">

    <!-- X 关闭按钮 -->
    <q-btn icon="close"
           class="close-icon"
           style="z-index: 2"
           flat
           round
           dense
           v-close-popup />

    <!-- 内容区域 -->
    <q-card-section>

      <!-- 图片裁剪区域 -->
      <div class="img-cropper">
        <img :src="imgURL"
             ref="cropperImgRef"
             alt="">
      </div>

      <div class="flex flex-center">

        <!-- 确认按钮 -->
        <q-btn class="btn-gradient-main1 confirm-button"
               push
               label="确认"
               @click="crop"
               color="primary" />
      </div>

    </q-card-section>

  </q-card>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'Cropper Avatar Component',

  props: ['imgURL'],

  emits: ['dialogClose', 'onResult'],

  setup (props, context) {
    const cropperImgRef = ref(null)
    const resultRef = ref(null)
    const croppable = ref(false)
    const cropper = ref(null)

    function initCropper () {
      if (cropper.value) {
        cropper.value.destroy()
      }
      const image = cropperImgRef.value
      // eslint-disable-next-line no-undef
      cropper.value = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        ready: function () {
          croppable.value = true
        }
      })
    }

    function getRoundedCanvas (sourceCanvas) {
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')
      var width = sourceCanvas.width
      var height = sourceCanvas.height

      canvas.width = width
      canvas.height = height
      context.imageSmoothingEnabled = true
      context.drawImage(sourceCanvas, 0, 0, width, height)
      context.globalCompositeOperation = 'destination-in'
      context.beginPath()
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
      context.fill()
      return canvas
    }

    function crop () {
      if (!croppable.value) return

      // crop
      const croppedCanvas = cropper.value.getCroppedCanvas()

      // round
      const roundedCanvas = getRoundedCanvas(croppedCanvas)

      // show
      const roundedImage = new Image()
      roundedImage.src = roundedCanvas.toDataURL()

      context.emit('onResult', roundedCanvas.toDataURL())
      context.emit('dialogClose')
    }

    onMounted(() => {
      initCropper()
    })

    return {

      cropperImgRef,

      resultRef,

      crop

    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-box {
  max-height: 600px;

  .img-cropper {
    width: 400px;
    height: 400px;
    margin: auto;
  }
}
.img-cropper :deep(.cropper-view-box),
.img-cropper :deep(.cropper-face) {
  border-radius: 50%;
}
</style>
