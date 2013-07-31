module.exports = function (app) {
  require('./home')(app);
  require('./admin')(app);
  require('./errors')(app);
}