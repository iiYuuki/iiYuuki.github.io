<template>
  <div class="home">
    <section class="main">
      <div class="w main-box row justify-center">

        <!-- 左侧主区域 -->
        <div class="main-left-box col-8">

          <!-- 内容部分 -->
          <router-link v-for="(i, index) in 10"
                       :key="index"
                       :to="`/article/${i}`">
            <q-card class="articles hover-bigger">
              <q-img src="@/assets/bg1.jpg"></q-img>
              <div class="article-info-box">
                <p>Hello Blog{{ i }}</p>
                <span>Nothing..but lies</span>
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
                <q-img src="@/assets/avatar-iyuuki.jpg" />
              </q-avatar>

              <!-- 个性签名 -->
              <div class="user-signature">{{ userSignature }}</div>

              <!-- 第三方平台账号链接 -->
              <div class="third-platform-account row items-center justify-center">
                <a href="https://qm.qq.com/cgi-bin/qm/qr?k=nla0KRoCmMkF5TpcMDWlCC6L1-v-iDuf&noverify=0"
                   target="_blank"><i class="iconfont icon-QQ-circle-fill"></i></a>
                <a href="https://steamcommunity.com/id/iYuukidesu/"
                   target="_blank"><i class="iconfont icon-steam"></i></a>
                <a href="https://space.bilibili.com/22388335"
                   target="_blank"><i class="iconfont icon-icon_bilibili-circle"></i></a>
                <a href="https://tieba.baidu.com/home/main?id=tb.1.b632cb9a.Du5BF1MqLUTChCpMzLPklQ"
                   target="_blank"><i class="iconfont icon-tieba0"></i></a>
                <a href="https://music.163.com/#/user/home?id=291899294"
                   target="_blank"><i class="iconfont icon-netease-cloud-music-fill"></i></a>
                <a href="https://www.zhihu.com/people/SiroApple"
                   target="_blank"><i class="iconfont icon-zhihu-circle-fill"></i></a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Home',
  components: {

  },
  setup () {
    const avatarImgURL = ref('')
    const userSignature = ref('Never Mind.')
    const isMouseEnterUserbox = ref(false)
    const isMouseDownAvatar = ref(false)

    return {

      avatarImgURL,

      userSignature,

      isMouseEnterUserbox,

      isMouseDownAvatar

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
              img {
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
