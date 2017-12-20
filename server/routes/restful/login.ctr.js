var Success = require('../model/success')
var Fail = require('../model/fail')
var config = require('../config/token.config')
var UserDb = require('../../db/mongo/user.db')
const jwt = require('jsonwebtoken');
var passport = require('passport')

module.exports = {
    init: function (app) {
        app.post('/accesstoken', this.getAccessToken)
        app.post('/login', passport.authenticate('local'), this.login)
    },

    login: function (req, res) {
        console.log(req)
        if (req.user.username) {
            res.json(new Success())
        } else {
            res.json(new Fail())
        }
    },

    getAccessToken: function (req, res) {
        var props = req.body
        UserDb.findOne(props, function (err, result) {
            if (err || result == null) {
                res.json({status: 10, message: 'Incorrect username or password.'});
            } else {
                var username = result.username
                var token = jwt.sign({name: username}, config.secret,{
                    expiresIn: config.expiresIn
                });

                UserDb.update({'username': username}, {'$set': {'token': token}}, function (err, result) {
                    console.log(result)
                    if (result != null && result.nModified == 1){
                        res.json({
                            status: 100,
                            success: true,
                            message: '验证成功!',
                            token: 'Bearer ' + token,
                            name: username
                        });
                    }else {
                        res.json({status: 10,success: false, message:'认证失败,用户不存在!'});
                    }
                })
            }
        })
    }
};
