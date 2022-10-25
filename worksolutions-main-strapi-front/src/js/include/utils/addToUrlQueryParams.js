import { stringConcat } from "../utils";

export function addToUrlQueryParams(url, params) {
  return `${url}?${params}`;
}

export function convertObjectToQuery(params) {
  return Object.entries(params).reduce((acc, [key, value]) => stringConcat([acc, concatParams(key, value)]), "");
}

function concatParams(key, value) {
  return `${key}=${value}`;
}
