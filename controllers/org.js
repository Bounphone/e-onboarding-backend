const { listOrgModel } = require('./../models/org')
const now = require("./../utils/time_now")

// List my org by id
async function listMyOrg(req, res) {
    try {
        const orgID = req.params.id;
        const data = await listOrgModel.findById(orgID);
        res.status(200, )
    }
    catch (error) {
        res.status(500);
    }
}

// Create new org 
async function createNewOrg(req, res) {
    try {
        const { orgName, orgDescription, orgCreatorEmail, orgCreatorID } = req.body;
        if (!(orgName && orgDescription && orgCreatorEmail && orgCreatorID)) {
            res.status(400).json({ message: "Please input all fields" });
        }
        const oldOrg = await listOrgModel.findOne({ orgName });
        if (oldOrg) {
            res.status(400).json({ message: "Already organization in database" });
        }
        const date = now()
        // Create org in our database
        const org = await listOrgModel.create({
            orgName,
            orgCreatedTime: date,
            orgDescription,
            orgCreatorID,
            orgCreatorEmail
        });

        res.status(200).send({ message: "insert success", orgName: orgName, orgCreatedTime: date, orgDescription: orgDescription, orgCreatorID: orgCreatorID, orgCreatorEmail: orgCreatorEmail })
    }
    catch (error) {
        res.status(500).send();
    }
}

module.exports = { listMyOrg, createNewOrg }