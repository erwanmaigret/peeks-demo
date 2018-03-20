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
    renderImage(element) {
        if (typeof (element.canvas) === 'string') {
            const script = document.createElement('script');
            script.async = true;
            script.src = "/widgets_load_products.js";
            document.body.appendChild(script);
            return (
                <canvas id={element.canvas} width="300px" height="250px" className="box"/>
            );
        } else if (element.imageShadows) {
            return (
                <img src={element.image} alt="product" width="300px" className="box"/>
            );
        } else {
            return (
                <img src={element.image} alt="product" width="300px"/>
            );
        }
    }

    renderSection(element, isRight, section) {
        if (window.innerWidth < 650) {
            return (
                <div className={section}>
                <table align="center" width="100%"><tbody><tr><td>
                    <p className="textTitle">{element.title}</p>
                    <p className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></p>
                </td></tr>
                <tr><td width="50%">{this.renderImage(element)}</td></tr>
                </tbody></table></div>
            );
        } else {
            if (isRight) {
                return (
                    <div className={section}><table align="center"><tbody><tr>
                    <td width="50%">{this.renderImage(element)}</td>
                    <td width="5%"></td>
                    <td width="45%" align="left">
                        <div className="textTitle">{element.title}</div>
                        <div className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></div>
                    </td>
                    </tr></tbody></table></div>
                );
            } else {
                return (
                    <div className={section}><table align="center"><tbody><tr>
                    <td width="5%" ></td>
                    <td width="45%" align="left">
                        <div className="textTitle">{element.title}</div>
                        <div className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></div>
                    </td><td width="50%">{this.renderImage(element)}</td>
                    </tr></tbody></table></div>
                );
            }
        }
    }

    render() {
        const elements = {
            'widget': {
                title: 'Peeks Widget.',
                description: '<p>Enable <b>Augmented Reality</b> and <b>Virtual Reality</b> within your digital properties.</p><p>The peeks player can be embedded as a widget inside your own solution:'+
                '<table width="100%" cellspacing="10"><tbody>' +
                '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet.svg" alt="bullet" width="20px"/></td><td align="left">As a DOM widget inside your own <b>website</b></td><td width="10%"/>' +
                '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet.svg" alt="bullet" width="20px"/></td><td align="left">As a GUI component of a native <b>mobile</b> application.</td><td width="10%"/>' +
                '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet.svg" alt="bullet" width="20px"/></td><td align="left">As a <b>customizable ad</b> with video, AR, 3d and animations!</td><td width="10%"/>' +
                '</tbody></table></p>',
                image: 'snapshot-widget.png',
                imageShadows: true,
                canvas: 'peeks_shoe',
            },
            'tryon': {
                title: 'Fitting Room.',
                description: '<p>Enter the virtual fitting room and try-on products on yourself.</p>'+
                    '<p>Use the best solution adapted to your products:' +
                    '<table width="100%" cellspacing="10"><tbody>' +
                    '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet2.svg" alt="bullet" width="20px"/></td><td align="left">AR <b>Face tracking</b> for head wearables (glasses, hats).</td><td width="10%"/>' +
                    '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet2.svg" alt="bullet" width="20px"/></td><td align="left">2D photo montages from simple photographs.</td><td width="10%"/>' +
                    '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet2.svg" alt="bullet" width="20px"/></td><td align="left">Full body <b>3D avatar</b> mapping.</td><td width="10%"/>' +
                    '</tbody></table></p>',
                image: 'snapshot-face-tracking.png',
            },
            'browser': {
                title: 'VR Browser.',
                description: '<p>Explore and navigate through all your inventory inside an <b>immersive 3d</b> environment using a Virtual Reality heaset.</p>' +
                    '<p>Expose your products in our VR browser and get more exposure.</p>',
                image: 'snapshot-browser.png',
                imageShadows: true,
            },
            'user': {
                title: 'User Profile.',
                description:
                    '<p>Let your customers setup their user profile and <b>virtual mannequin</b> for optimized shopping experience.</p>' +
                    '<p>Collect new types of <b>analytics</b> for a more targeted product recommendation.</p>',
                image: 'snapshot-user.png',
                imageShadows: true,
            },
        };

        return (
            <div>
            <div className="textTitle">A solution for everyone</div>
            <div className="textDescription">Extend your brand with the right Mixed Reality experience for your clients.</div>
            <img src="/ui-shape-underline.svg" alt="underline" width="50%"/>
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
    renderExample(element) {
        if (element.image) {
            return (
                <img src={element.image} alt="product1" height='400px'/>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    renderSection(element, isRight, section) {
        if (window.innerWidth < 650) {
            return (
                <div>
                <table align="center" width="100%"><tbody>
                <tr>
                <td width="10%"></td>
                <td width="80%">
                    <p className="textTitle">{element.title}</p>
                    <p className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></p>
                </td>
                <td width="10%"></td>
                </tr>
                <tr></tr>
                </tbody></table>{this.renderExample(element)}</div>
            );
        } else {
            if (isRight) {
                return (
                    <div><table align="center"><tbody><tr>
                    <td width="50%">{this.renderExample(element)}</td>
                    <td width="40%">
                        <p className="textTitle" align="left">{element.title}</p>
                        <p className="textDescription" align="left" dangerouslySetInnerHTML={{__html: element.description}}></p>
                    </td>
                    <td width="10%"></td>
                    </tr></tbody></table></div>
                );
            } else {
                return (
                    <div><table align="center"><tbody><tr>
                    <td width="10%"></td>
                    <td width="40%">
                        <p className="textTitle" align="left">{element.title}</p>
                        <p className="textDescription" align="left" dangerouslySetInnerHTML={{__html: element.description}}></p>
                    </td>
                    <td width="50%">{this.renderExample(element)}</td>
                    </tr></tbody></table></div>
                );
            }
        }
    }

    render() {
        const elements = {
            'intro': {
                title: 'We make AR and VR a reality.',
                description: '<p>Immersive web and mobile VR/AR technology now made available to the retail industry.</p><p>Turn all your inventory into AR. Customers have fun purchasing online using our AR tool. It brings the fitting room into their hands.</p>',
                image: "snapshot-product-1.png",
            },
            'browser': {
                title: 'Web-browser friendly.',
                description: '<p>Wether your store is accessible from the web or a native application, our technology brings VR to all software environments.</p>' +
                    '<p>We support all inventories, no kidding. Food, furniture, clothes, buildings, cars.. all!</p>',
                image: "snapshot-product-2.png",
            },
            'headset': {
                title: 'Headset compatible.',
                description: '<p>If you have a VR Headset, you can make it even more immersive.</p>' +
                    '<p>We are compatible with all VR headsets from the simplest <b>Google Cardboard</b></p>',
                image: "snapshot-product-3.png",
            },
        };

        return (
            <div>
            {this.renderSection(elements['intro'], false, 'sectionBlank')}
            {this.renderSection(elements['browser'], true, 'sectionBlank')}
            {this.renderSection(elements['headset'], false, 'sectionBlank')}
            </div>
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
