<template>
  <div id="detail-container">
    <plurk-card :plurk="plurk" v-if="plurk" :userList="userList" :displayTimestamp="displayTimestamp"/>
    <div class="responses-container">
      <response v-for="response in responses" :response="response" :userList="userList" />
    </div>
  </div>
</template>

<script>
import PlurkCard from '../components/PlurkCard.vue';
import Response from '../components/Response.vue';

import { getPlurk } from '../api/timeline';
import { getResponses } from '../api/responses';

export default {
  name: 'PlurkDetail',

  components: {
    PlurkCard,
    Response
  },

  mounted() {
    const { plurk_id } = this.$route.params;

    getPlurk(plurk_id).then(data => {
      this.plurk = data.plurk;
      this.userList = { [data.user.id]: data.user };
    })

    getResponses(plurk_id).then(data => {
      this.userList = {...this.userList, ...data.friends};
      this.responses = data.responses;
    });
  },

  data() {
    return {
      plurk: null,
      displayTimestamp: false,
      userList: null,
      responses: []
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
