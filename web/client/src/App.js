import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
import Products from './Products.js'
import Sdk from './Sdk.js'
import Home from './Home.js'
//import store from "./store.js";
import { Timeline } from 'react-twitter-widgets'
import VeryReal from './VeryReal.js';

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

class About extends React.Component {
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

    renderBlurb() {
        return (
            <table align="center" width="100%"><tbody>
                <tr>
                <td width="10%"></td>
                <td width="80%">
                <div className="textDescription" align="left">
                <p>
                Founded in 2017 and with more than a decade of combined experience in VR and AR, we at Peeks feel that the internet is not being effectively harnessed for AR and VR.
                </p><p>
                From browsing the web in VR and AR hardware to incorporating immersive experiences that benefit a brand’s audience, Peeks is the bridge between exclusively 2D content and custom created VR or AR content.
                </p><p>
                We help you reach your audience in new and immersive ways that help drive the outcomes your brand seeks.
                </p><p>
                From exposure to conversion to retention, Peeks provides meaningful and measurable value to brands across the full digital marketing funnel.
                </p>
                </div>
                </td>
                <td width="10%"></td>
                </tr>
                <tr></tr>
            </tbody></table>
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
                {this.renderBlurb()}
                <div className="textTitle2">Meet our team!</div>
                <table align="center"><tbody><tr>
                    {this.renderTeamMember(members['ryan'])}
                </tr><tr>
                    {this.renderTeamMember(members['erwan'])}
                </tr></tbody></table>
                <table align="center" width="100%"><tbody>
                    <tr>
                    <td width="10%"></td>
                    <td width="80%">
                        <Timeline
                            dataSource={{
                            sourceType: 'profile',
                            screenName: 'peeksio'
                            }}
                            options={{
                            username: 'PeeksIo',
                            height: '300'
                            }}
                        />
                    </td>
                    <td width="10%"></td>
                    </tr>
                    <tr></tr>
                </tbody></table>
                </div>
            )
        } else {
            return (
                <div>
                {this.renderBlurb()}
                <div className="textTitle2">Meet our team!</div>
                <table align="center"><tbody><tr>
                    {this.renderTeamMember(members['ryan'])}
                    {this.renderTeamMember(members['erwan'])}
                </tr></tbody></table>
                <table align="center" width="100%"><tbody>
                    <tr>
                    <td width="10%"></td>
                    <td width="80%">
                        <Timeline
                            dataSource={{
                            sourceType: 'profile',
                            screenName: 'peeksio'
                            }}
                            options={{
                            username: 'PeeksIo',
                            height: '300'
                            }}
                        />
                    </td>
                    <td width="10%"></td>
                    </tr>
                    <tr></tr>
                </tbody></table>
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
              {this.renderMenuItem('ABOUT')}
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
              <Route path="/about" component={About} />
              <Route path="/products" component={Products} />
              <Route path="/sdk" component={Sdk} />
              <Route path="/ArVisit" component={VeryReal} />
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
/*
<table><tbody>
<tr>
<td width="2px"></td>
<td><img src={logo} className="logo" alt="logo" width="20px"/></td>
<td><div className="logoText">Peeks</div></td>
</tr>
</tbody></table>
*/

    return (
        <div className="App">
        <header className="header">
        <div><table width='100%' cellPadding="0" cellSpacing="5"><tbody><tr>
        <td align="left">
            <table><tbody>
            <tr>
            <td width="2px"></td>
            <td><div className="logoText">Peeks</div></td>
            </tr>
            </tbody></table>
        </td>
        <td align="right" valign="top"><MenuBar/></td>
        </tr></tbody></table></div>
        </header>
        <Pages/>
        <footer className="footer">
        <div className="textTitleWhite">Immerse your audience in your brand’s story</div>
        <p>Our VR technology is ultra easy to implement! <a href="mailto:info@peeks.io">Request Trial</a></p>
        <div>
            <a href="https://www.facebook.com/peeks.io/" target="_blank" rel="noopener noreferrer"><img src="/icon_facebook.png" alt="facebook" width="25px"/></a>&nbsp;&nbsp;
            <a href="https://twitter.com/PeeksIo" target="_blank" rel="noopener noreferrer"><img src="/icon_twitter.png" alt="twitter" width="25px"/></a>&nbsp;&nbsp;
            <a href="https://www.linkedin.com/company/peeks-technologies/" target="_blank" rel="noopener noreferrer"><img src="/icon_linkedin.png" alt="twitter" width="25px"/></a>&nbsp;&nbsp;
        </div>
        <p className="copyright">&copy; All rights reserved - Peeks Technologies 2018</p>
        </footer>
        </div>
    );
  }
}

export default App;
