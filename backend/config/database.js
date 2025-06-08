const mongoose = require('mongoose');
require('dotenv').config();

const URI = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@2873441.wbrxdxb.mongodb.net/${process.env.NAME}`
mongoose.connect(URI);

module.exports = mongoose;