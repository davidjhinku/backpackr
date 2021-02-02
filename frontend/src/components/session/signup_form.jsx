import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
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

  componentWillUnmount() {
    this.props.clearErrors([])
  }

  handleChange(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
      this.props.clearErrors([]);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history); //Why are we passing in history?
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, idx) => (
          <li className="signup-form-errors-element" key={`error-${idx}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-form-container">
        
        <form onSubmit={this.handleSubmit}>
          
          <div className='signup-form-subcontainer'>
            <h1 className="signup-form-header">Welcome to Backpackr</h1>
            <div className="signup-form-input-container">
              <input 
              className="signup-form-input-element"
              type="text"
              value={this.state.email}
              onChange={this.handleChange('email')}
              placeholder="Email"
            />
            <br />
            </div>

            <div className="signup-form-input-container">
              <input 
                className="signup-form-input-element"
                type="text"
                value={this.state.username}
                onChange={this.handleChange('username')}
                placeholder="Username"
              />
              <br />
            </div>

            <div className="signup-form-input-container">
              <input 
                className="signup-form-input-element"
                type="password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                placeholder='Password'
              />
              <br />
            </div>

            <div className="signup-form-input-container">
              <input className="signup-form-input-element"
                type="password"
                value={this.state.password2}
                onChange={this.handleChange('password2')}
                placeholder='Confirm Password'
              />
              <br />
            </div>

              <div className="signup-form-errors">
                {this.renderErrors()}
              </div>

            <div className="signup-form-submit-btn">
                <input className="signup-form-submit-text" type="submit" value="Submit" />
            </div>

            <div className="login-form-text">
              Already have an account? Go ahead and <Link className="signup-form-login-link" to="/login">login</Link>.
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);