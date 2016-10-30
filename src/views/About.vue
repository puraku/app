<template>
  <div class="about-container">
    <profile :user="user" v-if="user" />
    <plurks-container :plurks="plurks" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Profile from 'components/Profile.vue';
import PlurksContainer from 'components/PlurksContainer.vue';

export default {
  name: 'About',

  components: {
    Profile,
    PlurksContainer
  },

  methods: {
    ...mapActions([
      'changeHeader',
      'fetchUserProfile'
    ])
  },

  computed: {
    userID() {
      return this.$route.params.user_id;
    },

    user() {
      return this.userList[this.userID];
    },

    plurks() {
      return this.userPlurks[this.userID] && this.userPlurks[this.userID].map(id => this.plurksObject[id]) || [];
    },

    ...mapState({
      userList: state => state.userList,
      plurksObject: state => state.plurks.plurks,
      userPlurks: state => state.plurks.userPlurks
    })
  },

  mounted() {
   this.fetchUserProfile(this.userID);
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
