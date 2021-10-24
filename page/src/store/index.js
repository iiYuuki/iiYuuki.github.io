import { createStore } from 'vuex'

export default createStore({
  state: {
    isAdminSideShow: true,
    isAdmin: false
  },
  mutations: {
    setAdminSide (state, data) {
      if (data === undefined) {
        state.isAdminSideShow = !state.isAdminSideShow
      } else {
        state.isAdminSideShow = data
      }
    },
    setIsAdmin (state, data) {
      if (process.env.NODE_ENV !== 'production') {
        state.isAdmin = true
      } else {
        state.isAdmin = data
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
