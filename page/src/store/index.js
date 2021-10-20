import { createStore } from 'vuex'

export default createStore({
  state: {
    isAdminSideShow: true
  },
  mutations: {
    setAdminSide (state, data) {
      if (!data) {
        state.isAdminSideShow = !state.isAdminSideShow
      } else {
        state.isAdminSideShow = data
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
