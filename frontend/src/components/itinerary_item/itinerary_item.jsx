import React from 'react'
import CreateItineraryItemContainer from './create_itinerary_container';
import ItineraryItemDetails from './itinerary_item_details';

class ItineraryItem extends React.Component {

    // componentDidMount() { 
    //     this.props.fetchItineraryItem(this.props.itemId)
    // }

    render() {
        debugger
        const itemsList = this.props.itineraryItems.map((item, idx) => {
            return <ItineraryItemDetails key={`item-${idx}`} item={item} />
        })

        debugger
        return (
            <div className="item-container">
                <CreateItineraryItemContainer />
                <br />
                <ul>
                    {itemsList}
                </ul>
            </div>
        )
    }
}

export default ItineraryItem