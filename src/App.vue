<template>
  <div id="main-container" :class="{dark: isDarkTheme}">
    <navigation-bar />
    <router-view />
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
    isDarkTheme() {
      return this.theme === 'dark';
    },

    scrollbarStyleNode() {
      return document.querySelector('#scrollbarStyleNode');
    },

    ...mapState({
      theme: state => state.appTheme
    })
  },

  mounted() {
    this.initializeApp();
    this.loadUser();
  },

  updated() {
    if (this.scrollbarStyleNode) {
      scrollbarStyleNode.innerHTML = this.isDarkTheme ? this.darkScrollbarStyle : '';
    }
  },

  data() {
    return {
      darkScrollbarStyle: `
        ::-webkit-scrollbar-thumb {
          background: #87919d;
          border: 3px solid #303a46;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #b8c5d3;
        }
        ::-webkit-scrollbar-thumb:active {
          background: #bac5d2;
        }
        ::-webkit-scrollbar-track {
          background: #303a46;
        }
        ::-webkit-scrollbar-track:hover {
          background: #303a46;
        }
        ::-webkit-scrollbar-track:active {
          background: #303a46;
        }`
    }
  }

}
</script>

<style lang="sass">

#main-container {
  height: 100%;
  display: flex;
  flex-direction: row;

  background-color: #f7ede8;

  &.dark {
    background-color: #1a2733;
  }

  .container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
}
</style>
