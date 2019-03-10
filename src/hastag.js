import {createElement} from "./util";

export default class Hashtag {
  constructor(tag) {
    this._tag = tag;

    this._element = null;
  }

  get _template() {
    return `
    <span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="repeat"
        class="card__hashtag-hidden-input"
      />
      <button type="button" class="card__hashtag-name">
        #${ this._tag }
      </button>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>`.trim();
  }

  render() {
    this._element = createElement(this._template);

    return this._element;
  }
}
