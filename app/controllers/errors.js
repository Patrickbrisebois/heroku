module.exports = function (app) {
  app.use(notFound);
  app.use(serverError);

  function notFound(req,res,next){
    var path = require('path')
      , utilities = require(path.join(app.get('basepath'),'/app/libs/utilities'))
      , lang = app.i18n.getLocale();

    res.status(404);

    return res.render('404', {
      'id':'notFound',
      'meta':{
        'lang':lang,
        'title':''
      }
    });

  };

  function serverError(err, req, res, next){
    var path = require('path')
      , utilities = require(path.join(app.get('basepath'),'/app/libs/utilities'))
      , lang = app.i18n.getLocale();

    res.status(500);

    return res.render('500', {
      'id':'serverError',
      'meta':{
        'lang':lang,
        'title':''
      }
    });
  };
};