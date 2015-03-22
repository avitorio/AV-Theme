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

// Activate Navbar Item on Section View
var url = window.location;
// Will only work if string in href matches with location
$('.nav li a[href="'+ url +'"]').parent().addClass('active');

// Will also work for relative and absolute hrefs
$('.nav li a').filter(function() {
    return this.href == url;
}).parent().addClass('active');

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