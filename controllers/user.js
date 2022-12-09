// ສ້າງຜູ້ໃຊ້ໃໝ່
function createUser(req, res, next) {
    try {
        const { firstName, lastName, email, birthday, } = req.body;
        if (!(firstName && lastName && email && birthday)) {
            const resData = {error : true, message : "All fields are required"}
            res.status(400).send(resData)
        }
    }
    catch (e) { }
}

module.exports = createUser