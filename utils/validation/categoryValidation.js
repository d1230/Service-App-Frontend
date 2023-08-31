const joi = require('joi');
const { options, isCountOnly, include, select } = require('./commonFilterValidation');

exports.createSchemaKeys = joi.object({
  category: joi.string().required(),
}).unknown(true);

let keys = ['query', 'where'];
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      category: joi.alternatives().try(joi.array().items(), joi.number().integer(), joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
      id: joi.any(),
      createdBy: joi.any(),
      createdAt: joi.any(),
      updatedAt: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select

}).unknown(true);