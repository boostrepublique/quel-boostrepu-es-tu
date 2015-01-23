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
  my.correct = my.correct || 0;

  /* Public */
  var next;
  var current;
  var add_correct_answer;

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

  add_correct_answer = function() {
    my.correct++;
  };

  that.next = next;
  that.current = current;
  that.add_correct_answer = add_correct_answer;

  return that;
};
