angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {


  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  };
})

/**
 * Activities Stream
 */
.factory('Activity', function() {

  // Some fake testing data
  var activities = [
    { id: 0, user: { name: 'Paul Pederson', username: 'paulcpederson', photo: 'https://avatars3.githubusercontent.com/u/1031758?s=460'}, amount: 2, date: '2014-03-27T18:00:00-0800', message: 'Hey man, cool stuff', latlng: [-120.277, 45.235]  },
    { id: 1, user: { name: 'Nate Goldman', username: 'ngoldman', photo: 'https://avatars1.githubusercontent.com/u/427322?s=460'}, amount: -2, date: '2014-02-27T18:00:00-0800', message: 'better pay me back, yo', latlng: [-120.277, 45.235]  },
    { id: 2, user: { name: 'Nikolas Wise', username: 'nikolaswise', photo: 'https://avatars2.githubusercontent.com/u/1987772?s=460'}, amount: 1, date: '2014-01-27T18:00:00-0800', message: 'thanks for the coffee', latlng: [-120.277, 45.235]  },
    { id: 3, user: { name: 'Patrick Arlt', username: 'patrickarlt', photo: 'https://avatars1.githubusercontent.com/u/378557?s=460'}, amount: 2, date: '2013-12-14T18:00:00-0800', message: '', latlng: [-120.277, 45.235]  },
  ];

  return {
    all: function() {
      return activities;
    },
    get: function(activityId) {
      // Simple index lookup
      return activities[activityId];
    }
  };

});
