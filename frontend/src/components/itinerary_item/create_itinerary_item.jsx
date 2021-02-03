import React from 'react'
import { withRouter } from 'react-router-dom'

class CreateItineraryItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemName: '',
            category: '',
            address: '',
            description: '',
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.errors })
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
            this.props.clearErrors([]);
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        let item = {
            itemName: this.state.itemName,
            category: this.state.category,
            address: this.state.address,
            description: this.state.description,
            tripId: this.props.tripId
        };
        this.props.createItineraryItem(item)
            // .then(this.props.fetchATrip(this.props.tripId))
            .then(item => {
                this.setState({
                    itemName: '',
                    category: '',
                    address: '',
                    description: '',
                    errors: {}
                })
            })
    }

    componentWillUnmount() {
        this.props.clearErrors([])
    }

    // renderErrors() {
    //     return (
    //         <ul>
    //             {Object.keys(this.state.errors).map((error, idx) => (
    //                 <li className='create-item-errors-element' key={`err-${idx}`}>
    //                     {this.state.errors[error]}
    //                 </li>
    //             ))}
    //         </ul>
    //     )
    // }

    render() {

        return (
            <div className='create-trip-container'>
                <h3>Create an Itinerary Item</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className='create-item-box'>

                        <div>
                            <input className='create-item-input'
                                type="text"
                                value={this.state.itemName}
                                onChange={this.handleChange('itemName')}
                                placeholder='Itinerary Item Name'
                            />
                            <br />
                        </div>

                        <div>
                            <input className='create-item-input'
                                type="text"
                                value={this.state.category}
                                onChange={this.handleChange('category')}
                                placeholder='Category'
                            />
                            <br />
                        </div>

                        <div>
                            <input className='create-item-input'
                                type="text"
                                value={this.state.address}
                                onChange={this.handleChange('address')}
                                placeholder='Address'
                            />
                            <br/>
                        </div>
                        <input className='create-item-input'
                            type="text"
                            value={this.state.description}
                            onChange={this.handleChange('description')}
                            placeholder='Description'
                        />
                        <br/>
                        <div>

                        </div>

                        {/* <div className="create-item-errors">
                            {this.renderErrors()}
                        </div> */}

                        <div className="create-item-submit-btn">
                            <input className="create-item-submit-text" type="submit" value="Create an Item" />
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(CreateItineraryItem);