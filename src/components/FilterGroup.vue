<template>
  <div class="filter-group" :class="{ dark: isDarkTheme }">
    <div class="filter-item" v-for="item in filterItems" :class="itemClasses(item)" @click="item.onClick">
      <div class="unread-dot" v-if="hasUnreadItem(item.value)"/>
      {{ item.label }}
    </div>
  </div>
</template>

<script>
import { themeConfigurable } from 'mixins';
import { mapState } from 'vuex';

export default {
  name: 'FilterGroup',

  mixins: [themeConfigurable],

  props: {
    filterItems: {
      type: Array
    },

    isSelected: {
      type: Function
    },

    unreadData: {
      type: Object
    }
  },

  methods: {
    itemClasses(item) {
      return this.isSelected(item) ? ['selected'] : [];
    },

    hasUnreadItem(key) {
      return this.unreadData && this.unreadData[key] > 0;
    }
  },

  computed: {
    ...mapState({
      theme: state => state.appTheme
    })
  }
}

</script>

<style lang="sass" scoped>
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
      position: relative;

      &.selected {
        color: #ef8733;
        border-style: solid;
        border-width: 0px 0 2px;
      }

      .unread-dot {
        background-color: #ef8733;
        position: absolute;
        right: 0;
        top: .3em;
        border-radius: 50%;
        width: 4px;
        height: 4px;
      }
    }

    &.dark {
      background-color: #353c42;
      border-color: #2b2b2b;
    }
  }
</style>
