<template>
  <div class="container">
    <title-bar />
    <filter-group :filterItems="filterItems" :isSelected="isFilterItemSelected" :unreadData="unreadData" />
    <plurks-container :plurks="plurks" :onEndReached="onEndReached" />
  </div>
</template>

<script>
import PlurksContainer from 'components/PlurksContainer.vue';
import TitleBar from 'components/TitleBar.vue';
import FilterGroup from 'components/FilterGroup.vue';

import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Timeline',

  components: {
    PlurksContainer,
    TitleBar,
    FilterGroup
  },

  methods: {
    isFilterItemSelected(item) {
      const selectedFilter = this.$route.query.filter;
      if (item.value === 'all') {
        return typeof selectedFilter === 'undefined' || selectedFilter === item.value;
      } else {
        return selectedFilter === item.value;
      }
    },

    mapFilterItem(item) {
      const self = this;
      return {
        label: item[0],
        value: item[1],
        onClick: function() {
          self.$router.push({
            name: 'timeline',
            query: {
              filter: item[1]
            }
          })
        }
      }
    },

    onEndReached() {
      if (!this.isFetching && this.plurks && this.plurks.length > 0) {
        this.isFetching = true;

        this.fetchTimelineNextPage({
          callback: () => {
            this.isFetching = false;
          }
        });
      }
    },

    ...mapActions([
      'fetchTimelinePlurks',
      'fetchTimelineNextPage',
      'changeHeader',
      'registerPolling',
      'unregisterPolling',
      'fetchUnreadCount'
    ])
  },

  computed: {
    filterItems() {
      return this.filters.map(this.mapFilterItem);
    },

    ...mapState({
      timeline: state => state.plurks.timeline[state.selectedUserId],
      unreadData: state => state.plurks.unreadData
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
      isFetching: false,
      filters: [
        ['所有', 'all'],
        ['我的', 'my'],
        ['私人', 'private'],
        ['回應', 'responded'],
        ['喜歡', 'favorite'],
        ['轉噗', 'replurked']
      ]
    }
  }
}
</script>
