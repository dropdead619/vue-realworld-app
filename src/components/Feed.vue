<template>
  <div>
    <McvLoading v-if="isLoading"></McvLoading>
    <McvErrorMessage v-if="error" />
    <div v-if="feed">
      <div v-if="feed.articles.length === 0">No articles are here... yet.</div>
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
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
              class="author"
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">
              {{ article.createdAt }}
            </span>
          </div>
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link
          class="preview-link"
          :to="{ name: 'article', params: { slug: article.slug } }"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <McvTagList :tags="article.tagList" />
        </router-link>
      </div>
      <McvPagination
        :total="totalPages"
        :perPage="perPage"
        :currentPage="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import { actionTypes, getterTypes } from "@/store/modules/feed.js";
import { mapGetters } from "vuex";
import McvPagination from "@/components/Pagination.vue";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";
import McvTagList from "@/components/TagList.vue";
import { stringify, parseUrl } from "query-string";

export default {
  name: "McvFeed",
  components: {
    McvPagination,
    McvLoading,
    McvErrorMessage,
    McvTagList
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      perPage: 10,
    };
  },
  computed: {
    ...mapGetters({
      feed: getterTypes.data,
      isLoading: getterTypes.isLoading,
      error: getterTypes.error,
    }),
    totalPages() {
      return this.feed.articlesCount;
    },
    currentPage() {
      return Number(this.$route.query.page || "1");
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * this.perPage - this.perPage;
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit: this.perPage,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams });
    },
  },
  mounted() {
    this.fetchFeed();
  },
};
</script>

<style scoped>
</style>