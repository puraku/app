<template>
	<div class="navigation-bar">
		<a class="avatar">
			<img src="https://i.imgur.com/6fh3i.png" alt="">
		</a>

		<div class="icon">
			<i class="fa fa-home" aria-hidden="true"></i>
		</div>

		<div class="icon">
			<i class="fa fa-inbox" aria-hidden="true"></i>
		</div>

		<div class="icon">
			<i class="fa fa-heart" aria-hidden="true"></i>
		</div>

		<div class="icon">
			<i class="fa fa-reply" aria-hidden="true"></i>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'NavigationBar'
	}
</script>

<style lang="sass" scoped>
.navigation-bar	{
	height: 100%;
	padding-top: 3em;
	min-width: 80px;
	max-width: 80px;
	color: #f6882d;
	background-color: #26323f;

	-webkit-app-region: drag;

	display: flex;
	flex-direction: column;

	a.avatar {
		padding: 10px;
		max-width: 100%;

		img {
			max-width: 100%;
		}
	}

	.icon {
		width: 1.5em;
		margin: 0 auto;

		& > .fa {
			font-size: 1.5em;
			text-align: center;

			cursor: pointer;
			margin: .7em 0;
		}
	}
}

</style>
