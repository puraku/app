<template>
  <div id="app">
		<div class="navigation-bar"></div>
		<div class="container">
			<div id="header">
				<p>Title</p>
			</div>
			<div class="plurk-cards-container">
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

			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'app',
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
