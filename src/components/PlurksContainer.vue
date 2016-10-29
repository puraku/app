<template>
  <div class="plurks-container">
    <time-baseline />
    <plurk-card v-for="plurk in taggedPlurks" :plurk="plurk" :userList="userList" />
  </div>
</template>

<script>
import PlurkCard from '../components/PlurkCard.vue';
import TimeBaseline from '../components/TimeBaseline.vue';

import { postedDateTagger } from '../helpers/plurkHelper';

export default {
  name: 'PlurksContainer',

  props: [
    'plurks',
    'userList'
  ],

  components: {
    PlurkCard,
    TimeBaseline
  },

  computed: {
    taggedPlurks() {
      return postedDateTagger(this.plurks);
    }
  }
}
</script>

<style scoped>
.plurks-container {
  padding: 0em 2em 1em 0.5em;

  overflow-y: scroll;
  height: 100%;

  background-color: #f5ede8;
}
</style>
