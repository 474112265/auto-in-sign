alert('因学校通知健康日报可以不用填写,7-19日开始自动签到服务将暂停使用!!!');
var btn = $('.btn-default');                //获取按钮
var texts = $('.form-control');             //获取所有表单元素
btn.on("click", () => {                     //注册点击事件
    var lock = true;
    btn.attr("disabled","disabled");
    setTimeout(()=>{
        btn.removeAttr("disabled");
    },3000);
    for (let j of texts) {   
        console.log($(j));               
        $(j).val($(j).val().trim());    //测试
        console.log($(j).val());
        if ($(j).val().length == 0){//判断是否有空白值
            lock = false;
        }
    }
    console.log(returnCitySN["cip"] + ',' + returnCitySN["cname"]); //获取ip地址
    var strIp = returnCitySN["cip"] + ',' + returnCitySN["cname"];  //将ip地址保存到变量中
    console.log(lock);
    if (lock) {
        var arr = [];
        for (var i of texts) {
            arr.push(i.value);
        }
        arr.push(strIp);
        var list = {
            "data":arr
        };
        console.log(arr);
        list = JSON.stringify(arr);
        console.log(list);
        $.ajax({
            url: "/app.js",
            type: "POST",
            data: list,
            contentType: "application/json",
            cache: false,
            timeout: 10000,
            complete: function () {
                //called when complete
                console.log('process complete');
            },
            success: function (data) {
                console.log(data);
                console.log('process sucess');
                if(data.status == "200"){
                swal({
                    title: "提交成功!",
                    text: "服务器即将到期,赞助是对本网站的一种赞赏和支持,一毛五毛也是爱",
                    type: "success",
                    imageSize: "300x300",
                    imageUrl: "./images/three.png",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "好滴!",
                    cancelButtonText: "算了吧！",
                    closeOnConfirm: false,
                  });
                }else{
                    swal({
                        title: data.resText,
                        text: "服务器即将到期,赞助是对本网站的一种赞赏和支持,一毛五毛也是爱",
                        type: "error",
                        imageSize: "300x300",
                        imageUrl: "./images/three.png",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "好滴!",
                        cancelButtonText: "算了吧！",
                        closeOnConfirm: false,
                      });
                }
            },
            error: function (data) {
                alert(data.responseText);
                console.log(data.status);
                console.log('process error');
            }
        });
    } else {
        alert("请填写完整的信息");
    }

})
