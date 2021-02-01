import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      handle: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
    }

    this.setState({ errors: nextProps.errors })
  }

  handleChange(field) {
    return e => this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history); //Why are we passing in history?
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, idx) => (
          <li key={`error-${idx}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='signup-form'>
            <br />
            <input type="text"
              value={this.state.email}
              onChange={this.handleChange('email')}
              placeholder="Email"
            />
            <br />
            <input type="text"
              value={this.state.handle}
              onChange={this.handleChange('handle')}
              placeholder="Handle"
            />
            <br />
            <input type="password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              placeholder='Password'
            />
            <br />
            <input type="password"
              value={this.state.password2}
              onChange={this.handleChange('password2')}
              placeholder='Confirm Password'
            />
            <br />
            <input type="submit" value="Submit" />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);