import React, { Component } from 'react'
import './App.css'
import ArtistCard from './ArtistCard'
import AddArtist from './AddArtist'
import { NavLink, Route } from 'react-router-dom'
import Login from './Login'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      artists: []
    }
  }

  componentDidMount() {
    const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com'
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email: 'denise@gmail.com', password: 'oioioi' })
    }

    fetch(`${BASE_URL}/login`, options)
    .then(response => {
      const options = {
        credentials: 'include'
      }
      fetch(`${BASE_URL}/artists`, options)
      .then(response => response.json())
      .then(data => this.setState({ artists: data }))
    })
  }

  addArtistFromInput = (artist) => {
    let artists = [...this.state.artists, artist]
    this.setState({ artists })

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
      body: `name=${artist.name}&genre=${artist.genre}`
    }

    fetch('https://peaceful-badlands-98440.herokuapp.com/artists', options)
    .then(response => response.json())
  }

  deleteCard = (id) => {
    const artists = this.state.artists.filter(artist => {
      return artist.id !== id
    })
    this.setState({ artists })

    const options = {
      method: 'delete',
      credentials: 'include'
    }

    fetch(`https://peaceful-badlands-98440.herokuapp.com/artists/${id}`, options)
  }

  render() { 
    return (
      <div>
        <nav className='menu'>
          <a href='/home' className='title'>SOUND'S<br/>SO GOOD</a>
          <div className='links'>
            <NavLink className='link' exact to='/home'>Home</NavLink>
            <NavLink className='link' to='/artists'>Artists</NavLink>  
            <NavLink className='link' to='/contact'>Contact</NavLink>
          </div>
        </nav>
        <Route path='' exact component={Login} />
        <Route exact path='/home' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/artists' render={() => 
          <div className='artists-container'>
            <AddArtist addArtistFromInput={this.addArtistFromInput} />
              {this.state.artists.map((artist) => <ArtistCard key={artist.id} {... artist} deleteCard={this.deleteCard}/>)}
          </div>
        } />
      </div>
    )
  }
}

const Contact = () => {
  return (
    <div className="contact-content">
      <h1>Sound's So Good</h1>
      <p>tocatoca@tocatoca.com</p>
    </div>
  )
}

const Home = () => {
  return (
    <div className='home-content'>
      <h1 className='welcome'>Bem-vindo(a)!</h1>
      <h3 className='text-1'>Ajude-nos a criar uma grande biblioteca de música.</h3>
      <p className='text-2'>Você deve adicionar o artista - ou grupo - e o ritmo e, automaticamente, disponibilizamos um vídeo de uma de suas músicas.<br/>Caso perceba algum erro ou incoerência, por favor, edite ou delete o card correspondente.<br/>Ajude-nos a melhorar! Obrigada.</p>
    </div>
  )
}

export default App
