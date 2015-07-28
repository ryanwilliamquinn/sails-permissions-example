var Promise = require('bluebird');
/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  "username=travis&email=travis@theemail.com&password=secretpassword"
  var users = [{
    username: 'travis',
    email: 'travis@theemail.com',
    password: 'secretpassword'
  }, {
    username: 'venise',
    email: 'venise@theemail.com',
    password: 'password123'
  }];

  var travisId;
  var veniseId;

  var ok = Promise.map(users, function(user) {
    return User.register(user)
  }, {concurrency: 1});

  ok = ok.spread(function(travis, venise) {
    travisId = travis.id;
    veniseId = venise.id;
    return PermissionService.grant({
      action: 'create',
      model: 'review',
      role: 'registered'
    });
  });

  ok = ok.then(function() {
    return PermissionService.grant({
      action: 'read',
      model: 'review',
      role: 'registered'
    });
  });

  ok = ok.then(function() {
    return PermissionService.grant({
      action: 'update',
      model: 'review',
      role: 'registered',
      relation: 'owner',
      criteria: {
        blacklist: ['category']
      }
    });
  });

  ok = ok.then(function() {
    return PermissionService.createRole({
      name: 'carsCategoryAdmin',
      permissions: [{
        action: 'update',
        model: 'review',
        criteria: [{
          where: {
            category: 'cars'
          }
        }]
      }, {
        action: 'delete',
        model: 'review',
        criteria: [{
          where: {
            category: 'cars'
          }
        }]
      }],
      users: ['venise']
    })
  });

  ok = ok.then(function() {
    return Review.create({
      title: '99 honda civic',
      text: 'still works after all these years',
      owner: travisId,
      category: 'cars'
    });
  });

  ok = ok.then(function() {
    return Review.create({
      title: 'pontiac grand am',
      text: 'so much pontiac',
      owner: veniseId,
      category: 'cars'
    });
  });

  ok = ok.then(function() {
    return Review.create({
      title: 'iphone 8',
      text: 'so much better',
      category: 'smartphones',
      owner: 1
    }); // id 1 is the admin user 
  });

  ok.then(function() {
    cb();
  });
};
