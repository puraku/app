<template>
  <div class="container">
    <div class="about-container">
      <profile :user="user" v-if="user" />
      <plurks-container
        :plurks="plurks"
        :containerStyle="{zIndex: 10}"
        :onEndReached="onEndReached"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Profile from 'components/Profile.vue';
import PlurksContainer from 'components/PlurksContainer.vue';
import { postedDateTagger, mouseWheelHandler } from 'helpers/plurkHelper';

export default {
  name: 'About',

  components: {
    Profile,
    PlurksContainer
  },

  methods: {
    onEndReached() {
      if (!this.isFetching) {
        this.isFetching = true;

        this.fetchUserPlurksNextPage({
          userID: this.userID,
          callback: () => {
            this.isFetching = false;
          }
        });
      }
    },

    ...mapActions([
      'changeHeader',
      'fetchUserProfile',
      'fetchUserPlurksNextPage'
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
      return this.userPlurks[this.userID] && postedDateTagger(this.userPlurks[this.userID].map(id => this.plurksObject[id])) || [];
    },

    ...mapState({
      userList: state => state.userList,
      plurksObject: state => state.plurks.plurks,
      userPlurks: state => state.plurks.userPlurks
    })
  },

  beforeMount() {
   this.fetchUserProfile(this.userID);
  },

  updated() {
    if (!this.handleWheelAdded) {
      const plurksContainer = this.$el.querySelector('.plurks-container');
      const profile = this.$el.querySelector('.profile');
      const originalHeight = profile && profile.offsetHeight;
      let self = this;

      if (plurksContainer && profile) {
        this.handleWheel = mouseWheelHandler({ plurksContainer, profile, originalHeight, self });
        plurksContainer.addEventListener('mousewheel', this.handleWheel);
        this.handleWheelAdded = true;
      }
    }

    if (typeof this.user === 'undefined' || typeof this.userPlurks[this.userID] === 'undefined' || this.userPlurks[this.userID].length == 0) {
      this.fetchUserProfile(this.userID);
    }
  },

  beforeDestroy() {
    const plurksContainer = this.$el.querySelector('.plurks-container');

    plurksContainer.removeEventListener('mousewheel', this.handleWheel);
  },

  data() {
    return {
      userList: null,
      plurks: [],
      userData: null,
      scrollLength: 0,
      handleWheel: () => {},
      handleWheelAdded: false,
      isFetching: false
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
