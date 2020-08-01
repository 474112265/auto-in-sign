<template>
  <div class="donation">
    <h3 style="color: orange;">赞助是对本网站的一种赞赏和支持</h3>
    <h5>
      站长也是一名学生,每个月服务器的费用以及域名的费用也是要从生活费中扣除的。
      <br />希望大家能支持本网站,让本网站能继续坚持下去,赞助的金额多少不重要,分享该网站和使用就是对本网站最大的支持
    </h5>
    <img src="@/assets/images/three.png" alt="加载失败,请重新刷新页面" />
  </div>
</template>

<script>
export default {
  name: "donation",
  created() {
    if ($("body").hasClass("large-header")) {
      $("body").removeClass("large-header");
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.donation {
  margin: 20px auto;
  width: 80%;
  height: 600px;
  text-align: center;
}
img {
  margin-top: 5%;
  width: 30%;
}
h3{
  margin-top: 7%;
}
h5{
  font-size: 16;
  font-weight:600;
}
@media all and (max-width: 920px) {
  img {
    margin-top: 10%;
    width: 80%;
  }
}
@media all and (max-width: 765px) {
  img {
    width: 95%;
  }
}
@media all and (max-width: 920px) {
  #cs_box {
    display: none;
  }
}
</style>