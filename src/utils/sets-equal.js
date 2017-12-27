
/**
 * check ES2015 Sets for equality.
 * http://stackoverflow.com/questions/31128855/comparing-ecma6-sets-for-equality
 * @param {Set} setA
 * @param {Set} setB
 * @returns {boolean} are the sets equal
 */
export default function setsEqual(setA, setB) {
  if (setA.size !== setB.size) {
    return false;
  }

  let acc = true;
  setA.forEach((a) => {
    acc = acc && setB.has(a);
  });

  return acc;
}
