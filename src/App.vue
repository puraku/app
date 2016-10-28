<template>
  <div id="main-container">
    <navigation-bar />
    <div class="container">
      <div id="header">
        <p>我的河道</p>
      </div>
      <timeline />
    </div>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import Timeline from './views/Timeline.vue';

export default {
  name: 'app',

  components: {
    NavigationBar,
    Timeline
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
  color: white;
  background-color: #1a2733;
  text-align: center;

  z-index: 9999;

  -webkit-app-region: drag;
}

#main-container {
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
