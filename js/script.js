var STEPS = 12;
var survey;

jQuery(document).ready(function() {
  survey = survey({ total: STEPS });

  init_listeners();
  init_nav();
  animate_section(true);
});

var init_listeners = function() {
  jQuery('.next').on('click', function(e) {
    e.preventDefault();

    if(survey.current() > 0 && survey.current() < STEPS - 1) {
      jQuery('.section:visible .next').attr('disabled', 'disabled');
    }

    survey.next();
    animate_section(false, function() {
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
      animate_section(true, function() {});
    });
  });

  jQuery('.answers .btn').on('click', function(e) {
    e.preventDefault();
    jQuery('.answers .btn.selected').removeClass('selected');
    jQuery(this).addClass('selected');
    jQuery('.section:visible .next').removeAttr('disabled');
  });
};

var init_nav = function() {
  var width = jQuery('#nav').width() + 5;
  var num_steps = jQuery('#nav div').length;
  jQuery('#nav div').width((width/num_steps) - 5);
};

var animate_section = function(show, cb_) {
  if(show) {
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
        return cb_();
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
        setTimeout(cb_, 100);
      }
    });

    jQuery('.section:visible .fade').animate({
      'opacity': 0
    }, 500);

    jQuery('.section:visible .logos img').animate({
      'opacity': 0
    }, 500);
  }
};

var is_mobile = function() {
  return /Mobi/.test(navigator.userAgent) &&
         jQuery(window).height() <= 650;
};
