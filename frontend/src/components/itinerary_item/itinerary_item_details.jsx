import React from 'react'

const ItineraryItemDetails = ({item, deleteItem}) => {
    
    return (
            <li className='itinerary-item-list'>
                {item.itemName}
                <p>{item.description}</p>
                <button onClick={() => deleteItem(item._id)}>Delete Item</button>
            </li>
    )
}

export default ItineraryItemDetails;
