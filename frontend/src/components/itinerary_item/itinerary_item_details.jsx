import React from 'react'

const ItineraryItemDetails = ({item}) => {
    return (
        <div className='itinerary-item-list' >
            <li>
                {item.itemName}
                <p>{item.description}</p>
            </li>
            <br/>
        </div>
    )
}

export default ItineraryItemDetails;
