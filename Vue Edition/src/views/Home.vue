<template>
  <div id="home" user-select: none>
    <h2 style="text-align: center; font-style: italic; color: darkcyan;">每日汇报自动签到</h2>
    <h4
      style="text-align: center; font-weight: bold; color: greenyellow;opacity: 0.8;"
    >请勿恶意填写信息,否则直接封禁ip访问</h4>
    <h5 style="text-align: center; font-weight: bold; color: brown;">本网站仅供娱乐使用，如有特殊情况请立即向班级所在的辅导员反馈</h5>
    <form-content></form-content>
    <!-- <drag-verify v-if="isClick"></drag-verify> -->
  </div>
</template>

<script>
import formContent from "components/home-child/formContent"; //导入表单
// import dragVerify from "components/common/dragVerify";
export default {
  name: "home",
  data(){
    return {
      isClick:true
    }
  },
  components: {
    formContent,
    // dragVerify
  },
  mounted(){
    if($("body").hasClass('large-header')){
      
    }else{
      $("body").addClass('large-header');
    }
  },
  beforeRouteLeave(to,from,next){
    if($("body").hasClass('large-header')){
      $("body").removeClass('large-header');
      console.log(to.name);
      next(); 
    }
  }
};
</script>

<style>
@media only screen and (min-width: 920px) {
  #home {
    margin-top: 4.5%;
  }
}
</style>