const bcrypt = require('bcryptjs')

const hashPassword = async (pwd) => {
    return await bcrypt.hash(pwd, 10);
}

const comparePassword = async (pwd, hashedPwd) => {
    return await bcrypt.compare(pwd, hashedPwd);
}

module.exports = {hashPassword, comparePassword}