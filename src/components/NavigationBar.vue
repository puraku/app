<template>
	<div class="navigation-bar">
		<i class="fa fa-home icon" aria-hidden="true"></i>
		<i class="fa fa-inbox icon" aria-hidden="true"></i>
		<i class="fa fa-heart icon" aria-hidden="true"></i>
		<i class="fa fa-reply icon" aria-hidden="true"></i>
	</div>
</template>

<script>
	export default {
		name: 'NavigationBar'
	}
</script>

<style scoped>
.navigation-bar	{
	height: 100%;
	padding-top: 4em;
	min-width: 92px;
	color: #f6882d;
	background-color: #26323f;

	display: flex;
	flex-direction: column;
}

.fa.icon {
	font-size: 2.3em;
	text-align: center;

	cursor: pointer;
	margin: 20px 0;
}
</style>
