import $ from 'jquery';
import '../scss/index.scss';
import { initPagedSlider, initScrollSlider, initCoveringPanelSlider } from './slider';
import initDropdownMenus from './dropdownMenu';

$(document).ready(function () {
  initPagedSlider();
  initScrollSlider();
  initDropdownMenus();
  initCoveringPanelSlider();
});
