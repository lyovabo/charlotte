module
  .controller('GalleryStripCtrl',galleryStripCtrl);
function galleryStripCtrl() {

  //  $(".tiles").tilesGallery({
  //   tileMinHeight: 200,

  // });
  $('#strip-gallery').Cloud9Carousel({
    yRadius: 5,
    autoPlay: 1,
    bringToFront: true
  });
}