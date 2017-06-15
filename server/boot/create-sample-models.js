'use strict';

var async = require('async');
module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.mongoDs;
  var mysqlDs = app.dataSources.mysqlDs;
  //create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    technologies: async.apply(createTechnologies),
  }, function(err, results) {
    if (err) throw err;
    createReviews(results.reviewers, results.technologies, function(err) {
      console.log('> models created sucessfully');
    });
  });
  //create reviewers
  function createReviewers(cb) {
    mongoDs.automigrate('Reviewer', function(err) {
      if (err) return cb(err);

      /*
      var Reviewer = app.models.Reviewer;
      Reviewer.create([{
        email: 'cesar@desarrolol.com',
        password: 'desarrollo1',
      }], cb);
      */
    });
  }
  //create coffee shops
  function createTechnologies(cb) {
    mongoDs.automigrate('Technology', function(err) {
      if (err) return cb(err);
      var Technology = app.models.Technology;
       
      Technology.create([{
        name: 'ANGULARJS',
        points: 5,
        version: 1.6
      }], cb);

    });
  }
  //create reviews
  function createReviews(reviewers, technologies, cb) {
    mongoDs.automigrate('Review', function(err) {
      if (err) return cb(err);
      
      /*
      var Review = app.models.Review;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      Review.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS),
        rating: 4,
        comments: '',
        publisherId: reviewers[2].id,
        technologyId: technologies[2].id,
      }], cb);
      */
    });
  }
};
