const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const mime = require('mime')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const os = require('os')

const app = express()

// 跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// 增加解析post请求的中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))

// 监听端口3000
app.listen(3000)

app.get('/', (req, res) => {
  const realPath = path.join(__dirname, 'public', '123.txt')
  res.download(realPath)
}
)

// 上传总方法
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, path.join(__dirname, 'public'))
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const uploader = multer({ storage: storage })
app.post('/file', uploader.single('file'), (req, res, next) => {
  const a = req.file
  console.log(a)
  res.status(200).send('ok')
})

// 获取iYuuki头像接口
app.post('/iyuuki/avatar', (req, res, next) => {
  res.status(200).send({
    code: 200,
    url: 'http://' + getIp() + '/static/imgs/avatar-iyuuki.jpg'
  })
})

// APP报错时返回500
app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

// 返回当前ip+端口号
function getIp () {
  const f = os.networkInterfaces()
  for (const i in f) {
    const face = f[i]
    let addr
    face.some(item => {
      if (item.address !== '127.0.0.1' && item.family === 'IPv4') {
        addr = item.address + ':3000'
      }
    })
    return addr
  }
}
