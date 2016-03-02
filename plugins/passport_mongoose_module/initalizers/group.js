
var mongoose = require('mongoose');
var groupSchema = new mongoose.Schema({
    userid: String,
    username: String,
    subject: String,
    content: String,
    locked: Boolean,
    password: Boolean,
    flaged: Boolean,
    date: { type: Date, default: Date.now }
});
module.exports = Group = mongoose.model('Group', groupSchema);
