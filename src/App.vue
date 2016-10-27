<template>
  <div id="app">
		<navigation-bar />
		<div class="container">
			<div id="header">
				<p>Title</p>
			</div>
			<div class="plurk-cards-container">
				<plurk-card />
				<plurk-card />
				<plurk-card />
				<comment />

			</div>
		</div>
  </div>
</template>

<script>
import PlurkCard from './components/PlurkCard.vue';
import NavigationBar from './components/NavigationBar.vue';
import Comment from './components/Comment.vue';

export default {
  name: 'app',

	components: {
		PlurkCard,
		NavigationBar,
		Comment
	},

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="sass">
#app {
	height: 100%;
	display: flex;
	flex-direction: row;
}

.container {
	display: flex;
	flex-direction: column;
	flex-grow: 1;

	background-color: #f7ede8;
}

#header {
	width: 100%;
	height: 45px;
	color: white;
	background-color: #1a2733;
	text-align: center;

	z-index: 9999;

	-webkit-app-region: drag;
}

.plurk-cards-container {
	border-style: solid;
	border-width: 0;
	border-right-width: .3em;
	margin-right: .7em;
	border-color: white;
	padding: 1em 0.9em 1em 0.5em;

	overflow-y: scroll;
	height: 100%;

	background-color: #f5ede8;
}
</style>
