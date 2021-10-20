<template>
  <div class="article-management-box">

    <!-- 文章区域 -->
    <div class="articles row">

      <!-- 图片 -->
      <router-link to="/admin/article/edit">
        <q-img src="@/assets/bg1.jpg" />
      </router-link>

      <!-- 信息区域 -->
      <div class="article-info-box column justify-between">
        <div class="row items-center">

          <!-- 分类 -->
          <div class="article-category-box">技术</div>

          <!-- 标题 -->
          <router-link to="/admin/article/edit">这是文章1</router-link>

        </div>

        <!-- 时间 -->
        <p class="time">2021-10-19 18:22:33</p>

        <div class="row views-info">

          <!-- 阅读量 -->
          <div>
            <q-icon name="visibility" /> 阅读量 12
          </div>

        </div>

      </div>

      <div class="col"></div>

      <!-- 管理操作区域 -->
      <div class="row items-center">

        <!-- 编辑 -->
        <q-btn round
               size="md"
               class="q-mr-md"
               color="primary"
               icon="edit" />

        <!-- 删除 -->
        <q-btn round
               size="md"
               color="red"
               class="q-mr-md"
               icon="delete" />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.article-management-box {
  .articles {
    padding: 10px;
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);
    border-radius: 6px;
    background-color: #fff;
    .q-img {
      width: 210px;
      height: 120px;
      border-radius: 6px;
      margin-right: 20px;
    }
    .article-info-box {
      .article-category-box {
        display: inline-block;
        border: 1px solid #ccc;
        font-size: 12px;
        border-radius: 24px;
        padding: 0 6px;
        color: #888;
        margin-right: 10px;
        vertical-align: middle;
      }
      a {
        font-size: 18px;
        line-height: 26px;
      }
      .time {
        font-size: 14px;
        color: #999;
      }
      .views-info {
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>
