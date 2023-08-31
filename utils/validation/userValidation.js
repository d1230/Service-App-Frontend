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
 
exports.schemaKeys = joi.object({
  password: joi.string().required(),
  email: joi.string().email().required(),
  fname: joi.string().required(),
  lname: joi.string().required(),
  phone: joi.string().min(10).max(14)
}).unknown(true);

// exports.updateSchemaKeys = joi.object({
//   name: joi.string().when({
//     is:joi.exist(),
//     otherwise:joi.optional()
//   }),
//   isActive: joi.boolean(),
//   licenseId: joi.number().integer().allow(0),
//   image: joi.string().allow(null).allow(''),
//   gender: joi.string().allow(null).allow(''),
//   mobile: joi.string().allow(null).allow(''),
//   isDeleted: joi.boolean(),
//   mobileNo: joi.string().allow(null).allow(''),
//   id: joi.number().integer()
// }).unknown(true);



// let keys = ['query', 'where'];

// exports.findFilterKeys = joi.object({
//   options: options,
//   ...Object.fromEntries(
//     keys.map(key => [key, joi.object({
//       // password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
//       email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
//       name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
//       isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
//       licenseId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
//       image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
//       gender: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
//       mobile: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
//       isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
//       mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
//       username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
//       id: joi.any(),
//       createdAt: joi.any(),
//       updatedAt: joi.any()
//     }).unknown(true),])
//   ),
//   isCountOnly: isCountOnly,
//   include: joi.array().items(include),
//   select: select
    
// }).unknown(true);
