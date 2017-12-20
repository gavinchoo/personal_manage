var db = require('./mysqldb')

var Personal = function (personal) {
    this.props = personal.props
}

Personal.prototype.getAllPersonal = function (callback) {
    // LIMIT [offset,] rows
    var page = this.props.page
    var pagesize = this.props.pagesize
    var sql = 'select * from personal limit ' + (page-1) * pagesize + ',' + pagesize
    var countsql = 'select count(*) as count from personal'
    console.log('查询语句' + sql)
    db.query(sql, function (err, result) {
        var _result = result;
        if (err){
            console.log(err)
        }else {
            db.query(countsql, function (err, result) {
                console.log(result)
                if (err){
                    console.log(err)
                }else {
                    var totalResult = {
                        total: result[0].count,
                        data: _result
                    }
                    console.log(totalResult)
                    callback(err, totalResult)
                }
            })
        }
    })
}

Personal.prototype.searchPerson = function (callback) {
    var data = this.props;
    console.log(data)
    var sql = 'select * from personal where'
    db.query(sql, params, function (err, result) {
        if (err){
            console.log(err)
        }
        callback(err, result)
    })
}

bodyUrlencoded: (params) => {
    let data = Object.entries(params);
    let str = `${data[0][0]}=${data[0][1]}`;
    data.forEach((item, i) => {
        if (i > 0) {
            str += `&&${item[0]}=${item[1]}`;
        }
    })
    return str
}

Personal.prototype.addPerson = function (callback) {
    var data = this.props;
    console.log(data)
    var sql = 'insert into personal(id,name,village,town,sex,birthday) values (0,?,?,?,?,?)'
    var params = [data.name, data.village, data.town, data.sex, 0 == data.birthday.length ? null : data.birthday]
    db.query(sql, params, function (err, result) {
        if (err){
            console.log(err)
        }
        callback(err, result)
    })
}

Personal.prototype.delPerson = function (callback) {
    var key = this.props.key;
    console.log(key)
    var sql = 'delete from personal where id=' + key
    db.query(sql, function (err, result) {
        if (err){
            console.log(err)
        }
        callback(err, result)
    })
}


module.exports = Personal