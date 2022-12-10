const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
})

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    birthday: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
    dateCreated: { type: String },

});

const dataModel = mongoose.model('Data', dataSchema)
const userModel = mongoose.model('User', userSchema)

module.exports = { dataModel: dataModel, userModel: userModel }
