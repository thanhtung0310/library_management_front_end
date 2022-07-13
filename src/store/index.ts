import { createStore } from "vuex";

export default createStore({
  state: {
    userInfo: {
      username: '',
      password: '',
      fullName: '',
      userToken: ''
    },
  },
  getters: {},
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    
  },
  modules: {},
});
