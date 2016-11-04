<template>
  <div class="plurk-form-container">
    <div class="header">發新噗文</div>
    <div class="content-container">
      <div class="avatar">
        <img :src="avatarURL" alt="avatar">
      </div>
      <textarea v-model="plurkContent" id="plurk-content" cols="30" rows="10" placeholder="你在做什麼？"></textarea>

      <div class="actions">
        <button id="plurk" @click="postPlurk" :disabled="locked">Plurk</button>
      </div>
    </div>
  </div>
</template>

<script>
import { addPlurk } from 'api/timeline';
import { getMe } from 'api/users';
import { plurkCreated, refreshTimeline } from 'utils/ipcActions';
import { avatarURL } from 'helpers/userHelper';

export default {
  name: 'Form',

  methods: {
    postPlurk() {
      this.locked = true;
      addPlurk(this.plurkContent, 'says').then(data => {
        plurkCreated(data.plurk_id);
        refreshTimeline();
        window.close();
      });
    }
  },

  computed: {
    avatarURL() {
      return avatarURL(this.user);
    }
  },

  mounted() {
    getMe().then(user => {
      this.user = user;
    });
  },

  data() {
    return {
      plurkContent: '',
      locked: false,
      user: null
    }
  }
}
</script>

<style lang="sass" scoped>
.plurk-form-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .header {
    text-align: center;
    padding: .5em 0;

    -webkit-app-region: drag;
    -webkit-user-select: none;

    background-color: #f1e4dd;
  }

  .content-container {
    height: 100%;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    background-color: #f1e4dd;

    .avatar {
      width: 2.5em;
      min-width: 2.5em;
      height: 2.5em;
      overflow: hidden;
      box-sizing: border-box;
      border-radius: 10px;
      margin: .3em;
      margin-left: .5em;

      -webkit-user-select: none;

      img {
        width: 100%;
        height: 100%;
      }
    }

    textarea#plurk-content {
      margin: 0;
      padding: .3em;
      outline: 0;
      border: 0;

      font-size: 1em;

      resize: none;
      box-sizing: border-box;
      width: 100%;
      height: calc(100% - 3em);
      left: 0;

      background-color: #f1e4dd;
    }

    .actions {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 3em;
      width: 100%;
      padding: 0 .5em;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      button#plurk {
        background-color: #ef8733;
        color: white;
        height: 2.5em;
        border: none;
        border-radius: 5px;
        font-size: 0.8em;
        padding: 0 1em;
        margin-top: 0.5em;

        &:focus {
          outline:0;
        }

        &:active {
          background-color: #e48232;
        }

        &:disabled {
          background-color: #969696;
        }
      }
    }
  }

}
</style>
