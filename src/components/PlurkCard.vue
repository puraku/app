<template>
  <div class="plurk-container">
    <div class="posted-date" v-if="plurk.showPostedDate" :class="{dark: isDarkTheme}">
      {{ postedDate }}
    </div>
    <div class="plurk-card" v-if="plurk && user">
      <div class="timestamp" v-if="showTimestamp" @click="goToDetail" :class="{dark: isDarkTheme}" >
        {{ timestamp }}
      </div>
      <div class="replurker-card" v-if="plurk && replurker" :class="{dark: isDarkTheme}">
        <div class="replurker-name" @click="goToReplurker">
          {{ replurker.display_name }}
        </div>
        <div class="replurk-icon">
          <fa-icon iconName="refresh" :style="replurkStyle" />
          轉噗
        </div>
      </div>
      <div class="plurk-content" :class="{dark: isDarkTheme}">
        <div class="reply-count" v-if="plurk.response_count > 0" :class="{unread: isUnread}" @click="goToDetail" >
          {{ plurk.response_count }}
        </div>
        <div class="profile">
          <a class="avatar" @click="goToAbout">
            <img :src="avatarURL" alt="avatar">
          </a>
          <div class="name" @click="goToAbout">
            {{ user.display_name }}
          </div>
          <qualifier :qualifierKey="plurk.qualifier" :text="plurk.qualifier_translated"/>
        </div>
        <div class="content" v-html="plurk.content" @click="goToDetail" :class="{dark: isDarkTheme}"/>
        <div class="actions">
          <fa-icon iconName="heart" :style="faStyle" />
          <fa-icon iconName="refresh" :style="faStyle" />
          <fa-icon iconName="volume-off" :style="faStyle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import { mapState } from 'vuex';
import { themeConfigurable } from 'mixins';

import { avatarURL } from 'helpers/userHelper';
import { registerContentEvent, unregisterContentEvent } from 'helpers/plurkHelper';

import Qualifier from 'components/Qualifier.vue';
import FaIcon from 'components/FaIcon.vue';

export default {
  name: 'PlurkCard',

  mixins: [themeConfigurable],

  components: {
    Qualifier,
    FaIcon
  },

  props: {
    plurk: Object,
    displayTimestamp: {
      type: Boolean,
      default: true
    },
    showPostedDate: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      displayName: '',
      isUnread: true,
      postedAt: null,
      faStyle: {
        color: '#c2c2c2',
        marginRight: '1em',
        cursor: 'pointer'
      },

      replurkStyle: {
        marginRight: '.3em',
        paddingTop: '.15em'
      }
    }
  },

  methods: {
    goToDetail() {
      this.$router.push(`/plurks/${this.plurk.plurk_id}`);
    },

    goToAbout() {
      this.$router.push(`/about/${this.plurk.owner_id}`);
    },

    goToReplurker() {
      this.$router.push(`/about/${this.replurker.id}`);
    }
  },

  computed: {
    timestamp() {
      return this.postedAt.format('HH:mm');
    },

    showTimestamp() {
      return this.postedAt && this.displayTimestamp;
    },

    postedDate() {
      const formatedDate = this.postedAt.format('YYYY-MM-DD');
      if (moment().format('YYYY-MM-DD') === formatedDate) {
        return 'Today';
      } else {
        return formatedDate;
      }
    },

    postedAt() {
      return moment.parseZone(this.plurk.posted);
    },

    isUnread() {
      return this.plurk.is_unread == 1;
    },

    avatarURL() {
      return avatarURL(this.user);
    },

    user() {
      return this.userList[this.plurk.owner_id];
    },

    replurker() {
      return this.plurk.replurker_id && this.userList[this.plurk.replurker_id];
    },

    ...mapState({
      userList: state => state.userList,
      theme: state => state.appTheme
    })
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

<style lang="sass">
.plurk-container {
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    margin: .5em 0;
  }

  .posted-date {
    padding: 0 .5em;
    text-align: center;
    margin: 0 auto 5px;
    font-size: 0.8em;
    color: #cecece;
    background-color: white;
    overflow: hidden;
    border-radius: 7px;

    &.dark {
      color: #696969;
      background-color: #f9f9f9;
    }
  }

  .plurk-card {
    position: relative;
    display: flex;
    flex-direction: column;
    -webkit-user-drag: element;

    .reply-count {
      position: absolute;
      background-color: #cecece;
      color: white;
      cursor: pointer;

      right: 0;
      margin-top: -.5em;
      min-width: 1.3em;
      height: 1.3em;
      text-align: center;
      padding: 0.1em 2px 0 2px;

      &.unread {
        background-color: #ff002b;
      }
    }

    .replurker-card {
      width: 100%;
      height: 2em;
      margin-bottom: 2px;
      background-color: white;
      display: flex;
      font-size: 0.8em;
      padding: .25em .5em;
      box-sizing: border-box;
      cursor: pointer;

      -webkit-user-select: none;

      &.dark {
        background-color: #353c42;
        color: #e8e8e8;
      }

      .replurk-icon {
        display: flex;
        color: white;
        background: #008e12;
        margin-left: .5em;
        padding: 0 .5em;
        border-radius: 5px;
        cursor: default;
      }
    }

    .plurk-content {
      padding: .5em;
      background-color: white;

      &.dark {
        background-color: #353c42;
        color: #e8e8e8;
      }
    }

    .timestamp {
      font-size: .8em;
      color: #cecece;
      text-align: center;
      transform: rotate(90deg);
      padding: 0 .2em;
      right: 0;
      margin-top: -1em;
      margin-right: -2.5em;
      background-color: white;
      border-radius: 5px;
      position: absolute;
      cursor: pointer;

      &.dark {
        color: #696969;
      }
    }

    .profile {
      display: flex;
      flex-direction: row;

      .avatar {
        width: 2.5em;
        min-width: 2.5em;
        height: 2.5em;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        height: 2em;
        margin-top: 0.5em;
        margin-left: .5em;
        cursor: pointer;
      }

    }

    .content {
      margin-top: .5em;
      font-size: 1em;
      word-break: break-all;

      a.ex_link.meta {
        background-color: #f6f8fd;
        display: flex;
        border-style: solid;
        border-color: #e5ebfa;
        font-size: 0.9em;
        padding: 2px 5px;
        margin-bottom: 5px;

        &:hover {
          text-decoration: underline;
        }
      }

      &.dark {
        a.ex_link.meta {
          background-color: #353c42;
          border-color: #1a2733;
        }

        a.ex_link {
          color: #ffcc95;
        }

        a.meta {
          color: #ffcc95;
        }
      }

      a.ex_link {
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding: 0.3em 0;
      font-size: 1.2em;
    }
  }
}
</style>
