$(function () {
    var btn = $('.search>form>button');
    btn.on('click', function () {
        var text = $('.search>form>input').val();               //获取输入框中的文本内容
        var strIp = returnCitySN["cip"] + ',' + returnCitySN["cname"];
        if (text) {
            var obj = {
                "text": text,
                "ip": strIp
            }
            $.ajax({
                url: "/query.js",
                type: "POST",
                data: obj,
                contentType: "application/x-www-form-urlencoded",
                cache: false,
                timeout: 10000,
                complete: function () {
                    //called when complete
                    console.log('process complete');
                },
                success: function (data) {
                    var datas = JSON.parse(data)[0];
                    var trs = $("tr");
                    var flag = true;
                    for (var i = 1; i < trs.length; i++) {
                        if (trs.eq(i).children().eq(0).text() == datas.studentCode) {
                            flag = false;
                        }
                    }
                    if (!flag) {
                        alert("请勿多次查询相同内容");
                    } else {
                        var thisBtn = '<button type="button" class="btn btn-danger del_btn">删除</button>';
                        $("tbody").append(`<tr><td>${datas.studentCode}</td><td>${datas.password}</td><td>${datas.classNo}</td><td>${datas.depName}</td><td>${datas.address}</td><td>${datas.whether}</td><td>${datas.acaID}</td><td>${thisBtn}</td></tr>`);
                        $(".del_btn").off();                    //取消删除按钮所有事件绑定
                        $(".del_btn").on("click", function () { //重新添加事件
                            var that = $(this);
                            var text = $(this).parents("tr").children("td:first").text();
                            console.log(text);
                            var strIp = returnCitySN["cip"] + ',' + returnCitySN["cname"];
                            var obj = {
                                "text":text,
                                "ip":strIp
                            }
                            $.ajax({                    //发送删除的ajax请求
                                url: "/delete.js",
                                type: "POST",
                                data: obj,
                                contentType: "application/x-www-form-urlencoded",
                                cache: false,
                                timeout: 10000,
                                complete: function () {
                                    //called when complete
                                    console.log('process complete');
                                },
                                success: function (data) {
                                    console.log(data);
                                    console.log('process sucess');
                                    that.parents('tr').remove();
                                    alert('删除成功');
                                },
                                error: function () {
                                    console.log('process error');
                                }
                            });
                        })
                    }

                    console.log('process sucess');

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if(textStatus == 403){
                        alert("查询失败,请重新提交表单数据");
                    }else{
                        alert("数据库中暂未查询到该信息");
                    }
                    console.log('process error');
                }
            });
        }
    })
})
$(function () {
    $("#contact").on("click", function () {
      var link = "http://wpa.qq.com/msgrd?v=3&uin=" + 474112265 + "&site=qq&menu=yes";
        window.open(link, "_blank");
    });
  });