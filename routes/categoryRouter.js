const express = require('express');
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateRequest, validateFilterRequest } = require('../middleware/validateRequest');
const categorySchemaKey = require('../utils/validation/categoryValidation');
const { Category } = require('../models');

router.route('/create').post(auth, roleCheck(['admin']), validateRequest(categorySchemaKey.createSchemaKeys), categoryController.createCategory);
router.route('/list').post(validateFilterRequest(categorySchemaKey.findFilterKeys, Category), categoryController.getCategoryList);

router.route('/').get(categoryController.getCategory);
router.route('/:id').get(categoryController.getCategoryById);

module.exports = router;