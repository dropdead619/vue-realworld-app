<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <McvLoading v-if="isLoading" />
    <McvErrorMessage v-if="error" />
    <div v-if="!isLoading && !tags" class="tag-list">
      <router-link
        class="tag-default tag-pill"
        v-for="tag in tags"
        :key="tag"
        :to="{ name: 'tag', params: { slug: tag } }"
        >{{ tag }}</router-link
      >
    </div>
    <div v-if="!isLoading" class="post-preview">No tags are here... yet</div>
  </div>
</template>

<script>
import { actionTypes, getterTypes } from "@/store/modules/tags.js";
import { mapGetters } from "vuex";
import McvLoading from "@/components/Loading.vue";
import McvErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: "McvTags",
  components: {
    McvLoading,
    McvErrorMessage,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      tags: getterTypes.data,
      isLoading: getterTypes.isLoading,
      error: getterTypes.error,
    }),
  },
  methods: {
    fetchTags() {
      this.$store.dispatch(actionTypes.getTags);
    },
  },
  mounted() {
    this.fetchTags();
  },
};
</script>