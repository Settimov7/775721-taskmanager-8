import {getRandomNumber, getRandomBoolean} from './util';

const defaultTags = [`homework`, `theory`, `practice`, `intensive`, `keks`];

const getRandomTags = () => {
  const tags = new Array(getRandomNumber(3))
                .fill()
                .map(() => defaultTags[getRandomNumber(defaultTags.length)]);
  return tags;
};

export const getRandomTask = () => {
  return {
    title: [
      `Learn theory`,
      `Do homework`,
      `100% сomplete intensive`
    ][getRandomNumber(3)],
    dueDate: Date.now() + 1 + getRandomNumber(7) * 24 * 60 * 60 * 1000,
    tags: new Set(getRandomTags()),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: [
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`
    ][getRandomNumber(5)],
    repeatingDays: {
      mo: getRandomBoolean(),
      tu: getRandomBoolean(),
      we: getRandomBoolean(),
      th: getRandomBoolean(),
      fr: getRandomBoolean(),
      sa: getRandomBoolean(),
      su: getRandomBoolean()
    },
    isFavorite: getRandomBoolean(),
    isDone: getRandomBoolean()
  };
};
