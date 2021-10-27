<template>
  <div class="home-page">
    <McvBanner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <McvFeedToggler />
          <McvFeed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <McvTags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from "@/components/Feed.vue";
import McvTags from "@/components/Tags.vue";
import McvBanner from "@/components/Banner.vue";
import McvFeedToggler from "@/components/FeedToggler.vue";

export default {
  name: "McvYourFeed",
  components: {
    McvFeed,
    McvTags,
    McvBanner,
    McvFeedToggler,
  },
  data() {
    return {
      apiUrl: "/articles/feed",
    };
  },
};
</script>

<style scoped>
</style>