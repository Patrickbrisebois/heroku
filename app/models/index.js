module.exports = function (app) {
	var models = {}, 
	builder = [];

  	builder.push({name: 'Events', model: require('./events')(app)});

  	for (var i = 0; i < builder.length; i++) {
  		models[builder[i].name] = app.mongoose.model(builder[i].name, builder[i].model);
  	}
	
  	return models;
};
