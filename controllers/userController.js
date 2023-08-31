const User = require('../models/userModel');
const dbService = require('../utils/data-service');

const getUser = async (req, res) => {
  try {
    let data = await dbService.findAllRecords(User);
    if (!data) {
      return res.recordNotFound();
    }
    return res.ok({ data });
  }
  catch (error) {
    return res.failureResponse();
  }

}

const getUserById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.inValidParam({
        message: `Invalid values in parameters, No id has been mentioned`,
      });
    }

    let data = await dbService.findByPk(User, req.params.id);
    if (!data) {
      return res.recordNotFound();
    }
    return res.ok({ data });

  }
  catch (error) {
    return res.failureResponse();
  }
}

const createUser = async (req, res) => {
  try {
    const existingUser = await dbService.findOne(User, { email: req.body.email })
    if (existingUser) {
      return res.isDuplicate({
        message: "Email already registered"
      })
    }
    delete req.body["addedBy"];
    delete req.body["createdBy"];
    delete req.body["updatedBy"];
    delete req.body["role"];
    const data = {
      ...req.body,
      role: "admin"
    };
    let result = await dbService.createOne(User, data);
    return res.ok({ data: result });
  } catch (error) {
    return res.failureResponse();
  }
}

module.exports = {
  getUser,
  getUserById,
  createUser
}