import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

//장바구니
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click' , function(event) {
  // stopPropagation : basket에서만 작동을 하고 그 위 부모인 window까지 이벤트를 막기위함
  // 아래 window.addEvent 를 보면 show 클래스를 삭제하는 것이므로 그 자식태그에서 막아야한다.
  event.stopPropagation() // 이벤트 버블링 정지! - 버튼을 클릭했을 때 드롭다운 메뉴가 나타나야 함.
  if (basketEl.classList.contains('show')) {
    hideBasket()
  } else {
    showBasket()
  }
})
//basektEl 부모요소인 Starter에서 'show' 이벤트가 있는데 안에있는 내부 basketEl 클릭을 하게 되면 유지가 되어야하나
//위 코드만 갖고있을시 한번더 누르게되면서 .remove가 되버린다 따라서 stopPropagation을 추가해줘야한다.
basketEl.addEventListener('click' , function(event) {
  event.stopPropagation()
})
// window 클릭시 드랍다운 숨김
window.addEventListener('click', () => {
  hideBasket()
})

// 특정 로직을 직관적인 함수 이름으로 묶음.
function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}

const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click' , hideSearch)
searchShadowEl.addEventListener('click' , hideSearch)

//  검색바가 보일때 바로 input 요소 focus
function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length +'s'
  })
  searchDelayEls.forEach(function (el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length +'s'
  })
  // 검색 인풋 요소가 나타난 후 동작!
  setTimeout(() => {
    searchInputEl.focus()
  }, 600);
}

function hideSearch(){
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length +'s'
  })
  searchDelayEls.reverse().forEach(function (el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length +'s'
  })
  searchDelayEls.reverse() //원래 상태로 다시 뒤집어 줘야 show 시 정배열 순서대로 나온다.
  searchInputEl.value = '' //검색바가 꺼질때 검색창 값 초기화
}


// 요소의 가시성 관찰 ( 화면에 보이는지 안보이는지 )

const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return // 교차값이 false 인경우종료
    }
    entry.target.classList.add('show')
  })

})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
  io.observe(el)
})


// 비디오 요소
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function() {
  video.play() //play : video 메소드
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function() {
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})

// '당신에게 맞는 iPad는?' 랜더링!
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(ipad => {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(color => {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  // VS Code 확장 프로그램 - Comment tagged templates
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})



// 푸터 내비게이션 맵 랜더링!
const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(nav => {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(map => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})


// 올해 연도를 적용!
const thisYearEl = document.querySelector('.this-year')
thisYearEl.textContent = new Date().getFullYear()


// 푸터 내비게이션 맵 아코디언
const mapEls = [...document.querySelectorAll('footer .navigations .map')]
mapEls.forEach(el => {
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click', () => {
    el.classList.toggle('active')
  })
})