<template>
  <div class="plurk-form-container">
    <div class="header">發新噗文</div>
    <div class="content-container">
      <div class="avatar">
        <img :src="avatarURL" alt="avatar">
      </div>
      <div class="qualifier" :class="qualifier" @click="toggleQualifierSelectList">
        {{ qualifierTranslated }}
        <fa-icon iconName="caret-down" :iconStyle="{padding: '.2em 0', marginLeft: '.3em'}" />
      </div>
      <div class="qulifier-selection-list" :class="{show: listOpen}">
        <div v-for="(q, index) in qualifiers">
          <div :class="qualifierClasses(q)" @click="selectQualifier(index)">
            {{ q[2] }}
          </div>
        </div>
      </div>
      <textarea v-model="plurkContent" id="plurk-content" cols="30" rows="10" placeholder="你在做什麼？"></textarea>

      <div class="actions">
        <button id="plurk" @click="postPlurk" :disabled="locked" :class="qualifier">Plurk</button>
      </div>
    </div>
  </div>
</template>

<script>
import { addPlurk } from 'api/timeline';
import { getMe } from 'api/users';
import { plurkCreated, refreshTimeline } from 'utils/ipcActions';
import { avatarURL } from 'helpers/userHelper';
import { QUALIFIERS } from './constants';

import FaIcon from 'components/FaIcon.vue';

export default {
  name: 'Form',

  components: {
    FaIcon
  },

  methods: {
    postPlurk() {
      if (this.plurkContent.length > 0) {
        this.locked = true;
        addPlurk(this.plurkContent, this.qualifier).then(data => {
          plurkCreated(data.plurk_id);
          refreshTimeline();
          window.close();
        });
      }
    },

    toggleQualifierSelectList() {
      this.listOpen = !this.listOpen;
    },

    qualifierClasses(qualifier) {
      return [
        'qualifier',
        qualifier[0]
      ];
    },

    selectQualifier(index) {
      this.selectedQualifierIndex = index;
      this.listOpen = false;
    }
  },

  computed: {
    avatarURL() {
      return avatarURL(this.user);
    },

    qualifier() {
      return QUALIFIERS[this.selectedQualifierIndex][0];
    },

    qualifierTranslated() {
      return QUALIFIERS[this.selectedQualifierIndex][1];
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
      user: null,
      selectedQualifierIndex: 0,
      listOpen: false,
      qualifiers: QUALIFIERS
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
    padding: .3em 0;

    background-color: #f1e4dd;

    .qualifier {
      -webkit-user-select: none;
      display: flex;
      cursor: pointer;
      height: 23px;
      margin-left: 5px;
      margin-right: 5px;
      color: white;
      padding: 1px 5px;
      border-radius: 5px;
      margin-top: 8px;
      white-space: nowrap;

      &.loves     { background-color: #b32e25; }
      &.likes     { background-color: #cc362c; }
      &.shares    { background-color: #a74949; }
      &.gives     { background-color: #621510; }
      &.hates     { background-color: #111111; }
      &.wants     { background-color: #8db241; }
      &.has       { background-color: #777777; }
      &.will      { background-color: #b46db9; }
      &.asks      { background-color: #8361bc; }
      &.wishes    { background-color: #5bb017; }
      &.was       { background-color: #525252; }
      &.feels     { background-color: #3083be; }
      &.thinks    { background-color: #689cc1; }
      &.says      { background-color: #e25731; }
      &.is        { background-color: #e57c43; }
      &.freestyle { background-color: #cccccc; color: black; }
      &.hopes     { background-color: #e05be9; }
      &.needs     { background-color: #7a9a37; }
      &.wonders   { background-color: #2e4e9e; }
    }

    .qulifier-selection-list {
      display: none;
      text-align: center;
      overflow-y: scroll;
      position: absolute;
      overflow-x: hidden;
      height: calc(100% - 3em);
      top: 2.6em;
      left: 3.3em;
      z-index: 10;

      &.show {
        display: block;
      }

      .qualifier {
        display: block;
        margin: 0;
        border-radius: 0;
      }

    }

    .avatar {
      width: 2.5em;
      min-width: 2.5em;
      height: 2.5em;
      overflow: hidden;
      box-sizing: border-box;
      border-radius: 10px;
      margin-left: .5em;

      -webkit-app-region: drag;
      -webkit-user-select: none;

      img {
        width: 100%;
        height: 100%;
      }
    }

    textarea#plurk-content {
      margin: 0;
      padding: 0 .3em;
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

        &.loves     { background-color: #b32e25; }
        &.likes     { background-color: #cc362c; }
        &.shares    { background-color: #a74949; }
        &.gives     { background-color: #621510; }
        &.hates     { background-color: #111111; }
        &.wants     { background-color: #8db241; }
        &.has       { background-color: #777777; }
        &.will      { background-color: #b46db9; }
        &.asks      { background-color: #8361bc; }
        &.wishes    { background-color: #5bb017; }
        &.was       { background-color: #525252; }
        &.feels     { background-color: #3083be; }
        &.thinks    { background-color: #689cc1; }
        &.says      { background-color: #e25731; }
        &.is        { background-color: #e57c43; }
        /* &.freestyle { background-color: #cccccc; color: black; } */
        &.hopes     { background-color: #e05be9; }
        &.needs     { background-color: #7a9a37; }
        &.wonders   { background-color: #2e4e9e; }
      }
    }
  }

}
</style>
