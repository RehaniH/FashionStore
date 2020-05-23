const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../Config/keys");
// Load input validation
const validateRegisterInput = require("../Validation/register");
const validateLoginInput = require("../Validation/login");
// Load User model
const User = require("../Models/user.model");
const  nodemailer = require("nodemailer");

//Authenticate nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: keys.ADMIN_EMAIL,
        pass: keys.ADMIN_PASSWORD
    }
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role ? req.body.role : 'user'
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });

            //set mail options
            const mailOptions = {
                from: keys.ADMIN_EMAIL,
                to: req.body.email,
                subject:'Login Credentials [CONFIDENTIAL]',
                html: '<h1>Hey, ' + req.body.name + '</h1><p>Your login credentials are:</p><p>Email: ' + req.body.email + '</p>\n' +
                    '<p>Password: ' + req.body.password + '</p>'
            }

            //sending the mail
            transporter.sendMail(mailOptions, function (error,info) {
                if(error){
                    console.log(error);
                } else{
                    console.log("Email sent" + info.response);
                }

            });

            const payload = {
                name: newUser.name,
                id: user.id,
                role: newUser.role
            };
            // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 3600 // 1 hour in seconds
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
// Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    role: user.role
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 3600 // 1 hour in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

router.get('/allUsers', (req, res) => {
    User.find({'role': 'user'})
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ message: 'No users found' }));
});

router.get('/userCount', (req, res) => {
    User.find({'role': 'user'})
        .then(users => res.json(users.length))
        .catch(err => res.status(404).json({ message: 'No users found' }));
});

router.get('/allManagers', (req, res) => {
    User.find({'role': 'manager'})
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ message: 'No managers found' }));
});

router.get('/managerCount', (req, res) => {
    User.find({'role': 'manager'})
        .then(users => res.json(users.length))
        .catch(err => res.status(404).json({ message: 'No managers found' }));
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ message: 'No user found' }));
});

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json({ message: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, req.body)
        .then(user => res.json({ message: 'User deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such user' }));
});

module.exports = router;