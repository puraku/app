<template>
  <div class="about-container">
    <time-baseline />
    <profile />
  </div>
</template>

<script>
import Profile from '../components/Profile.vue';
import TimeBaseline from '../components/TimeBaseline.vue';

export default {
  name: 'About',

  components: {
    Profile,
    TimeBaseline
  },

  mounted() {
   const { user_id } = this.$route.params;
   console.log(user_id);
  }
}
</script>

<style lang="sass">
.about-container {
  overflow-y: scroll;
  height: 100%;

  background-color: #f5ede8;
}
</style>
