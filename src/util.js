export const getRandomNumber = (max) => Math.floor(Math.random() * max);

export const getRandomBoolean = () => [true, false][getRandomNumber(2)];
