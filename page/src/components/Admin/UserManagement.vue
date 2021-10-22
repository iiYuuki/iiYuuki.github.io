<template>
  <div class="user-management-box">
    <div class="manage-box"
         style="align-items: start">

      <!-- 主页左上角标题 -->
      <div>主页左上角标题</div>
      <div class="row">
        <q-input class="text-input"
                 v-model="title"
                 outlined
                 @keyup.enter="setTitle"
                 dense
                 maxlength="20"
                 counter />
        <q-btn class="text-btn"
               label="确认"
               @click="setTitle"
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
          <q-img v-if="avatarImgURL"
                 :src="avatarImgURL" />
          <q-icon v-else
                  name="add" />
          <input type="file"
                 v-if="isInputAvatarAlive"
                 ref="avatarInputRef"
                 @change="onUploadAvatarChange">
        </div>
      </div>
    </div>

    <div class="manage-box links-box">

      <!-- 修改第三方账号链接 -->
      <div>修改第三方账号链接</div>
      <div class="row">
        <div v-for="(item, index) in thirdLinks"
             :key="index"
             class="row q-mb-sm"
             :style="`width: ${item.enable ? '100%' : 'auto'}; order: ${item.enable ? '1' : '0'}`">
          <i :class="item.iconClass + (item.enable ? ' text-pink' : '')"></i>
          <q-toggle size="sm"
                    @update:model-value="setLinks"
                    color="black"
                    v-model="item.enable" />
          <div class="row"
               v-if="item.enable">
            <q-input outlined
                     class="text-input"
                     v-model="item.link"
                     dense>
              <template v-slot:append>
                <q-icon v-if="item.link !== ''"
                        name="close"
                        @click="item.link = ''"
                        class="cursor-pointer" />
              </template>
            </q-input>
            <q-btn class="text-btn"
                   label="确认"
                   @click="setLinks"
                   color="black"
                   dense />
          </div>
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
import { ref, defineAsyncComponent, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { setUserAvatarImgURL, getUserAvatarImgURL, setUserTitle, getUserTitle, getThirdLinks, setThirdLinks } from '@/api'

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
    const avatarImgURL = ref('')
    const thirdLinks = ref([
      {
        name: 'qq',
        link: '',
        enable: false,
        iconClass: 'iconfont icon-QQ-circle-fill'
      },
      {
        name: 'steam',
        link: '',
        enable: false,
        iconClass: 'iconfont icon-steam'
      },
      {
        name: 'bilibili',
        link: '',
        enable: false,
        iconClass: 'iconfont icon-icon_bilibili-circle'
      },
      {
        name: 'tieba',
        link: '',
        enable: false,
        iconClass: 'iconfont icon-tieba0'
      },
      {
        name: 'wangyiyun',
        link: '',
        enable: false,
        iconClass: 'iconfont icon-netease-cloud-music-fill'
      },
      {
        name: 'zhihu',
        link: '',
        enable: false,
        iconClass: 'iconfont icon-zhihu-circle-fill'
      }
    ])

    function getAvatarImg () {
      getUserAvatarImgURL()
        .then(res => {
          if (res.code === 200) {
            avatarImgURL.value = res.url
          } else {
            console.log('error')
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function getLinks () {
      getThirdLinks()
        .then(res => {
          if (res.code === 200) {
            thirdLinks.value = res.data
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
          setTimeout(() => {
            initPage()
          }, 200)
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

    function getTitle () {
      getUserTitle()
        .then(res => {
          if (res.code !== 200) {
            $q.notify({
              message: '页面发生错误！',
              position: 'top',
              timeout: 1500,
              color: 'green'
            })
          } else {
            title.value = res.title
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

    function setTitle () {
      setUserTitle({
        title: title.value
      }).then(res => {
        if (res.code === 200) {
          $q.notify({
            message: '修改成功！',
            position: 'top',
            timeout: 1500,
            color: 'green'
          })
          setTimeout(() => {
            initPage()
          }, 200)
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

    function setLinks () {
      setThirdLinks({
        thirdLinks: thirdLinks.value
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

    function initPage () {
      getAvatarImg()
      getTitle()
      getLinks()
    }

    onMounted(() => {
      initPage()
    })

    return {

      title,

      thirdLinks,

      isInputAvatarAlive,

      isCropAvatar,

      avatarInputRef,

      cropperAvatarImgURL,

      avatarImgURL,

      onUploadAvatarChange,

      onUploaderClick,

      onResultAvatar,

      setTitle,

      setLinks

    }
  }
}
</script>

<style lang="scss" scoped>
.user-management-box {
  .manage-box {
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);
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
      width: 200px;
      margin-right: 10px;
    }
    .text-btn {
      height: 40px;
      padding: 0 15px;
    }
    &.uploader-box {
      .uploader {
        position: relative;
        width: 60px;
        height: 60px;
        border: 1px dashed #333;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        &:hover {
          border: 1px dashed skyblue;
          opacity: 0.8;
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
        .q-img {
          width: 100%;
          height: 100%;
        }
      }
    }
    &.links-box {
      i {
        font-size: 28px;
      }
    }
  }
}
</style>
