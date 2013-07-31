module.exports = {
  'application': {
    'port': '5000',
    'verbose': true
  },
  'lang': {
    'all': [
      'en',
      'fr'
    ],
    'default': 'en'
  },
  'less': {
    'once': false,
    'force': true,
    'debug': true,
    'compress': true,
    'optimization': 2
  },
  'errorHandler': {
    'dumpExceptions': true,
    'showStack': true
  },
  'analytics': {
    'UA-Code': 'UA-XXXXX-Y',
    'GTM-Code': 'GTM-XXXX'
  },
  "database":{
    "tcp":"mongodb",
    "port":"10062",
    "host":"dharma.mongohq.com",
    "name":"c2mtl_dev",
    "user":"6aW9phUK",
    "pass":"s2UtRatE"
  },
  "redis":{
    host: 'viperfish.redistogo.com',
    port: 9731,
    db: 'redistogo',
    pass: 'b8f2ce8765d354ec154b8a234b511bda'
  },
  'admin':{
    users:[
      {
        'id':'1',
        'username':'c2mtl',
        'password':'pass',
        'email':'marc-andre.arseneault@nurun.com'
      }
    ]
  }
};

