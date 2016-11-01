<template>
  <div class="icon"  @click="onClick" :style="style" @mousedown="active = true" @mouseup="active = false">
    <i :class="iconClasses" aria-hidden="true" :style="styles" />
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
