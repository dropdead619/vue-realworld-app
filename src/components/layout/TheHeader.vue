<template>
  <header>
    <nav class="navbar navbar-light">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'globalFeed' }">
          MediumClone
        </router-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <router-link
              active-class="active"
              class="nav-link"
              exact
              :to="{ name: 'globalFeed' }"
              >Home</router-link
            >
          </li>
          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'createArticle' }"
              >
                <i class="ion-compose"></i> &nbsp; New Article</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'settings' }"
              >
                <i class="ion-gear-a"></i> &nbsp; Settings</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{
                  name: 'userProfile',
                  params: { slug: currentUser.username },
                }"
              >
                <img
                  class="user-pic"
                  :src="currentUser.image"
                  :alt="currentUser.username"
                />
                &nbsp; {{ currentUser.username }}</router-link
              >
            </li>
          </template>
          <template v-if="isAnonymous">
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'login' }"
                >Sign in</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                active-class="active"
                class="nav-link"
                :to="{ name: 'register' }"
                >Sign up</router-link
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { getterTypes } from "@/store/modules/auth.js";
export default {
  name: "McvTheHeader",
  data() {
    return {};
  },
  computed: {
      ...mapGetters({
          isLoggedIn: getterTypes.isLoggedIn,
           isAnonymous: getterTypes.isAnonymous,
           currentUser: getterTypes.currentUser,
      }),
  },
};
</script>