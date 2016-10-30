<template>
  <div class="about-container">
    <profile :user="user" v-if="user" />
    <plurks-container
      :plurks="plurks"
      :containerStyle="{zIndex: 10}"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Profile from 'components/Profile.vue';
import PlurksContainer from 'components/PlurksContainer.vue';
import { postedDateTagger } from 'helpers/plurkHelper';

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
      return this.userPlurks[this.userID] && postedDateTagger(this.userPlurks[this.userID].map(id => this.plurksObject[id])) || [];
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

  updated() {
    const plurksContainer = this.$el.querySelector('.plurks-container');
    const profile = this.$el.querySelector('.profile');
    const originalHeight = profile.offsetHeight;

    if (plurksContainer && profile) {
      let self = this;

      const handleWhell = function (e) {
        e.preventDefault();

        let deltaY = e.deltaY;
        const preserveHeight = 48;

        // prevent overscrolling
        if (self.scrollLength + deltaY < 0) {
          self.scrollLength = 0;
        } else if (self.scrollLength + deltaY > plurksContainer.scrollHeight + originalHeight) {
          self.scrollLength = plurksContainer.scrollHeight;
        } else {
          self.scrollLength += deltaY;
        }

        // handle virtual scroll value
        if (self.scrollLength < originalHeight) {
          this.scrollTop = 0;
        } else {
          this.scrollTop = self.scrollLength - originalHeight;
        }

        let op = self.scrollLength > 0 ? '-' : '+';
        profile.style.height = `calc(14em ${op} ${Math.abs(self.scrollLength)}px)`;

        // console.log(`deltaY: ${deltaY}, scrollLength: ${self.scrollLength}, scrollTop: ${this.scrollTop}, originalHeight: ${originalHeight}`);
      }

      plurksContainer.removeEventListener('mousewheel', handleWhell);
      plurksContainer.addEventListener('mousewheel', handleWhell);
    }
  },

  data() {
    return {
      userList: null,
      plurks: [],
      userData: null,
      scrollLength: 0
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
