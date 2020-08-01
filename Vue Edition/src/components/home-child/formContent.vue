<template>
  <form class="form-horizontal">
    <div class="form-group">
      <label for="inputEmail3" class="col-sm-2 control-label">学号</label>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          id="inputEmail3"
          onkeyup="value=value.replace(/[^\d]/g,'')"
          placeholder="请输入你的学号"
        />
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword3" placeholder="请输入你的身份证后六位" />
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword4" class="col-sm-2 control-label">班级</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="inputPassword4" placeholder="请输入你的班级" />
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword5" class="col-sm-2 control-label">分院</label>
      <div class="col-sm-10">
        <select class="form-control" id="inputPassword5">
          <option>信息技术学院</option>
          <option>网络工程学院</option>
          <option>软件工程学院</option>
          <option>艺术与经管学院</option>
          <option>区块链学院</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword5" class="col-sm-2 control-label">学历</label>
      <div class="col-sm-10">
        <select class="form-control" id="inputPassword5">
          <option>专科</option>
          <option>本科</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword6" class="col-sm-2 control-label">是否返校</label>
      <div class="col-sm-10">
        <select class="form-control" id="inputPassword6">
          <option>是</option>
          <option>否</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword7" class="col-sm-2 control-label">地址</label>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          id="inputPassword7"
          placeholder="请输入你的地址"
          maxlength="20"
        />
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button
          type="button"
          class="btn btn-default"
          style="background-color: rgba(255, 255, 255,0.6);"
          @click="submitData()"
        >提交</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "formcontent",
  methods: {
    submitData() {
      var btn = $('.btn-default');
      var texts = $('.form-control');
      var lock = true;
      btn.attr("disabled", "disabled");
      setTimeout(() => {
        btn.removeAttr("disabled");
      }, 3000);
      for (let j of texts) {
        console.log($(j));
        $(j).val($(j).val().trim()); //测试
        console.log($(j).val());
        if ($(j).val().length == 0) {
          //判断是否有空白值
          lock = false;
        }
      }
      console.log(returnCitySN["cip"] + "," + returnCitySN["cname"]); //获取ip地址
      var strIp = returnCitySN["cip"] + "," + returnCitySN["cname"]; //将ip地址保存到变量中
      console.log(lock);
      if (lock) {
        var arr = [];
        for (var i of texts) {
          arr.push(i.value);
        }
        arr.push(strIp);
        var list = {
          data: arr,
        };
        console.log(arr);
        list = JSON.stringify(arr);
        console.log(list);
        $.ajax({
          url: "https://www.funblog.top/app.js",
          type: "POST",
          data: list,
          contentType: "application/json",
          cache: false,
          timeout: 10000,
          complete: function () {
            //called when complete
            console.log("process complete");
          },
          success: function (data) {
            console.log(data);
            console.log("process sucess");
            if (data.status == "200") {
              
            } else {
                alert(data.resText);
            }
          },
          error: function (data) {
            alert(data.responseText);
            console.log(data.status);
            console.log("process error");
          },
        });
      } else {
        alert("请填写完整的信息");
      }
    },
  },
};
</script>

<style>
</style>