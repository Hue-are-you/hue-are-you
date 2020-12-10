import { Component } from 'react';

class Art extends Component {
  render() {
    return(
      <div className="wrapper">
        <h2>You might <em>Rijk</em> this Picture!</h2>
        <div className="artFrame">
          <div className="artCorset">
            <img src={this.props.url} alt={`Your makeup, perfectly paired with ${this.props.artist}'s work: '${this.props.title}'`} />
          </div>
        </div>
        <p><span>Artist: </span>{this.props.artist}</p>
        <p><span>Title: </span>{this.props.title}</p>
      </div>
    )
  }
}

export default Art;