<template>
  <div class="container">
    <title-bar />
    <div id="detail-container">
      <plurk-card :plurk="plurk" v-if="plurk" :displayTimestamp="displayTimestamp"/>
      <div class="responses-container">
        <response v-for="response in responses" :response="response" v-if="response" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import PlurkCard from 'components/PlurkCard.vue';
import Response from 'components/Response.vue';
import TitleBar from 'components/TitleBar.vue';

import { getPlurk } from 'api/timeline';
import { getResponses } from 'api/responses';

export default {
  name: 'PlurkDetail',

  components: {
    PlurkCard,
    Response,
    TitleBar
  },

  methods: {
    ...mapActions(['fetchPlurk', 'fetchPlurkResponses'])
  },

  computed: {
    plurkId() {
      return this.$route.params.plurk_id;
    },

    plurk() {
      return this.plurkData[this.plurkId];
    },

    responses() {
      return this.plurkResponses[this.plurkId] && this.plurkResponses[this.plurkId].map(id => this.responsesData[id]) || [];
    },

    ...mapState({
      plurkData: state => state.plurks.plurks,
      responsesData: state => state.plurks.responses,
      plurkResponses: state => state.plurks.plurkResponses
    })
  },

  mounted() {
    this.fetchPlurk(this.plurkId);
    this.fetchPlurkResponses(this.plurkId);
  },

  data() {
    return {
      displayTimestamp: false
    };
  }
}
</script>


<style>
#detail-container {
  overflow-y: scroll;
  height: 100%;
}

.responses-container {
  padding: 1em .3em;
}
</style>
