module.exports = function (app) {

  var Schema = app.mongoose.Schema;

  var schema = new Schema({
    'url':{
      type: String,
      lowercase:true,
      trim:true,
      unique:true,
      required: true
    },
    'time': Number,
    'inTimeline': Boolean,
    'title1':{
      'fr':String,
      'en':String
    },
    'title2':{
      'fr':String,
      'en':String
    },
    'title3':{
      'fr':String,
      'en':String
    },
    'presentedBy':{
      'fr':String,
      'en':String
    },
    'thumbnail':{
      'fr':String,
      'en':String
    },
    'banner':{
      'fr':String,
      'en':String
    },
    'intro':{
      'fr':String,
      'en':String
    },
    'content':{
      'fr':String,
      'en':String
    }
  });

  return schema;
};