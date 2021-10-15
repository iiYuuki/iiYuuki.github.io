<template>
  <div class="home">
    <header>
      <div class="bg"></div>
      <div class="w header-box row items-center">
        <q-avatar>
          <span>iYuuki</span>
        </q-avatar>
        <div class="col"></div>
        <nav class="header-nav row">
          <router-link to="/">主页</router-link>
          <router-link to="/about">关于</router-link>
        </nav>
      </div>
    </header>
    <section class="hotpoint">
      <div class="w hotpoint-box"></div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: #eddfd2;
  header {
    position: relative;
    height: 100px;
    background-color: rgba(0, 0, 0, 1);
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0.9;
      z-index: 0;
      background-image: url('../assets/home-hotpoint-bg.png');
      background-repeat: no-repeat;
      background-color: rgb(51, 48, 73);
      background-size: 2860px;
      background-position-x: 50%;
    }
    .header-box {
      position: relative;
      z-index: 1;
      height: 100%;
      .q-avatar {
        span {
          font-size: 18px;
          font-weight: 700;
          color: #eddfd2;
        }
      }
      .header-nav {
        :deep(a) {
          margin-right: 10px;
          color: #eddfd2;
        }
        :deep(a:hover) {
          color: tomato;
        }
      }
    }
  }

  .hotpoint {
  }
}
</style>
