<template>
  <div class="container">
    <title-bar />
    <div class="filter-group" :class="{ dark: isDarkTheme }">
      <div class="filter-item selected">所有</div>
      <div class="filter-item">我的</div>
      <div class="filter-item">私人</div>
      <div class="filter-item">回應</div>
      <div class="filter-item">喜歡</div>
      <div class="filter-item">轉噗</div>
    </div>
    <plurks-container :plurks="plurks" :onEndReached="onEndReached" />
  </div>
</template>

<script>
import PlurksContainer from 'components/PlurksContainer.vue';
import TitleBar from 'components/TitleBar.vue';

import { themeConfigurable } from 'mixins';

import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Timeline',

  mixins: [themeConfigurable],

  components: {
    PlurksContainer,
    TitleBar
  },

  methods: {
    onEndReached() {
      if (!this.isFetching && this.plurks && this.plurks.length > 0) {
        this.isFetching = true;

        this.fetchTimelineNextPage(() => {
          this.isFetching = false;
        });
      }
    },

    ...mapActions([
      'fetchTimelinePlurks',
      'fetchTimelineNextPage',
      'changeHeader',
      'registerPolling',
      'unregisterPolling'
    ])
  },

  computed: {
    ...mapState({
      timeline: state => state.plurks.timeline[state.selectedUserId],
      theme: state => state.appTheme
    }),

    ...mapGetters({
      plurks: 'currentUserTimeline'
    })
  },

  mounted() {
    this.registerPolling();

    if (typeof this.timeline === 'undefined' || this.timeline.length == 0) {
      this.fetchTimelinePlurks();
    } else {
      // TODO: poll new plurks
    }

    this.changeHeader('我的河道');
  },

  beforeDestroy() {
    this.unregisterPolling();
  },

  data() {
    return {
      isFetching: false
    }
  }
}
</script>

<style lang="sass">
  .filter-group {
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 .2em;
    -webkit-user-select: none;
    border-style: solid;
    border-width: 0 0 0.1px;
    border-color: #e8e8e8;

    .filter-item {
      color: #c3c3c3;
      padding: .3em .4em;
      cursor: pointer;

      &.selected {
        color: #ef8733;
        border-style: solid;
        border-width: 0px 0 2px;
      }
    }

    &.dark {
      background-color: #353c42;
      border-color: #2b2b2b;
    }
  }
</style>
