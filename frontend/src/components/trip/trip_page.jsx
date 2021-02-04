import React from 'react';
import UsersListContainer from '../users_list/users_list_container';
import CommentsContainer from '../comments/comments_container';
import ItineraryItemContainer from '../itinerary_item/itinerary_item';


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
            return (
                <div className='trip-page-container'>
                    <div className='trip-sidebar-container'>
                        <div className="trip-sidebar-container-elements">
                        <UsersListContainer users={this.props.trip.users} tripId={this.props.tripId} />
                        </div>
                    </div>
                    <div className='trip-chat-container'>
                        <CommentsContainer tripId={this.props.trip._id} comments={this.props.trip.comments} />
                    </div>
                    <div className="trip-items-container">
                        <header className="trip-items-header">
                            <h1>Next stop, {this.props.trip.destination}!</h1>
                            <br />
                        </header>

                        <div className='trip-items-subcontainer'>
                            {/* <CreateItineraryItemContainer tripId={this.props.tripId} itineraryItems={this.props.trip.itineraryItems} />
                            <br/> */}
                            <ItineraryItemContainer tripId={this.props.tripId} itineraryItems={this.props.trip.itineraryItems} deleteItem={this.props.deleteItem} />
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