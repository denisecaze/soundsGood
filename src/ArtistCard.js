import React from 'react'
import Card from './Card'
import './ArtistCard.css'
import PropTypes from 'prop-types'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit, faTrashAlt)

function ArtistTrack(props) {
  return (
    <li className={props.className}>{props.title}<br/><iframe title={props.title} src={props.url}/></li>
  )
}

ArtistTrack.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string
}

class ArtistCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tracks: []
    }
    this.getArtistTracks = this.getArtistTracks.bind(this)
  }

  getArtistTracks(event) {
    const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com'
    const options = {
      credentials: 'include'
    }
    fetch(`${BASE_URL}/artists/${this.props.id}/tracks`, options)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
      this.setState({ tracks: [{title: `ainda não temos cadastrada nenhuma música de ${this.props.name}`}] })
      } else {
        this.setState({ tracks: data }) 
      }
    })
  }

  handleClick = () => {
    this.props.deleteCard(this.props.id)
  }

  render() {
    return (
      <Card className='card'>
        <div className='card-edit-delete'>
          <button className='edit-delete-btn' onClick={this.handleClick}><FontAwesomeIcon className='icon' icon='trash-alt' /></button>
          <button className='edit-delete-btn' ><FontAwesomeIcon className='icon' icon='edit' /></button> 
        </div>
        <h2 className='artist-name'>{this.props.name}</h2>
        <h4 className='artist-genre'>{this.props.genre}</h4>
        <button className='show-songs-btn' onClick={this.getArtistTracks}>ver músicas</button>
        <ul>{this.state.tracks.map(track => <ArtistTrack key={track.id} {...track} />)}</ul>
      </Card>
    )
  }
} 

ArtistCard.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default ArtistCard