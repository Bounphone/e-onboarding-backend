const { dataModel, userModel } = require('./../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const now = require("./../utils/time_now")

async function register(req, res) {
    try {
        // Get user input
        const { first_name, last_name, email, password, birthday } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name && birthday)) {
            res.status(400).json({ message: "Please input all fields" });
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await userModel.findOne({ email });

        if (oldUser) {
            res.status(400).json({ message: "Already user in database" });
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        const date = now()

        // Create user in our database
        const user = await userModel.create({
            first_name,
            last_name,
            birthday,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            dateCreated: date,
            myOrg : []
        });

        const expire_token = process.env.EXPIRE_TOKEN

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email, first_name, last_name, birthday },
            process.env.TOKEN_KEY,
            {
                expiresIn: expire_token,
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(200).json({ message: "Sign up success", firstName: first_name, lastName: last_name, email: email, dateCreated: date, accessToken: token });
    } catch (err) {
        res.status(500)
    }
}

async function login(req, res) {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
           return res.status(400).json({ message: "Please input all fields" });
        }
        // Validate if user exist in our database
        const user = await userModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const expire_token = process.env.EXPIRE_TOKEN
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email, first_name : user.first_name, last_name : user.last_name, birthday: user.birthday },
                process.env.TOKEN_KEY,
                {
                    expiresIn: expire_token,
                }
            );

            // save user token
            user.token = token;

            // user
            return  res.status(200).json({"message" : "success", accessToken : token});
        }
        return  res.status(400).json({ message: "Your information is incorrect" });

    } catch (err) {
        return res.status(500).send()
    }
    // Our register logic ends here
}

module.exports = { register, login }