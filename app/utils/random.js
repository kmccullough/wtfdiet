// TODO:
//  1. Populate menu for X number of days
//  2. Avoid randomly repeating meals until Y amount of time
//  3. Randomize/regulate ingredients e.g. not chicken a bunch of days in a row
//  4. Randomize/regulate intensity of cooking involvement / prep time
//  5. Populate meals based on present attendee's likes
export function randomize(arr, count = arr.length, previous = []) {
  let choices = [];
  const rarr = [];
  for (let i = 0; i < count; ++i) {
    if (!choices.length) {
      choices = [ ...arr ];
    }
    rarr.push(...choices.splice(Math.floor(Math.random() * choices.length), 1));
  }
  return rarr;
}
