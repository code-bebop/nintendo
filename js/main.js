function pagingInfo() {
  $('.section--slide__container').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    let i = (currentSlide ? currentSlide : 0) + 1;
    $('.section--slide__info__index').text(i + '/' + slick.slideCount);
  });
  
  slick();
}

function slick() {
    $(".section--slide__container").slick({
    arrows: true,
    prevArrow: $(".section--slide__info__btn--left"),
    nextArrow: $(".section--slide__info__btn--right"),
    autoplay: true,
    autoplaySpeed: 5000
  });
}

function init() {
  pagingInfo();
}

$(document).ready(function(){
  init();
});