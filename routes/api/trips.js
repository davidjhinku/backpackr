const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Models
const Trip = require("../../models/Trip");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const ItineraryItem = require("../../models/ItineraryItem");
const FlightItineraryItem = require("../../models/FlightItineraryItem");
const LodgingItineraryItem = require("../../models/LodgingItineraryItem");
const FoodItineraryItem = require("../../models/FoodItineraryItem");

const ValidateTripInput = require("../../validation/trip");
const ValidateCommentInput = require("../../validation/comment");
const validateItineraryItemInput = require("../../validation/itineraryItem");
const validText = require("../../validation/valid-text");


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
                path: "flightItineraryItems",
                model: "FlightItineraryItem"
            })
            .populate({
                path: "lodgingItineraryItems",
                model: "LodgingItineraryItem"
            })
            .populate({
                path: "foodItineraryItems",
                model: "FoodItineraryItem"
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
            itineraryItems: req.body.itineraryItems,
            flightItineraryItems: req.body.flightItineraryItems,
            lodgingItineraryItems: req.body.lodgingItineraryItems,
            foodItineraryItems: req.body.foodItineraryItems
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

//add a flight itinerary item
router.post("/:trip_id/flightItineraryItem",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Trip.findById(req.params.trip_id).then(trip => {
            // Check that the current user is part of this trip.
            if (trip.users.includes(req.user.id)) {
                const { errors, isValid } = validateItineraryItemInput(req.body);

                if (!isValid) {
                    return res.status(400).json(errors);
                }

                const newflightItineraryItem = new FlightItineraryItem({
                    trip: trip.id,
                    itemName: req.body.itemName,
                    category: req.body.category,
                    address: req.body.address,
                    description: req.body.description,
                });

                newflightItineraryItem.save().then(FlightItineraryItem => {
                    trip.flightItineraryItems.push(FlightItineraryItem.id);
                    trip.save().then(() => res.json(FlightItineraryItem));
                });
            } else {
                return res.status(401).json("Not the owner");
            }
        });
    });

// Delete a flight itineraryItem, and remove it from a trip.
router.delete("/flightItineraryItems/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        FlightItineraryItem.findById(req.params.id)
            .populate({ // Populate the trip to remove the itinerary item from it before deleteing it.
                path: "trip",
                model: "Trip",
                select: ["flightItineraryItems", "users"]
            })
            .then(flightItineraryItem => {
                // debugger
                // Check that the current user is part of the trip that is parent if this itinerary item.
                if (flightItineraryItem.trip.users.includes(req.user.id)) {

                    const trip = flightItineraryItem.trip;
                    trip.flightItineraryItems.pull({ _id: flightItineraryItem.id })
                    trip.save().then(() => {
                        // debugger
                        flightItineraryItem.remove().then(() => res.json(flightItineraryItem));
                    });

                } else {
                    // debugger
                    return res.status(401).json("Not the owner");
                }
            });
    });

//add a lodging itinerary item
router.post("/:trip_id/lodgingItineraryItem",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Trip.findById(req.params.trip_id).then(trip => {
            // Check that the current user is part of this trip.
            if (trip.users.includes(req.user.id)) {
                const { errors, isValid } = validateItineraryItemInput(req.body);

                if (!isValid) {
                    return res.status(400).json(errors);
                }

                const newlodgingItineraryItem = new LodgingItineraryItem({
                    trip: trip.id,
                    itemName: req.body.itemName,
                    category: req.body.category,
                    address: req.body.address,
                    description: req.body.description,
                });

                newlodgingItineraryItem.save().then(LodgingItineraryItem => {
                    trip.lodgingItineraryItems.push(LodgingItineraryItem.id);
                    trip.save().then(() => res.json(LodgingItineraryItem));
                });
            } else {
                return res.status(401).json("Not the owner");
            }
        });
    });

