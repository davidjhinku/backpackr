const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const User = require("../../models/User");


const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Current user
router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email
    });
});

// Post new user
router.post("/register", (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ handle: req.body.handle })
        .then(user => {

            if (user){
                // Throw error, this handle is already taken.
                errors.handle = "User already exists";
                return res.status(400).json(errors);
            } else {

                // Email not in use, create the user.
                const newUser = new User({
                    handle: req.body.handle,
                    email: req.body.email
                });

                // Generate the password digest.
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password , salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {

                                const payload = { id: user.id, handle: user.handle };

                                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}` // Add session token to response.
                                    });
                                });

                            }) // Return the user if the creation was successful.
                            .catch(err => console.log(err)) // Log the errors to the console if failed.
                    });
                });
            }

        });
});

// Post session
router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {

            if (!user){
                // Bad email, return error.
                errors.email = "This user does not exist";
                return res.status(404).json(errors);
            }

            // BCrypt hashes the incoming password, and then compares the hashed output with the one in the db.
            bcrypt.compare(req.body.password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    
                    // Correct credentials, log user in.
                    const payload = { id: user.id, email: user.email };
                    jwt.sign(
                        payload, keys.secretOrKey,
                        { expiresIn: 3600 }, // Key now expires in one hour.
                        (err, token) => {
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            });
                        }
                    );

                } else {
                    errors.password = "Incorrect password"
                    return res.status(400).json(errors);
                }
            });

        });
});

module.exports = router;