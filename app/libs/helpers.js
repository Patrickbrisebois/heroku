return module.exports = function (app) {
  app.locals.__ = function(str){
    return app.i18n.__(str);
  };
  app.locals.__n = function(str){
    return app.i18n.__n(str);
  };
  app.locals.$config = function(params){
    return app.config.get(params);
  };
};