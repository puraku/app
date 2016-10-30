<template>
  <plurks-container :plurks="plurks" />
</template>

<script>
import PlurksContainer from 'components/PlurksContainer.vue';
import { getPlurks } from 'api/timeline';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Timeline',

  components: {
    PlurksContainer
  },

  methods: {
    ...mapActions([
      'fetchTimelinePlurks'
    ])
  },

  computed: {
    ...mapGetters({
      plurks: 'currentUserTimeline'
    })
  },

  mounted() {
    this.fetchTimelinePlurks();
  }
}
</script>
