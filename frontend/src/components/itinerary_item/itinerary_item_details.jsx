import React from 'react'

const ItineraryItemDetails = ({item, deleteItem}) => {
    
    return (
            <li className='itinerary-item-list'>
                <p className='item-detail-side'>{item.itemName}</p>
                <p className='item-detail-middle'>{item.description}</p>
                <button className='item-detail-side' onClick={() => deleteItem(item._id)}>Delete Item</button>
            </li>
    )
}

export default ItineraryItemDetails;
