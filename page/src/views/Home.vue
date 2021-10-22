<template>
  <div class="home">
    <section class="main">
      <div class="w main-box row justify-center">

        <!-- 左侧主区域 -->
        <div class="main-left-box col-7">

          <!-- 内容部分 -->
          <router-link v-for="(item, index) in articleList"
                       :key="index"
                       :to="`/article/${item.articleID}`">
            <q-card class="articles hover-bigger"
                    v-ratio>
              <q-img :src="item.cover"></q-img>
              <div class="article-info-box">
                <p>{{ item.title }}</p>
                <span>{{ item.category }}</span>
              </div>
            </q-card>
          </router-link>

        </div>

        <!-- 右侧主区域 -->
        <div class="main-right-box col-3">

          <!-- 主用户盒子 -->
          <div class="user-box"
               @mouseenter="isMouseEnterUserbox = true"
               @mouseleave="isMouseEnterUserbox = false">
            <div class="column items-center">

              <!-- 头像 -->
              <q-avatar :class="!isMouseDownAvatar ? 'hover-bigger' : ''"
                        @mousedown="isMouseDownAvatar = true"
                        @mouseup="isMouseDownAvatar = false">
                <div v-if="isMouseEnterUserbox"
                     class="neon-circle">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <q-img :src="avatarImgURL" />
              </q-avatar>

              <!-- 个性签名 -->
              <div class="user-signature">{{ userSignature }}</div>

              <!-- 第三方平台账号链接 -->
              <div class="third-platform-account row items-center justify-center">
                <a v-for="(item, index) in thirdLinks"
                   :key="index"
                   :href="item.link"
                   target="_blank">
                  <i :class="item.iconClass"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getUserAvatarImgURL, getThirdLinks, getArticles } from '@/api'
import { useQuasar, QSpinnerIos } from 'quasar'

export default {
  name: 'Home',
  components: {

  },
  setup () {
    const $q = useQuasar()

    const avatarImgURL = ref('')
    const userSignature = ref('Never Mind.')
    const isMouseEnterUserbox = ref(false)
    const isMouseDownAvatar = ref(false)
    const articleList = ref([])

    const thirdLinks = ref([])

    function getUserAvatarImg () {
      getUserAvatarImgURL()
        .then(res => {
          if (res.code === 200) {
            avatarImgURL.value = res.url
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
        })
    }

    function getLinks () {
      getThirdLinks()
        .then(res => {
          if (res.code === 200) {
            thirdLinks.value = res.data.filter(item => {
              return item.enable
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

    function getArticleList () {
      $q.loading.show({
        spinner: QSpinnerIos,
        spinnerColor: 'white',
        spinnerSize: 140
      })

      getArticles()
        .then(res => {
          $q.loading.hide()
          if (res.code !== 200) {
            $q.notify({
              message: '页面发生错误！',
              position: 'top',
              timeout: 1500,
              color: 'red'
            })
          } else {
            articleList.value = res.data.sort((a, b) => {
              return b.createTime - a.createTime
            })
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
          $q.loading.hide()
          $q.notify({
            message: '页面发生错误！',
            position: 'top',
            timeout: 1500,
            color: 'red'
          })
        })
    }

    function pageInit () {
      getUserAvatarImg()
      getLinks()
      getArticleList()
    }

    onMounted(() => {
      pageInit()
    })

    return {

      avatarImgURL,
      userSignature,
      thirdLinks,
      isMouseEnterUserbox,
      isMouseDownAvatar,
      articleList

    }
  },
  directives: {
    ratio: el => {
      console.log(el)
      el.style.height = (el.clientWidth / 7 * 4) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .main {
    .main-box {
      .main-left-box {
        margin-right: 30px;
        .articles {
          position: relative;
          width: 100%;
          height: 300px;
          margin-bottom: 16px;
          background-color: rgba($color: #000000, $alpha: 0.7);
          cursor: pointer;
          .q-img {
            opacity: 0.7;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            mask: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9));
            animation: maskTransitionOut 0.2s forwards linear;
          }
          &:hover {
            background-color: rgba($color: #000000, $alpha: 0.9);
            .q-img {
              animation: maskTransitionHover 0.2s forwards linear;
            }
          }
          .article-info-box {
            position: absolute;
            z-index: 1;
            bottom: 0;
            height: 80px;
            width: 100%;
            color: white;
            padding: 10px 30px 10px;
            background: linear-gradient(to top, #000, transparent);
            transition: all 0.2s;
            p {
              margin: 0;
              margin-bottom: 10px;
              font-size: 18px;
              font-weight: 600;
            }
            span {
              font-size: 14px;
              color: #aaa;
            }
          }
        }
      }
      .main-right-box {
        .user-box {
          position: sticky;
          top: 1px;
          filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.45));
          border-radius: 9px;
          overflow: hidden;
          box-shadow: none;
          transition: all 0.2s;
          * {
            transition: all 0.2s;
          }
          &:hover {
            transition: 0.2s;
            box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
              0 3px 1px -2px rgb(0 0 0 / 12%);
            filter: none;
            > div {
              mask: none;
              background-color: #333;
              color: #fff;
            }
            .third-platform-account a {
              color: #fff;
            }
          }
          > div {
            padding: 10px 0;
            background-color: rgba(246, 239, 233, 0.8);
            mask: linear-gradient(
              90deg,
              transparent 0%,
              #000 5%,
              #000 95%,
              transparent 100%
            );
            .q-avatar {
              position: relative;
              z-index: 2;
              border-radius: 50%;
              height: 48px;
              width: 48px;
              margin-bottom: 12px;
              cursor: pointer;
              box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.5);
              .neon-circle {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 0;
              }
              .q-img {
                width: 100%;
                height: 100%;
              }
              &:hover {
                box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.9);
              }
            }
            .user-signature {
              font-weight: 600;
              cursor: default;
              margin-bottom: 26px;
            }
            .third-platform-account {
              a {
                transition: none;
                color: #333;
                margin: 0 10px 10px;
                i {
                  line-height: 42px;
                  font-size: 42px;
                  &.icon-steam {
                    font-size: 38px;
                  }
                  &.icon-icon_bilibili-circle {
                    font-size: 45px;
                  }
                }
                &:hover {
                  color: pink;
                }
                &:link {
                  font-weight: 400;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
