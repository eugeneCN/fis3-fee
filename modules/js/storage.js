/**
 * @desc    封装storage
 * @author  zhangWuQiang
 * @date    2017年09月10日
 */

const JSON = window.JSON;
const localStorage = window.localStorage;
const sessionStorage = window.sessionStorage;

const local = {
  getItem(key) {
    let value = localStorage.getItem(key);
    if (/^\{.*\}$/.test(value) || /^\[.*\]$/.test(value)) value = JSON.parse(value);
    return value;
  },
  setItem(key, value) {
    if (typeof value === typeof {}) value = JSON.stringify(value);
    return localStorage.setItem(key, value);
  },
  removeItem(key) {
    return localStorage.removeItem(key);
  }
};
const session = {
  getItem(key) {
    let value = sessionStorage.getItem(key);
    if (/^\{.*\}$/.test(value) || /^\[.*\]$/.test(value)) value = JSON.parse(value);
    return value;
  },
  setItem(key, value) {
    if (typeof value === typeof {}) value = JSON.stringify(value);
    return sessionStorage.setItem(key, value);
  },
  removeItem(key) {
    return sessionStorage.removeItem(key);
  }
};
module.exports = {
  local,
  session
};
