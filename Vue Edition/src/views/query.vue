<template>
  <div id="query">
  <search-box></search-box>
  <query-results></query-results>
  </div>
</template>

<script>
import queryResults from "components/query-child/queryResults"
import searchBox from "components/query-child/searchBox"
export default {
  name: "query",
  components:{
    queryResults,
    searchBox
  },
  created(){
    if($("body").hasClass('large-header')){
      $("body").removeClass('large-header');
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
@media all and (max-width: 920px) {
  #cs_box {
    display: none;
  }
  form {
    position: relative;
    width: 80%;
    margin: 0 auto;
  }
}
</style>