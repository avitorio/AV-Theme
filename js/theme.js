// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Show navbar only after the first Section
(function ($) {
  $(document).ready(function(){
    
  // hide .navbar first
  $(".navbar").hide();
  
  // fade in .navbar
  $(function () {
    $(window).scroll(function () {
            // set distance user needs to scroll before we fadeIn navbar
      if ($(this).scrollTop() > 200) {
        $('.navbar').fadeIn();
      } else {
        $('.navbar').fadeOut();
      }
    });
  });
});
  }(jQuery));


//Autosize Text Area in Contact Form
(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.autosize = factory();
  }
}(this, function () {
  function main(ta) {
    if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || ta.hasAttribute('data-autosize-on')) { return; }

    var maxHeight;
    var heightOffset;

    function init() {
      var style = window.getComputedStyle(ta, null);

      if (style.resize === 'vertical') {
        ta.style.resize = 'none';
      } else if (style.resize === 'both') {
        ta.style.resize = 'horizontal';
      }

      // horizontal overflow is hidden, so break-word is necessary for handling words longer than the textarea width
      ta.style.wordWrap = 'break-word';

      // Chrome/Safari-specific fix:
      // When the textarea y-overflow is hidden, Chrome/Safari doesn't reflow the text to account for the space
      // made available by removing the scrollbar. This workaround will cause the text to reflow.
      var width = ta.style.width;
      ta.style.width = '0px';
      // Force reflow:
      /* jshint ignore:start */
      ta.offsetWidth;
      /* jshint ignore:end */
      ta.style.width = width;

      maxHeight = style.maxHeight !== 'none' ? parseFloat(style.maxHeight) : false;
      
      if (style.boxSizing === 'content-box') {
        heightOffset = -(parseFloat(style.paddingTop)+parseFloat(style.paddingBottom));
      } else {
        heightOffset = parseFloat(style.borderTopWidth)+parseFloat(style.borderBottomWidth);
      }

      adjust();
    }

    function adjust() {
      var startHeight = ta.style.height;
      var htmlTop = document.documentElement.scrollTop;
      var bodyTop = document.body.scrollTop;
      
      ta.style.height = 'auto';

      var endHeight = ta.scrollHeight+heightOffset;

      if (maxHeight !== false && maxHeight < endHeight) {
        endHeight = maxHeight;
        if (ta.style.overflowY !== 'scroll') {
          ta.style.overflowY = 'scroll';
        }
      } else if (ta.style.overflowY !== 'hidden') {
        ta.style.overflowY = 'hidden';
      }

      ta.style.height = endHeight+'px';

      // prevents scroll-position jumping
      document.documentElement.scrollTop = htmlTop;
      document.body.scrollTop = bodyTop;

      if (startHeight !== ta.style.height) {
        var evt = document.createEvent('Event');
        evt.initEvent('autosize.resized', true, false);
        ta.dispatchEvent(evt);
      }
    }

    // IE9 does not fire onpropertychange or oninput for deletions,
    // so binding to onkeyup to catch most of those events.
    // There is no way that I know of to detect something like 'cut' in IE9.
    if ('onpropertychange' in ta && 'oninput' in ta) {
      ta.addEventListener('keyup', adjust);
    }

    window.addEventListener('resize', adjust);
    ta.addEventListener('input', adjust);

    ta.addEventListener('autosize.update', adjust);

    ta.addEventListener('autosize.destroy', function(style){
      window.removeEventListener('resize', adjust);
      ta.removeEventListener('input', adjust);
      ta.removeEventListener('keyup', adjust);
      ta.removeEventListener('autosize.destroy');

      Object.keys(style).forEach(function(key){
        ta.style[key] = style[key];
      });

      ta.removeAttribute('data-autosize-on');
    }.bind(ta, {
      height: ta.style.height,
      overflow: ta.style.overflow,
      overflowY: ta.style.overflowY,
      wordWrap: ta.style.wordWrap,
      resize: ta.style.resize
    }));

    ta.setAttribute('data-autosize-on', true);
    ta.style.overflow = 'hidden';
    ta.style.overflowY = 'hidden';

    init();   
  }

  // Do nothing in IE8 or lower
  if (typeof window.getComputedStyle !== 'function') {
    return function(elements) {
      return elements;
    };
  } else {
    return function(elements) {
      if (elements && elements.length) {
        Array.prototype.forEach.call(elements, main);
      } else if (elements && elements.nodeName) {
        main(elements);
      }
      return elements;
    };
  }
}));

// Mailer

$(function() {
  // Get the form.
  var form = $('#ajax-contact');

  // Get the messages div.
  var formMessages = $('#form-messages');

  // Set up an event listener for the contact form.
  $(form).submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
    .done(function(response) {
      // Make sure that the formMessages div has the 'success' class.
      $(formMessages).removeClass('error');
      $(formMessages).addClass('success');

      // Set the message text.
      $(formMessages).text(response);

      // Clear the form.
      $('#name, #email, #message').val('');
      $(form).addClass('hidden');
    })
    .fail(function(data) {
      // Make sure that the formMessages div has the 'error' class.
      $(formMessages).removeClass('success');
      $(formMessages).addClass('error');

      // Set the message text.
      if (data.responseText !== '') {
        $(formMessages).text(data.responseText);
      } else {
        $(formMessages).text('Oops! An error occured and your message could not be sent.');
      }
    });

  });
}); 

// Custom validation form messages and style

function replaceValidationUI( form ) {
    // Suppress the default bubbles
    form.addEventListener( "invalid", function( event ) {
        event.preventDefault();
    }, true );

    // Support Safari, iOS Safari, and the Android browser—each of which do not prevent
    // form submissions by default
    form.addEventListener( "submit", function( event ) {
        if ( !this.checkValidity() ) {
            event.preventDefault();
        }
    });

    var submitButton = form.querySelector( "button:not([type=button]), input[type=submit]" );
    submitButton.addEventListener( "click", function( event ) {
        var invalidFields = form.querySelectorAll( ":invalid" ),
            errorMessages = form.querySelectorAll( ".error-message" ),
            parent;

        // Remove any existing messages
        for ( var i = 0; i < errorMessages.length; i++ ) {
            errorMessages[ i ].parentNode.removeChild( errorMessages[ i ] );
        }

        for ( var i = 0; i < invalidFields.length; i++ ) {
            parent = invalidFields[ i ].parentNode;
            parent.insertAdjacentHTML( "beforeend", "<div class='error-message'>" + 
                invalidFields[ i ].validationMessage +
                "</div>" );
        }

        // If there are errors, give focus to the first invalid field
        if ( invalidFields.length > 0 ) {
            invalidFields[ 0 ].focus();
        }
    });
}

// Replace the validation UI for all forms
var forms = document.querySelectorAll( "form" );
for ( var i = 0; i < forms.length; i++ ) {
    replaceValidationUI( forms[ i ] );
}


