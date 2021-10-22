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
              <div class="article-category-box">{{ item.category }}</div>

              <!-- 标题 -->
              <router-link :to="`/admin/article/edit/${item.articleID}`">{{ item.title }}</router-link>

            </div>

            <!-- 时间 -->
            <p class="time">{{ formattedTime(item.createTime) }}</p>

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
                   @click="deleteClick(item.articleID)"
                   icon="delete" />
          </div>

        </div>
      </div>

      <!-- 暂无数据 -->
      <div v-else
           class="nodata-box">暂无数据</div>
    </div>
  </div>

  <!-- 删除文章弹出框 -->
  <q-dialog no-backdrop-dismiss
            v-model="isDelete">
    <q-card class="dialog-box">

      <!-- X 关闭按钮 -->
      <q-btn icon="close"
             class="close-icon"
             style="z-index: 2"
             flat
             :disable="isDeleting"
             round
             dense
             v-close-popup />

      <q-card-section class="form-box">
        <div class="flex justify-between q-mb-sm">

          <!-- 取消按钮 -->
          <q-btn class="cancel-button"
                 push
                 :loading="isDeleting"
                 label="取消"
                 v-close-popup
                 color="primary" />

          <!-- 确认按钮 -->
          <q-btn class="confirm-button"
                 push
                 :loading="isDeleting"
                 label="确认"
                 @click="deleteConfirm(articleID)"
                 color="primary" />
        </div>
      </q-card-section>

    </q-card>

  </q-dialog>
</template>

<script>
import { getArticles, deleteArticle } from '@/api'
import { useQuasar, QSpinnerIos } from 'quasar'
import { computed, onMounted, ref } from '@vue/runtime-core'

export default {
  setup () {
    const $q = useQuasar()

    const articleList = ref([])
    const isDelete = ref(false)
    const isDeleting = ref(false)
    const articleID = ref('')

    const formattedTime = computed(() => time => {
      const t = new Date(time * 1000)
      const Y = t.getFullYear()
      const M = (t.getMonth() + 1).toString().padStart(2, 0)
      const D = t.getDate().toString().padStart(2, 0)
      const h = t.getHours().toString().padStart(2, 0)
      const m = t.getMinutes().toString().padStart(2, 0)
      const s = t.getSeconds().toString().padStart(2, 0)
      return `${Y}-${M}-${D} ${h}:${m}:${s}`
    })

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

    function deleteClick (id) {
      isDelete.value = true
      articleID.value = id
    }

    function deleteConfirm (id) {
      isDeleting.value = true
      deleteArticle({
        articleID: id
      }).then(res => {
        isDeleting.value = false
        isDelete.value = false
        if (res.code === 200) {
          $q.notify({
            message: '删除成功！',
            position: 'top',
            timeout: 1500,
            color: 'green'
          })
          getArticleList()
        } else {
          $q.notify({
            message: '页面发生错误！',
            position: 'top',
            timeout: 1500,
            color: 'red'
          })
        }
      }).catch(err => {
        isDeleting.value = false
        isDelete.value = false
        console.log(err)
        $q.notify({
          message: '页面发生错误！',
          position: 'top',
          timeout: 1500,
          color: 'red'
        })
      })
    }

    onMounted(() => {
      getArticleList()
    })

    return {

      articleList,
      formattedTime,
      isDelete,
      isDeleting,
      articleID,

      deleteConfirm,
      deleteClick

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
    margin-bottom: 10px;
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
.dialog-box {
  padding-top: 40px;
}
</style>
