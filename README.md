
<p align="center"> 
  <a href="https://backpackr-aa.herokuapp.com/"><img src="https://i.ibb.co/TBGtZ6b/readme-header.png"></a>
</p>

-------------
# Overview

[Backpackr](https://backpackr-aa.herokuapp.com/) is a single-page application designed to help travelers plan their voyages with more ease and organization. It was birthed when four curious software engineers prodded over the age-old problem of hassling over messy Google docs to plan itineraries for group trips. The original inspiration was to create an application that combines an interactive messenger alongside a running itinerary list that could store the key information from the group trip chat.

<p align="center"> 
  <img src="https://media.giphy.com/media/DK5q6X56S0D1l2u6AC/giphy.gif" width="480" height="246" frameBorder="0" allowFullScreen>
</p>

 Backpackr utilizes MongoDB and Express in the backend and React, Redux, and NodeJS in the frontend to achieve this, allowing users to utilize CRUD operations in both the comment and itinerary functionalities.

## Key Technologies
* MongoDB
* Express
* React
* NodeJS
-------------

# Standout Features

## User authorization and dashboard

Users can sign up for a new account, login to an existing account, or access a demo user to access the site features. The session token for the current user persists until the user explicitly logs out, allowing users to close out of tabs with ease. 

<p align="center"> 
  <img src="https://media.giphy.com/media/rBGIunfl6wTCswxEeQ/giphy.gif" width="480" height="246" frameBorder="0" allowFullScreen>
</p>

If the user enters invalid information, either in the signup form or the login form, specific error messages appear to highlight which input fields would need corrections. 
Upon a successful login, the user lands on the user dashboard where a trip can be created, edited or deleted.

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

<p align="center"> 
  <img src="https://media.giphy.com/media/yZdQk93blHA8M0Z5xY/giphy.gif" width="480" height="246" frameBorder="0" allowFullScreen>
</p>

## Creating comments

All users on a trip can leave comments that appear in a chat without having to refresh the page. Users are also authorized to delete their own comments if they would like to. 

## Itinerary items

All users on a trip can also add itinerary items w

## Future features

## Map API
In the original mockup plans, we had wanted to include the Google Maps API to include on the trip dashboard to allow users to access Google Maps while adding itinerary items and discussing with friends over travel details. This has been saved for a later date.

## Tabs for the Itinerary
The original mockup plans also included a tab functionality for the itinerary items, allowing better organization for essential travel details such as lodging, food, flights, etc.

## Location-based safety
As our group is composed of LGBTQ+ software engineers, we were hoping to integrate a resource for location-based links to resources for LGBTQ+ users to feel included and considered for in their travels.

