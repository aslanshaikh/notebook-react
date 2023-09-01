const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { query, body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Aslanisagoodcoder";

//create a new user
//route 1 
router.post('/createuser', [
    body('name', 'enter valid name ').isLength({ min: 3 }),
    body('email', 'enter valid email').isEmail(),
    body('password', 'enter long password plz ').isLength({ min: 5 }),
],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success,  errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: "sorry a user with same email exists" });
            }

            //    console.log(req.body);
            //    const user = User(req.body);
            //    user.save();
            const salt = bcrypt.genSaltSync(10);
            secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);

            // res.json(user)
            success = true;
            res.json({success, authToken });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("some error occured");
        }
    })


//authenticate a user route 2
router.post('/login', [
    body('email', 'enter valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                success = false;
                return res.status(400).json({success, error: "plz try to login with correct credentials"});
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                success = false;
                return res.status(400).json({success, error: "plz try to login with correct credentials"});
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken });

        } catch (error) {
            console.log(error.message);
            res.status(500).send("internal server error");
        }

    })


    //route 3: get logged in user details , login required 
    router.post('/getuser', fetchuser,
    async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }})
module.exports = router