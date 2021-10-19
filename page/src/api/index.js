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
export function getUserAvatarImgURL () {
  return service.post(
    '/user/avatar/get')
}

// 设置用户头像
export function setUserAvatarImgURL (data) {
  return service.post(
    '/user/avatar/set',
    data)
}
