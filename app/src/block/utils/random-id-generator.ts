const allCapsAlpha = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const allLowerAlpha = [...'abcdefghijklmnopqrstuvwxyz'];
const allUniqueChars = [...'~!@#$%^&*()_+-=[]{}|;:\'",./<>?'];
const allNumbers = [...'0123456789'];

const base = [
  ...allCapsAlpha,
  ...allNumbers,
  ...allLowerAlpha,
  ...allUniqueChars,
];

export const randomIdGenerator = (len: number) => {
  return [...Array(len)]
    .map((i) => base[(Math.random() * base.length) | 0])
    .join('');
};
