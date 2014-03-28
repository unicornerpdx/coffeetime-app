angular.module('app.filters', [])

.filter('absolute', function() {
  return function(value) {
    return Math.abs(value);
  };
})

.filter('pluralizer', function() {
  return function(value) {
    if ( value == 1 || value == -1 ){
      return 'coffee';
    } else {
      return 'coffees';
    }
  };
})

.filter('relativeDate', function() {
  return function(date) {

    var pastDate = new Date(date);
    var currentDate  = new Date();

    function getDate ( date ) {
      return {
        second: date.getSeconds(),
        minute: date.getMinutes(),
        hour:   date.getHours(),
        day:    date.getDate(),
        month:  date.getMonth(),
        year:   date.getFullYear()
      };
    }

    var now  = getDate(pastDate);
    var then = getDate(currentDate);

    var _second = now.second - then.second;
    var _minute = now.minute - then.minute;
    var _hour   = now.hour - then.hour;
    var _day    = now.day - then.day;
    var _month  = now.month - then.month;
    var _year   = now.year - then.year;

    if ( _year > 1 )     { return _year + ' years ago';}
    if ( _year === 1 )   { return '1 year ago';}
    if ( _month > 1)     { return _month + ' months ago';}
    if ( _month === 1 )  { return '1 month ago';}
    if ( _day > 1)       { return _day + ' days ago';}
    if ( _day === 1 )    { return 'yesterday';}
    if ( _hour > 1)      { return _hour + ' hours ago';}
    if ( _hour === 1 )   { return '1 hour ago';}
    if ( _minute > 1)    { return _minute + ' minutes ago';}
    if ( _minute === 1 ) { return '1 minute ago';}
    if ( _second > 15)   { return _second + ' seconds ago';}
    if ( _second < 15 )  { return 'just now';}

  };
});

