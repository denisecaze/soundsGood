import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import './Login.css'

const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ 
        email: this.state.email, 
        password: this.state.password })
    }

    function handleErrors(response) {
      if (!response.ok) throw Error(response.status)
      return response
    }

    fetch(`${BASE_URL}/login`, options)
    .then(handleErrors)
    .then(response => this.props.history.push('/home'))
    .catch(error => alert('Usuário não cadastrado'))
  }

  handleSignUp = (event) => {
    event.preventDefault()
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ 
        email: this.state.email, 
        password: this.state.password })
    }

    function handleErrors(response) {
      if (!response.ok) throw Error(response.status)
      return response
    }

    fetch(`${BASE_URL}/signup`, options)
    .then(handleErrors)
    .then(response => this.props.history.push('/home'))
    .catch(error => alert('Este usuário já existe'))
  }

  render() {
    return (
      <div className='login'>
        <form>
          <FormGroup controlId='email' bsSize='large'>
            <ControlLabel>Email: </ControlLabel>
            <FormControl className='input-field' autoFocus type='email' value={this.state.email} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId='password' bsSize='large'>
            <ControlLabel>Password: </ControlLabel>
            <FormControl className='input-field' value={this.state.password} onChange={this.handleChange} type='password' />
          </FormGroup>
          <Button className='login-signup-btn' block bsSize='large' onClick={this.handleLogin} disabled={!this.validateForm()} type='submit'>Login</Button>
          <Button className='login-signup-btn' block bsSize='large' onClick={this.handleSignUp} disabled={!this.validateForm()} type='submit'>SignUp</Button>
        </form>
      </div>
    )
  }
}

export default Login