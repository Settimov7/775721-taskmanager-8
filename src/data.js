const randomNumber = (max) => Math.floor(Math.random() * max);

const randomBoolean = () => [true, false][randomNumber(2)];

const defaultTags = [`homework`, `theory`, `practice`, `intensive`, `keks`];

const randomTags = () => {
  const tags = new Array(randomNumber(3))
                .fill()
                .map(() => defaultTags[randomNumber(defaultTags.length)]);
  return tags;
};

export const getRandomTask = () => {
  return {
    title: [
      `Learn theory`,
      `Do homework`,
      `100% сomplete intensive`
    ][randomNumber(3)],
    dueDate: Date.now() + 1 + randomNumber(7) * 24 * 60 * 60 * 1000,
    tags: new Set(randomTags()),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: [
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`
    ][randomNumber(5)],
    repeatingDays: {
      mo: randomBoolean(),
      tu: randomBoolean(),
      we: randomBoolean(),
      th: randomBoolean(),
      fr: randomBoolean(),
      sa: randomBoolean(),
      su: randomBoolean()
    },
    isFavorite: randomBoolean(),
    isDone: randomBoolean()
  };
};
