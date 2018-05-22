import React, { Component } from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';
import Modal from 'react-modal';
import {geolocated} from 'react-geolocated';

const typeRoman = 'Roman London';
const typePub = 'Pub Buildings';
const typeMusic = 'Music Scene';

class VeryRealSheet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            lat: 51.51622,
            lon: -0.10172,
        }
    }

    onClickFilter(filter) {
        if (this.state.filter === filter) {
            this.setState({filter: ''});
        } else {
            this.setState({filter: filter});
        }
    }

  render() {
    let sheet = this.props.getSheet("POI");
    let projects = {};
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
                case 'sound': project.sound = row[keyI]; break;
                case 'label': project.name = row[keyI]; break;
                case 'type': project.type = row[keyI]; break;
                default: break;
            }
        }

        // Validate the record
        if (project.name && project.lat && project.lon) {
            if (projects[project.type] === undefined) {
                projects[project.type] = [];
            }
            projects[project.type].push(project);
        }
        return null;
    });

    let pinsRoyal = projects[typeRoman] && (this.state.filter === typeRoman || this.state.filter === '')
        ? projects[typeRoman].map((project) =>
            <VeryRealPin key={project.name} lat={project.lat} lng={project.lon} text={project.name} sound={project.sound} website={project.website} description={project.description} category={project.type} />)
        : undefined;
    let pinsGangster = projects[typePub] && (this.state.filter === typePub || this.state.filter === '')
        ? projects[typePub].map((project) =>
            <VeryRealPin key={project.name} lat={project.lat} lng={project.lon} text={project.name} sound={project.sound} website={project.website} description={project.description} category={project.type} />)
        : undefined;
    let pinsMusic = projects[typeMusic] && (this.state.filter === typeMusic || this.state.filter === '')
        ? projects[typeMusic].map((project) =>
            <VeryRealPin key={project.name} lat={project.lat} lng={project.lon} text={project.name} sound={project.sound} website={project.website} description={project.description} category={project.type} />)
        : undefined;

    let _onChildClick = (key, childProps) => {
    }

    let _onChildMouseEnter = (key, childProps) => {
    }

    let _onChildMouseLeave = (key, childProps) => {
    }

    let latitude = this.props.coords ? this.props.coords.latitude : this.state.lat;
    let longitude = this.props.coords ? this.props.coords.longitude : this.state.lon;
    let center = {
        lat:latitude,
        lng:longitude
    }

    const zoom = isPhone() ? 16 : 16;
    //const zoom = isPhone() ? 18 : 14;

    return (
        <div style={{ position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'flex-end', alignItems: 'center'}}>

            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBq0HMCjnSaj9c-Rkm54-BQbobNjCSHizE' }}
                center={center}
                position={center}
                defaultZoom={zoom}
                onChildClick={_onChildClick}
                onChildMouseEnter={_onChildMouseEnter}
                onChildMouseLeave={_onChildMouseLeave}
                options={{
                    mapTypeIds: ['terrain', 'roadmap'],
                    zoom:{zoom},
                    navigationControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    disableDefaultUI: true,
                    zoomControl: false,
                    draggable: true,
                    streetViewControl: true,
                    styles: [
                        { "elementType": "geometry", "stylers": [ { "color": "#1d2c4d" } ] },
                        { "elementType": "labels.text.fill", "stylers": [ { "color": "#8ec3b9" } ] },
                        { "elementType": "labels.text.stroke", "stylers": [ { "color": "#1a3646" } ] },
                        { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "color": "#4b6878" } ] },
                        { "featureType": "administrative.land_parcel", "elementType": "labels", "stylers": [ { "visibility": "off" } ] },
                        { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#64779e" } ] },
                        { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [ { "color": "#4b6878" } ] },
                        { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [ { "color": "#334e87" } ] },
                        { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#023e58" } ] },
                        { "featureType": "poi", "elementType": "geometry", "stylers": [  { "color": "#283d6a"  } ] },
                        { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] },
                        { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#6f9ba5" } ] },
                        { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] },
                        { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] },
                        { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#023e58" } ] },
                        { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#3C7680" } ] },
                        { "featureType": "poi.medical","stylers": [{"visibility": "off" }]},
                        { "featureType": "poi.school","stylers": [{"visibility": "off"}]},
                        { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#304a7d" } ] },
                        { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] },
                        { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#98a5be" } ] },
                        { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] },
                        { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#2c6675" } ] },
                        { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#255763" } ] },
                        { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#b0d5ce" } ] },
                        { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [ { "color": "#023e58" } ] },
                        { "featureType": "road.local", "elementType": "labels", "stylers": [ { "visibility": "on" } ] },
                        { "featureType": "transit", "stylers": [ { "visibility": "off" } ] },
                        { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [ { "color": "#98a5be" } ] },
                        { "featureType": "transit", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] },
                        { "featureType": "transit.line", "elementType": "geometry.fill", "stylers": [ { "color": "#283d6a" } ] },
                        { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#3a4762" } ] },
                        { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#0e1626" } ] },
                        { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#4e6d70" } ] }
                    ]
                  }}>

                {pinsRoyal}
                {pinsGangster}
                {pinsMusic}
                <VeryRealAvatar lat={latitude} lng={longitude} />

            </GoogleMapReact>

            <div style={{ position: 'absolute', top: 0, left: 0}}>
                <table cellSpacing="0"><tbody>
                    <tr><td align="left"><button className={this.state.filter === typeRoman ? "vrMapButtonPressed" : "vrMapButton" } onClick={(e) => this.onClickFilter(typeRoman)}>{typeRoman}</button></td></tr>
                    <tr><td align="left"><button className={this.state.filter === typePub ? "vrMapButtonPressed" : "vrMapButton" } onClick={(e) => this.onClickFilter(typePub)}>{typePub}</button></td></tr>
                    <tr><td align="left"><button className={this.state.filter === typeMusic ? "vrMapButtonPressed" : "vrMapButton" } onClick={(e) => this.onClickFilter(typeMusic)}>{typeMusic}</button></td></tr>
                </tbody></table>
            </div>
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

const customStyles = {
  content : {
    top                   : '5%',
    left                  : '2%',
    right                 : '2%',
    bottom                : '5%',
    backgroundColor: "#304A7D",
    color: "#eee",
  }
};

function isPhone() {
    var userAgent = navigator.userAgent.toLowerCase();
    var value =
        userAgent.search('iphone') !== -1 ||
        userAgent.search('ipod') !== -1 ||
        userAgent.search('android') !== -1;
    return value;
}

class VeryRealPin extends Component {
    static defaultProps = {
    };
    constructor (props) {
        super(props);
        this.state = {
            showModal: false,
            visited: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.onOpenDialog = function() {
            this.setState({ showModal: true });
        }
        this.onCloseDialog = function() {
            this.setState({ showModal: false });
        }
        this.onPlaySound = function() {
            this.setState({ visited: true });
            document.getElementById('audio').play()
            if (this.props.website) {
                window.open(this.props.website,'_blank');
            }
        }
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render() {
        const category =
            this.props.category === typeRoman ? 'royal' :
            this.props.category === typePub ? 'gangster' :
            'music';
        const icon = this.state.visited ?
            "/veryreal/POI-" + category + "-visited.png" : "/veryreal/POI-" + category + ".png";
        //const iconSize = isPhone() ? "192px" : "92px";
        const iconSize = isPhone() ? "92px" : "92px";

        if (this.state.showModal) {
            return (
                <div style={PinStyle}>
                    <img src={icon} alt="map_pin" width={iconSize}/>
                    <Modal style={customStyles} isOpen={this.state.showModal} contentLabel="Details">
                        <div className="vrModalTitle">{this.props.text}</div>
                        <div className="vrModalText">{this.props.description}</div>
                        <audio id="audio">
                            <source src={this.props.sound} type="audio/mp3" />
                        </audio>
                        <table width="100%" cellSpacing="0"><tbody><tr>
                            <td align="left"><button className="vrButton" onClick={(e) => this.onPlaySound(e)}>
                                Play sound
                            </button></td>
                            <td align="right"><button className="vrButton" onClick={(e) => this.onCloseDialog(e)}>
                                Close
                            </button></td>
                        </tr></tbody></table>
                    </Modal>
                </div>
            );
        } else {
            if (this.state.visited) {
                return (
                    <div style={PinStyle}>
                    <img src={icon} alt="map_pin" width={iconSize} onClick={(e) => this.onOpenDialog(e)} />
                    </div>
                );
            } else {
                return (
                    <div style={PinStyle}>
                    <img src={icon} alt="map_pin" width={iconSize} onClick={(e) => this.onOpenDialog(e)} />
                    </div>
                );
            }
        }
    }
}

class VeryRealAvatar extends Component {
    render() {
        const icon = "/veryreal/user.gif";
        const iconSize = isPhone() ? "92px" : "48px";

        return (
            <div style={PinStyle}>
            <img src={icon} alt="map_pin" width={iconSize} />
            </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 60000,
        //timeout: Infinity,
    },
    //suppressLocationOnMount: false,
    watchPosition: true,
    userDecisionTimeout: 10000,
})(VeryRealSheet);
