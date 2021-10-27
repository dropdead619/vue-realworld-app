<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <McvLoading v-if="isLoading" />
        <McvErrorMessage v-if="error" />
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes, getterTypes } from "@/store/modules/article.js";
import { mapGetters } from "vuex";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: "McvArticle",
  components: {
    McvLoading,
    McvErrorMessage,
  },
  computed: {
    ...mapGetters({
      article: getterTypes.data,
      isLoading: getterTypes.isLoading,
      error: getterTypes.error,
    }),
    slug() {
      return this.$route.params.slug;
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, { slug: this.slug });
  },
};
</script>