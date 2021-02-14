import React from 'react';
import UsersListContainer from '../users_list/users_list_container';
import CommentsContainer from '../comments/comments_container';
import ItineraryContainer from '../itinerary_item/itinerary';
import FlightItineraryItem from '../itinerary_item/flight_itinerary_item';

class TripPage extends React.Component {
    componentDidMount() {
        this.props.fetchATrip(this.props.tripId);
    }
    render() {
        const tabArr = [
            { title: "Flights", content: <FlightItineraryItem tripId={this.props.tripId} flightItineraryItems={Object.values(this.props.flightItineraryItems)} deleteFlightItem={this.props.deleteFlightItem} /> },
            { title: "Lodging", content: "hellow"},
            { title: "Food", content: "food"}, 
            { title: "Other", content: "other" }
        ]

        if (!this.props.trip) {
            return (
                <div>Loading Trip...</div>
            )
        } else {
            return (
                <div className='trip-page-container'>
                    <div className='trip-sidebar-container'>
                        <div className="trip-sidebar-container-elements">
                        <UsersListContainer users={this.props.trip.users} tripId={this.props.tripId} />
                        </div>
                    </div>
                    <div className='trip-chat-container'>
                        <CommentsContainer tripId={this.props.trip._id} comments={Object.values(this.props.comments)} />
                    </div>
                    <div className="trip-items-container">
                        <header className="trip-items-header">
                            <h1>Next stop, {this.props.trip.destination}!</h1>
                            <br />
                        </header>

                        <div className='trip-items-subcontainer'>
                            <ItineraryContainer tripId={this.props.tripId} itineraryItems={Object.values(this.props.itineraryItems)} deleteItem={this.props.deleteItem} tabs={tabArr}/>
                        </div>
                    </div>

                    <div className="filler-queen">
                    </div>
                </div>
            )
        }
    }
}

export default TripPage;