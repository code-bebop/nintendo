function resizeHandler(handler) {
  handler();
  
  $(window).resize((e)=>{
    handler();
  })
}

function gamesSlick() {
  
  function gamesHandler() {
    let mql = window.matchMedia("screen and (max-width: 785px)");
    
    if(mql.matches) {
      if(!$(".section--games__list").hasClass("slick-initialized")) {
        $(".section--games__list").slick({
          arrows: false,
          slideToShow: 3,
          centerMode: true,
          centerPadding: "40px"
        });
      }
    } else {
      if($(".section--games__list").hasClass("slick-initialized")) {
        $(".section--games__list").slick("unslick");
      }
    }
  }
  
  resizeHandler(gamesHandler);
  
}

function noticeSlide() {
  
  function noticeHandler() {
    let mql = window.matchMedia("screen and (max-width: 1042px)");
    
    if(mql.matches) {
      if(!$(".section--notice__list").hasClass("slick-initialized")) {
        $(".section--notice__list").slick({
          vertical: true,
          arrows: false,
          autoplay: true
        })
      }
    } else {
      if($(".section--notice__list").hasClass("slick-initialized")) {
        $(".section--notice__list").slick("unslick");
      }
    }  
  }
  
  resizeHandler(noticeHandler);
  
}

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

function gnbDropdown() {
  $(".header__gnb").click(function(e) {
    e.preventDefault();
    $(this).toggleClass("on").prev().slideToggle({
      easing: 'easeInOutQuad'
    });
  })
}

function navEffect() {
  function navHandler() {
    let mql = window.matchMedia("screen and (max-width: 1200px)");
    if(mql.matches) {
      $(".header__nav__container__item").off();
      $(".header__nav__container").click((e)=>{
        e.preventDefault();
      }).accordion({
        active: false,
        collapsible: true,
        heightStyle: "content"
      });
      $(".header__nav").css("display", "none");
      $(".header__gnb").removeClass("on");
    } else {
      if($(".header__nav__container").hasClass("ui-accordion")) {
        $(".header__nav__container").accordion("destroy");  
      }
      $(".header__nav__container__item").hover(
          function() {
            $(this).find("ul").stop().slideDown();
        }, function() {
            $(this).find("ul").stop().slideUp();
        }
      )
      $(".header__nav").css("display", "block");
    }
  }
  
  resizeHandler(navHandler);
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
    arrows: false,
    prevArrow: $(".section--slide__info__btn--left"),
    nextArrow: $(".section--slide__info__btn--right"),
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
        }
      }
    ]
  });
}

function init() {
  pagingInfo();
  navEffect();
  gnbDropdown();
  searchDropdown();
  noticeSlide();
  gamesSlick();
}

$(document).ready(function(){
  init();
});