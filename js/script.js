var STEPS = 17;
var survey;

jQuery(document).ready(function() {
  survey = survey({ total: STEPS });

  init_listeners();
  init_nav();
  animate_section(true);
});

var init_listeners = function() {
  jQuery('.validate').on('click', function(e) {
    var correct = false;
    if(jQuery('.section:visible .answers .selected').attr('data-correct')) {
      survey.add_correct_answer();
      correct = true;
    }

    animate_section(false, true, function() {
      jQuery('#page-' + survey.current() + ' .section-validate').fadeIn();
      if(correct) {
        jQuery('#page-' + survey.current() + ' .section-validate .good-answer').show();
      }
      else {
        jQuery('#page-' + survey.current() + ' .section-validate .bad-answer').show();
      }
      animate_section(true, true);
    });
  });

  jQuery('.next').on('click', function(e) {
    e.preventDefault();

    if(survey.current() > 0 && survey.current() < STEPS - 1) {
      jQuery('.section:visible .next').attr('disabled', 'disabled');
    }

    survey.next();

    jQuery('.result').hide();

    jQuery('.section-validate:visible').fadeOut();
    animate_section(false, false, function() {
      if(survey.current() === 0) {
        jQuery('#nav div').removeClass('selected');
      }
      else {
        jQuery('#nav div:nth-child(' + survey.current() + ')').addClass('selected');
      }

      jQuery('.section').hide();
      jQuery('.answers .btn.selected').removeClass('selected');
      jQuery(document).scrollTop(0);
      jQuery('#page-' + survey.current()).show();

      if(survey.current() === STEPS - 1) { // next is last
        var result = survey.result();
        var section;
        if(result === 15) {
          section = 4;
        }
        else if(result >= 10 && result <= 14) {
          section = 3;
        }
        else if(result >= 5 && result <= 9) {
          section = 2;
        }
        else if(result < 5) {
          section = 1;
        }
        jQuery('h1.result span .num_res').text(result);
        jQuery('.result-' + section).show();
      }

      animate_section(true);
    });
  });

  jQuery('.answers .btn').on('click', function(e) {
    e.preventDefault();
    jQuery('.answers .btn.selected').removeClass('selected');
    jQuery(this).addClass('selected');
    jQuery('.section:visible .validate').removeAttr('disabled');
  });
};

var init_nav = function() {
  var width = jQuery('#nav').width() + 5;
  var num_steps = jQuery('#nav div').length;
  jQuery('#nav div').width((width/num_steps) - 5);
};

var animate_section = function(show, validate, cb_) {
  if(show && validate) {
    jQuery('.section:visible .section-validate').animate({
      'opacity': 1
    }, 100);
  }
  else if(show && !validate) {
    jQuery('.section:visible .fall').animate({
      'opacity': 1,
      'margin-top': '80px',
      'margin-bottom': '50px',
    }, 500, function() {
      jQuery('.section:visible .fade').animate({
        'opacity': 1
      }, 100);

      setTimeout(function() {
        jQuery('.section:visible .logos img').animate({
          'opacity': .25
        }, 1000);
      }, 500);

      if(typeof cb_ === 'function') {
        cb_();
        cb_ = function() {};
      }
    });
  }
  else if(!show && validate) {
    jQuery('.section:visible .fade, .section:visible .validate, .section:visible .logos img').animate({
      'opacity': 0
    }, 500, function() {
      if(typeof cb_ === 'function') {
        jQuery('.section:visible .fade').hide();
        cb_();
        cb_ = function() {};
      }
    });
  }
  else {
    jQuery('.section:visible .fall').animate({
      'opacity': 0,
      'margin-top': '-50px',
      'margin-bottom': '180px',
    }, 500, function() {
      if(typeof cb_ === 'function') {
        cb_();
        cb_ = function() {};
      }
    });

    jQuery('.section:visible .fade, .section:visible .validate, .section:visible .logos img').animate({
      'opacity': 0
    }, 500);
  }
};

var is_mobile = function() {
  return /Mobi/.test(navigator.userAgent) &&
         jQuery(window).height() <= 650;
};
