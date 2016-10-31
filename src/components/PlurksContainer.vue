<template>
  <div class="plurks-container" :style="containerStyle">
    <time-baseline :timelineStyle="timelineStyle" />
    <plurk-card v-for="plurk in plurks" :plurk="plurk"/>
  </div>
</template>

<script>
import PlurkCard from 'components/PlurkCard.vue';
import TimeBaseline from 'components/TimeBaseline.vue';

export default {
  name: 'PlurksContainer',

  props: [
    'plurks',
    'timelineStyle',
    'containerStyle'
  ],

  components: {
    PlurkCard,
    TimeBaseline
  }
}
</script>

<style scoped>
.plurks-container {
  padding: 0em 1.5em 1em 0.5em;

  overflow-y: scroll;
  height: 100%;

  background-color: #f5ede8;
}
</style>
