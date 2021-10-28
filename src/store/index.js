import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth.js';
import feed from '@/store/modules/feed.js';
import tags from '@/store/modules/tags.js';
import article from '@/store/modules/article.js';
import createArticle from '@/store/modules/createArticle.js';
import editArticle from '@/store/modules/editArticle.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {},
  modules: {
    auth,
    feed,
    tags,
    article,
    createArticle,
    editArticle
  }
});