import React from 'react';
import { Component, Fragment } from 'react';
import axios from 'axios';
import Header from './Header.js';
import Swatches from './Swatches.js';
import Art from './Art.js';
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
      rijksColors: ["#737C84", "#FBF6E1", "#2F4F4F", "#E0CC91", "#000000", "#B5BFCC", "#B35A1F", "#F6ECF3", "#981313", "#F49B7A", "#2F4F4F", "#DDA5AA", "#E09714", "#367614", "#4019B1", "#4279DB", "#DE4153", "#62AD77", "#8268DC", "#850085", "#DF4C93"],
      brandNames: ["almay", "alva", "anna sui", "annabelle", "benefit", "boosh", "burt's bees", "butter london", "c'est moi", "cargo cosmetics", "china glaze", "clinique", "coastal classic creation", "colourpop", "covergirl", "dalish", "deciem", "dior", "dr.hauschka", "e.l.f.", "essie", "fenty", "glossier", "green people", "iman", "l'oreal", "lotus cosmetics usa", "maia's mineral galaxy", "marcelle", "marienatie", "maybelline", "milani", "mineral fusion", "misa", "mistura", "moov", "nudus", "nyx", "orly", "pacifica", "penny lane organics", "physicians formula", "piggy paint", "pure anada", "rejuva minerals", "revlon", "sally b's skin yummies", "salon perfect", "sante", "sinful colours", "smashbox", "stila", "suncoat", "w3llpeople", "wet n wild", "zorah", "zorah biocosmetiques"],
      anchorClass: "hidden",
      swatchesClass: "hidden",
      artClass: "hidden",
      brandsClass: "hidden"
    }
    this.scrollSwatches = React.createRef();
    this.scrollArt = React.createRef();
  }

  playVideo = () => {
    this.setState({
      play: true,
      fadeOut: true,
      mainText: true,
      brandsClass: ""
    })
  }

  // store user brand input in state
  handleChange = (e) => {

    this.setState({
      userBrandInput: e.target.value.toLowerCase(),
      anchorClass: "hidden"
    })
  };

  // calls makeupApi, returns array of colour hex codes
  makeupAxiosCall = () => {
    axios({
      url: `https://makeup-api.herokuapp.com/api/v1/products.json`,
      method: `GET`,
      responseType: `json`,
      params: {
        brand: `${this.state.userBrandInput}`,
      }
    })
      .then((res) => {
        const colorsOnly = [];
        for (let i in res.data) {
          const products = res.data[i].product_colors;
          products.forEach((info) => {
            colorsOnly.push(info.hex_value);
          })
        }
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
      }
    }
  }

  // handles clicks on search bar, populates 7 colour choices from makeup array call
  handleClick = (e) => {
    e.preventDefault();
    //   compares user input to array of makeup brand names accepted by the API
    if (this.state.brandNames.indexOf(this.state.userBrandInput) >= 0) {
      this.scrollSwatches.current.scrollIntoView({ behavior: 'smooth' });
      this.setState({
        swatchesClass: ""
      })
      this.makeupAxiosCall()
    } else {
      this.setState({
        anchorClass: ""
      })
    }
  }

  // what to do when user clicks desired colour
  handleSwatch = (e) => {
    e.preventDefault();
    const chosenColor = e.target.className
    const nearestColor = require('nearest-color').from(this.state.rijksColors);
    axios({
      url: `https://www.rijksmuseum.nl/api/en/collection`,
      method: `GET`,
      responseType: `json`,
      params: {
        key: 'wMbWv135',
        'f.normalized32Colors.hex': nearestColor(chosenColor),
        imgOnly: true,
      }
    })
      .then((res) => {
        const artResults = res.data.artObjects
        const artArray = [];
        artResults.map((art, index) => {

          artArray.push({
            arrUrl: res.data.artObjects[index].webImage.url,
            arrTitle: res.data.artObjects[index].title,
            arrArtist: res.data.artObjects[index].principalOrFirstMaker
          })

          const randomIndex = Math.floor(Math.random() * artArray.length)
          const artPiece = artArray[randomIndex]
          this.setState({

            url: artPiece.arrUrl,
            title: artPiece.arrTitle,
            artist: artPiece.arrArtist,
            artClass: ""
          }, this.scrollArt.current.scrollIntoView({ behavior: 'smooth' })
          )

        })
      })
  }

  // handles clicks on makeup brand anchor tags, populates 7 colour choices from makeup array call
  handleBrandClick = (e) => {
    const brand = e.target.name;
    this.setState({
      userBrandInput: brand,
      swatchesClass: ""
    }, () => { this.makeupAxiosCall() })
  }

  render() {
    return (
      <Fragment>
        <header id="start" className="start">
          <Header play={this.state.play} playVideo={this.playVideo} fadeOut={this.state.fadeOut} mainText={this.state.mainText} handleChange={this.handleChange} handleClick ={this.handleClick} anchorClass={this.state.anchorClass} />
        </header>

        {/* Render swatches: */}
        <section className={`swatches ${this.state.swatchesClass}`} id="swatchSection" ref={this.scrollSwatches}>
          <Swatches finalColours={this.state.finalColours} handleSwatch={this.handleSwatch} userBrandInput={this.state.userBrandInput} />
        </section>

        <section className={`art ${this.state.artClass}`} ref={this.scrollArt}>
          <Art url={this.state.url} artist={this.state.artist} title={this.state.title}/>
        </section>

        <section id="brands" className={this.state.brandsClass}>
          <BrandList
            brands={this.state.brandNames} click={this.handleBrandClick} />
        </section>

        <footer>
          <Footer />
        </footer>
      </Fragment>
    )
  }
}

export default App