<template>
  <div class="about-container">
    <profile :userData="userData" v-if="userData" />
    <plurks-container :plurks="plurks" :userList="userList" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Profile from 'components/Profile.vue';
import PlurksContainer from 'components/PlurksContainer.vue';

import { getPublicProfile } from 'api/profile';
import { getPublicPlurks } from 'api/timeline';
import { postedDateTagger } from 'helpers/plurkHelper';

export default {
  name: 'About',

  components: {
    Profile,
    PlurksContainer
  },

  methods: {
    ...mapActions([
      'changeHeader'
    ])
  },

  mounted() {
   const { user_id } = this.$route.params;

   getPublicProfile(user_id).then(data => {
     this.userData = data;
     this.changeHeader(data.user_info.display_name);
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
      userData: null
    };
  }
}
</script>

<style lang="sass">
.about-container {
  height: 100%;

  display: flex;
  flex-direction: column;
}
</style>
