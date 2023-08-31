const validation = require('../utils/validateRequest');

exports.validateRequest = (schemaKey) => (req, res, next) => {
  let validateRequest = validation.validateParamsWithJoi(
    req.body,
    schemaKey
  );
  if (!validateRequest.isValid) {
    return res.inValidParam({
      message: `Invalid values in parameters, ${validateRequest.message}`,
    });
  }
  next();
}

exports.validateFilterRequest = (schemaKey, model) => (req, res, next) => {
  let validateFilterRequest = validation.validateFilterWithJoi(
    req.body,
    schemaKey,
    model.tableAttributes
  );
  if (!validateFilterRequest.isValid) {
    return res.inValidParam({ message: `${validateFilterRequest.message}` });
  }
  next();
}