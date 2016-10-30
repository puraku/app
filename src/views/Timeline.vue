<template>
  <plurks-container :plurks="plurks" />
</template>

<script>
import PlurksContainer from 'components/PlurksContainer.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Timeline',

  components: {
    PlurksContainer
  },

  methods: {
    ...mapActions([
      'fetchTimelinePlurks',
      'changeHeader'
    ])
  },

  computed: {
    ...mapGetters({
      plurks: 'currentUserTimeline'
    })
  },

  mounted() {
    this.fetchTimelinePlurks();
    this.changeHeader('我的河道');
  }
}
</script>
