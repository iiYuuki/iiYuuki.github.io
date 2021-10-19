<template>
  <div class="article-main-box">
    <article class="w">
      <h2 class="title">{{ 'article ID: ' + id }}</h2>
      <div class="main">
        <p>article article article article</p>
        <p>article article article article</p>
        <p>article article article article</p>
        <p>article article article article</p>
        <p>article article article article</p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['id'],
  setup (props, context) {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.article-main-box {
  article {
    .title {
      text-align: center;
    }
    .main {
    }
  }
}
</style>
