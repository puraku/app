<template>
  <div :class="qualifierClasses" v-if="text" :style="styles">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'Qualifier',

  props: ['qualifierKey', 'text', 'styles'],

  computed: {
    qualifierClasses() {
      return ['qualifier', this.qualifierKey];
    }
  }
}
</script>

<style lang="sass" scoped>
.qualifier {
  height: 1.4em;
  margin-top: 0.5em;
  margin-left: .5em;
  background-color: #cccccc;
  padding: 0 4px;
  border-radius: 5px;

  color: white;

  // see http://i.imgur.com/wxefWL6.png
  &.loves     { background-color: #b32e25; }
  &.likes     { background-color: #cc362c; }
  &.shares    { background-color: #a74949; }
  &.gives     { background-color: #621510; }
  &.hates     { background-color: #111111; }
  &.wants     { background-color: #8db241; }
  &.has       { background-color: #777777; }
  &.will      { background-color: #b46db9; }
  &.asks      { background-color: #8361bc; }
  &.wishes    { background-color: #e05be9; }
  &.was       { background-color: #525252; }
  &.feels     { background-color: #3083be; }
  &.thinks    { background-color: #3083be; }
  &.says      { background-color: #e25731; }
  &.is        { background-color: #e57c43; }
  &.freestyle { background-color: #cccccc; color: black; }
  &.hopes     { background-color: #e05be9; }
  &.needs     { background-color: #7a9a37; }
  &.wonders   { background-color: #2e4e9e; }
}
</style>
