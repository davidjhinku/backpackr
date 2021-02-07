import React from 'react'
import ItineraryItemDetails from './itinerary_item_details';

class LodgingItineraryItem extends React.Component {
    render() {
        const itemsList = this.props.itineraryItems.map((item, idx) => {
            return <ItineraryItemDetails key={`item-${idx}`} item={item} deleteItem={this.props.deleteItem} />
        })

        return (
            <div className="items-container">
                <ul>
                    <li >
                        {itemsList}
                        <br />
                    </li>
                </ul>
                <br />
            </div>
        )
    }
}

export default LodgingItineraryItem;