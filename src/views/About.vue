<template>
  <div class="about-container">
    <profile />
    <time-baseline />
    <plurk-card v-for="plurk in plurks" :plurk="plurk" :userList="userList" />
  </div>
</template>

<script>
import Profile from '../components/Profile.vue';
import TimeBaseline from '../components/TimeBaseline.vue';
import PlurkCard from '../components/PlurkCard.vue';

import { getPublicProfile } from '../api/profile';
import { getPublicPlurks } from '../api/timeline';

export default {
  name: 'About',

  components: {
    Profile,
    TimeBaseline,
    PlurkCard
  },

  mounted() {
   const { user_id } = this.$route.params;

   getPublicProfile(user_id).then(data => {
     this.profile = data;
   });

   getPublicPlurks(user_id).then(data => {
     this.userList = data.plurk_users;
     this.plurks = data.plurks;
   });
  },

  data() {
    return {
      userList: null,
      plurks: [],
      profile: null
    };
  }
}
</script>

<style lang="sass">
.about-container {
  padding: 1em 2em 1em 0.5em;

  overflow-y: scroll;
  height: 100%;

  background-color: #f5ede8;
}
</style>
