'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.authenticate = async (data) => {
  const res = await User.findOne({
    email: data.email,
    password: data.password,
  });
  return res;
};

exports.create = async (data) => {
  const user = new User(data);
  const res = await user.save();
  return res;
};

exports.getById = async (id) => {
  const res = await User.findById(id);
  return res;
};

exports.getByEmail = async (email) => {
  const res = await User.findOne({
    email: email,
    status: 'active'
  }, 'name email photo');
  return res;
};
