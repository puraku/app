<template>
  <div id="app">
		<div class="navigation-bar"></div>
		<div class="container">
			<div id="header">
				<p>Title</p>
			</div>
			<div class="plurk-cards-container">
				<plurk-card />
				<plurk-card />
				<plurk-card />
				<plurk-card />
				<plurk-card />
				<plurk-card />
				<plurk-card />

			</div>
		</div>
  </div>
</template>

<script>
import PlurkCard from './components/PlurkCard.vue';

export default {
  name: 'app',

	components: {
		PlurkCard
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

.navigation-bar	{
	height: 100%;
	min-width: 92px;
	color: #f6882d;
	background-color: #26323f;
}

.container {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}

#header {
	width: 100%;
	height: 45px;
	color: white;
	background-color: #1a2733;
	text-align: center;
}

.plurk-cards-container {
	padding: 1em .5em;
	overflow-y: scroll;
	height: 100%;

	background-color: #f5ede8;
}
</style>
