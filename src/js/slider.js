import $ from 'jquery';

function getSlider (sectionId) {
  const section = $(`#${sectionId}`);
  const slider = section.find('.slider');
  const pagination = section.find('.pagination');
  return {slider, pagination};
}

export function initPagedSlider () {
  const {slider, pagination} = getSlider('scripts');
  const leftArrow = pagination.find('.left');
  const rightArrow = pagination.find('.right');

  function checkActiveArrows (page) {
    if (page.next().length) {
      rightArrow.addClass('is-active');
    } else {
      rightArrow.removeClass('is-active');
    }

    if (page.prev().length) {
      leftArrow.addClass('is-active');
    } else {
      leftArrow.removeClass('is-active');
    }
  }

  function getNumberOfItemsInPage () {
    const scripts = $('#scripts');
    const rowNum = scripts.css('--pageRowNum');
    const colNum = scripts.css('--pageColNum');
    return colNum * rowNum;
  }

  function changeSliderHTMLDependingBrowserSize () {
    const windowWidth = $(window).width();
    const sliderPages = slider.find('.c-slider__page');

    if (windowWidth < 601 && sliderPages.length) {
      sliderPages.find('.c-slider__item').unwrap();
    }

    if (windowWidth >= 601 && !sliderPages.length) {
      const items = slider.find('.c-slider__item');
      const numberItems = getNumberOfItemsInPage();
      let start = 0;
      let end = numberItems;

      while (start < items.length) {
        const page = items.slice(start, end);
        if (start === 0) {
          page.wrapAll('<div class="c-slider__page is-active"></div>');
        } else {
          page.wrapAll('<div class="c-slider__page"></div>');
        }
        start += numberItems;
        end += numberItems;
      }

      const activePage = slider.find('.c-slider__page.is-active');
      if (activePage.length) checkActiveArrows(activePage);
    }
  }

  function paginationHandler (event) {
    const activePage = slider.find('.c-slider__page.is-active');

    if (!activePage.length) return;

    if (event.target.closest('.left')) {
      const prevPage = activePage.prev();

      if (prevPage.length) {
        activePage.animate({
          opacity: 0
        }, 500, function () {
          activePage.removeClass('is-active');
          prevPage.addClass('is-active');
          activePage.css('opacity', 1);
        });
        checkActiveArrows(prevPage);
      }
    }

    if (event.target.closest('.right')) {
      const nextPage = activePage.next();

      if (nextPage.length) {
        activePage.animate({
          opacity: 0
        }, 500, function () {
          activePage.removeClass('is-active');
          nextPage.addClass('is-active');
          activePage.css('opacity', 1);
        });
        checkActiveArrows(nextPage);
      }
    }
  }

  function initSlider () {
    changeSliderHTMLDependingBrowserSize();

    const activePage = slider.find('.c-slider__page.is-active');
    if (activePage.length) checkActiveArrows(activePage);

    $(window).resize(changeSliderHTMLDependingBrowserSize);
    pagination.on('click', paginationHandler);
  }

  initSlider();
}

export function initScrollSlider () {
  const {slider, pagination} = getSlider('devices');
  const leftArrow = pagination.find('.left');
  const rightArrow = pagination.find('.right');

  function checkActiveArrows (scroll) {
    const sliderWidth = slider.innerWidth();
    const scrollWidth = slider.get(0).scrollWidth;

    if (scroll + sliderWidth < scrollWidth) {
      rightArrow.addClass('is-active');
    } else {
      rightArrow.removeClass('is-active');
    }

    if (scroll > 0) {
      leftArrow.addClass('is-active');
    } else {
      leftArrow.removeClass('is-active');
    }
  }

  function paginationHandler (event) {
    const sliderWidth = slider.innerWidth();
    const panels = slider.find('.c-panel');
    const panelsNum = panels.length;
    const panelWidth = $(panels).outerWidth(true);
    if (panelWidth * panelsNum < sliderWidth) return;
    const shiftScroll = Math.floor(sliderWidth / panelWidth) * panelWidth;
    const scroll = slider.scrollLeft();

    if (event.target.closest('.left')) {
      slider.animate({scrollLeft: scroll - shiftScroll}, 600);
      checkActiveArrows(scroll - shiftScroll);
    }

    if (event.target.closest('.right')) {
      slider.animate({scrollLeft: scroll + shiftScroll}, 600);
      checkActiveArrows(scroll + shiftScroll);
    }
  }

  function checkOnResizeWindow () {
    const scroll = slider.scrollLeft();
    checkActiveArrows(scroll);
  }

  function initSlider () {
    checkActiveArrows(0);
    $(window).resize(checkOnResizeWindow);
    pagination.on('click', paginationHandler);
  }

  initSlider();
}

export function initCoveringPanelSlider () {
  const slider = getSlider('main').slider;
  const sliderHeight = slider.innerHeight();
  const panels = slider.find('.c-panel');
  const panelsNum = panels.length;
  const panelHeight = panels.outerHeight(true);
  const visiblePanelsNum = Math.floor(sliderHeight / panelHeight);

  if (panelsNum > visiblePanelsNum) {
    $(panels.get(visiblePanelsNum)).addClass('is-covered');
  }

  function removeCover () {
    if ($(panels.get(visiblePanelsNum)).hasClass('is-covered')) {
      $(panels.get(visiblePanelsNum)).removeClass('is-covered');
    }
  }

  slider.on('scroll', removeCover);
}
