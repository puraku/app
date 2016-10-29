<template>
  <div class="profile" v-if="userData" >
    <div class="profile-background" :style="profileStyles" />
    <div class="avatar">
      <img :src="avatarURL" alt="avatar">
    </div>
    <div class="display-name">
      {{ user.display_name }}
    </div>
    <div class="nickname">
      @{{ user.nick_name }}
    </div>
    <div class="karma">
      karma {{ user.karma }}
    </div>
    <!--
    <div class="about">
      {{ user.about }}
    </div>
    -->
  </div>
</template>

<script>
import { avatarURL } from '../helpers/userHelper';

export default {
  name: 'Profile',

  props: {
    userData: {
      type: Object,
      default: null
    }
  },

  computed: {
    user() {
      return this.userData.user_info;
    },

    avatarURL() {
      return avatarURL(this.user, 'big');
    },

    profileStyles() {
      return [
        { backgroundImage: `url(${this.avatarURL})` }
      ];
    }
  }
}
</script>

<style lang="sass" scoped>
.profile {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1.2em 1em;
  min-height: 10em;

  // TODO: the color magic
  color: black;

  .profile-background {
    background-repeat: no-repeat;
    background-size: 100%;
    background-position-y: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    // TODO: the color magic
    filter: blur(18px) drop-shadow(5px 10px black);
    overflow: hidden;

    z-index: 1;
  }

  & > * {
    z-index: 2;
  }

  .avatar {
    width: 4em;
    height: 4em;
    margin: 0 auto;
    border-radius: 50%;
    margin-bottom: .5em;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .display-name {
    text-align: center;
    text-shadow: white .5px .5px 5px;
    font-size: 1.2em;
  }

  .nickname {
    text-align: center;
    text-shadow: white .5px .5px 5px;
    margin: 5px 0;
    font-size: .8em;
  }

  .karma {
    text-align: center;
    text-shadow: white .5px .5px 5px;
    margin: 5px 0;
  }

  .about {
    // TODO: the color magic
    text-shadow: white .5px .5px 5px;
  }
}
</style>
