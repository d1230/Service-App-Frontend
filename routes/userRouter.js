const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateRequest } = require('../middleware/validateRequest');
const userSchemaKey = require('../utils/validation/userValidation');

router.route('/').get(auth, roleCheck(['admin', 'user']), userController.getUser);
router.route('/:id').get(auth, roleCheck(['admin']), userController.getUserById);
router.route('/create').post(validateRequest(userSchemaKey.schemaKeys), userController.createUser);

module.exports = router;