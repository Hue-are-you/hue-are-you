import { Component, Fragment } from 'react';
import LoadingText from './LoadingText.js';
import video from './assets/smoke.mp4';
import paint from './assets/paint-splash.png';

class Header extends Component {
  render() {
    return(
      <Fragment>
        <div className="banner">
          <video src={video} autoPlay={this.props.play} loop="true" playsInline></video>
          <div className="search">
            <div onClick={this.props.playVideo} className={this.props.fadeOut ? 'hide' : null}>
              <LoadingText />
            </div>
            <h1 className={this.props.mainText ? 'showText' : null}>Hue are you?</h1>
            <form action="" className={`search-box ${this.props.mainText ? 'showSearch' : null}`}>
              <label htmlFor="search" className="sr-only">Search a make-up brand</label>
              <input id="search" className="search-text" type="text" placeholder="Search a make-up brand" onChange={this.props.handleChange} />
              <button className="search-button" onClick={this.props.handleClick} type="submit"><img src={paint} alt="paint splash icon" /></button>
            </form>
          </div>
        </div>
        <div className={`errorMessage ${this.props.anchorClass}`}>
          <a className="message" href="#brands">This brand is not supported, click here for supported brands</a>
          <a href="#brands">
            <div className="arrow">
              <span></span>
              <span></span>
            </div>
          </a>
        </div>

      </Fragment>
    )
  }
}

export default Header;