const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('dotenv').config();
const bcrypt = require('bcrypt');

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`;

mongoose.connect(uri, {
  useMongoClient: true,
  promiseLibrary: require('bluebird')
})
  .then(() => console.log('database connected'))
  .catch(err => {
    console.log(err);
  });

// mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`, {mongoUseClient: true});

// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('connected to database');
// });

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  favorites: {type: Array,  "default" : []},//Save function must include: `user.markModified('favorites');`
  googleId: { type: String },  //depends on OAuth
  sessionID: { type: String }
});
//favoriteObject: {
//   queryString: String,
//   categoryId: Number,
//   favoriteIsCurrent: boolean
// }


//Historical Data
const CronJobSchema = new Schema({
  queryString: { type: String },
  categoryId: { type: Number },
  priceHistory: { type: Array, "default": [] } //Save function must include: `cronJob.markModified('priceHistory');`
});
//priceHistoryObject: {
//   createdAt: timestamp,
//   avgLikeNewPrice: Number,
//   avgUsedPrice: Number,
//   avgAccPrice: Number,
// }

const ProductAuctionsSchema = new Schema({
  queryString: { type: String },
  categoryId: { type: Number },
  auctions: {} //Save function must include: `productAuctions.markModified('auctions');`
});
//auctionsObjct: {
//   itemId1: auctionObject from ebay,
//   itemId2: auctionObject from ebay,
//   ...itemIdn: auctionObject from ebay
// }

const User = mongoose.model('User', UserSchema);
const CronJob = mongoose.model('CronJob', CronJobSchema);
const ProductAuctions = mongoose.model('ProductAuctions', ProductAuctionsSchema);

const checkUser = (username, cb) => {
  User.findOne({username: username}, (err, user) =>cb(err, user))
}

const saveNewUser = (user, cb) => {
  bcrypt.genSalt(5, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      console.log('after hash', user.sessionID)
      // console.log('username', user.username)
      let newUser = new User( {
        username: user.username,
        password: hash,
        favorites: []
      })
      newUser.save(cb);
      console.log('newuser', newUser);
    })
  })
}


module.exports.User = User;
module.exports.CronJob = CronJob;
module.exports.ProductAuctions = ProductAuctions;
// module.exports.Product = Product;
module.exports.checkUser = checkUser;
module.exports.saveNewUser = saveNewUser;