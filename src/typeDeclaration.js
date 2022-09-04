export function head(array) {
  return array != null && array.length ? array[0] : undefined;
}

export function hasIn(object, key) {
  return object != null && key in Object(object);
}

export function isBoolean(value) {
  return (
    value === true ||
    value === false ||
    (isObjectLike(value) && getTag(value) == "[object Boolean]")
  );
}

export function toString(value) {
  if (value == null) {
    return "";
  }
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${value.map((other) => (other == null ? other : toString(other)))}`;
  }
  if (isSymbol(value)) {
    return value.toString();
  }
  const result = `${value}`;
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}

export function split(string, separator, limit) {
  limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
  if (!limit) {
    return [];
  }
  if (
    string &&
    (typeof separator === "string" ||
      (separator != null && !isRegExp(separator)))
  ) {
    if (!separator && hasUnicode(string)) {
      return castSlice(stringToArray(string), 0, limit);
    }
  }
  return string.split(separator, limit);
}

export function hasPath(object, path) {
  path = castPath(path, object);

  let index = -1;
  let { length } = path;
  let result = false;
  let key;

  while (++index < length) {
    key = toKey(path[index]);
    if (!(result = object != null && hasOwnProperty.call(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return (
    !!length &&
    isLength(length) &&
    isIndex(key, length) &&
    (Array.isArray(object) || isArguments(object))
  );
}

export function flter(array, predicate) {
  let index = -1;
  let resIndex = 0;
  const length = array == null ? 0 : array.length;
  const result = [];

  while (++index < length) {
    const value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

const objCheck = (a) => {
  if (typeof a === "object") {
    return true;
  } else {
    return false;
  }
};

const arr = [1, { test: "TEST" }];
// console.log(flter(arr, objCheck));

export function every(array, predicate) {
  let index = -1;
  const length = array == null ? 0 : array.length;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return "A";
    }
  }
  return true;
}

export function map(array, iteratee) {
  let index = -1;
  const length = array == null ? 0 : array.length;
  const result = new Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index]);
  }
  return result;
}

// import { map } from "lodash";

console.log(map([1, 2, 3, 4], (a) => a * 2));
