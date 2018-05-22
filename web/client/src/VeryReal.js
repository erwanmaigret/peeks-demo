import React, { Component } from 'react';
import './App.css';
import ReactGoogleSheetConnector from "react-google-sheet-connector"
import { connectToSpreadsheet } from "react-google-sheet-connector"
import VeryRealSheet from './VeryRealSheet.js';

class VeryReal extends Component {
    renderProjects() {
        const sheet = connectToSpreadsheet(VeryRealSheet);
        return (
            <div>
            {sheet()}
            </div>
        );
    }

    render() {
        return (
            <div className="App">
                <ReactGoogleSheetConnector
                  apiKey='AIzaSyBq0HMCjnSaj9c-Rkm54-BQbobNjCSHizE'
                  spreadsheetId='1UmICO3AP5nhpZuLm6A6Ak4fncGXJwI3PyyvrRglv4tk'>
                  <div>
                        {this.renderProjects()}
                  </div>
              </ReactGoogleSheetConnector>
            </div>
        );
    }
}

export default VeryReal;
