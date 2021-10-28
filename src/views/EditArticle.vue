<template>
  <div>
    <McvLoading v-if="isLoading" />
    <McvArticleForm
      v-else
      :initialValues="initialValues"
      :isSubmitting="isSubmitting"
      :errors="validationErrors"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from "@/components/ArticleForm.vue";
import McvLoading from "@/components/Loading.vue";
import { actionTypes, getterTypes } from "@/store/modules/editArticle.js";
import { mapGetters } from "vuex";
export default {
  name: "McvEditArticle",
  components: {
    McvLoading,
    McvArticleForm,
  },
  computed: {
    ...mapGetters({
      isSubmitting: getterTypes.isSubmitting,
      validationErrors: getterTypes.validationErrors,
      article: getterTypes.article,
      isLoading: getterTypes.isLoading,
    }),
    initialValues() {
      if (!this.article) {
        return {
          title: "",
          description: "",
          body: "",
          tagList: [],
        };
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      };
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
  methods: {
    onSubmit(articleInput) {
      console.log(this.article);
      const slug = this.$route.params.slug;
      this.$store
        .dispatch(actionTypes.updateArticle, {
          slug,
          articleInput,
        })
        .then((article) => {
          this.$router.push({
            name: "article",
            params: { slug: article.slug },
          });
        });
    },
  },
};
</script>