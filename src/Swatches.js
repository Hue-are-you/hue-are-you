import { Component } from 'react';

class Swatches extends Component {
  render() {
    return(
      <div className="wrapper information">
        <h2>Pick a color that speaks to you!</h2>
        <ul>
          {
            this.props.finalColours.map((color, index) => {
              const styles = {
                backgroundColor: (color)
              };
              return (
                <li className="swatch" key={index}>
                  <button style={styles} className={color} onClick={this.props.handleSwatch}>{color}</button>
                </li>
              )
            })
          }
        </ul>
        <div class="stick">
          <h3>{this.props.userBrandInput}</h3>
          <div class="brush"></div>
          <div class="neck"></div>
          <div class="bristles">
            <div class="tip"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Swatches;