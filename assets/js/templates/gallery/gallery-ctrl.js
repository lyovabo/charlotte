module
  .controller('GalleryCtrl',galleryCtrl);
function galleryCtrl() {
  $('#slider-gallery').Cloud9Carousel({
    yRadius: 5,
    autoPlay: 1,
    bringToFront: true
  });
  $(".tiles").tilesGallery({
    tileMinHeight: 100,
    callback: function () {
        $(".tiles a").lightBox();
    }
  });
 
}