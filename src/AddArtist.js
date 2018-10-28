import React, { Component } from 'react'
import './AddArtist.css'

class AddArtist extends Component {
  state = {
    name: null,
    genre: null, 
    added: false
  }

  handleInputChange = (event) => {
    this.setState({ 
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addArtistFromInput(this.state)
    this.setState({
      added: true
    },
      function() {
        setTimeout(() => {
          this.setState({
            added: false
          });
        }, 1500)
      })
  }

  render() {
    return (
      <form className='form'>
        <fieldset className='fieldset'>
          <h3>ADD ARTIST</h3>
          <div className='input-fields'>
            <label className='name-label' htmlFor='name'>Name: </label>
            <input type='text' id='name' onChange={this.handleInputChange} />
            <label className='genre-label' htmlFor='name'>Genre: </label>
            <input type='text' id='genre' onChange={this.handleInputChange} /> 
          </div>
          <button className={!this.state.added ? 'not-added-btn' : 'add-btn'} onClick={this.handleSubmit}>{!this.state.added ? 'Adicionar à lista' : '✔ Adicionado'}</button> 
        </fieldset>      
      </form>
    )
  }
}

export default AddArtist
