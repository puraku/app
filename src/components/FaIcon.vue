<template>
  <div class="icon"  @click="onClick" :style="style">
    <i :class="iconClasses" aria-hidden="true" :style="iconStyle" />
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
    }
  }
}
</script>
