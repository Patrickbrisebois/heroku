exports.langResolver = function(req,res,app){
  var langs = app.config.get('lang')
    , _ = require('underscore');

  if(req.query && req.query.l){
    if(_.indexOf(langs.all,req.query.l)>-1){
      res.cookie('l', (req.query.l).toLowerCase());
      return (req.query.l).toLowerCase();
    }
  }
  if(req.cookies && req.cookies.l) {
    if(_.indexOf(langs.all,req.cookies.l)>-1){
      return req.cookies.l;
    }
  }
  res.cookie('l', (langs.default).toLowerCase());
  return (langs.default).toLowerCase();
};

exports.translateData = function(doc,app){
  var lang = app.i18n.getLocale()
    , dLang = app.config.get('lang:default');

  doc.title1 = doc.title1[lang] == '' ? doc.title1[dLang] : doc.title1[lang];
  doc.title2 = doc.title2[lang] == '' ? doc.title2[dLang] : doc.title2[lang];
  doc.title3 = doc.title3[lang] == '' ? doc.title3[dLang] : doc.title3[lang];
  doc.presentedBy = doc.presentedBy[lang] == '' ? doc.presentedBy[dLang] : doc.presentedBy[lang];
  doc.thumbnail = doc.thumbnail[lang] == '' ? doc.thumbnail[dLang] : doc.thumbnail[lang];
  doc.banner = doc.banner[lang] == '' ? doc.banner[dLang] : doc.banner[lang];
  doc.intro = doc.intro[lang] == '' ? doc.intro[dLang] : doc.intro[lang];
  doc.content = doc.content[lang] == '' ? doc.content[dLang] : doc.content[lang];

  return doc;
}