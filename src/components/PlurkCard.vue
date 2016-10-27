<template>
	<div class="plurk-card">
		<div class="timestamp">
			19:40
		</div>
		<div class="reply-count">
			2
		</div>
		<div class="profile">
			<a class="avatar">
				<img src="https://i.imgur.com/abcde.png" alt="avatar">
			</a>
			<div class="name">
				必殺系權貴超人
			</div>
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
	padding: .5em;

	&:not(:first-child) {
		margin: .5em 0;
	}

	.reply-count {
		position: absolute;
		background-color: #cecece;
		color: white;

    right: 2em;
    margin-right: -1.5px;
    margin-top: -.5em;
		width: 1.3em;
    height: 1.3em;
    text-align: center;
	}

	.timestamp {
		color: #cecece;
		text-align: center;
		transform: rotate(90deg);
		width: 3em;
    right: -.7em;
		margin-top: -1em;
		background-color: white;
    border-radius: 5px;
		position: absolute;
	}

	.profile {
		display: flex;
		flex-direction: row;

		.avatar {
			width: 2.5em;
			height: 2.5em;
			border-radius: 50%;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.name {
			height: 2em;
			margin-top: 0.5em;
			margin-left: .5em;
		}
	}

	.content {
		margin-top: .5em;
		font-size: 1.3em;
	}
}
</style>
