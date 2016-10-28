<template>
  <div class="navigation-bar">
    <a class="avatar">
      <img :src="avatarURL" alt="">
    </a>

    <div class="icon" @click="goBack">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
    </div>

    <div class="icon" @click="goHome">
      <i class="fa fa-home" aria-hidden="true"></i>
    </div>

    <div class="icon">
      <i class="fa fa-inbox" aria-hidden="true"></i>
    </div>

    <div class="icon">
      <i class="fa fa-heart" aria-hidden="true"></i>
    </div>

  </div>
</template>

<script>
import { avatarURL } from '../helpers/userHelper';
import { getMe } from '../api/users';

export default {
  name: 'NavigationBar',

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    goHome() {
      this.$router.push('/');
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
      user: null
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

  .icon {
    width: 1.5em;
    margin: 0 auto;

    & > .fa {
      font-size: 1.5em;
      text-align: center;

      cursor: pointer;
      margin: .7em 0;
    }
  }
}

</style>
