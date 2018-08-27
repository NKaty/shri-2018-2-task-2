import $ from 'jquery';

class DropdownMenu {
  constructor (elem) {
    this._nav = elem;
    this._dropdownButton = $(elem).find('.dropdown-button');
    this._menu = $(elem).find('.menu');

    this._toggleMenu = this._toggleMenu.bind(this);
    this._applyMenu = this._applyMenu.bind(this);
    this._onClickDocument = this._onClickDocument.bind(this);

    this._dropdownButton.on('click', this._toggleMenu);
    this._menu.on('click', this._applyMenu);
  }

  _toggleMenu (event) {
    if ($(this._nav).hasClass('is-dropdown')) {
      this._closeMenu();
    } else {
      this._openMenu();
    }
  }

  _applyMenu (event) {
    const item = event.target.closest('.item');
    if (!item) return;
    if ($(item).hasClass('is-active')) event.preventDefault();
    this._closeMenu();
  }

  _onClickDocument (event) {
    if ($(event.target).is(this._menu)) {
      return;
    } else if ($(event.target.closest('.dropdown-button')).is(this._dropdownButton)) {
      return;
    } else {
      event.preventDefault();
    }
    this._closeMenu();
  }

  _openMenu () {
    $(document).on('click', this._onClickDocument);
    $(this._nav).addClass('is-dropdown');
  }

  _closeMenu () {
    $(document).off('click', this._onClickDocument);
    $(this._nav).removeClass('is-dropdown');
  }
}

export default function initDropdownMenus () {
  $('.dropdown-nav').each((index, item) => new DropdownMenu(item));
}
