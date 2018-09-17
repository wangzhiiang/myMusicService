const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const musicSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
  },
  singer: {
    type: String,
  },
  singUrl: {
    type: String,
  },
  posterURL: {
    type: String,
  }
}, {
  collection: 'music',
  versionKey: false
});


// 生成model实例
var music = mongoose.model('music', musicSchema)

module.exports = music