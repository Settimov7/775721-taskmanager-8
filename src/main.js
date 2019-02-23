import createFilter from './create-filter';
import createCard from './create-card';

const MAX_CARDS = 10;
const DEFAULT_QUANTITY = 7;
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
const boardTasks = document.querySelector(`.board__tasks`);

const renderFilters = (filters) => {
  filters.forEach((filter) => {
    filterContainer.innerHTML += createFilter(filter);
  });
};

const renderDefaultCards = () => {
  for (let i = 0; i < DEFAULT_QUANTITY; i++) {
    boardTasks.innerHTML += createCard();
  }
};

const changeCards = (target) => {
  let sum = parseInt(target.querySelector(`span`).textContent, 10);
  sum = (sum < 10 ? sum : MAX_CARDS);

  boardTasks.innerHTML = ``;

  for (let i = 0; i < sum; i++) {
    boardTasks.innerHTML += createCard();
  }
};

const onFilterClick = (evt) => {
  evt.preventDefault();

  const target = evt.target.closest(`.filter__label`);

  if (target) {
    changeCards(target);
  }
};

renderFilters(FILTERS);
renderDefaultCards();
filterContainer.addEventListener(`click`, onFilterClick);
