<template>
  <plurks-container :plurks="plurks" :onEndReached="onEndReached" />
</template>

<script>
import PlurksContainer from 'components/PlurksContainer.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Timeline',

  components: {
    PlurksContainer
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
      'changeHeader'
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
    if (typeof this.timeline === 'undefined' || this.timeline.length == 0) {
      this.fetchTimelinePlurks();
    } else {
      // TODO: poll new plurks
    }

    this.changeHeader('我的河道');
  },

  data() {
    return {
      isFetching: false
    }
  }
}
</script>
