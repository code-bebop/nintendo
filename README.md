[TOC]

# 한국 닌텐도 홈페이지 클론코딩
## 주로 사용한 기능
### BEM 방법론과 SASS
내가 이전에 했었던 홈페이지 코딩들의 공통점은 처음에는 괜찮게 진행되다가 HTML 코드의 크기가 조금만 커져도 클래스명이 엉망진창이 된다는 부분이었다.
그래서 이번 홈페이지를 코딩 할 때에는 CSS 방법론이라는 것들을 찾아냈고, 그 중에서도 BEM 방법론을 채택했다.

그와 더불어 SASS라는 CSS전처리기 도구도 같이 처음으로 사용했다.

BEM 방법론을 사용하다보니, HTML태그의 깊이가 깊어질수록 클래스명이 길게 늘어나서 이 방법이 아닌 것 같다는 느낌도 받았다. 클래스명이 뱀처럼 길어서 BEM 방법론인가?
하지만 클래스명이 길어져도 구조적으로는 훨씬 간단하고 명료해지는 것을 깨달았다.

그 점은 특히 SASS를 사용할 때에 도드라지는데,  특히 Nesting과 Ampersand를 사용할 때에 그랬다. 

```html
  <header class="header">
    <h1 class="header__logo"><a href=""></a></h1>
    <nav class="header__nav">
      <ul class="header__nav__container">
        <li class="header__nav__container__item">
          <a class="header__nav__container__item__title" href="">Nintendo Switch</a>
          <ul class="header__nav__container__item__list">
            <li class="header__nav__container__item__list__item"><a href="">특징</a></li>
```
이런 구조의 HTML 요소들을 SASS를 사용해서
```css
.header {
	&__logo {
	//css코드
	}
	&__nav {
		//css코드
		&__container {
			//css코드
			&__item {
				//css코드
				&__title {
					//css코드
				}
				&__list {
					//css코드
					&__item {
						//css코드
					}
				}
			}
		}
	}
}
```
위와 같이 훨씬 더 알아보기 쉽고 깔끔하게 CSS 작성이 가능했다.

또한 이렇게 클래스를 만들면 모듈화가 된다는 장점도 있었다. 이 클론코딩에서는 section--news와 section--games의 list부분이 상당히 유사해서 모듈화를 사용할 수 있었다고 생각하는데, 이것은 다 만들고 나서 리뷰를 하고 있으니 눈에 들어온 부분이다.

그리고 BEM방법론에서, element는 다른 element를 포함할 수 없다는 규칙이 있다는 걸 뒤늦게 알게 되었다.  위와 같은 HTML 마크업은 BEM방법론적인 관점에서 봤을 때 아주 잘못 된 코드라는 것도 알게 되었다. 

다음 프로젝트를 진행할 때에는 BEM방법론을 좀 더 잘 알아보고 제대로 쓰고 싶다 생각했다. 또 다른 CSS 방법론을 알아보는 것도 고려해봐야겠다.
### slick.js
화면 상단의 슬라이더와, 모바일 화면에서 보여지는 공지사항에 slick.js를 사용했다.

화면 상단 슬라이더에는 breakpoint를 걸어서 모바일 화면에서 슬라이더를 drag 방식으로 바꾸었고, 공지사항은 자동으로 list들을 재생시키게 설정했다.
슬라이더는 꽤 여러번 직접 만들어봤는데, 실무에서 사용하려면 결국 라이브러리의 힘을 빌릴 수 밖에 없다는 걸 느꼈다. 혹은 내가 슬라이더 라이브러리를 만들어 두면 요긴하게 쓸 수 있을 거란 생각도 했다.


### jquery-ui
헤더의 메뉴와 모바일 화면의 푸터 부분에는 jquery-ui를 사용했다.

헤더 메뉴는 데스크탑에선 dropdown 형식으로 기능하고, 모바일에선 arccodion 형식으로 기능한다. 푸터 또한 모바일 화면에서 arcoodion으로 바뀐다.

이런 기능은 JS에서 window의 사이즈를 체크해서 기능을 부여해야 했다. 찾아본 바 JS에도 미디어쿼리 비슷한 것이 있었는데, window 객체의 matchMedia라는 메소드였다. matchMedia의 인자로 미디어쿼리의 설정값을 문자로 입력하면 놀랍게도 그 논리값을 반환해주는 친절한 메소드였다.
이를 이용해서 window가 resize될 때 마다 matchMedia를 체크하는 핸들러를 만들어서 메뉴의 형식을 손쉽게 반응형으로 바꿀 수 있었다. 

```js
function footerArc() {
  
  function footerHandler() {
    let mql = window.matchMedia("screen and (max-width: 768px)");
    
    if(mql.matches) {
      $(".section--bottom__footer__list").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content"
      });
    } else {
      if($(".section--bottom__footer__list").hasClass("ui-accordion")) {
        $(".section--bottom__footer__list").accordion("destroy");
      }
    }
  }
  
  resizeHandler(footerHandler);
}
```
이 페이지는 matchMedia 메소드를 사용해야하는 요소들이 꽤 있어서 리팩토링을 할 여지가 남아 있다고 생각한다.
## 종합
이 페이지는 왜인지 미디어쿼리의 분기점이 불규칙적이었고 많았다. 좀 더 매끄러운 반응형 홈페이지가 될 수 있었을텐데 아쉽다고 생각했다.
처음으로 만든 포트폴리오 페이지이다 보니 미흡한 점이 꽤 많았다. 하지만 그 안에서 배운 것으로 더 나은 홈페이지를 만들어 낼 수 있다는 확신이 생겨 좋았다.
