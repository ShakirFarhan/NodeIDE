export const calculateDiff = (oldStr: string, newStr: string) => {
  const changes = [];
  let i = 0,
    j = 0;

  while (i < oldStr.length || j < newStr.length) {
    if (i < oldStr.length && j < newStr.length && oldStr[i] === newStr[j]) {
      i++;
      j++;
    } else {
      let startI = i,
        startJ = j;
      // This loop is responsible for identifying characters that are present in oldStr but not in newStr
      while (
        i < oldStr.length &&
        (j >= newStr.length || oldStr[i] !== newStr[j])
      )
        i++;

      // This loop is responsible for identifying characters that are present in newStr but not in oldStr
      while (
        j < newStr.length &&
        (i >= oldStr.length || oldStr[i] !== newStr[j])
      )
        j++;
      // This condition checks if there are any characters in oldStr that were not found in newStr
      if (startI < i) {
        changes.push({
          type: 'removed',
          index: startI,
          value: oldStr.slice(startI, i),
        });
      }
      // This condition checks if there are any characters in newStr that were not found in oldStr
      if (startJ < j) {
        changes.push({
          type: 'added',
          index: startJ,
          value: newStr.slice(startJ, j),
        });
      }
    }
  }

  return changes;
};
