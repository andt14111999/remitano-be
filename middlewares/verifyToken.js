const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    const token = request.header('Authorization')

    if (!token) return response.status(401).send("Access Denied")

    try {
        const cutToken = token.substring(7)
        const verified = jwt.verify(cutToken, process.env.TOKEN_SECRET)
        next();
    } catch (err) {
        console.error(err)
        return response.status(401).send("Access Denied");
    }
}