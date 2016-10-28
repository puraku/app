<template>
  <div class="plurk-card">
    <div class="timestamp" v-if="postedAt">
      {{ timestamp }}
    </div>
    <div class="reply-count" v-if="plurk.response_count > 0" :class="{unread: isUnread}">
      {{ plurk.response_count }}
    </div>
    <div class="profile">
      <a class="avatar">
        <img :src="avatarURL" alt="avatar">
      </a>
      <div class="name">
        {{ displayName }}
      </div>
      <div :class="qualifierClasses">
        {{ plurk.qualifier_translated }}
      </div>
    </div>
    <div class="content" v-html="plurk.content" />
    <div class="actions">
    </div>
  </div>
</template>

<script>
import { getPublicProfile } from '../api/profile';
import moment from 'moment';

export default {
  name: 'PlurkCard',

  props: ['plurk'],

  data () {
    return {
      avatarURL: 'http://www.plurk.com/static/default_medium.gif',
      displayName: '',
      isUnread: true,
      postedAt: null
    }
  },

  methods: {
    unreadCovert(unread) {
      return unread == 1;
    }
  },

  computed: {
    timestamp() {
      return this.postedAt.format('HH:mm');
    },

    qualifierClasses() {
      let classes = ['qualifier'];

      if (typeof this.plurk.qualifier_translated === 'string' && this.plurk.qualifier_translated.length > 0) {
        classes.push('show')
      }

      classes.push(this.plurk.qualifier);

      return classes;
    }
  },

  mounted() {
    this.postedAt = moment.parseZone(this.plurk.posted);
    this.isUnread = this.unreadCovert(this.plurk.is_unread);

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

<style lang="sass">
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

    .qualifier {
      height: 1.4em;
      margin-top: 0.5em;
      margin-left: .5em;
      background-color: #cccccc;
      padding: 0 4px;
      border-radius: 5px;
      display: none;

      color: white;

      &.show {
        display: block;
      }

      &.loves     { background-color: #b32e25; }
      &.likes     { background-color: #cc362c; }
      &.shares    { background-color: #a74949; }
      &.gives     { background-color: #621510; }
      &.hates     { background-color: #111111; }
      &.wants     { background-color: #8db241; }
      &.has       { background-color: #777777; }
      &.will      { background-color: #b46db9; }
      &.asks      { background-color: #8361bc; }
      &.wishes    { background-color: #e05be9; }
      &.was       { background-color: #525252; }
      &.feels     { background-color: #3083be; }
      &.thinks    { background-color: #3083be; }
      &.says      { background-color: #e25731; }
      &.is        { background-color: #e57c43; }
      &.freestyle { background-color: #cccccc; color: black; }
      &.hopes     { background-color: #e05be9; }
      &.needs     { background-color: #7a9a37; }
      &.wonders   { background-color: #2e4e9e; }
    }
  }

  .content {
    margin-top: .5em;
    font-size: 1em;
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
}
</style>
