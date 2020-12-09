import { Component } from 'react';


class BrandList extends Component {
  
  render() { 
    return (
      <div className="wrapper error-list">
        <h2>Available Brands</h2>
        <ul>
          {
            this.props.brands.map((brand, index) => {
              return (
                <li key={index} className="brands">{brand}</li>
              )
            })
            
          }
        </ul>
      </div>
    )
  }
}
export default BrandList