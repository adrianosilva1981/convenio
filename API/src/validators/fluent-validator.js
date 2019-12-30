'use strict';

let errors = [];

class Validation {
  constructor() {
    errors = [];
  }
  isRequired(value, message, tokenTranslate) {
    if (!value || value.length <= 0) {
      errors.push({
        message: message,
        token_translate: tokenTranslate
      });
    }
  }
  hasMinLen(value, min, message, tokenTranslate) {
    if (!value || value.length < min) {
      errors.push({
        message: message,
        token_translate: tokenTranslate
      });
    }
  }
  hasMaxLen(value, max, message, tokenTranslate) {
    if (!value || value.length > max) {
      errors.push({
        message: message,
        token_translate: tokenTranslate
      });
    }
  }
  // IsFixedLenght
  IsFixedLenght(value, len, message, tokenTranslate) {
    if (value.length !== len) {
      errors.push({
        message: message,
        token_translate: tokenTranslate
      });
    }
  }
  // IsEmail
  isEmail(value, message, tokenTranslate) {
    const reg = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!reg.test(value)) {
      errors.push({
        message: message,
        token_translate: tokenTranslate
      });
    }
  }
  clear() {
    errors = [];
  }
  isValid() {
    return errors.length === 0;
  }
  errors() {
    return errors;
  }
}


module.exports = Validation;
