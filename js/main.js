function searchDropdown() {
  $(".header__search").click(function(e) {
    e.preventDefault();
    $(this).next().slideDown({
      easing: 'easeInOutQuad'
    });
  })
  $(".header__search__div__close").click(function(e) {
    e.preventDefault();
    $(this).parent().slideUp({
      easing: 'easeInOutQuad'
    })
  })
}

function navEffect() {
  let mql = window.matchMedia("screen and (max-width: 1200px)");
  function navHandler() {
    if(mql.matches) {
      $(".header__nav__container__item").off();
      $(".header__nav__container").click((e)=>{
        e.preventDefault();
      }).accordion({
        active: false,
        collapsible: true,
        heightStyle: "content"
      });
    } else {
      if($(".header__nav__container").hasClass("ui-accordion")) {
        $(".header__nav__container").accordion("destroy");  
      }
      $(".header__nav__container__item").hover(
          function() {
            console.dir(mql);
            $(this).find("ul").stop().slideDown();
        }, function() {
            $(this).find("ul").stop().slideUp();
        }
      )      
    }
  }
  navHandler();
  $(window).resize((e)=>{
    mql = window.matchMedia("screen and (max-width: 1200px)");
    navHandler();
  })
}

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
  navEffect();
  searchDropdown();
}

$(document).ready(function(){
  init();
});