import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'LOADER',
}

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    loginApiStatus: apiStatus.loader,
  }

  getUserInfo = async () => {
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      this.setState({loginApiStatus: apiStatus.success})
    } else {
      const errorMsg = data.error_msg
      this.setState({loginApiStatus: apiStatus.failure, errorMsg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.getUserInfo()
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <img
            className="login-image-logo"
            src="https://res.cloudinary.com/dojcy1a17/image/upload/v1725000551/Screenshot_2024-08-30_121252_xueemo.png"
            alt="logo"
          />
          <h1 className="login-heading">UNI Resto Cafe</h1>
          <label className="form-label" htmlFor="username">
            USERNAME
          </label>
          <input
            className="form-input"
            onChange={this.onChangeUsername}
            value={username}
            id="username"
            type="text"
            placeholder="Enter Username"
          />
          <label className="form-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            className="form-input"
            onChange={this.onChangePassword}
            value={password}
            id="password"
            type="password"
            placeholder="Enter Password"
          />
          {errorMsg.length !== 0 && (
            <p className="login-error-msg">{errorMsg}</p>
          )}
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
