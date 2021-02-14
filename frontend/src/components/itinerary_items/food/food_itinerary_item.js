import React from 'react'
import FoodItineraryItemDetails from './food_itinerary_item_details';
import CreateFoodItineraryItemContainer from './create_food_itinerary_container';

class FoodItineraryItem extends React.Component {
    render() {
        const itemsList = this.props.foodItineraryItems.map((item, idx) => {
            return <FoodItineraryItemDetails key={`item-${idx}`} item={item} deleteFoodItem={this.props.deleteFoodItem} />
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
                <CreateFoodItineraryItemContainer />
            </div>
        )
    }
}

export default FoodItineraryItem