<template>
  <div id="main-container">
    <navigation-bar />
    <div class="container">
      <div id="header">
        <p>{{ header }}</p>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'app',

  components: {
    NavigationBar
  },

  methods: {
    ...mapActions([
      'loadUser'
    ])
  },

  computed: {
    ...mapState({
      header: state => state.navbarHeader
    })
  },

  mounted() {
    this.loadUser();
  }
}
</script>

<style lang="sass">
.container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  background-color: #f7ede8;
}

#header {
  width: 100%;
  height: 45px;
  color: #e1e4ea;
  background-color: #1a2733;
  text-align: center;
  font-size: 0.9em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 9999;

  -webkit-app-region: drag;
}

#main-container {
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
