export const ClassName = {
  BUTTON: {
    DEFAULT: `card__btn`,
    EDIT: `card__btn--edit`,
    SAVE: `card__save`,
  },
  HASHTAG: {
    LIST: `card__hashtag-list`,
  },
};

export const getRandomNumber = (max) => Math.floor(Math.random() * max);

export const getRandomBoolean = () => [true, false][getRandomNumber(2)];

export const createElement = (template) => {
  const newElement = document.createElement(`template`);

  newElement.innerHTML = template.trim();

  return newElement.content.firstChild;
};
