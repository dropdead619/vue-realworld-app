<template>
  <div class="ng-scope">
    <div class="settings-page ng-scope">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>
            <McvValidationErrors v-if="errors" :validationErrors="errors" />
            <div v-if="isLoading">Loading...</div>
            <form
              @submit.prevent="onSubmit"
              class="ng-valid ng-valid-email ng-dirty ng-valid-parse"
              v-else-if="!isLoading && user"
            >
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="
                      form-control
                      ng-pristine ng-untouched ng-valid ng-not-empty
                    "
                    placeholder="URL of profile picture"
                    v-model="initialValues.image"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="
                      form-control
                      ng-pristine ng-untouched ng-valid ng-not-empty
                    "
                    placeholder="Username"
                    v-model="initialValues.username"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="
                      form-control
                      ng-pristine ng-untouched ng-valid ng-not-empty
                    "
                    rows="8"
                    placeholder="Short bio about you"
                    v-model="initialValues.bio"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="email"
                    class="
                      form-control
                      ng-pristine ng-untouched ng-valid ng-not-empty
                    "
                    placeholder="Email"
                    v-model="initialValues.email"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="password"
                    class="
                      form-control
                      ng-pristine ng-untouched ng-valid ng-not-empty
                    "
                    placeholder="New Password"
                    v-model="initialValues.password"
                  />
                </fieldset>
                <fieldset>
                  <button
                    class="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    :disabled="isSubmitting"
                  >
                    Update Settings
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from "@/components/auth/ValidationErrors.vue";
import { actionTypes, getterTypes } from "@/store/modules/auth.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "McvSettings",
  components: {
    McvValidationErrors,
  },
  computed: {
    ...mapGetters({
      errors: getterTypes.validationErrors,
      isSubmitting: getterTypes.isSubmitting,
      user: getterTypes.currentUser,
      isLoading: getterTypes.isLoading,
    }),
    initialValues() {
      if (!this.user) {
        return {
          bio: "",
          image: "",
          email: "",
          username: "",
          password: "",
        };
      }
      return {
        bio: this.user.bio,
        image: this.user.image,
        email: this.user.email,
        username: this.user.username,
        password: "",
      };
    },
  },
  methods: {
    ...mapActions({
      getUser: actionTypes.getCurrentUser,
      updateUserSettings: actionTypes.updateUserSettings,
    }),
    onSubmit() {
      const settingsInput = {
        bio: this.initialValues.bio,
        image: this.initialValues.image,
        email: this.initialValues.email,
        username: this.initialValues.username,
        password: this.initialValues.password,
      };
      this.updateUserSettings(settingsInput).then((user) => {
        console.log(user);
        this.$router.push({
          name: "userProfile",
          params: { slug: user.slug },
        });
      });
    },
  },
  mounted() {
    this.getUser().then((user) => console.log(user));
  },
};
</script>