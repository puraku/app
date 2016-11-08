<template>
  <div class="container">
    <title-bar />
    <plurks-container :plurks="plurks" :onEndReached="onEndReached" />
  </div>
</template>

<script>
import PlurksContainer from 'components/PlurksContainer.vue';
import TitleBar from 'components/TitleBar.vue';

import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Timeline',

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
      timeline: state => state.plurks.timeline[state.selectedUserId]
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
