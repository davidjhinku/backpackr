import React from 'react'
import { withRouter } from 'react-router-dom'

class EditTripForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.trip
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({ errors: nextProps.errors })
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
            this.props.clearErrors([]);
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.updateTrip(this.state)
            .then(returnedTrip => {
                return this.props.fetchATrip(this.props.trip._id)})
            .then(returnedTrip => {
                this.props.history.push(`/trips/${this.props.match.params.tripId}`);
                // this.props.history.push(`/profile`);
            });
    }

    componentWillUnmount() {
        this.props.clearErrors([])
    }

    // renderErrors() {
    //     return (
    //         <ul>
    //             {Object.keys(this.state.errors).map((error, idx) => (
    //                 <li className='edit-trip-errors-element' key={`err-${idx}`}>
    //                     {this.state.errors[error]}
    //                 </li>
    //             ))}
    //         </ul>
    //     )
    // }

    currDate = () => {
        const today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        const yyyy = today.getFullYear()

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return `${yyyy}-${mm}-${dd}`
    }

    render() {
        return (
            <div className='edit-trip-container'>

                <div className="edit-trip-form-container">
                    <div className='edit-trip-header'>
                        <h3>Edit your Trip!</h3>
                    </div>
                    {/* <div className="edit-trip-errors">
                        {this.renderErrors()}
                    </div> */}

                    <form onSubmit={this.handleSubmit} className="edit-trip-form">
                        <div>
                            <input className='edit-trip-input-element'
                                type="text"
                                value={this.state.tripName}
                                onChange={this.handleChange('tripName')}
                                placeholder='Trip Name'
                            />
                        </div>

                        <div>
                            <input className='edit-trip-input-element'
                                type="text"
                                value={this.state.destination}
                                onChange={this.handleChange('destination')}
                                placeholder='Destination'
                            />
                        </div>

                        <input className='edit-trip-date-element'
                            type="date"
                            value={this.state.startDate}
                            onChange={this.handleChange('startDate')}
                            min={this.currDate()}
                        />
                        <input className='edit-trip-date-element'
                            type="date"
                            value={this.state.endDate}
                            onChange={this.handleChange('endDate')}
                            min={this.state.startDate.slice(0, 10)}
                        />

                        {/* <div className="edit-trip-submit-btn"> */}
                        <input className="edit-trip-submit-text" type="submit" value="Edit Trip" />
                        {/* </div> */}
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(EditTripForm);