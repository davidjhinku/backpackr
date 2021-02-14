import React from 'react'

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

    render() {
        const header = this.props.tabs.map((el, idx) => {
            if (idx === this.state.currentTab) {
                return <li onClick={this.selectedTab} className={idx} key={idx}>
                    <h6 className="tabs-container-text">{el.title}</h6>
                    </li>
            } else {
                return <li onClick={this.selectedTab} className={idx} key={idx}>
                    <h6 className="tabs-container-text">{el.title}</h6>
                    </li>
            }
        });

        return (
            <div>
                <div className="tabs-container">{header}</div>
                <div>{(this.props.tabs[this.state.currentTab].content)}</div>
            </div>
        )
    }
}

export default Itinerary