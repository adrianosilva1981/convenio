'use strict';

const express = require('express');

const router = express.Router();
const controller = require('../controllers/user-controller');
const authService = require('../services/auth-service');

router.get('/works', controller.works);
router.post('/create', controller.create);
router.post('/authenticate', controller.authenticate);
router.get('/verify/:email', authService.authorize, controller.getByEmail);
router.get('/getById/:id', controller.getById);
router.post('/', controller.create);

module.exports = router;
