const Category = require('../models/categoryModel');
const dbService = require('../utils/data-service');

const createCategory = async (req, res) => {
  try {
    delete req.body["createdBy"];
    delete req.body["updatedBy"];
    const data = {
      ...req.body,
      createdBy: req.user.id
    };
    let result = await dbService.createOne(Category, data);
    return res.ok({ data: result });
  } catch (error) {
    return res.failureResponse();
  }
}

const getCategoryList = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body.query !== undefined) {
      query = {
        ...req.body.query
      };
    }
    query = dbService.queryBuilderParser(query);
    if (req.body && req.body.isCountOnly) {
      result = await dbService.count(Category, query);
      if (result) {
        result = { totalRecords: result };
        return res.ok({ data: result });
      }
      return res.recordNotFound();
    } else {
      if (req.body.options !== undefined) {
        options = {
          ...req.body.options
        };
      }
      if (options && options.select && options.select.length) {
        options.attributes = options.select;
      }
      if(options.sort){
        options.order = dbService.sortParser(options.sort);
        delete options.sort;
      }
      result = await dbService.findMany(Category, query, options);
      if (!result) {
        return res.recordNotFound();
      }
      return res.ok({ data: result });
    }
  } catch (error) {
    return res.failureResponse();
  }
}

const getCategory = async (req, res) => {
  try {
    let options = {
      page: +req.query.page,
      paginate: +req.query.paginate
    };
    let data = await dbService.findMany(Category, {}, options);
    if (!data) {
      return res.recordNotFound();
    }
    return res.ok({ data });
  }
  catch (error) {
    return res.failureResponse();
  }
}

const getCategoryById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.inValidParam({
        message: `Invalid values in parameters, No id has been mentioned`,
      });
    }

    let data = await dbService.findByPk(Category, req.params.id);
    if (!data) {
      return res.recordNotFound();
    }
    return res.ok({ data });

  }
  catch (error) {
    return res.failureResponse();
  }
}

module.exports = {
  createCategory,
  getCategoryList,
  getCategory,
  getCategoryById
}