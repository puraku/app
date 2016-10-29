<template>
  <div class="plurk-cards-container">
    <time-baseline />
    <plurk-card v-for="plurk in taggedPlurks" :plurk="plurk" :userList="userList" />
  </div>
</template>

<script>
import PlurkCard from '../components/PlurkCard.vue';
import TimeBaseline from '../components/TimeBaseline.vue';

import { getPlurks } from '../api/timeline';
import { postedDateTagger } from '../helpers/plurkHelper';

export default {
  name: 'Timeline',

  components: {
    PlurkCard,
    TimeBaseline
  },

  computed: {
    taggedPlurks() {
      return postedDateTagger(this.plurks);
    }
  },

  data() {
    return {
      plurks: []
    }
  },

  mounted() {
    getPlurks().then(({plurk_users, plurks}) => {
      this.userList = plurk_users;
      this.plurks = plurks;
    });
  }
}
</script>

<style lang="sass" scoped>
.plurk-cards-container {
  padding: 0em 2em 1em 0.5em;

  overflow-y: scroll;
  height: 100%;

  background-color: #f5ede8;
}
</style>
