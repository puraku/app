<template>
  <div class="plurk-card">
    <div class="timestamp">
      19:40
    </div>
    <div class="reply-count">
      {{ plurk.response_count }}
    </div>
    <div class="profile">
      <a class="avatar">
        <img :src="avatarURL" alt="avatar">
      </a>
      <div class="name">
        {{ displayName }}
      </div>
    </div>
    <div class="content" v-html="plurk.content" />
    <div class="actions">
    </div>
  </div>
</template>

<script>
import { getPublicProfile } from '../api/profile';

export default {
  name: 'PlurkCard',

  props: ['plurk'],

  data () {
    return {
      avatarURL: 'http://www.plurk.com/static/default_medium.gif',
      displayName: ''
    }
  },

  methods: {
  },

  mounted() {
    // console.log(this.plurk.owner_id);
    getPublicProfile(this.plurk.owner_id).then(data => {
      this.avatarURL = data.user_info.avatar_medium;
      this.displayName = data.user_info.display_name;
      console.log(data);
    }).catch(error => {
      // TODO: error handling
      console.log(error);
    });
  }
}
</script>

<style lang="sass" scoped>
.plurk-card {
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: .5em;

  &:not(:first-child) {
    margin: .5em 0;
  }

  .reply-count {
    position: absolute;
    background-color: #cecece;
    color: white;

    right: 0;
    margin-top: -.5em;
    width: 1.3em;
    height: 1.3em;
    text-align: center;
  }

  .timestamp {
    color: #cecece;
    text-align: center;
    transform: rotate(90deg);
    width: 3em;
    right: 0;
    margin-top: -1em;
    margin-right: -2.8em;
    background-color: white;
    border-radius: 5px;
    position: absolute;
  }

  .profile {
    display: flex;
    flex-direction: row;

    .avatar {
      width: 2.5em;
      height: 2.5em;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .name {
      height: 2em;
      margin-top: 0.5em;
      margin-left: .5em;
    }
  }

  .content {
    margin-top: .5em;
    font-size: 1em;
  }
}
</style>
