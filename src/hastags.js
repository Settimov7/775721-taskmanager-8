import Hashtag from './hastag';

export default class Hastags {
  constructor(tags) {
    this._tags = tags;

    this._element = null;
  }

  render() {
    this._element = document.createDocumentFragment();

    this._tags.forEach((tag) => {
      this._element.appendChild(new Hashtag(tag).render());
    });

    return this._element;
  }
}
