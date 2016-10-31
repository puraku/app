<template>
  <div id="main-container">
    <navigation-bar />
    <div class="container" :class="{dark: isDarkTheme}">
      <div id="header" v-if="hideHead" :class="{ dark: isDarkTheme }">
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
      'loadUser',
      'initializeApp'
    ])
  },

  computed: {
    hideHead() {
      return !this.$route.path.includes('/about/');
    },

    isDarkTheme() {
      return this.theme === 'dark';
    },

    ...mapState({
      header: state => state.navbarHeader,
      theme: state => state.appTheme
    })
  },

  mounted() {
    this.initializeApp();
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

  &.dark {
    background-color: #1a2733;
  }
}

#header {
  width: 100%;
  height: 45px;
  color: black;
  background-color: #f1e4dd;
  text-align: center;
  font-size: 0.9em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 9999;

  -webkit-app-region: drag;

  &.dark {
    background-color: #1a2733;
    color: #e1e4ea;
  }
}

#main-container {
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
