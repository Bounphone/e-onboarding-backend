const express = require('express');
const router = express.Router();
const {listMyOrg, createNewOrg} = require('./../controllers/org')

/// Create new organize
router.post('/newOrganize', createNewOrg)

/// Get organize by user id
router.get('/listMyOrg/:userID', listMyOrg)

module.exports = router