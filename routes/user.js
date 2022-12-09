const express = require("express");
const userController = require('./../controllers/user.js')

var router = express.Router();

router.get('/', userController)

module.exports = router