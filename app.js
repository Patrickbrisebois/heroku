/***********************************************************************************
 * Module dependencies
 **********************************************************************************/
var express = require('express')
  , _ = require('underscore')
  , path = require('path')
  , lessMiddleware = require('less-middleware')
  , mongoose = require('mongoose')
  , utilities = require('./app/libs/utilities')
  , RedisStore = require( "connect-redis" )(express)
  , redis = require('redis')
  , passport = require('passport');

var app = express();

/***********************************************************************************
 * Configuration manager
 **********************************************************************************/
app.config = require('nconf')
  .argv()
  .env()
  .defaults({store:require(path.join(__dirname,'/app/config/default'))});

/***********************************************************************************
 * Internationalization
 **********************************************************************************/
process.env.TZ = 'America/Montreal';

app.i18n = require('i18n');
app.i18n.configure({
  locales:app.config.get('lang:all'),
  defaultLocale:app.config.get('lang:default'),
  extension: '.json',
  directory: path.join(__dirname,'/app/locales')
});

/***********************************************************************************
 * Environment configuration settings
 **********************************************************************************/
function commonConfiguration(){
  /* Global application settings
   **********************************************************************************/
  app.set('port', process.env.PORT || app.config.get('application:port') || 3000);
  app.set('basepath', __dirname);

  /* Express middlewares
   **********************************************************************************/
  app.use(express.compress());
  app.use(express.cookieParser());

  /* Internationalization
   **********************************************************************************/
  app.use(app.i18n.init);
  app.use(function(req, res, next) {
    app.i18n.setLocale(utilities.langResolver(req,res,app));
    next();
  });

  /* Template engine & helpers
   **********************************************************************************/
  require(path.join(__dirname,'/app/libs/helpers'))(app);
  app.set('views', path.join(__dirname,'/app/views'));
  app.set('view engine', 'jade');

  /* Middlewares
   **********************************************************************************/
  if(app.config.get('less')){
    app.use(lessMiddleware(_.extend({src: path.join(__dirname,'/app/src'), dest: path.join(__dirname,'/app/public')},app.config.get('less'))));
  }

  /* Express middlewares
   **********************************************************************************/
  app.use(express.favicon(path.join(__dirname,'/app/public/images/icons/favicon.ico')));
  app.use(express.bodyParser());
  //app.use(express.session({ secret: 'llaw' }));
  app.use(express.session({
    store: new RedisStore({
      host: app.config.get('redis:host'),
      port: app.config.get('redis:port'),
      db: app.config.get('redis:db'),
      pass: app.config.get('redis:pass')
    }),
    secret: 'C2MTL_FTW'
  }));
  //app.use(express.methodOverride());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '/app/public')));

  /* Error handling
   **********************************************************************************/
  if(app.config.get('errorHandler')){
    app.use(express.errorHandler(app.config.get('errorHandler')));
  }
};

app.configure('development',function(){
  commonConfiguration();
});

app.configure('stage', function (){
  app.config.defaults({store:_.extend(require(path.join(__dirname, '/app/config/default')), require(path.join(__dirname, '/app/config/stage')))});
  commonConfiguration();
});

app.configure('production', function (){
  app.config.defaults({store:_.extend(require(path.join(__dirname, '/app/config/default')), require(path.join(__dirname, '/app/config/production')))});
  commonConfiguration();
});

/***********************************************************************************
 * Memoize
 **********************************************************************************/
app.memoize = {};
/***********************************************************************************
 * Database
 **********************************************************************************/
app.redis = redis.createClient(app.config.get('redis:port') || null,app.config.get('redis:host') || null);
if(app.config.get('redis:pass')){
  app.redis.auth(app.config.get('redis:pass'),function(){
    return;
  })
}
app.redis.get("memoizeTimestamp", function(err, v) {
  if(err || !v){
    app.redis.set('memoizeTimestamp',new Date().valueOf());
  }
});

if(process.env.MONGODB_URL || app.config.get('database')){
  mongoose.connect(
    process.env.MONGODB_URL ||
      (app.config.get('database:tcp')?app.config.get('database:tcp')+'://':'')
        +(app.config.get('database:user')?app.config.get('database:user')+':':'')
        +(app.config.get('database:pass')?app.config.get('database:pass')+'@':'')
        +(app.config.get('database:host')+':')
        +(app.config.get('database:port')+'/')
        +(app.config.get('database:name'))
  );
  app.mongoose = mongoose;
  app.models = require(path.join(__dirname,'/app/models'))(app);
}


/***********************************************************************************
 * Controllers
 **********************************************************************************/
require(path.join(__dirname,'/app/controllers'))(app);
require(path.join(__dirname,'/app/libs/response'));

/***********************************************************************************
 * Start server
 **********************************************************************************/
app.listen(app.get('port'));
if(app.config.get('application:verbose')){
  console.log('Server listening on port ' + app.get('port')  + ' in ' + (process.env.NODE_ENV || 'development') + ' environment.');
}
