var express = require("express");
var app = express();                
var moment = require('moment')();//时间模块
var router = require("./sql");   //导入router模块
var timing = require('./timing');
var bodyParser = require('body-parser')   //解析请求体

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.use(router);                    //导入路由中间件
app.use(express.static('public'));  //静态资源管理

app.listen(4000,function(){       //设置端口号
  console.log('127.0.0.1');   //process.env.PORT
})
