var passport = require('passport')
var UserDb = require('../../db/mongo/user.db')
var Success = require('../model/success')
var Fail = require('../model/fail')
module.exports = {
    init: function (app) {
        app.post('/createUser', passport.authenticate('bearer', {session: false}), this.createUser)
        app.post('/getalluser', passport.authenticate('bearer', {session: false}), this.getAllUser)
        app.post('/deluser', passport.authenticate('bearer', {session: false}), this.delUser)
    },

    getAllUser: function (req, res) {
        var props = req.body
        var page = props.page
        var pageSize = props.pagesize
        var query = UserDb.find().skip((page - 1) * pageSize).limit(parseInt(pageSize))
        query.exec(function (err, result) {
            if (result != null) {
                UserDb.count(function (err, total) {
                    res.send({total: total, data: result})
                })
            }
        })
    },

    delUser: function (req, res) {
        var props = req.body
        UserDb.remove({'_id': props._id}, function (err, result) {
            console.log(result)
            if (result == null) {
                res.json(new Fail('删除账号失败'))
            } else {
                res.json(new Success())
            }
        })
    },

    createUser: function (req, res) {
        var data = req.body
        data['createtime'] = new Date()
        UserDb.findOne({'username': data.username}, function (err, result) {
            console.log(result)
            if (result == null || result == undefined) {
                UserDb.create(data, function (err, result) {
                    if (err) {
                        console.log(err)
                        res.json(new Fail())
                    } else {
                        console.log(result)
                        if (result == null) {
                            res.json(new Fail('创建账号失败'))
                        }
                        else {
                            res.json(new Success())
                        }
                    }
                })
            } else {
                res.json(new Fail('账号已存在，不可重复创建'))
            }
        })
    }
}