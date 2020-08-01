<template>
  <div id="cssmenu">
    <ul>
      <li>
        <router-link to="/">首页</router-link>
      </li>
      <li class="active has-sub">
        <router-link to="/query">增删改查</router-link>
        <ul>
          <li class="has-sub">
            <router-link to="/query">查询及删除</router-link>
          </li>
          <!-- <li class='has-sub'><a href='#'>增加</a>
                    <ul>
                       <li><a href='#'>Nav2</a></li>
                       <li><a href='#'>Nav3</a></li>
                    </ul>
          </li>-->
        </ul>
      </li>
      <li>
        <router-link to="/donation" class="orange">赞助我们</router-link>
      </li>
      <li id="contact" @click="btnQq">
        <a href="#">反馈BUG</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { myEvent, getByClass, cs_box } from "assets/js/right";
export default {
  name: "navbar",
  mounted() {
    require("assets/js/navBar.js");
  },
  methods: {
    btnQq() {
      var link ="http://wpa.qq.com/msgrd?v=3&uin=" + 474112265 + "&site=qq&menu=yes";
      window.open(link, "_blank");
    },
  },
};
</script>

<style>
@import "../../assets/css/navBar.css";
</style>