<template>
  <div id="cs_box">
    <span class="cs_title">QQ在线咨询</span>
    <span class="cs_close">x</span>
    <div class="cs_img"></div>
    <span class="cs_info">联系qq:474112265</span>
    <div class="cs_btn">反馈BUG</div>
  </div>
</template>

<script>
import {myEvent,getByClass,cs_box} from "assets/js/right"
export default {
  name:"popup",
  created(){
    myEvent(window, "load", function () {
      cs_box.set({
        img_path: require("assets/images/01.jpg"), //设置图片路径
        qq: "474112265", //设置QQ号码
      });
    });
  }
};
</script>

<style>
@import "../../assets/css/popup.css";
</style>