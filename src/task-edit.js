import flatpickr from 'flatpickr';
import moment from 'moment';

import {ClassName} from './util';

import Task from './task';

export default class TaskEdit extends Task {
  constructor(data) {
    super(data);

    this._state = {
      isDate: false,
      isRepeated: false,
    };

    this._onSave = null;
    this._onSaveButtonClick = this._onSaveButtonClick.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: this._dueDate,
      repeatingDays: {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false,
      }
    };

    const taskEditMapper = TaskEdit.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => {
        target.title = value;
      },
      date: (value) => {
        if (value) {
          target.dueDate.setDate(flatpickr.parseDate(value, `d`).getDate());
          target.dueDate.setMonth(new Date(value).getMonth());
        }
      },
      time: (value) => {
        if (value) {
          target.dueDate.setHours(flatpickr.parseDate(value, `H`).getHours());
          target.dueDate.setMinutes(value.split(`:`)[1].split(` `)[0]);
        }
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
    };
  }

  set onSave(func) {
    this._onSave = func;
  }

  get _template() {
    const classNames = `card card--edit card--${ this._color }${ this._isRepeat ? ` card--repeat` : `` }${ this._isDeadline ? ` card--deadline` : ``}`;

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
                  date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" placeholder="${ moment(this._dueDate).format(`DD MMMM`) }" name="date" />
                  </label>

                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="${ moment(this._dueDate).format(`hh:mm A`) }" name="time" />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${ this._state.isRepeated ? `yes` : `no` }</span>
                </button>

                <fieldset class="card__repeat-days" ${ !this._state.isRepeated && `disabled` }>
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
                  ${ (Array.from(this._tags).map((tag) => (`
                  <span class="card__hashtag-inner">
                    <input type="hidden" name="hashtag" value="${ tag }" class="card__hashtag-hidden-input" />
                    <button type="button" class="card__hashtag-name">#${ tag }</button>
                    <button type="button" class="card__hashtag-delete">delete</button>
                  </span>`.trim()))).join(``) }
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
                  ${ this._color === `black` ? `checked` : ``}
                />
                <label
                  for="color-black-2"
                  class="card__color card__color--black"
                  >black</label
                >
                <input
                  type="radio"
                  id="color-yellow-2"
                  class="card__color-input card__color-input--yellow visually-hidden "
                  name="color"
                  value="yellow"
                  ${ this._color === `yellow` ? `checked` : ``}
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
                  ${ this._color === `blue` ? `checked` : ``}
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
                  ${ this._color === `green` ? `checked` : ``}
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
                  ${ this._color === `pink` ? `checked` : ``}
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

  _partialUpdate() {
    this._element.innerHTML = this._template;
  }

  _onSaveButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.${ ClassName.FORM }`));
    const newData = this._processForm(formData);

    if (typeof this._onSave === `function`) {
      this._onSave(newData);
    }

    this.update(newData);
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this._removeEventListener();
    this._partialUpdate();
    this._addEventListener();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this._removeEventListener();
    this._partialUpdate();
    this._addEventListener();
  }

  _addEventListener() {
    this._element.querySelector(`.${ ClassName.BUTTON.SAVE }`).addEventListener(`click`, this._onSaveButtonClick);
    this._element.querySelector(`.${ ClassName.TOGGLE.DATE_DEADLINE }`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.${ ClassName.TOGGLE.REPEAT }`).addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
      flatpickr(`.card__date`, {
        altInput: true,
        altFormat: `j F`,
        dateFormat: `j F`
      });

      flatpickr(`.card__time`, {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: `h:i K`,
        dateFormat: `h:i K`
      });
    }
  }

  _removeEventListener() {
    this._element.querySelector(`.${ ClassName.BUTTON.SAVE }`).removeEventListener(`click`, this._onSaveButtonClick);
    this._element.querySelector(`.${ ClassName.TOGGLE.DATE_DEADLINE }`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.${ ClassName.TOGGLE.REPEAT }`).removeEventListener(`click`, this._onChangeRepeated);
  }
}
