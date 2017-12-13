
const express = require('express');
const db = require('../db/index.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const session = require('express-session');

// file requires below
let webpackConfigPath;
if (process.env.DEVELOPMENT) {
  webpackConfigPath = '../webpack.dev';
} else {
  webpackConfigPath = '../webpack.config';
}
const config = require(webpackConfigPath);
const compiler = webpack(config);
// endpoints
// const signup = require('./routes/auth.js').signup;
// const login = require('./routes/auth.js').login;
const auth = require('./routes/auth.js').auth;
const search = require('./routes/search.js').search;
const refinedSearch = require('./routes/refinedSearch').refinedSearch;
const favorites = require('./routes/favorites').favorites;
const prices = require('./routes/prices').prices;
const profile = require('./routes/profile').profile;
const headToHead = require('./routes/headtohead').headToHead;

require('dotenv').config();

const app = express();


app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}));

app.use(webpackHotMiddleware(compiler));
app.use(session({secret:"killersecret", resave:false, saveUninitialized:true}))

app.set('port', (process.env.PORT || 1111));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const port = app.get('port');

app.use(express.static(__dirname + '/../public/dist'));

//Below is the convention for integrating the different endpoint files
app.use('/api/auth', auth);
// app.use('/api/auth/signup', signup);
// app.use('/api/auth/login', login);
app.use('/api/search', search);
app.use('/api/refinedSearch', refinedSearch);
app.use('/api/favorites', favorites);
app.use('/api/prices', prices);
app.use('/api/profile', profile);
app.use('/api/headToHead', headToHead);

app.get('/', (req, res) => {
  res.json('HELLO OUTSIDE SERVER')
});

app.listen(port, () => {
  console.log(`Listening on ${port}`)
});