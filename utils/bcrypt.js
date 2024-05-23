const bcrypt = require("bcrypt")


async function hashPassword(password) {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
}


async function checkPassword(plainPassword, hashedPassword) {
    const isCorrect = await bcrypt.compare(plainPassword, hashedPassword);
    return isCorrect;
}



module.exports = { hashPassword, checkPassword }