<template>
  <div id="plurks-timeline">
    <navigation-bar />
    <div class="container">
      <div id="header">
        <p>我的河道</p>
      </div>
      <div class="plurk-cards-container">
        <div class="timeline"></div>
        <plurk-card v-for="plurk in plurks" :plurk="plurk" />
        <comment />

      </div>
    </div>
  </div>
</template>

<script>
import PlurkCard from './components/PlurkCard.vue';
import NavigationBar from './components/NavigationBar.vue';
import Comment from './components/Comment.vue';

import { getPlurks } from './api/timeline';

export default {
  name: 'app',

  components: {
    PlurkCard,
    NavigationBar,
    Comment
  },

  data() {
    return {
      plurks: []
    }
  },

  mounted() {
    getPlurks().then(({plurk_users, plurks}) => {
      this.plurks = plurks;
    });
  }
}
</script>

<style lang="sass">
#plurks-timeline {
  height: 100%;
  display: flex;
  flex-direction: row;
}

.container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  background-color: #f7ede8;
}

#header {
  width: 100%;
  height: 45px;
  color: white;
  background-color: #1a2733;
  text-align: center;

  z-index: 9999;

  -webkit-app-region: drag;
}

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
