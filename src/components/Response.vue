<template>
  <div v-if="validResponse" :class="['response', {dark: isDarkTheme}]">
    <div class="profile">
      <div class="avatar" @click="goToAbout">
        <img :src="avatarURL" alt="">
      </div>

      <div class="name" @click="goToAbout">
        {{ username }}
      </div>
      <qualifier :qualifierKey="response.qualifier" :text="response.qualifier_translated" :styles="{height: '1.8em'}" />
    </div>
    <div class="content" v-html="response.content"/>
  </div>
</template>

<script>
import Qualifier from 'components/Qualifier.vue';

import { mapState } from 'vuex';
import { themeConfigurable } from 'mixins';

import { getPublicProfile } from 'api/profile';
import { avatarURL } from 'helpers/userHelper';
import { registerContentEvent, unregisterContentEvent } from 'helpers/plurkHelper';

export default {
  name: 'Response',

  mixins: [themeConfigurable],

  components: {
    Qualifier
  },

  props: {
    response: {
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
    },

    username() {
      return this.user && (this.user.display_name || this.user.nick_name);
    },

    ...mapState({
      userList: state => state.userList,
      theme: state => state.appTheme
    })
  },

  methods: {
    goToAbout() {
      this.$router.push(`/about/${this.response.user_id}`);
    }
  },

  mounted() {
    registerContentEvent(this.$el);
  },

  updated() {
    registerContentEvent(this.$el);
  },

  beforeDestroy() {
    unregisterContentEvent(this.$el);
  }
}
</script>

<style lang="sass" scoped>
.response {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  -webkit-user-drag: element;

  &.dark {
    color: #e8e8e8;
  }

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
