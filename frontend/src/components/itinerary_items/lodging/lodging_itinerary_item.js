import React from 'react'
import LodgingItineraryItemDetails from './lodging_itinerary_item_details';
import CreateLodgingItineraryItemContainer from './create_lodging_itinerary_container';

class LodgingItineraryItem extends React.Component {
    render() {
        const itemsList = this.props.lodgingItineraryItems.map((item, idx) => {
            return <LodgingItineraryItemDetails key={`item-${idx}`} item={item} deleteLodgingItem={this.props.deleteLodgingItem} />
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
                <CreateLodgingItineraryItemContainer />
            </div>
        )
    }
}

export default LodgingItineraryItem