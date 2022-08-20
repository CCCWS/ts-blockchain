// @ts-check
// JS파일이지만 TS의 보호를 받게함
// JSDoc
/**
 * 파라미터로 object를 받고 boolean 리턴
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */
export function init(config) {
    return true;
}
/**
 * 파라미터로 number을 받고 number 리턴
 * @param {number} code
 * @returns {number}
 */
export function exit(code) {
    return code + 1;
}
