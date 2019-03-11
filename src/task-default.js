import {ClassName, createElement} from './util';

import Task from './task';
import Hashtags from './hastags';

export default class TaskDefault extends Task {
  constructor(data) {
    super(data);

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  set onEdit(func) {
    this._onEdit = func;
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

    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  _addEventListener() {
    this._element.querySelector(`.${ ClassName.BUTTON.EDIT }`).addEventListener(`click`, this._onEditButtonClick);
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
}
