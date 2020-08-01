<template>
  <div class="table_box">
      <table class="table table-condensed">
        <caption>
          查询信息
        </caption>
        <thead>
          <tr>
            <th v-for="(item,i) in arr">{{item}}</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
</template>

<script>
export default {
  name: "queryresults",
  data(){
      return {
        arr:[]
      }
  },
  created(){
      console.log(this.$store.getters.getFormList);
      this.arr = this.$store.getters.getFormList;
  }
}
</script>

<style>
.table_box{
  width: 80%;
  margin:0 auto;
}
</style>