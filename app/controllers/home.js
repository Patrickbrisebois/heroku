module.exports = function (app) {

  app.get('/', home);

  function home(req, res, next) {
    var path = require('path')
      , utilities = require(path.join(app.get('basepath'),'/app/libs/utilities'))
      , lang = app.i18n.getLocale();

    return res.render('home',{
      'id':'home',
      'meta':{
        'lang':lang
      },
      'parts': {
        'header':false
      }
    });
  }
};