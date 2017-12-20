var LocalStrategy = require('passport-local').Strategy;
var TokenStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
var User = require('../../db/mongo/user.db')
var tokenConfig = require('./token.config')

module.exports = function (passport) {
    passport.use('local', new LocalStrategy(
      function (username, password, done) {
          console.log('username  ' + username)
          console.log('password  ' + password)
          var props = {username: username, password: password}
          var user = new User({props: props})
          user.getUserInfoByAccount(function (err, result) {
              if (err || result == 'undefine' || result.length == 0) {
                  done(null, false, {message: 'Incorrect username or password.'});
              } else {
                  return done(null, result);
              }
          })
      }
    ));

    passport.use(new TokenStrategy(
      function (token, done) {
          jwt.verify(token, tokenConfig.secret, function (err, decode) {
              if (err) {
                  if (err.name == 'TokenExpiredError') {
                      return done(null, false)
                  }
                  return done(err);
              } else {
                  User.findOne({token: token}, function (err, user) {
                      if (err) {
                          return done(err);
                      }
                      if (user == null) {
                          return done(null, false);
                      }
                      return done(null, user);
                  })
              }
          })
      }
    ));

    passport.serializeUser(function (user, done) {//保存user对象
        console.log('serializeUser')
        console.log(user)
        done(null, user);//可以通过数据库方式操作
    });

    passport.deserializeUser(function (user, done) {//删除user对象
        console.log('deserializeUser')
        console.log(user)
        done(null, user);//可以通过数据库方式操作
    });
}