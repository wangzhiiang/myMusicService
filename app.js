var express = require('express')
var app = express()

var fs = require("fs");
var config = require('./config')
// https://github.com/Automattic/mongoose
var mongoose = require('mongoose')
// https://www.npmjs.com/package/koa2-cors
var cors = require('cors')
// https://www.npmjs.com/package/koa-bodyparser
var bodyParser = require('body-parser')
var music = require('./models.js')

app.use(express.static('public'))
var multer  = require('multer')
var upload = multer({ dest: 'public/upload/'})
app.use(cors())
// 创建 application/json 编码解析
app.use(bodyParser.json())

mongoose.connect(config.db, {
  useNewUrlParser: true
}, (err) => {
  if (err) {
    console.error('Failed to connect to database')
  } else {
    console.log('Connecting mongoodb successfully')
  }
})

// 获取全部音乐
app.get('/api/list', function (req, res) {
  music.find().limit(10).exec(function (err, data) {
    res.send({
      code: 0,
      msg: 'OK',
      data: data
    })
  })
})

// 根据id获取音乐
app.get('/api/detail', function (req, res) {
  music.findById(req.query.id, function (err, data) {
    res.send({
      code: 0,
      msg: 'OK',
      data: data
    })
  })
})

// 
app.post('/api/uploadFile', upload.array('file'), function (req, res) {
  let file = req.files[0]
  res.send({
    url: 'http:\\\\localhost:3000' + file.path.replace(/public/, '')
  })
})


// 获取全部音乐
app.get('/api/list', function (req, res) {
  music.find().limit(10).exec(function (err, data) {
    res.send({
      code: 0,
      msg: 'OK',
      data: data
    })
  })
})

// 根据id获取音乐
app.get('/api/detail', function (req, res) {
  music.findById(req.query.id, function (err, data) {
    res.send({
      code: 0,
      msg: 'OK',
      data: data
    })
  })
})

// 根据id更新歌曲信息
app.post('/api/edit', function (req, res) {
  console.log()
  music.updateOne(req.query.id, req.body, function (err, data) {
    res.send({
      code: 0,
      msg: 'OK',
      data: data
    })
  })
})

// 添加音乐
app.post('/api/add', function (req, res) {
  var myDate = new Date()
  var musicData = new music({
    id: myDate.getTime(),
    title: req.body.title,
    singer: req.body.singer,
    singUrl: req.body.singUrl,
    posterURL: req.body.posterURL
  })

  musicData.save(function (err, data) {
    if (err) {
      console.log(err)
    } else {
      res.send({
        code: 0,
        msg: '保存成功',
        data: ''
      })
      console.log('保存成功')
    }
  })
})

// 根据id删除音乐
app.delete('/api/delete', function (req, res) {
  music.findByIdAndRemove(req.body.id, function (err, data) {
    res.send({
      code: 0,
      msg: '删除成功',
      data: ''
    })
  })
})

app.listen(config.port, function () {
  console.log('访问地址为http:localhost:', config.port)
})