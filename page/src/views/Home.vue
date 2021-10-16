<template>
  <div class="home">
    <section class="main">
      <div class="w main-box row">

        <!-- 左侧主区域 -->
        <div class="main-left-box col-8">

          <q-card class="articles">
            <q-img src="@/assets/bg1.jpg"></q-img>
            <div class="article-info-box">
              <p>Hello Blog</p>
              <span>Nothing..but lies</span>
            </div>
          </q-card>
        </div>

        <!-- 右侧主区域 -->
        <div class="main-right-box col-3">

          <!-- 主用户盒子 -->
          <q-card class="user-box column items-center">

            <!-- 头像 -->
            <q-avatar>
              <q-img src="@/assets/avatar-iyuuki.jpg" />
            </q-avatar>

            <!-- 个性签名 -->
            <span class="user-signature">{{ userSignature }}</span>
          </q-card>
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

    return {

      avatarImgURL,

      userSignature

    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-color: #eddfd2;
  .main {
    .main-box {
      .main-left-box {
        margin-right: 20px;
        .articles {
          position: relative;
          width: 100%;
          height: 300px;
          margin-bottom: 16px;
          background-color: rgba($color: #000000, $alpha: 0.9);
          cursor: pointer;
          .q-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            mask: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
            animation: maskTransitionOut 0.2s forwards linear;
          }
          &:hover {
            .q-img {
              animation: maskTransitionHover 0.2s forwards linear;
            }
            .article-info-box {
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
          padding: 10px 0;
          background-color: rgba($color: #fff, $alpha: 0.5);
          .q-avatar {
            border-radius: 50%;
            height: 48px;
            width: 48px;
            margin-bottom: 12px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .user-signature {
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
