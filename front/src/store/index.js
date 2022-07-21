import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    user: {
      userId: null,
      email: null,
      token: null,
      isAdmin: null,
      username: null,
    },
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
