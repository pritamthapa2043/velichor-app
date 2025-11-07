export function toCamelCaseDeep(input: any): any {
  if (Array.isArray(input)) {
    return input.map(toCamelCaseDeep);
  } else if (input && typeof input === "object") {
    return Object.keys(input).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      acc[camelKey] = toCamelCaseDeep(input[key]);
      return acc;
    }, {} as any);
  }
  return input;
}

export function toSnakeCaseDeep(input: any): any {
  if (Array.isArray(input)) {
    return input.map(toSnakeCaseDeep);
  } else if (input && typeof input === "object") {
    return Object.keys(input).reduce((acc, key) => {
      const snakeKey = key
        .replace(/([A-Z])/g, "_$1") // insert _ before capital letters
        .toLowerCase(); // convert everything to lowercase
      acc[snakeKey] = toSnakeCaseDeep(input[key]);
      return acc;
    }, {} as any);
  }
  return input;
}
