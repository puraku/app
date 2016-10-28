<template>
  <div class="plurk-cards-container">
    <div class="timeline"></div>
    <plurk-card v-for="plurk in plurks" :plurk="plurk" :userList="userList" />
  </div>
</template>

<script>
import PlurkCard from '../components/PlurkCard.vue';

import { getPlurks } from '../api/timeline';

export default {
  name: 'Timeline',

  components: {
    PlurkCard
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
  padding: 1em 2em 1em 0.5em;

  overflow-y: scroll;
  height: 100%;

  background-color: #f5ede8;

  .timeline {
    position: absolute;
    height: 100%;
    width: 0.2em;
    background-color: white;
    right: 1.5em;
    top: 0;
  }
}
</style>
