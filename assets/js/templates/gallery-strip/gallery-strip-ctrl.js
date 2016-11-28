module
  .controller('GalleryStripCtrl',galleryStripCtrl);
function galleryStripCtrl() {
  $('#strip-gallery').Cloud9Carousel({
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