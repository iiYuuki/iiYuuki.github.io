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

const pathOfImgs = getIp() + '/static/imgs/'
const pathOfDB = getIp() + '/static/db/'
const CurrentPathOfDB = path.join(__dirname, 'public', 'db') // 数据库文件夹
const CurrentPathOfImgs = path.join(__dirname, 'public', 'imgs') // 图片路径
const CurrentPathOfUser = path.join(CurrentPathOfDB, 'user.json') // 用户
const CurrentPathOfArticle = path.join(CurrentPathOfDB, 'article.json') // 文章

// 跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// 增加解析post请求的中间件
app.use(express.urlencoded({ extended: true, parameterLimit: 50000, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use('/static', express.static(path.join(__dirname, 'public')))

// 监听端口3000
app.listen(3000)

app.get('/', (req, res) => {
  const realPath = path.join(__dirname, 'public', '123.txt')
  res.download(realPath)
}
)

// 上传图片总方法
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, path.join(__dirname, 'public', 'imgs'))
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const uploader = multer({ storage: storage })
app.post('/file', uploader.single('file'), (req, res, next) => {
  res.status(200).send({
    url: pathOfImgs + req.file.filename
  })
})

// 获取用户头像接口
app.post('/user/avatar/get', (req, res, next) => {
  res.status(200).send({
    code: 200,
    url: getUserData(0).userAvatarURL
  })
})

// 设置用户头像接口
app.post('/user/avatar/set', (req, res, next) => {
  const url = writeBase64Png('avatar', req.body.url)

  if (url) {
    res.send({
      code: 200,
      url: url
    })
    setUserData(0, {
      userAvatarURL: url
    })
  } else {
    res.status(500).send({
      code: -1
    })
  }
})

// 设置主页左上角标题
app.post('/user/title/set', (req, res, next) => {
  try {
    setUserData(0, {
      userTitle: req.body.title
    })
    res.status(200).send({
      code: 200
    })
  } catch (err) {
    res.status(500).send({
      code: -1
    })
  }
})

// 获取主页左上角标题
app.post('/user/title/get', (req, res, next) => {
  const data = getUserData(0).userTitle
  res.send({
    title: data,
    code: 200
  })
})

// 获取第三方平台账号链接
app.post('/user/thirdlinks/get', (req, res, next) => {
  const data = getUserData(0).thirdLinks
  res.send({
    code: 200,
    data: data
  })
})

// 设置第三方平台账号链接
app.post('/user/thirdlinks/set', (req, res, next) => {
  try {
    setUserData(0, {
      thirdLinks: req.body.thirdLinks
    })
    res.send({
      code: 200
    })
  } catch (err) {
    res.status(400).send({
      code: -1
    })
  }
})

// 获取文章数据
app.post('/article/get', (req, res, next) => {
  const data = getArticleData(0).articles.map(article => {
    article.content = ''
    return article
  })
  res.send({
    code: 200,
    data: data
  })
})

// 获取指定用户的单篇文章数据
app.post('/article/getone', (req, res, next) => {
  const data = getArticleData(0).articles
  data.some(item => {
    if (item.articleID === req.body.articleID) {
      res.send({
        code: 200,
        data: item
      })
      return item.articleID === req.body.articleID
    }
  })
})

// 编辑文章
app.post('/article/edit', (req, res, next) => {
  try {
    setArticleData(0, {
      title: req.body.title,
      content: req.body.content,
      cover: req.body.cover,
      articleID: req.body.articleID,
      category: req.body.category
    }, false)
    res.send({
      code: 200
    })
  } catch (err) {
    res.status(400).send({
      code: -1
    })
  }
})

// 添加文章
app.post('/article/add', (req, res, next) => {
  try {
    setArticleData(0, {
      title: req.body.title,
      content: req.body.content,
      cover: req.body.cover,
      category: req.body.category,
      createTime: parseInt(Date.now() / 1000)
    }, false)
    res.send({
      code: 200
    })
  } catch (err) {
    res.status(400).send({
      code: -1,
      errMsg: err
    })
  }
})

// 删除文章
app.post('/article/delete', (req, res, next) => {
  try {
    setArticleData(0, {
      articleID: req.body.articleID
    }, true)
    res.send({
      code: 200
    })
  } catch (err) {
    res.status(400).send({
      code: -1
    })
  }
})

// -----------------------接口部分结束

// APP报错时返回500
app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

// -----------------------方法部分

// 返回当前ip+端口号
function getIp () {
  const f = os.networkInterfaces()
  for (const i in f) {
    const face = f[i]
    let addr = null
    face.some(item => {
      if (item.address !== '127.0.0.1' && item.family === 'IPv4') {
        addr = 'http://' + item.address + ':3000'
        return item.address !== '127.0.0.1' && item.family === 'IPv4'
      }
    })
    if (addr !== null) {
      return addr
    }
  }
}

// 返回用户数据列表
function getUserDataList () {
  const data = fs.readFileSync(CurrentPathOfUser)
  return JSON.parse(data)
}

// 返回指定用户数据
function getUserData (id) {
  const dataArr = getUserDataList()
  let data
  dataArr.some(item => {
    if (item.userID === id) {
      data = item
      return item.userID === id
    }
  })
  return data
}

// 返回文章用户数据列表
function getArticleDataList () {
  const data = fs.readFileSync(CurrentPathOfArticle)
  return JSON.parse(data)
}

// 返回指定用户的文章信息
function getArticleData (id) {
  const dataArr = getArticleDataList()
  let data
  dataArr.some(item => {
    if (item.userID === id) {
      data = item
      return item.userID === id
    }
  })
  return data
}
// 设置用户数据
function setUserData (id, params) {
  const dataArr = getUserDataList()
  dataArr.map((item) => {
    if (item.userID === id) {
      for (const i in params) {
        item[i] = params[i]
      }
    }
  })
  fs.writeFile(CurrentPathOfUser, JSON.stringify(dataArr, null, 2), err => {
    if (err) {
      console.log(err)
    }
  })
}
// 设置文章数据
function setArticleData (id, params, isDelete) {
  const dataArr = getArticleDataList()
  dataArr.map((item) => {
    if (item.userID === id) {
      if (params.articleID === undefined) {
        item.articles.push({
          title: params.title,
          content: params.content,
          cover: params.cover,
          articleID: item.articles.length + 1,
          category: params.category,
          createTime: params.createTime
        })
      } else {
        if (isDelete === true) {
          item.articles = item.articles.filter(item => {
            return item.articleID !== params.articleID
          })
          item.articles.map((article, index, arr) => {
            article.articleID = index + 1
          })
        } else {
          item.articles.map(article => {
            console.log(article.articleID)
            if (article.articleID === params.articleID) {
              console.log(123)
              for (const i in params) {
                article[i] = params[i]
              }
            }
          })
        }
      }
    }
  })
  fs.writeFile(CurrentPathOfArticle, JSON.stringify(dataArr, null, 2), err => {
    if (err) {
      console.log(err)
    }
  })
}

// base64写入图片
function writeBase64Png (fname, urlBase64) {
  const filename = Date.now() + `-${fname}.png`
  const filepath = path.join(CurrentPathOfImgs, filename)
  const dataBuffer = Buffer.from(urlBase64.split(',')[1], 'base64')
  try {
    fs.writeFileSync(filepath, dataBuffer)
    return pathOfImgs + filename
  } catch (err) {
    console.log(err)
    return false
  }
}

// ------------------------方法部分结束
