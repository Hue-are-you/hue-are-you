import { Component } from 'react';

class Footer extends Component {
  render() { 
    return (
      <div>
        <p>Created by <a href="https://github.com/ChristineShiels" target="_blank" rel="noreferrer">Christine</a>, <a href="https://github.com/Callyhobbes" target="_blank" rel="noreferrer">Cally</a> and <a href="https://github.com/ulanob" target="_blank" rel="noreferrer">Bo</a> at <a href="https://junocollege.com/" target="_blank" rel="noreferrer">Juno College</a></p>
        <p>Makeup from <a href="https://makeup-api.herokuapp.com/" target="_blank" rel="noreferrer">The Makeup API</a></p>
        <p>Art from the <a href="https://www.rijksmuseum.nl/en/visit" target="_blank" rel="noreferrer">Rijksmuseum API</a></p>
      </div>
    )
  }
}
export default Footer;