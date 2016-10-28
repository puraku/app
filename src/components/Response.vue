<template>
  <div class="response" v-if="validResponse">
    <div class="profile">
      <div class="avatar">
        <img :src="avatarURL" alt="">
      </div>

      <div class="name">{{ user.display_name }}</div>
      <qualifier :qualifierKey="response.qualifier" :text="response.qualifier_translated" />
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

  data() {
    return {
    };
  },
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

    .avatar {
      margin: 0 5px;
      width: 25px;
      height: 25px;
      overflow: hidden;
      border-radius: 50%;

      img {
        width: 25px;
      }
    }

    .qualifier {
      margin: 0 2px;
      background-color: #ff8100;
    }
  }

  .content {
    padding: 0 30px;
    font-size: 1em;
  }
}

</style>
