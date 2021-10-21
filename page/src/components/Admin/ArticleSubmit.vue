<template>
  <q-card class="dialog-box">

    <!-- X 关闭按钮 -->
    <q-btn icon="close"
           class="close-icon"
           style="z-index: 2"
           flat
           :disable="isAdding"
           round
           dense
           v-close-popup />

    <!-- 内容区域 -->
    <q-card-section>

      <q-form @submit="submit"
              class="form-box">

        <!-- 封面 -->
        <div class="cover-box relative-position flex flex-center"
             @click="upload">
          <q-img v-if="coverURL"
                 :src="coverURL"
                 fit="contain"
                 spinner-color="white"
                 style="height: 120px; max-width: 210px" />
          <q-icon v-else
                  name="add"
                  size="lg"></q-icon>
          <input type="file"
                 @change="onChange"
                 ref="fileInputRef">
        </div>

        <div class="row input-outer-box">
          <div class="col-3 form-label">文章标题<span style="color: #F35676">*</span></div>
          <div class="col-7 row items-center">

            <!-- 标题 -->
            <q-input class="col"
                     outlined
                     counter
                     dense
                     :disable="isAdding"
                     maxlength="20"
                     placeholder="最大20个文字"
                     v-model="title"
                     :rules="[
                    val => val !== null && val !== '' || '文章标题不能为空！',
             ]" />
          </div>
        </div>

        <div class="flex flex-center q-mb-sm">

          <!-- 确认按钮 -->
          <q-btn class="confirm-button"
                 push
                 :loading="isAdding"
                 label="确认"
                 type="submit"
                 color="primary" />
        </div>

      </q-form>

    </q-card-section>

  </q-card>

  <!-- 裁切封面弹出框 -->
  <q-dialog no-backdrop-dismiss
            v-model="isCrop">
    <CropperRect :imgURL="cropperImgURL"
                 @dialogClose="isCrop = false"
                 @onResult="onResult" />
  </q-dialog>
</template>

<script>
import { onMounted, ref, defineAsyncComponent } from 'vue'
import { useQuasar } from 'quasar'
import { addArticle } from '@/api'
import { useRouter } from 'vue-router'

export default {
  name: 'Cropper Avatar Component',

  emits: ['dialogClose'],

  props: ['content'],

  components: {
    CropperRect: defineAsyncComponent(() => import('./CropperRect.vue'))
  },

  setup (props, context) {
    const $q = useQuasar()
    const router = useRouter()

    const title = ref('')
    const fileInputRef = ref(null)
    const isCrop = ref(false)
    const isAdding = ref(false)
    const cropperImgURL = ref('')
    const coverURL = ref('')

    function submit () {
      if (!coverURL.value) return
      isAdding.value = true
      addArticle({
        title: title.value,
        content: props.content,
        cover: coverURL.value
      }).then(res => {
        if (res.code === 200) {
          $q.notify({
            position: 'top',
            timeout: 1500,
            message: '添加文章成功！',
            color: 'green'
          })
          router.push('/admin/article')
        } else {
          $q.notify({
            position: 'top',
            timeout: 1500,
            message: '添加失败！',
            color: 'red'
          })
        }
      }).catch(err => {
        console.log(err)
        $q.notify({
          position: 'top',
          timeout: 1500,
          message: '请上传图片文件！',
          color: 'red'
        })
      })
    }

    function upload () {
      fileInputRef.value.click()
    }

    function onChange (event) {
      const file = event.target.files[0]
      if (!checkFile(file)) return
      console.log(file)
      const URL = window.URL || window.webkitURL
      cropperImgURL.value = URL.createObjectURL(file)
      isCrop.value = true
    }

    function checkFile (file) {
      if (!file.type.includes('image')) {
        $q.notify({
          position: 'top',
          timeout: 1500,
          message: '请上传图片文件！',
          color: 'red'
        })
        return false
      }
      return true
    }

    function onResult (url) {
      coverURL.value = url
    }

    onMounted(() => {

    })

    return {
      title,
      fileInputRef,
      cropperImgURL,
      isCrop,
      coverURL,
      isAdding,

      onChange,
      upload,
      submit,
      onResult
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-box {
  max-height: 600px;
  .cover-box {
    width: 210px;
    height: 120px;
    cursor: pointer;
    margin: auto;
    border-radius: 6px;
    margin-top: 10px;
    margin-bottom: 40px;
    overflow: hidden;
    :deep(img) {
      object-position: 0 50% !important;
    }
    &:hover {
      opacity: 0.8;
      border: 1px dashed tomato;
      .q-icon {
        color: tomato;
      }
    }
    input {
      display: none;
    }
  }
}
</style>
