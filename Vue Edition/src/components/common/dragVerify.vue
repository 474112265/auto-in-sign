<template>
  <drag-verify-img-rotate
    ref="dragVerify"
    :imgsrc="img"
    :isPassing.sync="isPassing"
    :showTips="true"
    text="请按住滑块拖动"
    successText="验证通过"
    handlerIcon="el-icon-d-arrow-right"
    successIcon="el-icon-circle-check"
    @refresh="reimg"
  ></drag-verify-img-rotate>
</template>
<script>

import dragVerify from "components/content/Verify/dragVerify";
// 图片滑块组件
import dragVerifyImg from "components/content/Verify/dragVerifyImg";
// 图片滑块组件(拼图)
import dragVerifyImgChip from "components/content/Verify/dragVerifyImgChip";
// 旋转图片滑块组件
import dragVerifyImgRotate from "components/content/Verify/dragVerifyImgRotate";
export default {
  name: "dragVerify",
  data () {
    return {
      handlerIcon: "fa fa-angle-double-right",
      successIcon: "fa fa-check",
      background: "#cccccc",
      progressBarBg: "#4b0",
      completedBg: "#66cc66",
      handlerBg: "#fff",
      text: "请将滑块拖动到右侧",
      successText: "验证成功",
      width: 320,
      height: 42,
      textSize: "18px",
      isCircle:'true',
      img:'assets/images/01.jpg',
      isPassing:true,
      reimg:0
    }
  },
  components: {
    dragVerify,
    dragVerifyImg,
    dragVerifyImgChip,
    dragVerifyImgRotate,
  },
};
</script>

<style>
</style>