var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    uuid: Number,
    repos: Array,
    token: String
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
};
