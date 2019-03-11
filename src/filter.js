import {ClassName} from './util';
import Tasks from './tasks';

const MAX_TASKS = 10;

const FILTERS = [
  {
    name: `all`,
    sum: 15,
    isChecked: true
  },
  {
    name: `overdue`,
    sum: 0
  },
  {
    name: `today`,
    sum: 0
  },
  {
    name: `favorites`,
    sum: 7
  },
  {
    name: `repeating`,
    sum: 2
  },
  {
    name: `tags`,
    sum: 6
  },
  {
    name: `archive`,
    sum: 115
  }
];

const filterContainer = document.querySelector(`.main__filter`);

const createFilter = ({name, sum, isChecked = false}) => `<input
    type="radio"
    id="filter__${ name }"
    class="filter__input visually-hidden"
    name="filter"
    ${ isChecked ? `checked` : `` }
    ${ !sum ? `disabled` : `` }
  />
  <label
    for="filter__${ name }"
    class="filter__label"
  >
    ${ name.toUpperCase() } <span class="filter__${ name }-count">${ sum }</span>
  </label>`;

const onFilterClick = (evt) => {
  evt.preventDefault();

  const target = evt.target.closest(`.filter__label`);

  if (target) {
    // changeCards(target);

    let sum = parseInt(target.querySelector(`span`).textContent, 10);
    sum = (sum < 10 ? sum : MAX_TASKS);

    const newTasks = new Tasks(sum);
    document.querySelector(`.${ ClassName.BOARD_TASKS }`).replaceWith(newTasks.render());
  }
};

export default () => {
  FILTERS.forEach((filter) => {
    filterContainer.innerHTML += createFilter(filter);
  });

  filterContainer.addEventListener(`click`, onFilterClick);
};
