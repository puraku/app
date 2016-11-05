<template>
  <div class="icon"  @click="onClick" :style="style" @mousedown="active = true" @mouseup="active = false">
    <i :class="iconClasses" aria-hidden="true" :style="styles" />
    <div class="badge-count" v-if="badgeCount && badgeCount > 0" :class="{dark: isDark}">{{ badgeCount }}</div>
  </div>
</template>

<script>
export default {
  name: 'FaIcon',

  props: {
    iconName: {
      type: String,
      required: true
    },

    click: {
      type: Function,
      default: function() {  }
    },

    style: {
      type: Object
    },

    iconStyle: {
      type: Object
    },

    highlighted: {
      type: Boolean,
      default: false
    },

    highlightedStyle: {
      type: Object
    },

    badgeCount: {
      type: Number
    },

    isDark: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onClick() {
      this.click();
    }
  },

  computed: {
    iconClasses() {
      return ['fa', `fa-${this.iconName}`];
    },

    styles() {
      return (this.highlighted || this.active) ? [this.iconStyle, this.highlightedStyle] : this.iconStyle;
    }
  },

  data() {
    return {
      active: false
    }
  }
}
</script>

<style lang="sass" scoped>
.badge-count {
  position: absolute;
  font-size: 0.6em;
  top: -0.6em;
  line-height: 0.8em;
  border-radius: 25px;
  text-align: center;
  right: -1.5em;
  background-color: white;
  box-sizing: border-box;
  padding: 0.1em 0.5em;
  border-width: .2em;
  border-style: solid;

  &.dark {
    background-color: #353c42;
  }
}
</style>
