const jwt = require('jsonwebtoken');


let secretKey = process.env.SECRET_KEY
function generateToken(payload) {
    const token = jwt.sign(payload, secretKey);
    return token;
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (err) {
        return null;
    }
}

module.exports = { generateToken, verifyToken }