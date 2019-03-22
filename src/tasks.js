import Component from './component';

import {createElement} from './util';

import {getRandomTask} from './data';
import TaskDefault from './task-default';
import TaskEdit from './task-edit';

const Default = {
  QUANTITY: 7,
};

export default class Tasks extends Component {
  constructor(quantity = Default.QUANTITY) {
    super();

    this._quantity = quantity;
  }

  get _template() {
    return `<div class="board__tasks"></div>`;
  }

  renderTasks() {
    this._tasks = document.createDocumentFragment();

    for (let i = 0; i < this._quantity; i++) {
      const data = getRandomTask();
      const task = new TaskDefault(data);
      const taskEdit = new TaskEdit(data);

      task.onEdit = () => {
        taskEdit.render();
        task.element.parentElement.replaceChild(taskEdit.element, task.element);
        task.unrender();
      };

      taskEdit.onSave = (newObject) => {
        data.title = newObject.title;
        data.tags = newObject.tags;
        data.color = newObject.color;
        data.repeatingDays = newObject.repeatingDays;

        task.update(data);
        task.render();
        taskEdit.element.parentElement.replaceChild(task.element, taskEdit.element);
        taskEdit.unrender();
      };

      this._tasks.appendChild(task.render());
    }

    this._element.appendChild(this._tasks);
  }

  unrenderTasks() {
    this._tasks.forEach((task) => {
      task.unrender();
    });
  }

  render() {
    this._element = createElement(this._template);
    this._addEventListener();

    this.renderTasks();
    return this._element;
  }

  unrender() {
    this._removeEventListener();
    this.unrenderTasks();
    this._element.remove();
    this._element = null;
  }
}
