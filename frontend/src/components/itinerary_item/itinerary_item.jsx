import React from 'react'
import CreateItineraryItemContainer from './create_itinerary_container';
import ItineraryItemDetails from './itinerary_item_details';

class ItineraryItem extends React.Component {

    // componentDidMount() { 
    //     this.props.fetchItineraryItem(this.props.itemId)
    // }

    render() {
        const itemsList = this.props.itineraryItems.map((item, idx) => {
            return <ItineraryItemDetails key={`item-${idx}`} item={item} deleteItem={this.props.deleteItem}/>
        })

        return (
            <div>
                <div className="items-container">
                    <ul>
                        <li className="item-element">{itemsList}</li>
                    </ul>
                    <br />
                </div>

                <CreateItineraryItemContainer />
            </div>
        )
    }
}

export default ItineraryItem