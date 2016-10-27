<template>
	<div class="comment">
		<div class="profile">
			<div class="avatar">
				<img src="https://i.imgur.com/6fh3i.png" alt="">
			</div>

			<div class="name">普朗克穿山甲</div>
			<div class="qualifier">說</div>
		</div>
		<div class="content">
			疊 3 三米半的衛生紙
		</div>
	</div>
</template>

<script>
export default {
	name: 'Comment'
}
</script>

<style lang="sass" scoped>
.comment {
	display: flex;
	flex-direction: column;

	.profile {
		display: flex;
		flex-direction: row;

		.avatar {
			margin: 0 5px;
			width: 25px;
			height: 25px;
			overflow: hidden;
			border-radius: 50%;

			img {
				width: 25px;
			}
		}

		.qualifier {
			margin: 0 2px;
			background-color: #ff8100;
		}
	}

	.content {
		padding: 0 30px;
		font-size: 1.3em;
	}
}

</style>
