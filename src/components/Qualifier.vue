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
@import '../styles/main.scss';

.qualifier {
  height: 1.4em;
  margin-top: 0.5em;
  margin-left: .5em;
  background-color: #cccccc;
  padding: 0 4px;
  border-radius: 5px;
  color: white;

  -webkit-user-select: none;

  @extend .qualifier-colors;
}
</style>
