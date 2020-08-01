<template>
  <div id="app">
    <nav-bar></nav-bar>
    <keep-alive exclude="home"><!--导航栏-->
      <router-view></router-view>
    </keep-alive>
    <popup></popup>
  </div>
</template>
<script>
import navBar from "components/common/navBar"; //导入导航栏
import popup from "components/common/Popup"; //导入联系窗口
// require("assets/js/rAF");                            //canvas
export default {
  name: "app",
  components: {
    navBar,
    popup
  },
};
</script>
<style>
@import "assets/css/common.css";
#app {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
