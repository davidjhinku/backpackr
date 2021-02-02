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
        if (!this.props.trip._id) {
            return (
                <div>Loading Trip...</div>
            )
        } else {
            return(
                <div className='trip-overview-page'>
                    <h1>Next stop, {this.props.trip.location}!</h1>
                    <div className='trip-users-container'>
                        <UsersListContainer trip={this.props.trip} />
                    </div>

                    {/* <div className='trips-chat-container'>
                        <ChatsContainer trip={this.props.trip} />
                    </div> */}

                    <div className='trips-itinerary-container'>
                        <CreateItineraryItemContainer />
                        <br/>
                        <ItineraryItemContainer trip={this.props.trip} />
                    </div>
                </div>
            )
        }
    }
}

export default TripPage;