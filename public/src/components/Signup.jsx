import React, { Component, PropTypes } from 'react';

class Signup extends Component {
  handleClick(event) {
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = { username: username.value.trim(), password: password.value.trim() };
    this.props.onSignupClick(creds);
    console.log('creds', creds);
    // this.props.onGoogleSignupClick(creds);
  }

  render() {
    const { errorMessage } = this.props;
    return (<div>
      <input type="text" ref="username" className="form-control" placeholder="Username" />
      <input type="text" ref="password" className="form-control" placeholder="Password" />
      <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">Signup</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>)
  }
}

// Signup.propTypes = {
  // onLoginClick: PropTypes.func.isRequired,
  // errorMessage: PropTypes.string
// }

export default Signup;