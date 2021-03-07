import React from 'react'

const FlightItineraryItemDetails = ({item, deleteFlightItem}) => {
    
    return (
        <div>
            <ul className='itinerary-item-list'>
                <p className='item-detail-side'>{item.itemName}</p>
                <p className='item-detail-middle'>{item.description}</p>
                <button className='item-detail-side' onClick={() => deleteFlightItem(item._id)}>Delete Item</button>
            </ul>
        </div>
    )
}

export default FlightItineraryItemDetails;
