/*
 * Survey class
 * @author: Guillaume Flandre
 */

//
// Survey class
//
// Manages a survey
//
var survey = function(my) {
  var my = my || {};

  my.current = my.current || 0;
  my.total = my.total || 0;

  /* Public */
  var next;
  var current;

  var that = {};

  /*****************************/
  /*      Public methods       */
  /*****************************/
  next = function() {
    my.current = (my.current + 1) % my.total;
  };

  current = function() {
    return my.current;
  };

  that.next = next;
  that.current = current;

  return that;
};
