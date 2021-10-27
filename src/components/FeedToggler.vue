<template>
  <div class="toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          class="nav-link"
          :class="{ active: routeName === 'yourFeed' }"
          :to="{ name: 'yourFeed' }"
          >Your feed</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: routeName === 'globalFeed' }"
          :to="{ name: 'globalFeed' }"
          >Global feed</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: routeName === 'tag' }"
          v-if="tagName"
          :to="{ name: 'tag' }"
        >
          <i class="ion-pound" />
          {{ tagName }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getterTypes } from "@/store/modules/auth.js";
export default {
  name: "McvFeedToggler",
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn,
    }),
    routeName() {
      return this.$route.name;
    },
  },
};
</script>
