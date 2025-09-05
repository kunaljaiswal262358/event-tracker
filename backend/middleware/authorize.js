const {verifyToken} = require('../config/jwt')

const verify = (req, res, next) => {
    // const token = req.cookies['auth-token'];
    // console.log(req.cookies)
    // if(!token) return res.status(401).send("Unauthorized(Token is not provided).")
    
    // try {
    //     const decoded = verifyToken(token);
    // } catch(err) {
    //     return res.status(400).send("Unauthorized(Invalid token).")
    // }

    next();
}

module.exports = verify;