// Delete a lodging itineraryItem, and remove it from a trip.
router.delete("/lodgingItineraryItems/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        LodgingItineraryItem.findById(req.params.id)
            .populate({ // Populate the trip to remove the itinerary item from it before deleteing it.
                path: "trip",
                model: "Trip",
                select: ["lodgingItineraryItems", "users"]
            })
            .then(lodgingItineraryItem => {
                // Check that the current user is part of the trip that is parent if this itinerary item.
                if (lodgingItineraryItem.trip.users.includes(req.user.id)) {

                    const trip = lodgingItineraryItem.trip;
                    trip.lodgingItineraryItems.pull({ _id: lodgingItineraryItem.id })
                    trip.save().then(() => {
                        lodgingItineraryItem.remove().then(() => res.json(lodgingItineraryItem));
                    });

                } else {
                    return res.status(401).json("Not the owner");
                }
            });
    });

//add a food itinerary item
router.post("/:trip_id/foodItineraryItem",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Trip.findById(req.params.trip_id).then(trip => {
            // Check that the current user is part of this trip.
            if (trip.users.includes(req.user.id)) {
                const { errors, isValid } = validateItineraryItemInput(req.body);

                if (!isValid) {
                    return res.status(400).json(errors);
                }

                const newfoodItineraryItem = new FoodItineraryItem({
                    trip: trip.id,
                    itemName: req.body.itemName,
                    category: req.body.category,
                    address: req.body.address,
                    description: req.body.description,
                });

                newfoodItineraryItem.save().then(FoodItineraryItem => {
                    trip.foodItineraryItems.push(FoodItineraryItem.id);
                    trip.save().then(() => res.json(FoodItineraryItem));
                });
            } else {
                return res.status(401).json("Not the owner");
            }
        });
    });

// Delete a food itineraryItem, and remove it from a trip.
router.delete("/foodItineraryItems/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        FoodItineraryItem.findById(req.params.id)
            .populate({ // Populate the trip to remove the itinerary item from it before deleteing it.
                path: "trip",
                model: "Trip",
                select: ["foodItineraryItems", "users"]
            })
            .then(foodItineraryItem => {
                // Check that the current user is part of the trip that is parent if this itinerary item.
                if (foodItineraryItem.trip.users.includes(req.user.id)) {

                    const trip = foodItineraryItem.trip;
                    trip.foodItineraryItems.pull({ _id: foodItineraryItem.id })
                    trip.save().then(() => {
                        foodItineraryItem.remove().then(() => res.json(foodItineraryItem));
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
            .populate({
                path: "users",
                model: "User",
                select: ["username", "_id"]
            })
            .then(trip => {
                // let currentTripUsers = trip.users

                if (trip.users.some(user => (req.user.id === user.id))) {

                    if (!validText(req.body.email)) {
                        const errors = {};
                        errors.email = "Enter a user's email to invite them";
                        return res.status(400).json(errors);
                    }

                    User.findOne({ email: req.body.email }).then(user => {   
                        if (!user) {
                            return res.status(401).json("User doesn't exist") 
                        }

                        // Add the user only if they aren't already part of the trip.
                        if (!trip.users.includes(user.id))
                            trip.users.push({ _id: user.id, username: user.username });
                            trip.save().then(() => {
                            return res.json(trip.users)
                        });
                    });
                } else {
                    return res.status(401).json("You don't have permission to invite");
                }
            });
    });

// Remove a user from a trip.
router.delete("/:trip_id/user/:user_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Trip.findById(req.params.trip_id)
        .populate({
            path: "users",
            model: "User",
            select: ["username", "_id"]
        })
        .then(trip => {
            // Check that the current user is the one being removed,
            // and that they are in this trip.

            // if (trip.users.includes(req.user.id)
            // && req.user.id === req.params.user_id) {

            //     trip.users.pull({ _id: req.params.user_id })
            //     trip.save().then(newTrip => res.json(newTrip));

            //     // TODO: What if the trip is left empty? Without any users.

            // } else {
            //     return res.status(401).json("You can only remove yourself!");
            //     // return res.status(401).json({errors: "You can only remove yourself!"});
            // }

            if (trip.users.some(user => (req.user.id === user.id))) {
                trip.users.pull({ _id: req.params.user_id })
                trip.save().then(newTrip => res.json(newTrip.users));
            }
        });
    });

module.exports = router;