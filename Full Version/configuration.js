var mysql = require("mysql");
var nodemailer = require('nodemailer');

module.exports ={
  connection : mysql.createConnection({
    host: '39.88.88.88',       //主机地址
    user: 'mysql_databases',    //用户名
    password: 'Qwerdfb',     //密码
    database: 'mysql_databases'     //数据库名
  }), //连接数据库
  email : nodemailer.createTransport({
    host: 'smtp.qq.com',//QQ邮箱的服务器
    port: 587,      //端口号
    secure: false, //465为true,其他为false
    auth: {
      user: 'z474112265@qq.com', // 自己的邮箱
      pass: '************'// 授权码
    }
  })
}