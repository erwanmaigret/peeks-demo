import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Products from './Products.js'
import Sdk from './Sdk.js'
import Home from './Home.js'
//import store from "./store.js";

function isPhone() {
    var userAgent = navigator.userAgent.toLowerCase();
    var value =
        userAgent.search('iphone') !== -1 ||
        userAgent.search('ipod') !== -1 ||
        userAgent.search('android') !== -1;
    return value;
}

function getLayoutWidth() {
    if (isPhone()) {
        // Always display in portrait mode even if the phone is landscape
        return 0;
        /*
        if (window.orientation !== -90 && window.orientation !== 90) {
            return 0;
        } else {
            return 1;
        }
        */
    } else {
        if (window.innerWidth < 650) {
            return 0;
        } else {
            return 1;
        }
    }
}

class Team extends React.Component {
    renderTeamMember(member) {
        return (
            <td align='center'>
            <div className="cardPortrait">
                <img src={member.photo} alt={member.name}/>
                <p className="textGray">{member.title}</p>
                <p className="textHighlight">{member.name}</p>
                <div className="cardPortraitDescription"><p className="textSmall" align="justify">{member.blurb}</p></div>
                <a href={member.linkedin} target="_blank"><img src="/linkedin.png" alt="linkedin" width='30'/></a>
            </div>
            </td>
        );
    }

    render() {
        const members = {
            'ryan': {
                name: 'Ryan',
                title: 'CEO',
                photo: '/team-ryan.png',
                blurb: 'Seasoned hyper growth entrepreneur. Expert in building products, commercializing products and IP, and business development. Executive leader responsible for AR platforms at Blippar. Early strategy leader (first 250 employees) at Uber. MBA from Johns Hopkins University.',
                linkedin: 'https://www.linkedin.com/in/ryanschmaltz/',
            },
            'erwan': {
                name: 'Erwan',
                title: 'CTO',
                photo: '/team-erwan.png',
                blurb: '20+ years experience in 3D software/full stack and engineering leadership. Extensive early stage startup experience (Blippar, Toytalk, Loom.ai). Former Dreamworks Animation R&D engineering lead for feature films (Shrek, Madagascar) and the internal tools used for moviemaking.',
                linkedin: 'https://www.linkedin.com/in/erwanmaigret/',
            },
        };

        const layout = getLayoutWidth();
        if (layout === 0) {
            return (
                <div>
                <div className="textTitle">Meet our team!</div>
                <table align="center"><tbody><tr>
                    {this.renderTeamMember(members['ryan'])}
                </tr><tr>
                    {this.renderTeamMember(members['erwan'])}
                </tr></tbody></table>
                </div>
            )
        } else {
            return (
                <div>
                <div className="textTitle">Meet our team!</div>
                <table align="center"><tbody><tr>
                    {this.renderTeamMember(members['ryan'])}
                    {this.renderTeamMember(members['erwan'])}
                </tr></tbody></table>
                </div>
            )
        }
    }
}

class MenuItem extends React.Component {
    onClick() {
        let pageName = this.props.title.toLowerCase();
        if (pageName === 'home') {
            window.location.href = '/';
        } else {
            window.location.href = '/' + pageName;
        }
    }

    render() {
        const paths = window.location.pathname.split("/");
        let path = paths[paths.length - 1];
        if (path === '') {
            path = 'home';
        }
        const page = this.props.title.toLowerCase();
        if (page === path) {
            return (<button className="menuItemSelected" onClick={(e) => this.onClick(e)}>{this.props.title}</button>);
        } else {
            return (<button className="menuItem" onClick={(e) => this.onClick(e)}>{this.props.title}</button>);
        }
    }
}

class MenuBar extends React.Component {
    renderMenuItem(title) {
      return <MenuItem title={title}/>;
    }

    render() {
      return (
        <Router>
        <div>
            <div className="menuBar">
              {this.renderMenuItem('HOME')}
              {this.renderMenuItem('PRODUCTS')}
              {this.renderMenuItem('SDK')}
              {this.renderMenuItem('TEAM')}
            </div>
        </div>
        </Router>
      );
    }
}

class Pages extends React.Component {
    renderMenuItem(title) {
      return <MenuItem title={title}/>;
    }

    renderRoutes() {
      return (
          <div>
              <Route exact path="/" component={Home} />
              <Route path="/team" component={Team} />
              <Route path="/products" component={Products} />
              <Route path="/sdk" component={Sdk} />
          </div>
      );
    }

    render() {
      return (
        <Router>
        <div>
            {this.renderRoutes()}
        </div>
        </Router>
      );
    }
}

class App extends Component {
    resize = () => {
        this.forceUpdate();
    }

    componentDidMount() {
      window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resize)
    }

    render() {
    return (
        <div className="App">
        <div><table width='100%' cellPadding="0" cellSpacing="5"><tbody><tr>
        <td align="left">
            <table><tbody>
            <tr>
            <td width="2px"></td>
            <td><img src={logo} className="logo" alt="logo" width="20px"/></td>
            <td><div className="logoText">Peeks</div></td>
            </tr>
            </tbody></table>
        </td>
        <td align="right" valign="top"><MenuBar/></td>
        </tr></tbody></table></div>
        <Pages/>
        <footer className="footer">
        <h1>We bring your inventory to life</h1>
        <br/>
        <p>Our VR technology is ultra easy to implement. Try it!</p>
        <a href="mailto:info@peeks.io"><p>Request Trial</p></a>
        <br/><br/>
        <p className="copyright">&copy; All rights reserved - Peeks Technologies 2018</p>
        </footer>
        </div>
    );
  }
}

export default App;
