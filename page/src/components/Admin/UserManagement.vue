<template>
  <div class="user-management-box">
    <div class="manage-box">

      <!-- 主页左上角标题 -->
      <div>主页左上角标题</div>
      <div class="row">
        <q-input class="text-input"
                 v-model="title"
                 outlined
                 dense
                 maxlength="20"
                 counter />
        <q-btn class="text-btn"
               label="确认"
               color="black"
               dense />
      </div>
    </div>

    <div class="manage-box uploader-box">

      <!-- 修改主页user头像 -->
      <div>主页user头像</div>
      <div>
        <div class="uploader"
             @click="onUploaderClick">
          <q-icon name="add" />
          <input type="file"
                 v-if="isInputAvatarAlive"
                 ref="avatarInputRef"
                 @change="onUploadAvatarChange">
        </div>
      </div>
    </div>

  </div>

  <!-- 裁切头像弹出框 -->
  <q-dialog no-backdrop-dismiss
            v-model="isCropAvatar">
    <CropperAvatar :imgURL="cropperAvatarImgURL"
                   @dialogClose="isCropAvatar = false"
                   @onResult="onResultAvatar" />
  </q-dialog>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue'
import { useQuasar } from 'quasar'
import { setUserAvatarImgURL } from '@/api'

export default {
  components: {
    CropperAvatar: defineAsyncComponent(() => import('./CropperAvatar.vue'))
  },

  setup () {
    const $q = useQuasar()

    const title = ref('')
    const isInputAvatarAlive = ref(true)
    const isCropAvatar = ref(false)
    const avatarInputRef = ref(null)

    const cropperAvatarImgURL = ref('')

    function onUploadAvatarChange (event) {
      const file = event.target.files[0]
      if (!checkFile(file)) return
      console.log(file)
      const URL = window.URL || window.webkitURL
      cropperAvatarImgURL.value = URL.createObjectURL(file)
      isCropAvatar.value = true
    }

    function onUploaderClick () {
      avatarInputRef.value.click()
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

    function onResultAvatar (url) {
      setUserAvatarImgURL({
        url: url
      }).then(res => {
        if (res.code === 200) {
          $q.notify({
            message: '修改成功！',
            position: 'top',
            timeout: 1500,
            color: 'green'
          })
        } else {
          $q.notify({
            message: '修改失败！',
            position: 'top',
            timeout: 1500,
            color: 'green'
          })
        }
      }).catch(err => {
        console.log(err)
        $q.notify({
          message: '修改失败！',
          position: 'top',
          timeout: 1500,
          color: 'green'
        })
      })
    }

    return {

      title,

      isInputAvatarAlive,

      isCropAvatar,

      avatarInputRef,

      cropperAvatarImgURL,

      onUploadAvatarChange,

      onUploaderClick,

      onResultAvatar

    }
  }
}
</script>

<style lang="scss" scoped>
.manage-box {
  display: flex;
  justify-items: center;
  justify-content: center;
  > div:nth-child(1) {
    width: 40%;
    height: 40px;
    line-height: 40px;
    text-align: right;
    margin-right: 30px;
  }
  > div:nth-child(2) {
    flex: 1;
    width: 50%;
    line-height: 40px;
  }
  .text-input {
    width: 150px;
    margin-right: 10px;
  }
  .text-btn {
    height: 40px;
    padding: 0 15px;
  }
  &.uploader-box {
    align-items: center;
    .uploader {
      position: relative;
      width: 60px;
      height: 60px;
      border: 1px dashed #333;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        border: 1px dashed skyblue;
        .q-icon {
          color: skyblue;
        }
      }
      .q-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 20px;
        transform: translate(-50%, -50%);
      }
      input {
        display: none;
      }
    }
  }
}
</style>
