var PersonalDb = require('../../db/mongo/personal.db')
var Success = require('../model/success')
var Fail = require('../model/fail')
var upload = require('../fileuploads');
var passport = require('passport')

module.exports = {

    init: function (app) {
        app.post('/getallpersonal', passport.authenticate('bearer', {session: false}), this.getAllPersonal)
        app.post('/addperson', passport.authenticate('bearer', {session: false}), this.addPerson)
        app.post('/delperson', passport.authenticate('bearer', {session: false}), this.delPerson)
        app.post('/upload', passport.authenticate('bearer', {session: false}), upload.single('avatar'), this.upload)
    },

    upload: function (req, res) {
        if (req.file) {
            res.send('文件上传成功')
            console.log(req.file);
            console.log(req.body);
        }
    },

    getAllPersonal: function (req, res) {
        var props = req.body
        var page = props.page
        var pageSize = props.pagesize
        var params = props.params
        console.log(params)
        var query = PersonalDb.find(params).skip((page - 1) * pageSize).limit(parseInt(pageSize))
        query.exec(function (err, result) {
            console.log(result)
            if (result != null) {
                PersonalDb.count(params, function (err, total) {
                    res.send({total: total, data: result})
                })
            }
        })
    },

    addPerson: function (req, res) {
        console.log(req.body)
        PersonalDb.create(req.body, function (err, result) {
            console.log(result)
            if (result) {
                if (result.affectedRows != 0) {
                    res.json(new Success())
                } else {
                    res.json(new Fail())
                }
            }
        })
    },

    delPerson: function (req, res) {
        console.log(req.body)
        PersonalDb.remove(req.body, function (err, result) {
            console.log(result)
            if (result.affectedRows != 0) {
                res.json(new Success())
            } else {
                res.json(new Fail())
            }
        })
    }
}
