<template>
  <div class="navigation-bar">
    <a class="avatar">
      <img :src="avatarURL" alt="">
    </a>

    <fa-icon iconName="arrow-left" :style="faStyle" :iconStyle="iconStyle" :click="goBack" />
    <fa-icon iconName="home" :style="faStyle" :iconStyle="iconStyle" :click="goHome" />
    <fa-icon iconName="user" :style="faStyle" :iconStyle="iconStyle" :click="goAbout" />
    <fa-icon iconName="inbox" :style="faStyle" :iconStyle="iconStyle" />
    <fa-icon iconName="heart" :style="faStyle" :iconStyle="iconStyle" />

  </div>
</template>

<script>
import FaIcon from 'components/FaIcon.vue';

import { avatarURL } from 'helpers/userHelper';
import { getMe } from 'api/users';

export default {
  name: 'NavigationBar',

  components: {
    FaIcon
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    goHome() {
      this.$router.push('/');
    },

    goAbout() {
      this.user && this.$router.push(`/about/${this.user.id}`);
    }
  },

  computed: {
    avatarURL() {
      return avatarURL(this.user);
    }
  },

  mounted() {
    getMe().then(data => {
      this.user = data;
    });
  },

  data() {
    return {
      user: null,

      faStyle: {
        width: '1.5em',
        margin: '0 auto',
        textAlign: 'center'
      },

      iconStyle: {
        fontSize: '1.5em',
        cursor: 'pointer',
        margin: '.7em 0'
      }
    };
  }
}
</script>

<style lang="sass" scoped>
.navigation-bar	{
  height: 100%;
  padding-top: 3em;
  min-width: 75px;
  max-width: 75px;
  color: #f6882d;
  background-color: #26323f;

  -webkit-app-region: drag;

  display: flex;
  flex-direction: column;

  a.avatar {
    padding: 10px;
    max-width: 100%;
    text-align: center;

    img {
      max-width: 100%;
      border-radius: 5px;
    }
  }
}

</style>
