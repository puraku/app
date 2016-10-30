<template>
  <div class="timeline" :style="timelineStyle"/>
</template>

<script>
export default {
  name: 'TimeBaseline',

  props: ['timelineStyle']
}
</script>

<style>
.timeline {
  position: absolute;
  height: 100%;
  width: 0.2em;
  background-color: white;
  right: 1.5em;
}
</style>
