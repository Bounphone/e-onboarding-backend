const { listOrgModel } = require('./../models/org')
const now = require("./../utils/time_now")
const { dataModel, userModel } = require('./../models/user')

// List my org by id
async function listMyOrg(req, res) {
    try {
        const userID = req.params.userID;
        const data = await listOrgModel.find({ userID: userID });
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
        if (!(orgName && orgDescription && orgCreatorEmail && orgCreatorID && orgCreatorFirstName && orgCreatorLastName)) {
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
            orgMembers: [
                {
                    orgMemberID: orgCreatorID,
                    orgMemberEmail: orgCreatorEmail,
                    orgMemberFirstName: orgCreatorFirstName,
                    orgMemberLastName: orgCreatorLastName
                }
            ]
        });

        return res.status(200).send({ message: "insert success", orgName: orgName, orgCreatedTime: date, orgDescription: orgDescription, orgCreatorID: orgCreatorID, orgCreatorEmail: orgCreatorEmail })
    }
    catch (error) {
        return res.status(500).send();
    }
}

// join organization
async function joinOrg(req, res) {
    try {
        const orgID = req.params.orgID;
        const { userID, userEmail, userFirstName, userLastName } = req.body;
        if (!(userID && userEmail && userFirstName && userLastName && orgID)) {
            return res.status(400).json({ message: "Please input all fields" });
        }

        /// Is there that org in database ?
        const anyOrg = await listOrgModel.findOne({ orgID });
        if (!anyOrg) {
            return res.status(400).send({ "message": "There is no org in database" })
        }
        await userModel.findByIdAndUpdate(
            userID, { $push: { myOrg: orgID } }, {}
        );
      
        const orgData = await listOrgModel.findOne({ userID: orgID });
        return res.status(200).json({message : "success", orgName : orgData.orgName});
    }
    catch (error) {
        return res.status(500).send();
    }
}

module.exports = { listMyOrg, createNewOrg, joinOrg }