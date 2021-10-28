<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
              ><i class="ion-edit" /> &nbsp; Edit article</router-link
            >
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a" />
              Delete article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <McvLoading v-if="isLoading" />
      <McvErrorMessage v-if="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <McvTagList :tags="article.tagList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  actionTypes as articleActionTypes,
  getterTypes as articleGetterTypes,
} from "@/store/modules/article.js";
import { getterTypes as authGetterTypes } from "@/store/modules/auth.js";
import { mapGetters } from "vuex";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";
import McvTagList from "@/components/TagList.vue";

export default {
  name: "McvArticle",
  components: {
    McvLoading,
    McvErrorMessage,
    McvTagList,
  },
  computed: {
    ...mapGetters({
      article: articleGetterTypes.data,
      isLoading: articleGetterTypes.isLoading,
      error: articleGetterTypes.error,
      currentUser: authGetterTypes.currentUser,
    }),
    slug() {
      return this.$route.params.slug;
    },
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false;
      }
      return this.currentUser.username === this.article.author.username;
    },
  },
  methods: {
    deleteArticle() {
      this.$store
        .dispatch(articleActionTypes.deleteArticle, {
          slug: this.slug,
        })
        .then(() => {
          this.$router.push({ name: "globalFeed" });
        });
    },
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, { slug: this.slug });
  },
};
</script>