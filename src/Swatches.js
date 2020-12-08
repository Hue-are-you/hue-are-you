import axios from 'axios';
import { Component } from 'react';

class Swatches extends Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      colorNames: []
      // brandSelection: ''
    }
  }

  render() {
    return(
      // return swatches here
      
    )
  }
}

export default Swatches;






// componentDidMount() {
  //   axios({
  //     url: `https://makeup-api.herokuapp.com/api/v1/products.json`,
  //     method: `GET`,
  //     responseType: `json`,
  //     params: {
  //       // brand: brandSelection (maybe state or props)
  //     }
  //   })
  //   .then( (res)=> {
  //     // console.log(res.data); 
  //     // ^this takes forever because it is calling ALL brands... when we have a user-selected brand, it will be quicker!
  //     if (res.data.length > 6) {
  //       const shortenedArray = res.data.slice(0, 7)

  //       const coloursOnly = []
  //       shortenedArray.map( (product)=> {
  //         coloursOnly.push(product.product_colors[0].hex_value)
  //       })

  //       const namesOnly = [];
  //       shortenedArray.map( (product) => {
  //         namesOnly.push(product.product_colors[0].colour_name)
  //       })

  //       this.setState({
  //         color: coloursOnly,
  //         colorNames: namesOnly
  //       })
  //     } else {
  //       // basically same as above
  //     }

  //     // console.log(this.state.palette)
  //   })
  // }