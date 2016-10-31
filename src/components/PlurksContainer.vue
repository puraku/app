<template>
  <div class="plurks-container" :style="containerStyle" :class="{ dark: isDarkTheme }">
    <time-baseline :timelineStyle="timelineStyle" />
    <plurk-card v-for="plurk in plurks" :plurk="plurk"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { themeConfigurable } from 'mixins';

import PlurkCard from 'components/PlurkCard.vue';
import TimeBaseline from 'components/TimeBaseline.vue';

export default {
  name: 'PlurksContainer',

  mixins: [themeConfigurable],

  props: [
    'plurks',
    'timelineStyle',
    'containerStyle'
  ],

  components: {
    PlurkCard,
    TimeBaseline
  },

  computed: {
    ...mapState({
      theme: state => state.appTheme
    })
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
}
</style>
