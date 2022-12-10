const { listOrgModel } = require('./../models/org')
const now = require("./../utils/time_now")

// List my org by id
async function listMyOrg(req, res) {
    try {
        const orgID = req.params.userID;
        const data = await listOrgModel.find({ userID: orgID });
        if (data.length == 0) {
            return res.status(400).send({ message: "You're not in any organize" })

        }
        return res.status(200).send(data)
    }
    catch (error) {
        return res.status(500).send();
    }
}

// Create new org 
async function createNewOrg(req, res) {
    try {
        const { orgName, orgDescription, orgCreatorEmail, orgCreatorID, orgCreatorFirstName, orgCreatorLastName } = req.body;
        if (!(orgName && orgDescription && orgCreatorEmail && orgCreatorID&& orgCreatorFirstName&& orgCreatorLastName)) {
            return res.status(400).json({ message: "Please input all fields" });
        }
        const oldOrg = await listOrgModel.findOne({ orgName });
        if (oldOrg) {
            return res.status(400).json({ message: "Already organization in database" });
        }
        const date = now()
        // Create org in our database
        const org = await listOrgModel.create({
            orgName,
            orgCreatedTime: date,
            orgDescription,
            orgCreatorID,
            orgCreatorEmail,
            orgCreatorFirstName,
            orgCreatorLastName,
            orgMembers : [
                {
                    orgMemberID : orgCreatorID,
                    orgMemberEmail : orgCreatorEmail,
                    orgMemberFirstName : orgCreatorFirstName,
                    orgMemberLastName : orgCreatorLastName
                }
            ]
        });

        return res.status(200).send({ message: "insert success", orgName: orgName, orgCreatedTime: date, orgDescription: orgDescription, orgCreatorID: orgCreatorID, orgCreatorEmail: orgCreatorEmail })
    }
    catch (error) {
        return res.status(500).send();
    }
}

module.exports = { listMyOrg, createNewOrg }