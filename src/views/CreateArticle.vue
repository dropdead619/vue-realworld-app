<template>
  <McvArticleForm
    :initialValues="initialValues"
    :isSubmitting="isSubmitting"
    :errors="validationErrors"
    @articleSubmit="onSubmit">
 Publish Article</McvArticleForm>
</template>

<script>
import McvArticleForm from "@/components/ArticleForm.vue";
import { actionTypes, getterTypes } from "@/store/modules/createArticle.js";
import { mapGetters } from "vuex";
export default {
  name: "McvCreateArticle",
  data() {
    return {
      initialValues: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      isSubmitting: getterTypes.isSubmitting,
      validationErrors: getterTypes.validationErrors,
    }),
  },
  methods: {
    onSubmit(articleInput) {
      console.log(articleInput);
      this.$store
        .dispatch(actionTypes.createArticle, {articleInput})
        .then((article) => {
          this.$router.push({
            name: "article",
            params: { slug: article.slug },
          });
        });
    },
  },
  components: {
    McvArticleForm,
  },
};
</script>