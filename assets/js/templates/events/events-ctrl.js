module
  .controller('EventsCtrl',eventsCtrl);
function eventsCtrl() {
 $(".btn-black").click(function() {
    $('html, body').animate({
      scrollTop: $("#" + $(this).attr('data-to')).offset().top
    }, 1000);
  });
}