import { Component } from 'react';
import video from './assets/smoke.mp4';
import paint from './assets/paint-splash.png';
import axios from 'axios';
import LoadingText from './LoadingText.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      play: false,
      fadeOut: false,
      mainText: false,
      userBrandInput: '',
      colors: [],
      finalColours: []
    }
  }

  playVideo = () => {
    this.setState({
      play: true,
      fadeOut: true,
      mainText: true
    })
  }

  randomColours = (array) => {
    this.setState ({
      finalColours:[],
      colors: []
    })
    const indexSize = 7
    for (let i=0; i <= (indexSize - 1); i++) {
      const randomIndex = Math.floor(Math.random() * array.length)
      if (array[randomIndex] !== array[i]) {
       this.state.colours.push(array[randomIndex]);
        console.log("SwatchArray", this.state.colors)
        // Calvin suggested creation of an additional array to set state
        this.setState({
          finalColours: colors
        })
        
      }
    }
  }

// what to do when user clicks desired colour
  handleSwatch = (e) => {
      e.preventDefault();
      //  go to the art page
  }

// store user brand input in state
  handleChange = (e) => {
    this.setState({
      userBrandInput: e.target.value
    })
  };

//   what to do when user submits search
  handleClick = (e) => {
    e.preventDefault();
    
    //   go to the swatches, batches
    axios({
      url: `https://makeup-api.herokuapp.com/api/v1/products.json`,
      method: `GET`,
      responseType: `json`,
      params: {
        // brand: {this.userBrandInput} (maybe state or props)
        brand: `${this.state.userBrandInput}`,
      }
    })
    .then((res) => {
      // console.log(res.data);
      const colorsOnly = [];
      for (let i in res.data) {
        // console.log(res.data[i].product_colors);
        const products = res.data[i].product_colors;
        products.forEach((info) => {
          // console.log(info);
          colorsOnly.push(info.hex_value);
          // console.log(colorsOnly);
        })
      }
      this.setState({
        colors: colorsOnly
      })
      this.randomColours(colorsOnly)
    })
  }

  render() { 
    return (
      <div>
      <header id="start">
        <div className="banner">
          <video src={video} autoPlay={this.state.play} loop="true"></video>
          <div className="search">
            <div onClick={this.playVideo} className={this.state.fadeOut ? 'hide' : null}>
              <LoadingText />
            </div>
            <h1 className={this.state.mainText ? 'showText' : null}>Hue are you?</h1>
            <form action="" className={`search-box ${this.state.mainText ? 'showSearch' : null}`}>
              <label htmlFor="search" className="sr-only">Search a make-up brand</label>
              <input id="search" className="search-text" type="text" placeholder="Search a make-up brand" onChange={this.handleChange}/>
              <button className="search-button" onClick={this.handleClick} type="submit"><img src={paint} alt="paint splash icon"/></button>
            </form>
          </div>
        </div>
      </header>
      {/* Render swatches:
        <div className="swatches">
          {
            this.state.colors.map((color, index) => (
              <li key=(index)>
                <button className="swatch (color)" style={(color)} onClick={this.handleSwatchClick}></button>
              </li>
            )
          }
        </div> */}
        {/* <Swatches />
        <Artwork /> */}
    </div>  
    )
  }
}

export default App
