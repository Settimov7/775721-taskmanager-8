import {ClassName, createElement} from './util';

import Hashtags from './hastags';

export default class TaskEdit {
  constructor({color, title, tags, picture, dueDate, repeatingDays}) {
    this._color = color;
    this._title = title;
    this._tags = tags;
    this._picture = picture;
    this._dueDate = new Date(dueDate);
    this._repeatingDays = repeatingDays;

    this._element = null;
    this._onSave = null;

    this._onSaveButtonClick = this._onSaveButtonClick.bind(this);
  }

  set onSave(func) {
    this._onSave = func;
  }

  get _isRepeat() {
    return Object.values(this._repeatingDays).some((it) => it);
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
    const classNames = `card card--edit card--${ this.color }${ this._isRepeat ? ` card--repeat` : `` }${ this._isDeadline ? ` card--deadline` : ``}`;

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
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">no</span>
                </button>

                <fieldset class="card__date-deadline" disabled>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="${ this._day }"
                      name="date"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${ this._time }"
                      name="time"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">no</span>
                </button>

                <fieldset class="card__repeat-days" disabled>
                  <div class="card__repeat-days-inner">
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-mo-2"
                      name="repeat"
                      value="mo"
                      ${ this._repeatingDays[`mo`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-mo-2"
                      >mo</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-2"
                      name="repeat"
                      value="tu"
                      ${ this._repeatingDays[`tu`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-tu-2"
                      >tu</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-2"
                      name="repeat"
                      value="we"
                      ${ this._repeatingDays[`we`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-we-2"
                      >we</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-2"
                      name="repeat"
                      value="th"
                      ${ this._repeatingDays[`th`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-th-2"
                      >th</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-2"
                      name="repeat"
                      value="fr"
                      ${ this._repeatingDays[`fr`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-fr-2"
                      >fr</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-sa-2"
                      name="repeat"
                      value="sa"
                      ${ this._repeatingDays[`sa`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-sa-2"
                      >sa</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-2"
                      name="repeat"
                      value="su"
                      ${ this._repeatingDays[`su`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-su-2"
                      >su</label
                    >
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <label class="card__img-wrap card__img-wrap--empty">
              <input
                type="file"
                class="card__img-input visually-hidden"
                name="img"
              />
              <img
                src="${ this._picture }"
                alt="task picture"
                class="card__img"
              />
            </label>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input
                  type="radio"
                  id="color-black-2"
                  class="card__color-input card__color-input--black visually-hidden"
                  name="color"
                  value="black"
                />
                <label
                  for="color-black-2"
                  class="card__color card__color--black"
                  >black</label
                >
                <input
                  type="radio"
                  id="color-yellow-2"
                  class="card__color-input card__color-input--yellow visually-hidden"
                  name="color"
                  value="yellow"
                />
                <label
                  for="color-yellow-2"
                  class="card__color card__color--yellow"
                  >yellow</label
                >
                <input
                  type="radio"
                  id="color-blue-2"
                  class="card__color-input card__color-input--blue visually-hidden"
                  name="color"
                  value="blue"
                />
                <label
                  for="color-blue-2"
                  class="card__color card__color--blue"
                  >blue</label
                >
                <input
                  type="radio"
                  id="color-green-2"
                  class="card__color-input card__color-input--green visually-hidden"
                  name="color"
                  value="green"
                />
                <label
                  for="color-green-2"
                  class="card__color card__color--green"
                  >green</label
                >
                <input
                  type="radio"
                  id="color-pink-2"
                  class="card__color-input card__color-input--pink visually-hidden"
                  name="color"
                  value="pink"
                  checked
                />
                <label
                  for="color-pink-2"
                  class="card__color card__color--pink"
                  >pink</label
                >
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }

  _onSaveButtonClick(evt) {
    evt.preventDefault();

    if (typeof this._onSave === `function`) {
      this._onSave();
    }
  }

  _addEventListener() {
    this._element.querySelector(`.${ ClassName.BUTTON.SAVE }`).addEventListener(`click`, this._onSaveButtonClick);
  }

  _removeEventListener() {
    this._element.querySelector(`.${ ClassName.BUTTON.SAVE }`).removeEventListener(`click`, this._onSaveButtonClick);
  }

  get element() {
    return this._element;
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
