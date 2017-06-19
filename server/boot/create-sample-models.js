'use strict';

var async = require('async');
module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.mongoDs;
  var mysqlDs = app.dataSources.mysqlDs;
  //create all models
  async.parallel({
    technologies: async.apply(createTechnologies),
  }, function(err, results) {
    if (err) throw err;
  });

  //create coffee shops
  function createTechnologies(cb) {
    mongoDs.automigrate('Technology', function(err) {
      if (err) return cb(err);
      var Technology = app.models.Technology;

      Technology.create([
        {
          name: 'REACTJS',
          points: 5,
          version: 1.6
        },
        {
          name: 'ANGULAR',
          points: 3,
          version: 1.6
        },
        {
          name: 'LARAVEL',
          points: 2,
          version: 5
        },
        {
          name: 'VUE',
          points: 3,
          version: 2.3
        },
        {
          name: 'NODEJS',
          points: 3,
          version: 2.3
        },
        {
          name: 'RAILS',
          points: 3,
          version: 2.1
        },
        {
          name: 'ANGULAR 2',
          points: 5,
          version: 4
        },
        {
          name: 'SPRING',
          points: 3,
          version: 1.6
        },
        {
          name: 'EXPRESS',
          points: 2,
          version: 3.6
        },
        {
          name: 'LOOPBACK',
          points: 3,
          version: 1.6
        },
      ], cb);

    });
  }

};
