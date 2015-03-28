 // portfolio
 $('.gallery ul li a').click(function() {
     var itemID = $(this).attr('href');
     $('.gallery ul').addClass('item_open');
     $('.gallery').addClass('gallery-height');
     $(itemID).addClass('item_open');
     return false;
 });
 $('.close').click(function() {
     $('.port, .gallery ul').removeClass('item_open');
     $('.gallery').removeClass('gallery-height');
     return false;
 });

$('#portfolio').click(function(event) { 
    if(!$(event.target).closest('.port').length) {
        $('.port, .gallery ul').removeClass('item_open');
        $('.gallery').removeClass('gallery-height');
        return false;
    }        
})

 $('.gallery ul li a').click(function() {
     $('html, body').animate({
         scrollTop: parseInt($('#hope').offset().top)
     }, 400);
 });