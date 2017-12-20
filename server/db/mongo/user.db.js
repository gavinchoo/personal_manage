var mongoose = require('./mongodb')

var Schema = mongoose.Schema
var UserSchema = new Schema({
    username: String,
    password: String,
    role: String,
    rolename: String,
    token: String,
    createtime: Date,
})
var UserDb = mongoose.model('users', UserSchema)

module.exports = UserDb