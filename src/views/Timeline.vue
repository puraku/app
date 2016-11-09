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
      return {
        label: item[0],
        value: item[1],
        onClick: () => {
          this.$router.push({
            name: 'timeline',
            query: {
              ...this.$route.query,
              filter: item[1]
            }
          });

          this.$nextTick(function() {
            if (item[1] !== 'all' || typeof this.plurks === 'undefined' || this.plurks.length == 0) {
              this.isFetching = true;
              this.clearTimelinePlurks({ filter: this.$route.query.filter });
              this.fetchTimelinePlurks({
                options: { filter: this.$route.query.filter },
                callback: () => { this.isFetching = false; }
              });
            }
          });
        }
      }
    },

    onEndReached() {
      if (!this.isFetching && this.plurks && this.plurks.length > 0) {
        this.isFetching = true;

        this.fetchTimelineNextPage({
          options: { filter: this.$route.query.filter },
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
      'fetchUnreadCount',
      'clearTimelinePlurks'
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

  beforeMount() {
    this.registerPolling();

    if (typeof this.plurks === 'undefined' || this.plurks.length == 0) {
      this.isFetching = true
      this.fetchTimelinePlurks({
        options: { filter: this.$route.query.filter },
        callback: () => {
          this.isFetching = false;
        }
      });
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
