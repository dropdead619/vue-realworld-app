import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth.js';
import feed from '@/store/modules/feed.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {},
  modules: {
    auth,
    feed
  }
});