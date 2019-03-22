import {ClassName} from './util';

import Task from './task';
import moment from 'moment';

export default class TaskDefault extends Task {
  constructor(data) {
    super(data);

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  set onEdit(func) {
    this._onEdit = func;
  }

  get _template() {
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
              <div class="card__dates">
                ${ moment(this._dueDate).format(`DD MMMM hh:m`) }
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${ (Array.from(this._tags).map((tag) => (`
                        <span class="card__hashtag-inner">
                          <input type="hidden" name="hashtag" value="${ tag }" class="card__hashtag-hidden-input" />
                          <button type="button" class="card__hashtag-name">#${ tag }</button>
                          <button type="button" class="card__hashtag-delete">delete</button>
                        </span>`.trim()))).join(``) }
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
}
