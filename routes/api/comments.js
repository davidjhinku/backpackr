const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Comment = require("../../models/Comment");
const ValidateCommentInput = require("../../validation/comment");

// Get all the comments for a specific trip.
router.get("/trips/:trip_id/comments",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        if (req.user.id !== req.params.user_id) {
            return res.status(401).json({ unauthorized: "You are not authorized" });
        }

        // Finds all of the comments that have :trip_id in their "users" array.
        Comment.find({ trips: { $all: [req.params.trip_id] } })
            .sort({ dat: -1 })
            .then(comments => res.json(comment))
            .catch(err => {
                return res.status(404).json({
                    nocommentsfound: "This trip doesn't have any comments"
                });
            });
    });

router.post("/trips/:trip_id/comments",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = ValidateCommentInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newComment = new Comment({
            author: [req.user],
            comment: req.body.destination,
            date: req.body.date
        });

        newComment.save().then(comment => res.json(comment));
    }
);

// Update existing comment.
router.put("/trips/:trip_id/comments/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = ValidateCommentInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newCommentData = {
            author: [req.user],
            comment: req.body.destination,
            date: req.body.date
        };

        Comment.findByIdAndUpdate(req.params.id, newCommentData, { new: true, upsert: true })
            .then(comment => res.json(comment));
    }
);

// delete a specific comment.
router.delete("/trips/:trip_id/comments/:id",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Comment.findById(req.params.id)
            .then(trip => {
                if (trip.comments.includes(req.comment.id)) {
                    trip.comments[req.comment.id].remove(() => res.json("DELETED"));
                } else {
                    // This user isn't authorized to view this trip.
                    return res.status(401).json({ unauthorized: "You are not authorized" });
                }
            })
            .catch(err => {
                return res.status(404).json({ nocommentfound: "This comment doesn't exist" })
            });
    });

module.exports = router;