<template>
  <div class="plurks-container" :style="containerStyle" :class="{ dark: isDarkTheme }">
    <time-baseline :timelineStyle="timelineStyle" />
    <div class="unread-card" :class="{ dark: isDarkTheme }" v-if="showUnreadCard" @click="toggleUnread">
      {{ unreadCount }} 則訊息有新回應
    </div>
    <div class="unread-card" :class="{ dark: isDarkTheme }" v-if="showDisplayAll" @click="toggleUnread">
      <fa-icon iconName="commenting" :style="{display: 'inline-block'}" />
      顯示所有訊息
    </div>
    <div class="unread-card" :class="{ dark: isDarkTheme }" v-if="showUnreadActions">
      <fa-icon iconName="check" :style="{display: 'inline-block'}"/>
      將這些訊息標為已讀
    </div>
    <plurk-card v-for="plurk in plurks" :plurk="plurk"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { themeConfigurable } from 'mixins';

import PlurkCard from 'components/PlurkCard.vue';
import FaIcon from 'components/FaIcon.vue';
import TimeBaseline from 'components/TimeBaseline.vue';

export default {
  name: 'PlurksContainer',

  mixins: [themeConfigurable],

  props: [
    'plurks',
    'timelineStyle',
    'containerStyle',
    'onEndReached',
    'unreadToggleCallback'
  ],

  components: {
    PlurkCard,
    TimeBaseline,
    FaIcon
  },

  computed: {
    showUnreadActions() {
      return this.hasUnreadQuery && this.unreadCount > 0 && this.$route.name === 'timeline';
    },

    showDisplayAll() {
      return this.hasUnreadQuery && this.$route.name === 'timeline';
    },

    unreadCount() {
      const filter = this.$route.query.filter || 'all';
      return this.unreadData[filter];
    },

    showUnreadCard() {
      return this.unreadCount > 0 && this.$route.name === 'timeline' && !this.hasUnreadQuery;
    },

    hasUnreadQuery() {
      return this.$route.query.unread === 'true';
    },

    ...mapState({
      theme: state => state.appTheme,
      unreadData: state => state.plurks.unreadData
    })
  },

  methods: {
    toggleUnread() {
      this.$router.push({
        query: {
          ...this.$route.query,
          unread: this.$route.query.unread === 'true' ? 'false' : 'true'
        }
      });

      this.$nextTick(function() {
        this.unreadToggleCallback();
      })
    }
  },

  data() {
    return {
      onScroll(self) {
        return function() {
          const threshold = 400;
          if (this.scrollTop + threshold > this.scrollHeight - this.offsetHeight) {
            self.onEndReached && self.onEndReached();
          }
        }
      }
    }
  },

  mounted() {
    const self = this;
    this.$el.addEventListener('scroll', this.onScroll(self));
  },

  beforeDestroy() {
    const self = this;
    this.$el.removeEventListener('scroll', this.onScroll(self));
  }
}
</script>

<style lang="sass" scoped>
.plurks-container {
  padding: 0em 1.5em 1em 0.5em;

  overflow-y: scroll;
  height: 100%;

  background-color: #f5ede8;

  &.dark {
    background-color: #1a2733;
  }

  .unread-card {
    background-color: white;
    color: #ffa458;
    text-align: center;
    margin-top: .5em;
    padding: .3em 0;
    cursor: pointer;

    &.dark {
      background-color: #353c42;
    }
  }
}
</style>
