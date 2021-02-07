import React from 'react'
import CreateItineraryItemContainer from './create_itinerary_container';
import ItineraryItemDetails from './itinerary_item_details';

class Itinerary extends React.Component {

    constructor(props) {
        super(props);

        this.state = { currentTab: 0 }
        this.selectedTab = this.selectedTab.bind(this);
    }

    selectedTab(event) {
        event.preventDefault();
        this.setState({ currentTab: parseInt(event.currentTarget.className) })
    }

    // componentDidMount() { 
    //     this.props.fetchItineraryItem(this.props.itemId)
    // }

    render() {
        const header = this.props.tabs.map((el, idx) => {
            if (idx === this.state.currentTab) {
                return <li onClick={this.selectedTab} className={idx} key={idx}><h1 className="current-tab">{el.title}</h1></li>
            } else {
                return <li onClick={this.selectedTab} className={idx} key={idx}><h1>{el.title}</h1></li>
            }
        });


        // const itemsList = this.props.itineraryItems.map((item, idx) => {
        //     return <ItineraryItemDetails key={`item-${idx}`} item={item} deleteItem={this.props.deleteItem}/>
        // })


        return (
            <div>
                <div className="items-container">
                    <ul>
                        {header}
                        <li className="item-element">
                            {(this.props.tabs[this.state.currentTab].content)} 
                        </li>
                    </ul>
                </div>

                <CreateItineraryItemContainer />
            </div>
        )
    }
}

export default Itinerary