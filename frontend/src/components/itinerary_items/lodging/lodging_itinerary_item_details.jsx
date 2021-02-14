import React from 'react'

const LodgingItineraryItemDetails = ({ item, deleteLodgingItem }) => {

    return (
        <div>
            <li className='itinerary-item-list'>
                <p className='item-detail-side'>{item.itemName}</p>
                <p className='item-detail-middle'>{item.description}</p>
                <button className='item-detail-side' onClick={() => deleteLodgingItem(item._id)}>Delete Item</button>
            </li>
        </div>
    )
}
export default LodgingItineraryItemDetails;
