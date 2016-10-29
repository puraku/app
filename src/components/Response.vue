<template>
  <div class="response" v-if="validResponse">
    <div class="profile">
      <div class="avatar" @click="goToAbout">
        <img :src="avatarURL" alt="">
      </div>

      <div class="name" @click="goToAbout">
        {{ user.display_name || user.nick_name }}
      </div>
      <qualifier :qualifierKey="response.qualifier" :text="response.qualifier_translated" :styles="{height: '1.8em'}" />
    </div>
    <div class="content" v-html="response.content"/>
  </div>
</template>

<script>
import Qualifier from './Qualifier.vue';

import { getPublicProfile } from '../api/profile';
import { avatarURL } from '../helpers/userHelper';

export default {
  name: 'Response',

  components: {
    Qualifier
  },

  props: {
    response: {
      type: Object,
      default: null
    },

    userList: {
      type: Object,
      default: null
    }
  },

  computed: {
    validResponse() {
      return this.response && this.userList;
    },

    user() {
      return this.userList[this.response.user_id];
    },

    avatarURL() {
      return avatarURL(this.user);
    }
  },

  methods: {
    goToAbout() {
      this.$router.push(`/about/${this.response.user_id}`);
    }
  },

  data() {
    return {
    };
  }
}
</script>

<style lang="sass" scoped>
.response {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;

  .profile {
    display: flex;
    flex-direction: row;
    font-size: 0.8em;
    line-height: 2em;
    margin-bottom: 0.4em;

    .avatar {
      margin: 0 5px;
      width: 25px;
      height: 25px;
      overflow: hidden;
      border-radius: 50%;
      cursor: pointer;

      img {
        width: 25px;
      }
    }

    .name {
      text-shadow: black .1px .1px;
      cursor: pointer;
    }

    .qualifier {
      margin: 0 2px;
    }
  }

  .content {
    padding: 0 30px;
    font-size: 1em;
    word-break: break-all;
  }
}

</style>
