function footerDropdown() {
  let mql = window.matchMedia("screen and (max-width: 1200px)");

	function footerHandler() {
		if(mql.matches) {
			$(".section--bottom__footer__list__item__title").click(
					function() {
						$(".section--bottom__footer__list__item").find("ul").slideUp();
						$(this).next().stop().slideToggle();
				}
			)
		} else {
			$(".section--bottom__footer__list__item__title").off();
		}		
	}
	footerHandler();
	
	$(window).resize((e)=>{
		footerHandler();
	})
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
  gnbDropdown();
  searchDropdown();
	footerDropdown();
}

$(document).ready(function(){
  init();
});