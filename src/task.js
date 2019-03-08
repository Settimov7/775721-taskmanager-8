import {ClassName, createElement} from './util';

import Hashtags from './hastags';
import TaskEdit from './task-edit';

export default class Task {
  constructor({color, title, tags, picture, dueDate, repeatingDays}) {
    this._color = color;
    this._title = title;
    this._tags = tags;
    this._picture = picture;
    this._dueDate = new Date(dueDate);
    this._repeatingDays = repeatingDays;

    this._element = null;
  }

  get _isRepeat() {
    for (let day in this._repeatingDays) {
      if (this._repeatingDays[day]) {
        return true;
      }
    }

    return false;
  }

  get _isDeadline() {
    return this._dueDate < new Date();
  }

  get _day() {
    return `${ this._dueDate.toLocaleString(`en-US`, {day: `numeric`}) } ${ this._dueDate.toLocaleString(`en-US`, {month: `long`}) }`;
  }

  get _time() {
    return `${ this._dueDate.toLocaleString(`en-US`, {hour: `numeric`, minute: `numeric`}) }`;
  }

  get _tempalate() {
    const classNames = `card card--${ this._color }${ this._isRepeat ? ` card--repeat` : `` }${ this._isDeadline ? ` card--deadline` : ``}`;

    return `<article class="${ classNames }">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${ this._title }</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                </div>
              </div>
            </div>
          </div>
      </form>
    </article>`.trim();
  }

  _onEditButtonClick(evt) {
    evt.preventDefault();

    const taskEdit = new TaskEdit({color: this._color, title: this._title, tags: this._tags, picture: this._picture, dueDate: this._dueDate, repeatingDays: this._repeatingDays});
    this._element.parentElement.replaceChild(taskEdit.render(), this._element);
    this.unrender();
  }

  _addEventListener() {
    this._element.querySelector(`.${ ClassName.BUTTON.EDIT }`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  _removeEventListener() {
    this._element.querySelector(`.${ ClassName.BUTTON.EDIT }`).removeEventListener(`click`, this._onEditButtonClick);
  }

  render() {
    this._element = createElement(this._tempalate);
    this._element.querySelector(`.${ ClassName.HASHTAG.LIST }`).appendChild(new Hashtags(this._tags).render());
    this._addEventListener();

    return this._element;
  }

  unrender() {
    this._removeEventListener();
    this._element = null;
  }
}
