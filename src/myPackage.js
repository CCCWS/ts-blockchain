// @ts-check
// JS파일이지만 TS의 보호를 받게함

/**
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */

export function init(config) {
  return true;
}

/**
 * @param {number} code
 * @returns {number}
 */

export function exit(code) {
  return code + 1;
}
