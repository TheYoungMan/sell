import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
export default new vuex.Store({
  state: {
    val: [],
    showSeller: false
  },
  mutations: {
    changeVal (state, newVal) {
      state.val = newVal
    },
    changeMess (state, newVal) {
      state.showSeller = newVal
    }
  }
})
