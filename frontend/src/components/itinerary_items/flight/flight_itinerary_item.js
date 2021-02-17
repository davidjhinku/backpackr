import React from 'react'
import FlightItineraryItemDetails from './flight_itinerary_item_details';
import CreateFlightItineraryItemContainer from './create_flight_itinerary_container';

class FlightItineraryItem extends React.Component {
    render() {
        const itemsList = this.props.flightItineraryItems.map((item, idx) => {
            return <FlightItineraryItemDetails key={`item-${idx}`} item={item} deleteFlightItem={this.props.deleteFlightItem} />
        })

        return (
            <div>
                <ul>
                    <li className="items-container">
                        {itemsList}
                        <br />
                    </li>
                </ul>
                <br />
                <CreateFlightItineraryItemContainer />
            </div>
        )
    }
}

export default FlightItineraryItem