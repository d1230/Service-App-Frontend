/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mysql model
 *
 */

const joi = require('joi');
// const {
//   options, isCountOnly, include, select 
// } = require('./commonFilterValidation');

// const { USER_ROLE } = require('../../constants/authConstant');
// const { convertObjectToEnum } = require('../common');  
 
exports.loginSchemaKeys = joi.object({
  password: joi.string().required(),
  email: joi.string().email().required(),
}).unknown(true);

exports.registerSchemaKeys = joi.object({
  password: joi.string().required(),
  email: joi.string().email().required(),
  fname: joi.string().required(),
  lname: joi.string().required(),
  phone: joi.string().min(10).max(14)
}).unknown(true);
