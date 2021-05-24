import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
import router from '../router/index';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
    user: "",
  },
  mutations: {
    auth(state, playload) {
      state.auth = playload;
    },
    user(state, playload) {
      state.user = playload;
    },
    logout(state, playload) {
      state.auth = playload;
    },
    changeUserData(state, playload) {
      state.user.profile = playload;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios.post(
        "https://polar-fjord-85197.herokuapp.com/api/login",
        {
          email: email,
          password: password,
        }
      );
      const responseUser = await axios.get(
        "https://polar-fjord-85197.herokuapp.com/api/user",
        {
          params: {
            email: email,
          },
        }
      );
      commit("auth", responseLogin.data.auth);
      commit("user", responseUser.data.data[0]);
      router.replace("/home");
    },
    logout({ commit }) {
      axios
        .post("https://polar-fjord-85197.herokuapp.com/api/logout", {
          auth: this.state.auth,
        })
        .then((response) => {
          console.log(response);
          commit("logout", response.data.auth);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
