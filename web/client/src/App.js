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
            {this.renderMenuItem('PRICING')}
            {this.renderMenuItem('API')}
            {this.renderMenuItem('TEAM')}
            {this.renderMenuItem('CONTACT')}
          </div>
        </div>
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
                <p className="intro">
                More coming soon.
                </p>
                <footer className="footer">
                </footer>
            </div>
        );
    }
}

export default App;
