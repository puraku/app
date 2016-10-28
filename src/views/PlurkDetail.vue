<template>
  <div>
    <plurk-card :plurk="plurk" v-if="plurk" />
  </div>
</template>

<script>
import PlurkCard from '../components/PlurkCard.vue';
import { getPlurk } from '../api/timeline';

export default {
  name: 'PlurkDetail',

  components: {
    PlurkCard
  },

  mounted() {
    const { plurk_id } = this.$route.params;
    console.log(plurk_id);
    getPlurk(plurk_id).then(data => {
      this.plurk = data.plurk;
    })
  },

  data() {
    return {
      plurk: null
    };
  }
}
</script>


<style>

</style>
