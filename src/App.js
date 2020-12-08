import { Component } from 'react';
import video from './assets/smoke.mp4';
import paint from './assets/paint-splash.png';
import axios from 'axios';
import Intro from './Intro.js';
import TitleSvg from './TitleSvg';

class App extends Component {

  constructor() {
    super();
    this.state = {
      play: false,
      fadeOut: false,
      mainText: false,
      userBrandInputChange: "",
      userBrandInputFinal: "",
      colors: [],
    }
  }

  playVideo = () => {
    this.setState({
      play: true,
      fadeOut: true,
      mainText: true
    })
  }

  componentDidMount() {
    axios({
      url: `https://makeup-api.herokuapp.com/api/v1/products.json`,
      method: `GET`,
      responseType: `json`,
      params: {
        brand: "fenty"
        // (maybe state or props)
      }
    })
    .then( (res)=> {
      console.log("returned Makeup Array", res.data);
      // ^this takes forever because it is calling ALL brands... when we have a user-selected brand, it will be quicker!
      if (res.data.length > 6) {
        const shortenedArray = res.data.slice(0, 7)
        const coloursOnly = []
        shortenedArray.map( (product)=> {
          coloursOnly.push(product.product_colors[0].hex_value)
        })
        this.setState({
          color: coloursOnly,
        })
      } else {
        // basically same as above
        console.log(res);
      }
      // console.log(this.state.palette)
    })
  }

// what to do when user clicks desired colour
 handleSwatch = (e) => {
     e.preventDefault();
    //  go to the art page
 }

// store user brand input in state
  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    console.log(value);
    this.setState({
      userBrandInputChange: value
    })
    console.log("change", this.state.userBrandInputChange);
  };

//   what to do when user submits search
  handleClick = (e) => {
      e.preventDefault();
      
      this.setState({
        userBrandInputFinal: this.state.userBrandInputChange
      })
      console.log("final", this.state.userBrandInputFinal);
    //   go to the swatches, batches
      
  }

  render() {
    return (
      <div>
      <header id="start">
        <div className="banner">
          <video src={video} autoPlay={this.state.play} loop="true"></video>
          <div className="search">
            <div onClick={this.playVideo} className={this.state.fadeOut ? 'hide' : null}>
              <Intro/>
            </div>
            <h1 className="sr-only">Hue are you?</h1>
            <div className={this.state.mainText ? 'showText' : null}>
              <TitleSvg/>
            </div>
            <form action="" className={`search-box ${this.state.mainText ? 'showSearch' : null}`}>
              <label htmlFor="search" className="sr-only">Search a make-up brand</label>
              <input id="search" className="search-text" type="text" placeholder="Search a make-up brand" onChange={ (e) => {this.handleChange(e)}}/>
              <button className="search-button" onClick={ (e) => {this.handleClick(e)}} type="submit"><img src={paint} alt="paint splash icon"/></button>
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
