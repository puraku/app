<template>
  <plurks-container :plurks="plurks" :userList="userList" />
</template>

<script>
import PlurksContainer from '../components/PlurksContainer.vue';
import { getPlurks } from '../api/timeline';

export default {
  name: 'Timeline',

  components: {
    PlurksContainer
  },

  data() {
    return {
      plurks: [],
      userList: null
    }
  },

  mounted() {
    getPlurks().then(({plurk_users, plurks}) => {
      this.userList = plurk_users;
      this.plurks = plurks;
    });
  }
}
</script>
