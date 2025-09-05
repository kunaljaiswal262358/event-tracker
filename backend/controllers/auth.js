const {hashPassword, comparePassword} = require('../utils/bcrypt');
const {generateToken, verifyToken} = require('../config/jwt')
const User = require('../models/user')

const login = async (req, res, next) => {
    try {
        //validate object with email and pwd
        let {email, password} = req.body;
        if(!email) return res.status(400).send("Email is required.");
        if(!password) return res.status(400).send("Password is required.");
        //fetch user object
        let user = await User.findOne({email: email});
        //verify email
        if(!user) return res.status(400).send("Invalid Email");
        //verify pwd using comparePassword
        let isMatched = await comparePassword(password, user.password);
        if(!isMatched) return res.status(400).send("Password mismatch");
        //generate token on user object excluding pwd
        user = user.toObject();
        delete user.password;
        const token = generateToken(user)
        //send token
        res.status(200).send(token)
    } catch(err) {
        next(err);
    }
}

const signup = async (req, res, next) => {
    try {
        let {name, email, password} = req.body;
        // validation on object
        if(!name) return res.status(400).send("Name is required.");
        if(!email) return res.status(400).send("Email is required.");
        if(!password) return res.status(400).send("Password is required.");

        // hash password
        password = await hashPassword(password);
        // save user object in db
        let user = new User({name, email, password});
        await user.save()
        // exclude password
        user = user.toObject();
        delete user.password;
        // generate a token
        const token = generateToken(user);
        // send a token with status code of 201
        res.status(201).send(token)
    } catch(err) {
        next(err);
    }
}

module.exports = {login, signup};