import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    form_list:['学号','密码','班级','分院','地址','是否返校','学历','操作']
  },
  mutations: {
    
  },
  getters:{
    getFormList(state){
      let arr = Array.from(new Set(state.form_list));
      return arr;
    }
  },
  actions: {

  }
})
