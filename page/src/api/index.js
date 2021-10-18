import axios from 'axios'

let _baseURL = 'http://' + location.hostname + ':3000'

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