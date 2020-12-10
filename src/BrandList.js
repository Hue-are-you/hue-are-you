import { Component } from 'react';

class BrandList extends Component {
  render() { 
    return (
      <div className="wrapper errorList">
        <h2>Available Brands</h2>
        <ul>
          {
            this.props.brands.map((brand, index) => {
              return (
                <li key={index} className="brands" ><a href="#swatchSection" onClick={this.props.click}name={brand}>{brand}</a></li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
export default BrandList