import React from 'react'


class ItineraryItem extends React.Component { 

    componentDidMount() { 
        this.props.fetchItineraryItem(this.props.itemId)
    }

    render() { 
        return (
            <div className="item-container">
                <div>
                    <h3>{this.props.item.itemName}</h3>
                    <div>{this.props.item.category}</div>
                    <div>{this.props.item.address}</div>
                    <div>{this.props.item.description}</div>
                </div>
            </div>
        )
    }
}

export default ItineraryItem