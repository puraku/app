const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, shell, ipcMain } = require('electron');
const electron = require('electron');

const plurkConfig = require('./config').plurk;
const Puraku = require('purakujs');

let mainWindow;

app.on('ready', () => {
	var client = new Puraku({consumerKey: plurkConfig.consumerKey, consumerSecret: plurkConfig.consumerSecret});
	client.getRequestToken((error, oauthToken, oauthTokenSecret, results) => {
		// if (error) {  }

		let authWin, popupWin;
		authWin = new BrowserWindow();
		authWin.loadURL(`http://www.plurk.com/OAuth/authorize?oauth_token=${oauthToken}`);

		const handleCallback = (url) => {
			if (url.match(/www\.plurk\.com\/OAuth\/authorizeDone/)) {
				setTimeout(() => {
					popupWin = new BrowserWindow();
					popupWin.loadURL(`file://${__dirname}/static/pin.html`);
				}, 1000);
			}
		};
		authWin.webContents.on('did-navigate', function (event, url) {
			handleCallback(url);
		});

		// or open in default browser, TBD
		// shell.openExternal(`http://www.plurk.com/OAuth/authorize?oauth_token=${oauthToken}`);

		ipcMain.once('pin_submit', (event, {oauthVerifier}) => {
			client.getOAuthAccessToken({oauthToken, oauthTokenSecret, oauthVerifier}, ({accessToken, accessTokenSecret}) => {
				console.log(accessToken);
				console.log(accessTokenSecret);

				// authWin.close();
				// popupWin.close();
			});
		});

	});
});
