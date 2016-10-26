<template>
	<div class="plurk-card">
		<div class="profile">
			<a class="avatar">
				<img src="https://i.imgur.com/abcde.png" alt="avatar">
			</a>
			<a class="name">
				XXDVVVD
			</a>
		</div>
		<div class="content">
			關於最近很多人跟我們回報網頁標題變成undefine的情況
			可能是瀏覽器第三方噗浪外掛的問題，建議可以暫時停用外掛看看，應該可以解決該問題。
		</div>
		<div class="actions">
		</div>
	</div>
</template>

<script>
export default {
  name: 'PlurkCard',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.plurk-card {
	background-color: white;
	display: flex;
	flex-direction: column;
	padding: 5px;

	&:not(:first-child) {
		margin: 1em 0;
	}

	.profile {
		display: flex;
		flex-direction: row;

		.avatar {
			width: 50px;

			img {
				width: 100%;
			}
		}
	}

	.content {
		font-size: 1.3em;
	}
}
</style>
