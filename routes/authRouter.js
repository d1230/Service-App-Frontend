const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController");
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateRequest } = require('../middleware/validateRequest');
const authSchemaKey = require('../utils/validation/authValidation');

router.route('/login').post(validateRequest(authSchemaKey.loginSchemaKeys), authController.userLogin);
router.route('/register').post(validateRequest(authSchemaKey.registerSchemaKeys), authController.userRegister);
router.route('/logout').get(authController.userLogout);

module.exports = router;