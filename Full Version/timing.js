var CronJob = require('cron').CronJob;

var request = require("request");
var init = require('./configuration');
var axios = require('axios');
var moment = require('moment')();

async function sleep(milliseconds) {            //创建异步等待函数
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, milliseconds)
    })
}

var httpUrl = 'http://47.103.152.134/SpReportData/reportdata/report';

var datas = "";
let num = 0;
var count = null;
function one(err, result, fields, timeData) {
    num = 0;
    if (err) {                                               //判断是否执行成功
        console.log("提交失败,请重新尝试");
    } else {
        console.log('提交成功');
        init.connection.query("select count(*) from student", (err, result, fields) => {
            count = result[0]['count(*)'];
        })
        for (let i of result) {
            setTimeout(function () {
                console.log(`等0.5秒`);
            }, 500);
            let morTem = "";
            let noonTem = "";
            let eveTem = "";
            var moment = require('moment')();
            var time = moment.format('YYYY-MM-DD');
            var departmentCode = "02";
            var temperature = Array.from(new Set([36, 36.1, 36.2, 36.3, 36.4, 36.5, 36.6, 36.7, 36.8, 36.9]));                                      //统计执行次数
            if (i.acaID == "专科") {
                i.acaID = String(2);
            } else {
                i.acaID = String(1);
            }
            switch (i.depName) {
                case "区块链学院":
                    departmentCode = "06";
                    i.acaID = String(2);
                    break;
                case "艺术与经管学院":
                    departmentCode = "05";
                    break;
                case "信息技术学院":
                    departmentCode = "03";
                    break;
                case "网络工程学院":
                    departmentCode = "02";
                    break;
                case "软件工程学院":
                    departmentCode = "01";
                    break;
            }
            if (i.whether == "是") {
                num++;
                console.log("卧槽");
                switch (timeData) {
                    case 3:
                        eveTem = (temperature[parseInt(Math.random() * temperature.length)]);
                    case 2:
                        noonTem = (temperature[parseInt(Math.random() * temperature.length)]);
                    case 1:
                        morTem = (temperature[parseInt(Math.random() * temperature.length)]);
                }
                var data = {
                    'address': i.address,
                    'animalHeat': null,
                    'bodystatus': "正常",
                    'classNo': i.classNo,
                    'depName': i.depName,
                    'departmentCode': departmentCode,
                    'eveTem': String(eveTem),
                    'illsymptom': null,
                    'isContactHubeiBack': "0",
                    'isContactPatient': "0",
                    'morTem': String(morTem),
                    'noonTem': String(noonTem),
                    'othercase': "",
                    'outEndTime': null,
                    'outStartTime': null,
                    'quarantine': null,
                    'quarantinePlace': null,
                    'reporttime': time,
                    'studentCode': i.studentCode,
                    'trainNumAndseatNum': null,
                    'vehicle': null,
                }
                let temporary = i.studentCode;
                var cishu = 0;
                console.log(data);
                (async function a() {
                    function aAxios() {
                        cishu++;
                        axios.post(httpUrl, data)
                            .then(function (response) {
                                if (response.data.status == 200) {
                                    console.log(response.data);
                                } else {
                                    console.log(temporary + "提交失败正在重新提交");
                                    if (cishu < 6) {
                                        console.log(`${temporary}第${cishu}次提交数据`);
                                        aRequest();
                                    }
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    function aRequest() {
                        cishu++;
                        request({
                            url: 'http://47.103.152.134/SpReportData/reportdata/report',    //请求路径
                            method: "POST",                                                 //请求方式
                            headers: {                                                      //设置请求头
                                "content-type": "application/json",
                            },
                            body: JSON.stringify(data)                                      //post参数字符串
                        }, async function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                console.log(temporary + "====" + body + "6-26");
                                datas += temporary + "====" + body + "\n";                       //将输出信息拼接到datas中
                                if (JSON.parse(body).status != 200) {
                                    console.log(temporary + "提交失败正在重新提交");
                                    if (cishu < 6) {
                                        console.log(`${temporary}第${cishu}次提交数据`);
                                        aAxios();
                                    }
                                } else {
                                    console.log("提交成功");

                                }
                            }
                        });
                    }
                    aRequest();
                })();
            }
        }
    }
};

function two() {            
    var tim = moment.format('YYYY-MM-DD, h:mm:ss a');
    var msg = {

        from: 'z474112265@qq.com', // 收件人显示的发件人信息

        to: 'z474112265@qq.com', // 目标邮箱号

        subject: 'Hello ✔',

        text: datas + tim + "已提交" + num + "份数据" // 发送的内容
    };

    //3.发送邮件


    init.email.sendMail(msg, function (err, data) {
        init.email.close();      //发送完毕后关闭
    })
    console.log(datas);
    console.log("已提交" + num + "份数据");

}

var sql = 'SELECT * FROM student';

var jobMorning = new CronJob('05 17 8 * * *', function () {        //上午
    console.log("上午开始了");
    init.connection.connect();
    init.connection.query(sql, async function (err, result, fields) {
        datas = "";                                              //初始化 datas
        var [k, f] = await Promise.all([
            one(err, result, fields, 1),                              //将参数传入函数one中
            two(),
        ])
        init.connection.end();
        console.log('终于结束了');
    });
}, null, true);

jobMorning.start();

var jobNoon = new CronJob('00 05 12 * * *', function () {     //中午
    console.log("中午开始了");
    init.connection.connect();
    init.connection.query(sql, async function (err, result, fields) {
        datas = "";                                              //初始化 datas
        var [k, f] = await Promise.all([
            one(err, result, fields, 2),                              //将参数传入函数one中
            two(),
        ])
        init.connection.end();
        console.log('终于结束了');
    });
}, null, true);

jobNoon.start();

var jobNight = new CronJob('00 17 21 * * *', function () {       //晚上
    console.log("晚上开始了");
    init.connection.connect();
    init.connection.query(sql, async function (err, result, fields) {
        datas = "";                                              //初始化 datas
        var [k, f] = await Promise.all([
            one(err, result, fields, 3),                              //将参数传入函数one中
            two(),
        ])
        init.connection.end();
    });
}, null, true);

jobNight.start();

module.exports = function () {
    console.log("开始");
};

var times = moment.format('YYYY-MM-DD, h:mm:ss a');         //设置时间格式
console.log(times);