import { Component } from 'react';
import video from './assets/smoke.mp4';
import paint from './assets/paint-splash.png';
import axios from 'axios';
import LoadingText from './LoadingText.js';
import BrandList from './BrandList.js';
import Footer from './Footer.js';

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
      finalColours: [],
      rijksColors: ["#737C84", "#FBF6E1", "#2F4F4F", "#E0CC91", "#000000", "#B5BFCC", "#B35A1F", "#F6ECF3", "#981313", "#F49B7A", "#2F4F4F", "#DDA5AA", "#E09714", "#367614", "#4019B1", "#4279DB", "#DE4153", "#62AD77", "#8268DC", "#850085", "#DF4C93" ],
      brandNames: ["almay", "alva", "anna sui", "annabelle", "benefit", "boosh", "burt's bees", "butter london", "c'est moi", "cargo cosmetics", "china glaze", "clinique", "coastal classic creation", "colourpop", "covergirl", "dalish", "deciem", "dior", "dr.hauschka", "e.l.f.", "essie", "fenty", "glossier", "green people", "iman", "l'oreal", "lotus cosmetics usa", "maia's mineral galaxy", "marcelle", "marienatie", "maybelline", "milani", "mineral fusion", "misa", "mistura", "moov", "nudus", "nyx", "orly", "pacifica", "penny lane organics", "physicians formula", "piggy paint", "pure anada", "rejuva minerals", "revlon", "sally b's skin yummies", "salon perfect", "sante", "sinful colours", "smashbox", "stila", "suncoat", "w3llpeople", "wet n wild", "zorah", "zorah biocosmetiques"],
      anchorClass: "hidden"
    }
  }

  playVideo = () => {
    this.setState({
      play: true,
      fadeOut: true,
      mainText: true
    })
  }

  handleBrandClick = (e) => {
    // e.preventDefault();
    console.log(e);
    const brand = e.target.name
    console.log(brand);
    this.setState({
      userBrandInput: brand
    })
  }

  // what to do when user clicks desired colour
  handleSwatch = (e) => {
    e.preventDefault();
    //  go to the art page
    const chosenColor = e.target.className
    console.log(chosenColor);
    const nearestColor = require('nearest-color').from(this.state.rijksColors);
    console.log(nearestColor(chosenColor));
      axios({
      url: `https://www.rijksmuseum.nl/api/en/collection`,
      method: `GET`,
      responseType: `json`,
      params: {
        key: 'wMbWv135',
        'f.normalized32Colors.hex': nearestColor(chosenColor),
        imgOnly: true,
        // hex: chosenColor
        // ^ or whatever hex value user chooses
      }
    })
      .then((res) => {
        // console.log(res)
        const artResults = res.data.artObjects
        // console.log("artResults", artResults);
        const artArray = [];
        artResults.map((art, index) => {
          
          artArray.push({
            arrUrl: res.data.artObjects[index].webImage.url,
            arrTitle: res.data.artObjects[index].title,
            arrArtist: res.data.artObjects[index].principalOrFirstMaker
          })

          // console.log("artArray", artArray);
         
          
          const randomIndex = Math.floor(Math.random() * artArray.length)
          const artPiece = artArray[randomIndex]
          this.setState({
              
          url: artPiece.arrUrl,
          title: artPiece.arrTitle,
          artist: artPiece.arrArtist
            })
          
        })

        // this.setState({
        //   url: res.data.artObjects[0].webImage.url,
        //   title: res.data.artObjects[0].title,
        //   artist: res.data.artObjects[0].principalOrFirstMaker
        // })
      })
  }

  // store user brand input in state
  handleChange = (e) => {
    this.setState({
      userBrandInput: e.target.value,
      anchorClass: "hidden"
    })
  };

  // calls makeupApi, returns array of colour hex codes
  makeupAxiosCall = () =>  {
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

  // handles clicks on makeup brand anchor tags, populates 7 colour choices from makeup array call
  handleBrandClick = (e) => {
    // e.preventDefault();
    const brand = e.target.name
    console.log(brand);
    this.setState({
      userBrandInput: brand
        })
    this.makeupAxiosCall()
  }

   // handles clicks on search bar, populates 7 colour choices from makeup array call
  handleClick = (e) => {
    e.preventDefault();
    //   compares user input to array of makeup brand names accepted by the API
    if (this.state.brandNames.indexOf(this.state.userBrandInput) >=0) {
      console.log("matches");
      // Makes Axios call if input matches accepted values
      this.makeupAxiosCall()
    }else{
      console.log("no match");
      // show error options if no match
      this.setState({
        anchorClass: ""
      })
    }
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
        <header id="start" className="start">
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
          <div>
            {/* <div className="arrow">
              <span></span>
              <span></span>
            </div> */}
          </div>
            <a className={this.state.anchorClass} href="#brands">This brand is not supported, click here for supported brands</a>
        </header>

        {/* Render swatches: */}
        <section className="swatches" id="swatchSection">
          <div className="wrapper information">
            <h2>Pick a color that speaks to you!</h2>
            <ul>
              {
                this.state.finalColours.map((color, index) => {
                  const styles = {
                    backgroundColor: (color)
                  };
                  // console.log(color);
                  return (
                    <li className="swatch" key={index}>
                      <button style={styles} className={color} onClick={this.handleSwatch}>{color}</button>
                    </li>
                  )
                })
              }
            </ul>
            <div class="stick">
              <h3>{this.state.userBrandInput}</h3>
              <div class="brush"></div>
              <div class="neck"></div>
              <div class="bristles">
                <div class="tip"></div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="art">
          <div className="wrapper">
            <img src={this.state.url} alt={`Your makeup, perfectly paired with ${this.state.artist}'s work: '${this.state.title}'`}/>
            <p>{this.state.artist}</p>
            <p>{this.state.title}</p>
          </div>
        </section>

        <section id="brands">
          <BrandList
            brands={this.state.brandNames} click={this.handleBrandClick} />
        </section>

        <footer>
          <Footer />
        </footer>
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