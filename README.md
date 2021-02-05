
<p align="center"> 
  <a href="https://backpackr-aa.herokuapp.com/"><img src="https://i.ibb.co/TBGtZ6b/readme-header.png"></a>
</p>

-------------
# Overview

[Backpackr](https://backpackr-aa.herokuapp.com/) is an application designed to help travelers plan their voyages with more ease and organization. It was birthed when four curious software engineers prodded over the age-old problem of hassling over messy Google docs to plan itineraries for group trips. The original inspiration was to create an application that combines an interactive messenger alongside a running itinerary list that could store the key information from the group trip chat. Backpackr utilizes MongoDB and Express in the backend and React, Redux, and NodeJS in the frontend to achieve this, allowing users to utilize CRUD operations in both the comment and itinerary functionalities.

<p align="center"> 
  <img src="https://media.giphy.com/media/DK5q6X56S0D1l2u6AC/giphy.gif" width="480" height="246" frameBorder="0" allowFullScreen>
</p>

-------------
# Key Technologies
* MongoDB
* Express
* React
* NodeJS
-------------

# Standout Features

## User authorization and dashboard


## Trip-specific Dashboard

Each user is able to create new trips with a destination, a start date, and an end date. Upon entering the trip-specific dashboard, the user is greeted with three key components: 1) the user list of who is on the trip, 2) all the comments from everybody who has access the trip, and 3) the running list of itinerary items for that specific trip. A challenge in the backend was nesting all of these data objects within specific trips themselves. 

```
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
```

Users can only access trips that they own or are apart of.

```
                // ...Check if the current user is part of the trip.
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
```

## Adding friends to a trip

Friends can be also introduced to a trip simply by adding their email associated with their account. Once added to a trip, a user has access to the trip and all associated information on their dashboards. Users can only join if they aren't already part of the trip.


GIF JERE
<p align="center"> 
  <img src="https://media.giphy.com/media/yZdQk93blHA8M0Z5xY/giphy.gif" width="480" height="246" frameBorder="0" allowFullScreen>
</p>


## Creating comments

## Itinerary items

Technical implementation details for anything worth mentioning (basically anything you had to stop and think about before building)
Include links to the neatest parts of the code, or embed snippets
Include screenshots of anything that looks pretty

## Future features

Map API

Tabs for the Itinerary

Location based safety
