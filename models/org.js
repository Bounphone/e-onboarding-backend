const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
    orgName: { type: String },
    orgCreatedTime: { type: String },
    orgDescription: { type: String, default: null },
    orgCreatorID: { type: String },
    orgCreatorEmail: { type: String },
    orgCreatorFirstName: { type: String },
    orgCreatorLastName: { type: String },
    orgMembers: { type: Array },
});

const listOrgModel = mongoose.model('listOrgazination', orgSchema)

module.exports = { listOrgModel }