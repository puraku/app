<template>
  <div class="filter-group" :class="{ dark: isDarkTheme }">
    <div class="filter-item" v-for="item in filterItems" :class="itemClasses(item)" @click="item.onClick">
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
    }
  },

  methods: {
    itemClasses(item) {
      return this.isSelected(item) ? ['selected'] : [];
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
