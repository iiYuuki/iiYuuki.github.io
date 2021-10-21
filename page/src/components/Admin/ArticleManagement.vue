<template>
  <div class="article-management-box">

    <!-- 文章区域 -->
    <div>

      <div class="row q-mb-md">
        <q-btn label="写文章"
               @click="$router.push('/admin/article/add')"
               color="primary" />
      </div>

      <div v-if="articleList.length > 0">
        <div v-for="(item, index) in articleList"
             :key="index"
             class="articles row">

          <!-- 图片 -->
          <router-link :to="`/admin/article/edit/${item.articleID}`">
            <q-img :src="item.cover" />
          </router-link>

          <!-- 信息区域 -->
          <div class="article-info-box column justify-between">
            <div class="row items-center">

              <!-- 分类 -->
              <div class="article-category-box">技术</div>

              <!-- 标题 -->
              <router-link :to="`/admin/article/edit/${item.articleID}`">{{ item.title }}</router-link>

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

            <!-- 删除 -->
            <q-btn round
                   size="md"
                   color="red"
                   class="q-mr-md"
                   icon="delete" />
          </div>
        </div>
      </div>

      <!-- 暂无数据 -->
      <div v-else
           class="nodata-box">暂无数据</div>
    </div>

  </div>
</template>

<script>
import { getArticles } from '@/api'
import { useQuasar } from 'quasar'
import { onMounted, ref } from '@vue/runtime-core'

export default {
  setup () {
    const $q = useQuasar()

    const articleList = ref([])

    function getArticleList () {
      getArticles()
        .then(res => {
          if (res.code !== 200) {
            $q.notify({
              message: '页面发生错误！',
              position: 'top',
              timeout: 1500,
              color: 'green'
            })
          } else {
            articleList.value = res.data
            console.log(res)
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

    onMounted(() => {
      getArticleList()
    })

    return {

      articleList

    }
  }
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
  .nodata-box {
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);
    border-radius: 6px;
    background-color: #fff;
    text-align: center;
    height: 300px;
    line-height: 300px;
    font-size: 30px;
    font-weight: 700;
    color: #888;
  }
}
</style>
