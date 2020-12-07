import axios from 'axios';
import { Component } from 'react';

class Artwork extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      title: '',
      artist: ''
    }
  }
  componentDidMount() {
    axios({
      url: `https://www.rijksmuseum.nl/api/en/collection`,
      method: `GET`,
      responseType: `json`,
      params: {
        key: 'wMbWv135',
        q: 1,
        imgOnly: true,
        hex: `#3F3120`
        // ^ or whatever hex value user chooses
      }
    })
      .then((res) => {
        console.log(res)
        this.setState({
          url: res.data.artObjects[0].webImage.url,
          title: res.data.artObjects[0].title,
          artist: res.data.artObjects[0].principalOrFirstMaker
        })
      })
  }

  render() {
    return (
      // div or fragment
      <div>
        <p>hi again</p>
        <img src={this.state.url} alt={`Your makeup, perfectly paired with ${this.state.artist}'s work: '${this.state.title}'`}/>
      </div>
      
    )
  }
}

export default Artwork;