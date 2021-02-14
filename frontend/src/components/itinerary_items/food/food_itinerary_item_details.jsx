import React from 'react'

const FoodItineraryItemDetails = ({item, deleteFoodItem}) => {
    
    return (
        <div>
            <li className='itinerary-item-list'>
                <p className='item-detail-side'>{item.itemName}</p>
                <p className='item-detail-middle'>{item.description}</p>
                <button className='item-detail-side' onClick={() => deleteFoodItem(item._id)}>Delete Item</button>
            </li>
        </div>
    )
}

export default FoodItineraryItemDetails;
