import React from 'react'

const ItineraryItemDetails = ({item, deleteItem}) => {
    
    return (
        <div className='itinerary-item-list' >
            <li>
                {item.itemName}
                <p>{item.description}</p>
                <button onClick={() => deleteItem(item._id)}>Delete Item</button>
            </li>
            <br/>
        </div>
    )
}

export default ItineraryItemDetails;
