const { app, BrowserWindow, protocol, ipcMain } = require('electron');
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

      puraku.request('POST', '/APP/checkToken').then(() => {
        initializeApp();

        authWin.close();
      }).catch(error => {
         // TODO: restart auth flow
      });
    });
  };

  protocol.registerStringProtocol('puraku', req => {
    if (url.parse(req.url).host === 'oauth_callback') {
      handleAuth(url.parse(req.url).query);
    }
  });
}

function initializeApp() {
  mainWin = new BrowserWindow({
    width: 426,
    height: 817,
    titleBarStyle: 'hidden-inset'
  });

  if (process.env.NODE_ENV === 'development') {
    mainWin.loadURL('http://localhost:8080');
  } else {
    mainWin.loadURL(`file://${path.join(__dirname, '../static/index.html')}`);
  }

  // listen for api call
  ipcMain.on('puraku:api', (event, args) => {
    const { method, endpoint, params } = args;
    puraku.request(method, endpoint, params).then(({data}) => {
      event.returnValue = JSON.parse(data);
    }).catch(error => {
      event.returnValue = { error };
    });
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
    initializeApp();
  }).catch(() => {
    // start authorize flow
    puraku.getRequestToken().then(({oauthToken, oauthTokenSecret}) => {
      authWin = new BrowserWindow();

      // TODO: generate device id
      authWin.loadURL(`https://www.plurk.com/OAuth/authorize?oauth_token=${oauthToken}`);

      registerAuthFlow({oauthToken, oauthTokenSecret});
    });
  });
});
