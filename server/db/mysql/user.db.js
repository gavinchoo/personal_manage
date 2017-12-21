var db = require('./mysqldb')

var User = function (user) {
    this.props = user.props
}

User.prototype.getUserInfoByAccount = function (callback) {
    console.log('name ' + this.props.username)
    console.log('pass ' + this.props.password)
    var sql = 'select * from user where account = ? and password = ?'
    var params = [this.props.username, this.props.password]

    db.query(sql, params, function (err, result) {
        console.log(result)
        callback(err, result)
    })
}

User.prototype.saveToken = function (callback) {
    console.log('saveToken name ' + this.props.username)
    console.log('saveToken token ' + this.props.token)
    var sql = 'update user set token = ? where account = ?'
    var params = [this.props.token, this.props.username]
    db.query(sql, params, function (err, result) {
        console.log(result)
        callback(err, result)
    })
}

User.prototype.findToken = function (callback) {
    console.log('findToken token ' + this.props.token)
    var sql = 'select * from user where token = ?'
    var params = [this.props.token]
    db.query(sql, params, function (err, result) {
        console.log(result)
        if (err) {
            callback(err, null)
        } else {
            if (result.length > 0) {
                callback(err, result[0])
            } else {
                callback(err, null)
            }
        }

    })
}

module.exports = User