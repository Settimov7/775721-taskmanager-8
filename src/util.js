export const ClassName = {
  BUTTON: {
    DEFAULT: `card__btn`,
    EDIT: `card__btn--edit`,
    SAVE: `card__save`,
  },
  TOGGLE: {
    DATE_DEADLINE: `card__date-deadline-toggle`,
    REPEAT: `card__repeat-toggle`,
  },
  HASHTAG: {
    LIST: `card__hashtag-list`,
  },
  BOARD_TASKS: `board__tasks`,
  FORM: `card__form`,
};

export const getRandomNumber = (max) => Math.floor(Math.random() * max);

export const getRandomBoolean = () => [true, false][getRandomNumber(2)];

export const createElement = (template) => {
  const newElement = document.createElement(`template`);

  newElement.innerHTML = template.trim();

  return newElement.content.firstChild;
};
