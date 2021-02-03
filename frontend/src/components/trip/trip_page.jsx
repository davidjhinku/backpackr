import React from 'react';
import UsersListContainer from '../users_list/users_list_container';
import ChatsContainer from '../chats/chats_container';
import CreateItineraryItemContainer from '../itinerary_item/create_itinerary_container';
import ItineraryItemContainer from '../itinerary_item/itinerary_item_container';


class TripPage extends React.Component {

    componentDidMount() {
        this.props.fetchATrip(this.props.tripId)
    }

    render() {
        if (!this.props.trip) {
            return (
                <div>Loading Trip...</div>
            )
        } else {
            debugger
            return(
                <div className='trip-overview-page'>
                    <h1>Next stop, {this.props.trip.destination}!</h1>
                    <div className='trip-users-container'>
                        <UsersListContainer users={this.props.trip.users} tripId={this.props.tripId} />
                    </div>
                    <br/>
                    <div className='trips-chat-container'>
                        <ChatsContainer tripId={this.props.trip._id} comments={this.props.trip.comments} />
                    </div>
                    <br/>
                    <div className='trips-itinerary-container'>
                        <CreateItineraryItemContainer tripId={this.props.tripId} itineraryItems={this.props.trip.itineraryItems} />
                        <br/>
                        <ItineraryItemContainer tripId={this.props.tripId} itineraryItems={this.props.trip.itineraryItems} />
                    </div>
                </div>
            )
        }
    }
}

export default TripPage;