// import React from 'react'

// class Chats extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             username:"",
//             comment:"",
//             timestamp:{},
//             errors:{}
//         }
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }

//     componentWillReceiveProps(nextProps) {
//         this.setState({ errors: nextProps.errors })
//     }

//     handleChange(field) {
//         return e => {
//             this.setState({ [field]: e.target.value });
//             this.props.clearErrors([]);
//         }
//     }


//     handleSubmit(e) {
//         e.preventDefault();
//         let comment = {
//             username: this.state.username,
//             comment: this.state.comment,
//             // timestamp: this.state.timestamp,
//         };

//         this.props.createComment(trip)
//             // .then(returnedTrip => {
//             //     this.props.history.push(`/trips/${returnedTrip.trip.data._id}`);
//             });
//     }

//     componentWillUnmount(){
//         this.props.clearErrors([])
//     }

//     renderErrors(){
//         return (
//             <ul>
//                 {Object.keys(this.state.errors).map((error, idx) => (
//                     <li className='create-trip-errors-element' key={`err-${idx}`}>
//                         {this.state.errors[error]}
//                     </li>
//                 ))}
//             </ul>
//         )
//     }

//     render(){

//         return (
//             <div className='create-trip-container'>
//                 <h3>Create a Trip</h3>
//                 <form onSubmit={this.handleSubmit}>
//                     <div className='create-trip-subcontainer'>

//                         <div>
//                             <input className='create-trip-input-element'
//                                 type="text"
//                                 value={this.state.tripName}
//                                 onChange={this.handleChange('tripName')}
//                                 placeholder='Trip Name'
//                             />
//                             <br />
//                         </div>

//                         <div>
//                             <input className='create-trip-input-element'
//                                 type="text"
//                                 value={this.state.destination}
//                                 onChange={this.handleChange('destination')}
//                                 placeholder='Destination'
//                             />
//                             <br />
//                         </div>

//                         <div>
//                             <input className='create-trip-date-element'
//                                 type="date"
//                                 value={this.state.startDate}
//                                 onChange={this.handleChange('startDate')}
//                             />
//                         </div>
//                         <input className='create-trip-date-element'
//                             type="date"
//                             value={this.state.endDate}
//                             onChange={this.handleChange('endDate')}
//                         />
//                         <div>

//                         </div>

//                         <div className="create-trip-errors">
//                             {this.renderErrors()}
//                         </div>

//                         <div className="create-trip-submit-btn">
//                             <input className="create-trip-submit-text" type="submit" value="Create Trip" />
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }

// export default Chats;