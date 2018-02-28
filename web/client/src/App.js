import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class Team extends React.Component {
    renderTeamMember(member) {
        return (
            <td align='center'>
            <div className="cardPortrait">
                <img src={member.photo} alt={member.name}/>
                <p className="textGray">{member.title}</p>
                <p className="textHighlight">{member.name}</p>
                <div className="cardPortraitDescription"><p className="textSmall">{member.blurb}</p></div>
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

        if (window.innerWidth < 650) {
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

class Products extends React.Component {
    renderSection(element, isRight, section) {
        if (window.innerWidth < 650) {
            return (
                <div className={section}>
                <table align="center" width="100%"><tbody><tr><td>
                    <p className="textTitle">{element.title}</p>
                    <p className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></p>
                </td></tr>
                <tr><td width="50%" className="box">
                </td></tr>
                </tbody></table></div>
            );
        } else {
            if (isRight) {
                return (
                    <div className={section}><table align="center"><tbody><tr>
                    <td width="50%" className="box">
                    </td><td width="50%">
                        <p className="textTitle">{element.title}</p>
                        <p className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></p>
                    </td>
                    </tr></tbody></table></div>
                );
            } else {
                return (
                    <div className={section}><table align="center"><tbody><tr>
                    <td width="50%">
                        <p className="textTitle">{element.title}</p>
                        <p className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></p>
                    </td><td width="50%" className="box">
                    </td>
                    </tr></tbody></table></div>
                );
            }
        }
    }

    render() {
        const elements = {
            'widget': {
                title: 'Peeks Widget',
                description: 'Enable <b>Augmented Reality</b> and <b>Virtual Reality</b> within your digital properties.<br><br>Embed peeks viewer as a widget into your webpage.<br><ul align="left"><li>Websites</li><li>Applications</li><li>Online ads</li></ul>',
            },
            'tryon': {
                title: 'Fitting Room',
                description: 'Enter the virtual <b>fitting</b> room and try-on products on yourself. <b>Photo-booth fitting example (looping gif)</b>.',
            },
            'browser': {
                title: 'VR Explorer',
                description: 'Customizable user profile and avatar for optimal virtual shopping experience. Explore your product line within Virtuyal Reality. Enter a URL<br><b>try it!.</b>',
            },
            'user': {
                title: 'User Profile',
                description: 'Customizable user profile and avatar for optimal virtual shopping experience.<br><br>Size examples....',
            },
        };

        return (
            <div>
            <div className="textTitle">A solution for everyone</div>
            <div className="textDescription">Extend your brand with the right XR experience for your clients.</div>
            {this.renderSection(elements['widget'], false, 'sectionBlank')}
            {this.renderSection(elements['tryon'], true, 'sectionBlank')}
            {this.renderSection(elements['browser'], false, 'sectionBlank')}
            {this.renderSection(elements['user'], true, 'sectionBlank')}
            </div>
        );
    }
}

class Api extends React.Component {
    render() {
        return (
            <div>
                <div className="sectionTitle">Developer API</div>
                <div className="textTitle">Developer API</div>
                <div className="sectionA">Direct access to Computer Vision processing for your own custom use</div>
                <div className="section2">Developer API</div>
                <div className="section3">Developer API</div>
                <div className="section4">Developer API</div>
                <p>Get direct access to services for building your own virtual shopping experience based on your products photographs.</p>
            </div>
    )}
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
        return (
            <button className="menuItem"
                onClick={(e) => this.onClick(e)}
            >
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
      return (
        <Router>
        <div>
            <div className="menuBar">
              {this.renderMenuItem('HOME')}
              {this.renderMenuItem('PRODUCTS')}
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
              <Route path="/api" component={Api} />
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

/*
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
*/

class Home extends Component {
    render() {
        return (
            <div>
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
                </div>
            </div>
        );
        // <RequestTrialForm/>
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
