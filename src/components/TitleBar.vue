<template>
  <div id="title-bar" :class="{ dark: isDarkTheme }">
    <p>{{ header }}</p>
  </div>
</template>

<script>
import { themeConfigurable } from 'mixins';
import { mapState } from 'vuex';

export default {
  name: 'TitleBar',

  mixins: [themeConfigurable],

  props: ['show', 'title'],

  computed: {
    ...mapState({
      header: state => state.navbarHeader,
      theme: state => state.appTheme
    })
  }
}
</script>

<style lang="sass" scoped>
#title-bar {
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
  -webkit-user-select: none;

  &.dark {
    background-color: #1a2733;
    color: #e1e4ea;
  }
}
</style>
