import Component from './component';

export default class Task extends Component {
  constructor({color, title, tags, picture, dueDate, repeatingDays}) {
    super();

    this._color = color;
    this._title = title;
    this._tags = tags;
    this._picture = picture;
    this._dueDate = new Date(dueDate);
    this._repeatingDays = repeatingDays;
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
}
