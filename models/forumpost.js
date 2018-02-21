//schema for contacts
const mongoose = require('mongoose');

var ForumPostSchema = mongoose.Schema({
 title:{
    type: String,
    required: true
 },
 body:{
 	type: String,
 	required: false
 },
 createdBy:{
 	type: String,
  	required: true
 },
 timeStamp:{
 	type: Date,
 	default: Date.now
 },
 solved:{
 	type: Boolean,
 	default: false
 },
 responses: []
});

const ForumPost = module.exports = mongoose.model('ForumPost', ForumPostSchema);