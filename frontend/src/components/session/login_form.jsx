import React from 'react';
import { Link, withRouter } from 'react-router-dom';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/profile');
    }

    this.setState({ errors: nextProps.errors })
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
      password: this.state.password
    };
    this.props.login(user);
  }

  componentWillUnmount() {
    this.props.clearErrors([])
  }

  renderErrors() {
    return (
      <ul >
        {Object.keys(this.state.errors).map((error, idx) => (
          <li className="login-form-errors-element" key={`error-${idx}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="login-form-subcontainer">
            <h1 className="signup-form-header">Welcome back!</h1>
            <div className="login-form-input-container">
              <input className="login-form-input-element" type="text"
              value={this.state.email}
              onChange={this.handleChange('email')}
              placeholder='Email'
            />
              <br />
            </div>
            
            <div className="login-form-input-container">
              <input className="login-form-input-element" type="password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                placeholder='Password'
              />
              <br />
            </div>

            <div className="login-form-errors">
              {this.renderErrors()}
            </div>

            <div className="login-form-submit-btn">
              <input className="login-form-submit-text" type="submit" value="Login" />
            </div>

            <div className="login-form-text">
              Don't have an account? Go ahead and <Link className="login-form-signup-link" to="/signup">make one right quick</Link>.
            </div>
            
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);