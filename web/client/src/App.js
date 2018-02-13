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
      return (
        <div>
          <div className="menuBar">
            {this.renderMenuItem('PRODUCT')}
            {this.renderMenuItem('TEAM')}
          </div>
        </div>
      );
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
        <input type="submit" value="Request Trial" />
      </form>
    );
  }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="header">
                    <div><table width='100%'><tbody><tr>
                    <td align="left">
                        <table><tbody><tr>
                        <td><img src={logo} className="logo" alt="logo"/></td>
                        <td><div className="title"> Peeks</div></td>
                        </tr></tbody></table>
                    </td>
                    <td align="right"><MenuBar/></td>
                    </tr></tbody></table></div>
                </header>
                <div><table width='100%'><tbody><tr>
                <td>
                <div className="h1">We make VR a reality.</div>
                <p>Immersive web and mobile VR/AR technology now made available to the retail industry.</p>
                </td>
                </tr></tbody></table></div>
                <div>
                <div className="h1">Meet our team.</div>
                <table width='100%'><tbody><tr>
                <td>
                <p>Ryan</p>
                </td>
                <td>
                <p>Erwan</p>
                </td>
                </tr></tbody></table></div>
                <footer className="footer">
                <h1>We bring your inventory to life</h1>
                <p>Our VR technology is ultra easy to implement. Try it!</p>
                <RequestTrialForm/>
                <p className="copyright">&copy; All rights reserved - Peeks Technologies 2018</p>
                </footer>
            </div>
        );
    }
}

export default App;
