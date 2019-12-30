'use strict';

const nodemailer = require('nodemailer');
const hbs = require('handlebars');
const config = require('../config');
const fs = require('fs');

class Util {
  // constructor() {}
  encrytpt(data) {
    let aux = Buffer.from(data).toString('base64');
    aux = aux.replace(/A/g, '_');
    aux = aux.replace(/a/g, '_');
    aux = aux.replace(/=/g, 'hyper_');
    aux = aux.split('').reverse().join('');
    return aux;
  }

  decrypt(data) {
    let aux = aux.split('').reverse().join('');
    aux.replace(/hyper_/, '=');
    aux.replace(/-/g, 'a');
    aux.replace(/_/, 'A');
    aux = Buffer.from(aux, 'base64').toString('ascii');
    return aux;
  }
}

module.exports = Util;
