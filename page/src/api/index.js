import axios from 'axios'

const _baseURL = 'http://' + location.hostname + ':3000'

const service = axios.create({
  baseURL: _baseURL,
  timeout: 30000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    console.log(err)
  }
)

// response拦截器
service.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    console.log(err)
  }
)

export default service

// ------接口部分

// 获取用户头像
export function getUserAvatarImgURL (data) {
  return service.post(
    '/user/avatar/get',
    data)
}

// 设置用户头像
export function setUserAvatarImgURL (data) {
  return service.post(
    '/user/avatar/set',
    data)
}

// 获取主页左上角标题
export function getUserTitle (data) {
  return service.post(
    '/user/title/get',
    data)
}

// 设置主页左上角标题
export function setUserTitle (data) {
  return service.post(
    '/user/title/set',
    data)
}

// 获取第三方平台账号链接
export function getThirdLinks (data) {
  return service.post(
    '/user/thirdlinks/get',
    data)
}

// 设置第三方平台账号链接
export function setThirdLinks (data) {
  return service.post(
    '/user/thirdlinks/set',
    data)
}

// 获取文章列表信息
export function getArticles (data) {
  return service.post(
    '/article/get',
    data)
}

// 获取文章数据
export function getArticle (data) {
  return service.post(
    '/article/getone',
    data)
}

// 编辑文章
export function EditArticle (data) {
  return service.post(
    '/article/edit',
    data)
}

// 新建文章
export function addArticle (data) {
  return service.post(
    '/article/add',
    data)
}

// 删除文章
export function deleteArticle (data) {
  return service.post(
    '/article/delete',
    data)
}
