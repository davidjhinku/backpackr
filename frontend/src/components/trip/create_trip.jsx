import React from 'react'
import {withRouter} from 'react-router-dom'

class CreateTrip extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: '',
            start_date: '',
            end_date: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(field) {
        return e => this.setState({
            [field]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let trip = {
            location: this.state.location,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };
        this.props.createTrip(trip);
    }

    render() {
        return (
            <div>
                <h3>Create a Trip!</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text"/>

                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(CreateTrip);