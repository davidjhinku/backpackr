const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Models
const Trip = require("../../models/Trip");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const ItineraryItem = require("../../models/ItineraryItem");

const ValidateTripInput = require("../../validation/trip");
const ValidateCommentInput = require("../../validation/comment");
const validateItineraryItemInput = require("../../validation/itineraryItem");
const validText = require("../../validation/valid-text");
const itineraryItem = require("../../validation/itineraryItem");


// Get the trips for a specific user.
router.get("/user/:user_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        if (req.user.id !== req.params.user_id) {
            return res.status(401).json({ unauthorized: "You are not authorized" });
        }

        // Finds all of the trips that have :user_id in their "users" array.
        Trip.find({ users: { $all: [req.params.user_id] } })
            .sort({ dat: -1 })
            .then(trips => res.json(trips))
            .catch(err => {
                return res.status(404).json({
                    notripsfound: "This user doesn't have any trips"
                });
            });
    });

// Get a specific trip.
router.get("/:id",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Trip.findById(req.params.id)
            .populate({
                path: "users",
                model: "User",
                select: ["username", "_id"]
            })
            .populate({
                path: "comments",
                model: "Comment",
                select: ["author", "comment", "date"]
            })
            .populate({
                path: "itineraryItems",
                model: "ItineraryItem"
            })
            .then(trip => {

                // Check if the current user is part of the trip.
                if (trip.users.some(user => (req.user.id === user.id))) {
                    return res.json({ [trip.id]: trip })
                } else {
                    // This user isn't authorized to view this trip.
                    return res.status(401).json({ unauthorized: "You are not authorized" });
                }
            })
            .catch(err => {
                return res.status(404).json({ notripfound: "This trip doesn't exist" })
            });
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
            users: [req.user],
            destination: req.body.destination,
            tripName: req.body.tripName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });

        newTrip.save().then(trip => res.json(trip))
            .catch(err => {
                return res.status(404).json({ notripfound: "There was a problem creating the route." })
            });;
    }
);

// Update existing trip.
router.patch("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = ValidateTripInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newTripData = {
            destination: req.body.destination,
            tripName: req.body.tripName,
            comments: req.body.comments,
            itineraryItems: req.body.itineraryItems
        };

        Trip.findByIdAndUpdate(req.params.id, newTripData, { new: true, upsert: true })
            .then(trip => res.json({ [trip.id]: trip }))
            .catch(err => {
                return res.status(404).json({ notripfound: "There was a problem updating the route." })
            });
    }
);

// Delete a specific trip.
router.delete("/:id",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Trip.findById(req.params.id)
            .then(trip => {
                if (trip.users.includes(req.user.id)) {
                    trip.remove(() => res.json(trip));
                } else {
                    // This user isn't authorized to view this trip.
                    return res.status(401).json({ unauthorized: "You are not authorized" });
                }
            })
            .catch(err => {
                return res.status(404).json({ notripfound: "This trip doesn't exist" })
            });
    });

// Add a comment to a trip.
router.post("/:trip_id/comment",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Trip.findById(req.params.trip_id).then(trip => {
            // Check that the current user is part of this trip.
            if (trip.users.includes(req.user.id)) {
                const { errors, isValid } = ValidateCommentInput(req.body);

                if (!isValid) {
                    return res.status(400).json(errors);
                }

                const newComment = new Comment({
                    author: { _id: req.user.id, username: req.user.username },
                    trip: trip.id,
                    comment: req.body.comment
                });

                newComment.save().then(comment => {
                    trip.comments.push(comment.id);
                    trip.save().then(() => res.json(comment));
                });
            } else {
                return res.status(401).json("Not the owner");
            }
        });
    });

// Delete a comment, and remove it from a trip.
router.delete("/comments/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Comment.findById(req.params.id).populate("author._id").then(comment => {
            // Check that the current user is the owner of this comment.
            if (comment.author._id.id === req.user.id) {

                Trip.findById(comment.trip).then(trip => {
                    trip.comments.pull({ _id: comment.id })
                    trip.save().then(() => {
                        comment.remove().then(() => res.json(comment));
                    });
                });

            } else {
                return res.status(401).json("Not the owner");
            }
        });
    });

// Add a itineraryItem to a trip.
router.post("/:trip_id/itineraryItem",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Trip.findById(req.params.trip_id).then(trip => {
            // Check that the current user is part of this trip.
            if (trip.users.includes(req.user.id)) {
                const { errors, isValid } = validateItineraryItemInput(req.body);

                if (!isValid) {
                    return res.status(400).json(errors);
                }

                const newitineraryItem = new ItineraryItem({
                    trip: trip.id,
                    itemName: req.body.itemName,
                    category: req.body.category,
                    address: req.body.address,
                    description: req.body.description,
                });

                newitineraryItem.save().then(ItineraryItem => {
                    trip.itineraryItems.push(ItineraryItem.id);
                    trip.save().then(() => res.json(ItineraryItem));
                });
            } else {
                return res.status(401).json("Not the owner");
            }
        });
    });

// Delete a itineraryItem, and remove it from a trip.
router.delete("/itineraryItems/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        ItineraryItem.findById(req.params.id)
        .populate({ // Populate the trip to remove the itinerary item from it before deleteing it.
            path: "trip",
            model: "Trip",
            select: ["itineraryItems", "users"]
        })
        .then(itineraryItem => {
            // Check that the current user is part of the trip that is parent if this itinerary item.
            if (itineraryItem.trip.users.includes(req.user.id)) {

                const trip = itineraryItem.trip;
                trip.itineraryItems.pull({ _id: itineraryItem.id })
                trip.save().then(() => {
                    itineraryItem.remove().then(() => res.json(itineraryItem));
                });

            } else {
                return res.status(401).json("Not the owner");
            }
        });
    });

// Add a user to a trip.
router.post("/:trip_id/user",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Trip.findById(req.params.trip_id)
            .then(trip => {
                debugger
                if (trip.users.includes(req.user.id)) {

                    if (!validText(req.body.email)) {
                        const errors = {};
                        errors.email = "Enter a user's email to invite them";
                        return res.status(400).json(errors);
                    }

                    User.findOne({ email: req.body.email }).then(user => {

                        // Add the user only if they aren't already part of the trip.
                        if (!trip.users.includes(user.id))
                            trip.users.push(user.id);

                        trip.save().then(() => {
                            return res.json("Success")
                        });

                    });

                } else {
                    debugger
                    return res.status(401).json("User doesn't exist");
                }
            });
    });

// Remove a user from a trip.
router.delete("/:trip_id/user/:user_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Trip.findById(req.params.trip_id)
        .then(trip => {
            // Check that the current user is the one being removed,
            // and that they are in this trip.

            if (trip.users.includes(req.user.id)
            && req.user.id === req.params.user_id) {

                trip.users.pull({ _id: req.params.user_id })
                trip.save().then(newTrip => res.json(newTrip));

                // TODO: What if the trip is left empty? Without any users.

            } else {
                return res.status(401).json("You can only remove yourself!");
                // return res.status(401).json({errors: "You can only remove yourself!"});
            }
        });
    });

module.exports = router;