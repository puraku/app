const { app, BrowserWindow, protocol } = require('electron');
const url = require('url');
const qs = require('qs');
const path = require('path');
const Puraku = require('purakujs');

const Config = require('electron-config');
const config = new Config();

const plurkConfig = require('./config').plurk;

let authWin, mainWin, puraku;

protocol.registerStandardSchemes(['puraku']);

function registerAuthFlow({oauthToken, oauthTokenSecret}) {
	const handleAuth = (queryString) => {
		authWin.hide();

		const {
			oauth_verifier: oauthVerifier,
			oauth_token: oauthToken
		} = qs.parse(queryString);

		puraku.getOAuthAccessToken({oauthToken, oauthTokenSecret, oauthVerifier}).then(({accessToken, accessTokenSecret}) => {
			config.set('puraku:accessToken', accessToken);
			config.set('puraku:accessTokenSecret', accessTokenSecret);

			puraku.request('POST', '/APP/checkToken').then(({data, response}) => {
				// console.log(data);
				authWin.close();

				// TODO: initialize app
			});
		});
	};

	protocol.registerStringProtocol('puraku', req => {
		if (url.parse(req.url).host === 'oauth_callback') {
			handleAuth(url.parse(req.url).query);
		}
	});
}

app.on('ready', () => {
	puraku = new Puraku({
		consumerKey: plurkConfig.consumerKey,
		consumerSecret: plurkConfig.consumerSecret,
		accessToken: config.get('puraku:accessToken'),
		accessTokenSecret: config.get('puraku:accessTokenSecret'),
	});

	puraku.request('GET', '/APP/checkToken').then(() => {
		// TODO: initialize app
		mainWin = new BrowserWindow({
			width: 400,
			height: 825,
			titleBarStyle: 'hidden'
		});
		mainWin.loadURL(`file://${path.join(__dirname, '../static/index.html')}`);
	}).catch(() => {
		// start authorize flow
		puraku.getRequestToken().then(({oauthToken, oauthTokenSecret}) => {
			authWin = new BrowserWindow();
			authWin.loadURL(`https://www.plurk.com/OAuth/authorize?oauth_token=${oauthToken}`);

			registerAuthFlow({oauthToken, oauthTokenSecret});
		});
	});
});
