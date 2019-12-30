'use strict';

const ValidationContract = require('../validators/fluent-validator');
const Util = require('../utils/util');
const userRepository = require('../repositories/user-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.works = async (req, res, next) => {
  try {
    res.status(200).send('user works!');
  } catch (error) {
    res.status(500).send({
      error: {
        message: error.message,
        token_translate: 'API.COMMON.ERROR_REQUEST'
      }
    });
  }
};

exports.create = async (req, res, next) => {
  try {
    req.body.password = md5(req.body.password + global.SALT_KEY);
    const newUser = await userRepository.create(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({
      error: {
        message: error.message,
        token_translate: 'API.COMMON.ERROR_REQUEST'
      }
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const user = await userRepository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

    if (!user) {
      res.status(404).send({
        warn: {
          message: 'Usuário ou senha inválidos',
          token_translate: 'API.LOGIN_INVALID'
        }
      });
      return;
    }

    const token = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      rule: user.rule
    });

    res.status(200).send({

      jwt: token,
      email: user.email,
      name: user.name,
      photo: user.photo,
      phone: user.phone,
      id: user._id,
      rule: user.rule,
      company: user.company
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getByEmail = async (req, res, next) => {
  try {
    const data = await userRepository.getByEmail(req.params.email);
    res.status(200).send({
      user: data
    });
  } catch (error) {
    res.status(500).send({
      error: {
        message: error.message,
        token_translate: 'API.COMMON.ERROR_REQUEST'
      }
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await userRepository.getById(req.params.id);
    res.status(200).send({
      user: data
    });
  } catch (error) {
    res.status(500).send({
      error: {
        message: error.message,
        token_translate: 'API.COMMON.ERROR_REQUEST'
      }
    });
  }
};