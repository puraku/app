<template>
  <plurks-container :plurks="plurks" :userList="userList" />
</template>

<script>
import PlurksContainer from 'components/PlurksContainer.vue';
import { getPlurks } from 'api/timeline';
import { mapActions } from 'vuex';

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

  data() {
    return {
      plurks: [],
      userList: null
    }
  },

  mounted() {
    this.fetchTimelinePlurks();

    getPlurks().then(({plurk_users, plurks}) => {
      this.userList = plurk_users;
      this.plurks = plurks;
    });
  }
}
</script>
