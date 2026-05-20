function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function toCamelCaseDeep(input: unknown): unknown {
  if (Array.isArray(input)) {
    return input.map(toCamelCaseDeep);
  }
  if (isPlainObject(input)) {
    return Object.keys(input).reduce<Record<string, unknown>>((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter: string) =>
        letter.toUpperCase()
      );
      acc[camelKey] = toCamelCaseDeep(input[key]);
      return acc;
    }, {});
  }
  return input;
}

export function toSnakeCaseDeep(input: unknown): unknown {
  if (Array.isArray(input)) {
    return input.map(toSnakeCaseDeep);
  }
  if (isPlainObject(input)) {
    return Object.keys(input).reduce<Record<string, unknown>>((acc, key) => {
      const snakeKey = key
        .replace(/([A-Z])/g, "_$1")
        .toLowerCase();
      acc[snakeKey] = toSnakeCaseDeep(input[key]);
      return acc;
    }, {});
  }
  return input;
}
