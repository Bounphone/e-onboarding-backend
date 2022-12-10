const express = require('express');
const router = express.Router();
const {listMyOrg, createNewOrg, joinOrg} = require('./../controllers/org')

/// Create new organize
router.post('/newOrganize', createNewOrg)

/// Get organize by user id
router.get('/listMyOrg/:userID', listMyOrg)

/// Update my orgs
router.post('/joinOrg/:orgID', joinOrg)

module.exports = router