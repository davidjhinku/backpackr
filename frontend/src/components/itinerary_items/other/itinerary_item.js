import React from 'react'
import ItineraryItemDetails from './itinerary_item_details';
import CreateItineraryItemContainer from './create_itinerary_container';

class ItineraryItem extends React.Component {
    render() {
        const itemsList = this.props.itineraryItems.map((item, idx) => {
            return <ItineraryItemDetails key={`item-${idx}`} item={item} deleteItem={this.props.deleteItem} />
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
                <CreateItineraryItemContainer />
            </div>
        )
    }
}

export default ItineraryItem