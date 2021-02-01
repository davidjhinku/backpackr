const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Trip = require("../../models/Trip");
const ValidateTripInput = require("../../validation/trip");

// Get the trips for a specific user.
router.get("/user/:user_id", (req, res) => {
    
    if (req.user.id !== req.params.user_id) {
        return res.status(401).json({unauthorized: "You are not authorized"});
    }

    // Finds all of the trips that have :user_id in their "users" array.
    Trip.find({ users: { $all: [ req.params.user_id ] } })
        .sort({ dat: -1 })
        .then(trips => res.json(trips))
        .catch(err => 
            res.status(404).json({
                notripsfound: "This user doesn't have any trips"
            }));
});

// Get a specific trip.
router.get("/:id", (req, res) => {
    Trip.findById(req.params.id)
        .then(trip => {
            if (trip.users.includes(req.user.id)){
                return res.json(trip)
            } else {
                // This user isn't authorized to view this trip.
                return res.status(401).json({unauthorized: "You are not authorized"});
            }
        })
        .catch(err => 
            res.status(404).json({ notripfound: "This trip doesn't exist" })    
        );
});

// Create a new trip.
router.post("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = ValidateTripInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newTrip = new Trip({
            users: [ req.user ],
            destination: req.params.destination,
            tripName: req.params.tripName
        });

        newTrip.save().then(trip => res.json(trip));
    }
);

module.exports = router;