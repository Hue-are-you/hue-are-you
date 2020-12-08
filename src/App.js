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
      url: '',
      title: '',
      artist: '',
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

  // what to do when user clicks desired colour
  handleSwatch = (e) => {
    e.preventDefault();
    //  go to the art page
    const chosenColor = e.target.className
    console.log(chosenColor);
    axios({
      url: `https://www.rijksmuseum.nl/api/en/collection`,
      method: `GET`,
      responseType: `json`,
      params: {
        key: 'wMbWv135',
        "f.normalized32Colors.hex": '#ff0000',
        imgOnly: true,
        // hex: chosenColor
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

  // store user brand input in state
  handleChange = (e) => {
    this.setState({
      userBrandInput: e.target.value
    })
  };

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
        // console.log(colorsOnly);
        this.randomColours(colorsOnly)
        this.setState({
          colors: colorsOnly
        })
      })
  }

  randomColours = (array) => {
    this.setState({
      finalColours: []
    })
    const indexSize = 7
    for (let i = 0; i <= (indexSize - 1); i++) {
      const randomIndex = Math.floor(Math.random() * array.length)
      if (array[randomIndex] !== array[i]) {
        this.state.finalColours.push(array[randomIndex]);
        // console.log("SwatchArray", this.state.finalColours)
      }
    }
    // sometimes repeats... how to fix?
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
                <input id="search" className="search-text" type="text" placeholder="Search a make-up brand" onChange={this.handleChange} />
                <button className="search-button" onClick={this.handleClick} type="submit"><img src={paint} alt="paint splash icon" /></button>
              </form>
            </div>
          </div>
        </header>

        {/* Render swatches: */}
        <section className="swatches">
          <ul>
            {
              this.state.finalColours.map((color, index) => {
                const styles = {
                  backgroundColor: (color)
                };
                // console.log(color);
                return (
                  <li className="swatch" key={index}>
                    <button style={styles} className={color}onClick={this.handleSwatch}></button>
                    <h2>{color}</h2>
                  </li>
                )
              })
            }
          </ul>
        </section>
        <div>
        <p>hi again</p>
        <img src={this.state.url} alt={`Your makeup, perfectly paired with ${this.state.artist}'s work: '${this.state.title}'`}/>
      </div>
      </div>
    )
  }
}

export default App



  //   what to do when user submits search
  // handleClick = (e) => {
  //   e.preventDefault();
  //   //   go to the swatches, batches
  //   axios({
  //     url: `https://makeup-api.herokuapp.com/api/v1/products.json`,
  //     method: `GET`,
  //     responseType: `json`,
  //     params: {
  //       // brand: {this.userBrandInput} (maybe state or props)
  //       brand: `${this.state.userBrandInput}`,
  //     }
  //   })
  //     .then((res) => {
  //       // console.log(res.data);
  //       const colorsOnly = [];
  //       for (let i in res.data) {
  //         // console.log(res.data[i].product_colors);
  //         const products = res.data[i].product_colors;
  //         products.forEach((info) => {
  //           // console.log(info);
  //           colorsOnly.push(info.hex_value);
  //           // console.log(colorsOnly);
  //         })
  //       }
  //       // console.log(colorsOnly)
  //       this.randomColours(colorsOnly)
  //       if (colorsOnly.length > 7) {
  //         const smallArray = colorsOnly.splice(0, 7);
  //         this.setState({
  //           finalColours: smallArray
  //         })
  //       } else {
  //         const smallArray = colorsOnly;
  //         this.setState({
  //           colors: smallArray
  //         })
  //       }
  //     })
  // }

  // shuffle = (array) => {
  //   let currentIndex = array.length, temporaryValue, randomIndex;
  //   // While there remain elements to shuffle...
  //   while (0 !== currentIndex) {
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;
  //     // And swap it with the current element.
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }
  //   return array;
  // }

  //   what to do when user submits search



  // randomColours = (array) => {
  //   this.setState({
  //     finalColours: []
  //   })
  //   const indexSize = 7
  //   for (let i = 0; i <= (indexSize - 1); i++) {
  //     const randomIndex = Math.floor(Math.random() * array.length)
  //     if (array[randomIndex] !== array[i]) {
  //       this.setState({
  //         finalColours: array
  //       })
  //       // this.state.finalColours.push(array[randomIndex]);
  //       console.log(this.state.finalColours)
  //     }
  //   }
  // }