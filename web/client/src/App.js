import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class MenuItem extends React.Component {
  render() {
    return (
      <button className="menuItem">
        {this.props.title}
      </button>
    );
  }
}

class MenuBar extends React.Component {
    renderMenuItem(title) {
      return <MenuItem title={title}/>;
    }

    render() {
      let showMenu = false;
      if (showMenu) {
          return (
            <div>
              <div className="menuBar">
                {this.renderMenuItem('PRODUCT')}
                {this.renderMenuItem('TEAM')}
              </div>
            </div>
          );
      } else {
          return (<div/>);
      }
    }
}

class RequestTrialForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Thanks for your interest in Peeks!');
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <RoundButton title="Request Trial" />
      </form>
    );
  }
}

class RoundButton extends React.Component {
  render() {
    return (
      <button className="menuItem">
        {this.props.title}
      </button>
    );
  }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <div><table width='100%'><tbody><tr>
                <td align="left">
                    <table><tbody>
                    <tr height="10px"></tr>
                    <tr>
                    <td width="10px"></td>
                    <td><img src={logo} className="logo" alt="logo"/></td>
                    <td><div className="title"> Peeks</div></td>
                    </tr>
                    </tbody></table>
                </td>
                <td align="right"><MenuBar/></td>
                </tr></tbody></table></div>
                <div><table width='100%'><tbody><tr>
                <td width='10%'></td>
                <td width='40%'>
                <div className="textTitle" align="left">We make AR and VR a reality.</div>
                <div className="textDescription" align="left">Immersive web and mobile VR/AR technology now made available to the retail industry.</div>
                <div className="textDescription" align="left">Turn all your inventory into AR. Customers have fun purchasing online using our AR tool. It brings the fitting room into their hands.</div>
                </td>
                <td><img src="snapshot-product-1.png" alt="product1" width='100%'/></td>
                </tr></tbody></table></div>
                <div><table width='100%'><tbody><tr>
                <td><img src="snapshot-product-2.png" alt="product2" width='100%'/></td>
                <td width='40%'>
                <div className="textTitle" align="left">Web-browser friendly.</div>
                <div className="textDescription" align="left">Wether your store is accessible from the web or a native application, our technology brings VR to all software environments.</div>
                </td>
                <td width='10%'></td>
                </tr></tbody></table></div>
                <div><table width='100%'><tbody><tr>
                <td width='10%'></td>
                <td width='40%'>
                <div className="textTitle" align="left"><br/>Headset compatible.</div>
                <div className="textDescription" align="left">If you have a VR Headset, you can make it even more immersive.</div>
                </td>
                <td><img src="snapshot-product-3.png" alt="product3" width='100%'/></td>
                </tr></tbody></table></div>
                <div>
                <div className="textTitle"><br/><br/><br/>Meet our team!<br/><br/></div>
                <table align="center"><tbody><tr>
                <td align='center'>
                <div className="card">
                <img src="/team-ryan.png" alt="ryan"/>
                <p className="textGray">CEO</p>
                <p className="textHighlight">Ryan</p>
                <p></p>
                <p className="textSmall">Seasoned hyper growth entrepreneur. Expert in building products, commercializing products and IP, and business development. Executive leader responsible for AR platforms at Blippar. Early strategy leader (first 250 employees) at Uber. MBA from Johns Hopkins University.</p>
                <a href="https://www.linkedin.com/in/ryanschmaltz/"><img src="/linkedin.png" alt="linkedin" width='30'/></a>
                </div>
                </td>
                <td align='center'>
                <div className="card">
                <img src="/team-erwan.png" alt="erwan"/>
                <p className="textGray">CTO</p>
                <p className="textHighlight">Erwan</p>
                <p></p>
                <p className="textSmall">20+ years experience in 3D software/full stack and engineering leadership. Extensive early stage startup experience (Blippar, Toytalk, Loom.ai). Former Dreamworks Animation R&D engineering lead for feature films (Shrek, Madagascar) and the internal tools used for moviemaking.</p>
                <a href="https://www.linkedin.com/in/erwanmaigret/"><img src="/linkedin.png" alt="linkedin" width='30'/></a>
                </div>
                </td>
                </tr></tbody></table></div>
                <footer className="footer">
                <h1>We bring your inventory to life</h1>
                <p>Our VR technology is ultra easy to implement. Try it!</p>
                <a href="mailto:info@peeks.io"><p>Request Trial</p></a>
                <p className="copyright">&copy; All rights reserved - Peeks Technologies 2018</p>
                </footer>
            </div>
        );
        // <RequestTrialForm/>
    }
}

export default App;
