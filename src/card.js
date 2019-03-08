import {getRandomTask} from './data';
import Task from './task';

const MAX_CARDS = 10;
const Default = {
  QUANTITY: 7,
  COLOR: `black`
};

let boardTasks = document.querySelector(`.board__tasks`);

const createCards = (quantity) => {
  let cards = document.createDocumentFragment();

  for (let i = 0; i < quantity; i++) {
    cards.appendChild(new Task(getRandomTask()).render());
  }

  return cards;
};

const renderCards = (quantity) => {
  const newBoardTasks = boardTasks.cloneNode(false);

  newBoardTasks.appendChild(createCards(quantity));
  boardTasks.parentElement.replaceChild(newBoardTasks, boardTasks);
  boardTasks = newBoardTasks;
};

export const changeCards = (target) => {
  let sum = parseInt(target.querySelector(`span`).textContent, 10);
  sum = (sum < 10 ? sum : MAX_CARDS);

  renderCards(sum);
};

export const renderDefaultCards = () => {
  renderCards(Default.QUANTITY);
};
