import { createStore } from "vuex";

export default createStore({
  state: {
    userInfo: {
      username: '',
      password: '',
      fullName: '',
      userToken: ''
    },
    app_lang: 'en',
  },
  getters: {},
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setAppLang(state, app_lang) {
      state.app_lang = app_lang
    }
  },
  actions: {
    
  },
  modules: {},
});
