module.exports = function (app) {

    var path = require('path')
        , utilities = require(path.join(app.get('basepath'),'/app/libs/utilities'))
        , lang = app.i18n.getLocale();

    //Routes
    app.get('/admin', home);
    app.get('/admin/login', login);
    app.get('/admin/logout', logout);
    app.get('/admin/companies', companies);
    app.get('/admin/companies/:cid', company);
    app.get('/admin/companies/:cid/brands', brands);
    app.get('/admin/companies/:cid/brands/:bid', brand);
    app.get('/admin/companies/:cid/brands/:bid/files', files);
    app.get('/admin/companies/:cid/brands/:bid/files/:fid', file);
    app.get('/admin/users', users);
    app.get('/admin/users/:uid', user);

    function home(req, res, next) {
        return res.render('admin',{
            'id':'admin',
            'meta':{
                'lang':lang
            },
            'admin':true
        });
    }
    function login(req, res, next) {
        return res.render('login',{
            'id':'login',
            'meta':{
                'lang':lang
            },
            'admin':true
        });
    }
    function logout(req, res, next) {
        //TODO : Logout then redirect Login
        return res.render('admin',{
            'id':'admin',
            'meta':{
                'lang':lang
            },
            'admin':true
        });
    }
    function companies(req, res, next) {
        return res.render('companies',{
            'id':'companies',
            'meta':{
                'lang':lang
            },
            'admin':true
        });
    }
    function company(req, res, next) {
        return res.render('company',{
            'id':'company',
            'meta':{
                'lang':lang
            },
            'admin':true
        });
    }
    function brands(req, res, next) {
        return res.render('brands',{
            'id':'brands',
            'meta':{
                'lang':lang
            },
            'admin':true
        });
    }
    function brand(req, res, next) {
        return res.render('brand',{
            'id':'brand',
            'meta':{
                'lang':lang
            },
            'admin':true
        });
    }
    function files(req, res, next) {
        return res.render('files',{
            'id':'files',
            'meta':{
                'lang':lang
            },
            'admin':true
        });
    }
    function file(req, res, next) {
        return res.render('file',{
            'id':'file',
            'meta':{
                'lang':lang
            },
            'admin':true
        });
    }
    function users(req, res, next) {
        return res.render('users',{
            'id':'users',
            'meta':{
                'lang':lang
            },
            'admin':true
        });
    }
    function user(req, res, next) {
        return res.render('user',{
            'id':'user',
            'meta':{
                'lang':lang
            },
            'admin':true
        });
    }
};