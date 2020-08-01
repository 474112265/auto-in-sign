var express = require("express");
var app = express();
var router = express.Router();
var request = require('request');
var init = require('./configuration');
var moment = require('moment')();

class resJson {        //创建相应类
  status;
  resText;
  constructor(status, resText) {
    this.status = status | undefined;
    this.resText = resText | undefined;
  }
  init(status, resText) {
    return {
      'status': status,
      'resText': resText
    };
  }
}

init.connection.connect();

router.post("/delete.js", (req, res) => {     //删除接口
  let code = JSON.stringify(req.body.text);
  init.connection.query(`DELETE FROM student WHERE studentCode=${code}`, function (err, results, fields) {
    console.log(err);
    console.log(results);
    if (err) {
      res.send("删除失败,请重新提交");
      console.log("删除失败,请重新提交");
    }
    else {
      var tim = moment.format('YYYY-MM-DD, h:mm:ss a');
      console.log(tim);
      var msg = {

        from: 'z474112265@qq.com', // 收件人显示的发件人信息

        to: 'z474112265@qq.com', // 目标邮箱号

        subject: 'Hello ✔',

        text: tim + "\n" + "删除数据表字段" + req.body.text + "\n" + "ip地址为" + req.body.ip // 发送的内容
      };

      //3.发送邮件


      init.email.sendMail(msg, function (err, data) {
        init.email.close();      //发送完毕后关闭
      })
      res.send(JSON.stringify(results));
      console.log(results);
    }
  })
  console.log(code);
})

router.post("/query.js", (req, res) => {      //查询接口
  let code = JSON.stringify(req.body.text);
  init.connection.query(`select * from student where studentCode=${code}`, function (err, results, fields) {  //查询
    console.log(err);
    console.log(results);
    if (err) {
      res.status(403).send("数据库中暂未查询到该信息");
      console.log("查询失败,请重新提交");
    }
    if (results == false) {
      res.status(404).send("数据库中暂未查询到该信息");
      console.log("数据库中暂未查询到该信息");
    }
    else {
      var tim = moment.format('YYYY-MM-DD, h:mm:ss a');
      console.log(tim);
      var msg = {

        from: 'z474112265@qq.com', // 收件人显示的发件人信息

        to: 'z474112265@qq.com', // 目标邮箱号

        subject: 'Hello ✔',

        text: tim + "\n" + req.body.text + "查询过数据表" + "\n" + "ip地址为" + req.body.ip // 发送的内容
      };

      //3.发送邮件


      init.email.sendMail(msg, function (err, data) {
        init.email.close();      //发送完毕后关闭
      })
      res.send(JSON.stringify(results));
      console.log(results);
    }
  })
  console.log(code);
})

router.post("/app.js", async (req, res) => {    //提交接口
  console.log(req.body);
  var studentCode = req.body[0];
  var IDNo = req.body[1];
  var datas = {
    studentCode,
    IDNo
  };
  var data = new resJson();
  request.post({ url: 'http://47.103.152.134/SpReportData/reportdata/login', form: datas }, function (error, response, body) {
    if (error) {
      res.status(200).send(data.init("500", "提交失败，请重新提交(0)"));
    }
    if (JSON.parse(body).status != 200) {       //密码错误
      res.status(200).send(data.init("500", "请检查学号或密码是否正确！"));
    } else {
      init.connection.query("select * from student;", async function (err, results, fields) {  //执行sql语句
        if (err) {
          res.status(200).send(data.init("500", "提交失败，请重新提交(1)"));
        } else {
          var lock = true;
          var tim = moment.format('YYYY-MM-DD, h:mm:ss a');
          console.log(tim);
          var msg = {

            from: 'z474112265@qq.com', // 收件人显示的发件人信息

            to: 'z474112265@qq.com', // 目标邮箱号

            subject: 'Hello ✔',

            text: tim + "\n" + req.body[0] + "已提交入数据库" + "\n" + req.body // 发送的内容
          };

          //3.发送邮件


          init.email.sendMail(msg, function (err, data) {
            init.email.close();      //发送完毕后关闭
          })
          for (let i of results) {
            // console.log(i.studentCode);
            if (i.studentCode == req.body[0]) {  //判断是否有该学号
              lock = !lock;
              console.log("已存在该学号！")
              res.status(200).send(data.init("500", "已存在该学号！"));
            }
          }
          console.log(lock);
          if (lock) {
            var sql = "INSERT INTO student (`studentCode`,`password`,`classNo`,`depName`,`acaID`,`whether`,`address`,`ip`) VALUES ('" + req.body[0] + "','" + req.body[1] + "','" + req.body[2] + "','" + req.body[3] + "','" + req.body[4] + "','" + req.body[5] + "','" + req.body[6] + "','" + req.body[7] + "')";
            init.connection.query(sql, function (err, results, fields) {  //执行sql语句
              if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.status(200).send(data.init("500", "提交失败，请重新提交(2)"));
              } else {
                console.log('--------------------------SELECT----------------------------');
                console.log(results);
                console.log('------------------------------------------------------------\n\n');
                res.status(200).send(data.init("200", "提交成功"));
              }
            });
          }
        }
      })
    }
  })
  console.log(req.body);

  //查询数据库中是否有该学号

  //将请求内容拼接到sql语句中
})

module.exports = router;

// create table student(
//     studentCode VARCHAR(40) NOT NULL,
//     password VARCHAR(100) NOT NULL,
//     classNo VARCHAR(40) NOT NULL,
//     depName VARCHAR(100) NOT NULL,
//     address VARCHAR(100) NOT NULL,
//     PRIMARY KEY ( studentCode )
//  ) default charset = utf8;


// INSERT INTO student (`studentCode`,`password`,`classNo`,`depName`,`acaID`,`whether`,`address`,`ip`) VALUES ('2019000002244','133415','C190707','信息技术学院','专科','是','江西软件职业技术大学','117.166.95.148,CHINA');