import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ReactGoogleSheetConnector from "react-google-sheet-connector"
import { connectToSpreadsheet } from "react-google-sheet-connector"

class ProjectsSheet extends React.Component {
    _onMouseEnter(a, b) {
        console.log('dskfjhdskhbdkshg');
        console.log(a);
        console.log(this);
    }
  render() {
    let sheet = this.props.getSheet("projects");
    let projects = [];
    sheet.map((row, i) => {
        let project = {
        };
        for (let keyI = 0; keyI < sheet.keys.length; keyI++) {
            switch (sheet.keys[keyI]) {
                case 'name': project.name = row[keyI]; break;
                case 'lat': project.lat = Number(row[keyI]); break;
                case 'lon': project.lon = Number(row[keyI]); break;
                case 'website': project.website = row[keyI]; break;
                case 'description': project.description = row[keyI]; break;
                default: break;
            }
        }

        // Validate the record
        if (project.name && project.lat && project.lon) {
            projects.push(project);
        }
        return null;
    });
    let projectList = projects.map((project) =>
        <CreaMapPin
            key={project.name}
            lat={project.lat}
            lng={project.lon}
            text={project.name}
            website={project.website}
            description={project.description}
        />
    );

    let _onChildClick = (key, childProps) => {
    }

    let _onChildMouseEnter = (key, childProps) => {
    }

    let _onChildMouseLeave = (key, childProps) => {
    }

    return (
        <div style={{ position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'flex-end', alignItems: 'center'}}>

            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBq0HMCjnSaj9c-Rkm54-BQbobNjCSHizE' }}
                defaultCenter={{
                    lat: 0,
                    lng: 0
                }}
                defaultZoom={1}
                onChildClick={_onChildClick}
                onChildMouseEnter={_onChildMouseEnter}
                onChildMouseLeave={_onChildMouseLeave}
                options={{
                    styles: [
                      {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
                      {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
                      {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
                      {
                        featureType: 'administrative',
                        elementType: 'geometry.stroke',
                        stylers: [{color: '#c9b2a6'}]
                      },
                      {
                        featureType: 'administrative.land_parcel',
                        elementType: 'geometry.stroke',
                        stylers: [{color: '#dcd2be'}]
                      },
                      {
                        featureType: 'administrative.land_parcel',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#ae9e90'}]
                      },
                      {
                        featureType: 'landscape.natural',
                        elementType: 'geometry',
                        stylers: [{color: '#dfd2ae'}]
                      },
                      {
                        featureType: 'poi',
                        elementType: 'geometry',
                        stylers: [{color: '#dfd2ae'}]
                      },
                      {
                        featureType: 'poi',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#93817c'}]
                      },
                      {
                        featureType: 'poi.park',
                        elementType: 'geometry.fill',
                        stylers: [{color: '#a5b076'}]
                      },
                      {
                        featureType: 'poi.park',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#447530'}]
                      },
                      {
                        featureType: 'road',
                        elementType: 'geometry',
                        stylers: [{color: '#f5f1e6'}]
                      },
                      {
                        featureType: 'road.arterial',
                        elementType: 'geometry',
                        stylers: [{color: '#fdfcf8'}]
                      },
                      {
                        featureType: 'road.highway',
                        elementType: 'geometry',
                        stylers: [{color: '#f8c967'}]
                      },
                      {
                        featureType: 'road.highway',
                        elementType: 'geometry.stroke',
                        stylers: [{color: '#e9bc62'}]
                      },
                      {
                        featureType: 'road.highway.controlled_access',
                        elementType: 'geometry',
                        stylers: [{color: '#e98d58'}]
                      },
                      {
                        featureType: 'road.highway.controlled_access',
                        elementType: 'geometry.stroke',
                        stylers: [{color: '#db8555'}]
                      },
                      {
                        featureType: 'road.local',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#806b63'}]
                      },
                      {
                        featureType: 'transit.line',
                        elementType: 'geometry',
                        stylers: [{color: '#dfd2ae'}]
                      },
                      {
                        featureType: 'transit.line',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#8f7d77'}]
                      },
                      {
                        featureType: 'transit.line',
                        elementType: 'labels.text.stroke',
                        stylers: [{color: '#ebe3cd'}]
                      },
                      {
                        featureType: 'transit.station',
                        elementType: 'geometry',
                        stylers: [{color: '#dfd2ae'}]
                      },
                      {
                        featureType: 'water',
                        elementType: 'geometry.fill',
                        stylers: [{color: '#b9d3c2'}]
                      },
                      {
                        featureType: 'water',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#92998d'}]
                      }
                    ]
                  }}
            >

                {projectList}

            </GoogleMapReact>
        </div>
    )
    }
}

const K_WIDTH = 32;
const K_HEIGHT = 32;

const PinStyle = {
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT,
};

class CreaMapPin extends Component {
    static defaultProps = {
    };
    constructor(props) {
        super(props);
        this.state = {
            hover : false,
            clicked : false
        };
        this.onTouchStart = function() {
            this.setState( {hover: !this.state.hover});
        }
        this.onMouseEnter = function() {
            this.setState( {hover: true});
        }
        this.onMouseLeave = function() {
            this.setState( {hover: false});
        }
        this.onMouseDown = function() {
            this.setState( {clicked: !this.state.clicked});
        }
        this.onClick = function() {
            if (this.props.website) {
                window.open(this.props.website,'_blank');
            }
        }
    }
    render() {
        if (this.state.hover || this.state.clicked) {
            return (
                <div style={PinStyle}>
                <img src="/creattitude/icon_pin.png" alt="map_pin" width="32px"
                    onClick={(e) => this.onMouseDown(e)}
                />
                <div className="creaCard" onClick={(e) => this.onMouseDown(e)}>
                    <p className="creaTitle">{this.props.text}</p>
                    <p className="creaText">{this.props.description}</p>
                    <button
                        className="creaButton2"
                        onClick={(e) => this.onClick(e)}
                    >
                        Website
                    </button>
                </div>
                </div>
            );
        } else {
            return (
                <div style={PinStyle}>
                <img src="/creattitude/icon_pin.png" alt="map_pin" width="32px"
                    onClick={(e) => this.onMouseDown(e)}
                />
                </div>
            );
        }
    }
}

class Creattitude extends Component {
    static defaultProps = {
        center: {
            lat: -8.5069,
            lng: 115.2625
        },
        zoom: 5
    };

    renderProjects() {
        const projectsSheet = connectToSpreadsheet(ProjectsSheet);
        return (
            <div>
            {projectsSheet()}
            </div>
        );
    }

    render() {
    return (
        <div className="App">
          <ReactGoogleSheetConnector
              apiKey='AIzaSyBq0HMCjnSaj9c-Rkm54-BQbobNjCSHizE'
              spreadsheetId='117lC7D19fV-kOPEmZoxGIpLv_ks_e9x5FVx0oFl79-8'>
              <div>
                    {this.renderProjects()}
              </div>
          </ReactGoogleSheetConnector>
        </div>
    );
  }
}

export default Creattitude;
