<template>
  <div>
    <TheHeader/>
    <router-view />
  </div>
</template>

<script>
import { actionTypes } from '@/store/modules/auth.js';
import TheHeader from '@/components/layout/TheHeader.vue';
export default {
  components: {
    TheHeader
  },
 mounted() {
   this.$store.dispatch(actionTypes.getCurrentUser);
 }
}
</script>

<style>

</style>
