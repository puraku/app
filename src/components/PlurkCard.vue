<template>
  <div class="plurk-container">
    <div class="posted-date" v-if="plurk.showPostedDate">
      {{ postedDate }}
    </div>
    <div class="plurk-card"  @dblclick="goToDetail" v-if="plurk && user">
      <div class="timestamp" v-if="showTimestamp">
        {{ timestamp }}
      </div>
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
      <div class="content" v-html="plurk.content" />
      <div class="actions">
        <div class="icon">
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>

        <div class="icon">
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </div>

        <div class="icon">
          <i class="fa fa-volume-off" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import { getPublicProfile } from '../api/profile';
import { avatarURL } from '../helpers/userHelper';
import Qualifier from './Qualifier.vue';

export default {
  name: 'PlurkCard',

  components: {
    Qualifier
  },

  props: {
    plurk: Object,
    displayTimestamp: {
      type: Boolean,
      default: true
    },
    userList: Object,
    showPostedDate: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      displayName: '',
      isUnread: true,
      postedAt: null
    }
  },

  methods: {
    goToDetail() {
      this.$router.push(`/plurks/${this.plurk.plurk_id}`);
    },

    goToAbout() {
      this.$router.push(`/about/${this.plurk.owner_id}`);
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

    user() {
      return this.userList && this.userList[this.plurk.owner_id];
    },

    avatarURL() {
      return avatarURL(this.user);
    }
  },
}
</script>

<style lang="sass" scoped>
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
  }

  .plurk-card {
    position: relative;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: .5em;

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

    .timestamp {
      font-size: .8em;
      color: #cecece;
      text-align: center;
      transform: rotate(90deg);
      width: 3em;
      right: 0;
      margin-top: -1em;
      margin-right: -3.1em;
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
    }

    a.ex_link.meta {
      background-color: #f6f8fd;
      display: flex;
      border-style: solid;
      border-color: #e5ebfa;
      font-size: 0.9em;
      padding: 2px 5px;
      margin-bottom: 5px;
    }

    .actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding: 0.3em 0;
      font-size: 1.2em;

      .icon {
        color: #c2c2c2;
        margin-right: 1em;
        cursor: pointer;
      }
    }
  }
}
</style>
