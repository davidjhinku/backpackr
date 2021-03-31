import React from 'react';
import GoogleMapReact from 'google-map-react';
import AutoComplete from './autocomplete';
import Marker from './marker';
const MAPS_API_KEY = 'AIzaSyA4kTGJyLh0WQLKHods5TGVPmVB_GaVoSs';

class Map extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            loaded: false,
            map: null,
            mapApi: null,
            geoCoder: null,

            center: [],
            address: '',
            lat: null,
            lng: null
        }

        this.addPlace = this.addPlace.bind(this);
        this.onMarkerInteraction = this.onMarkerInteraction.bind(this);
        this.apiHasLoaded = this.apiHasLoaded.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
    };


    apiHasLoaded = (map, maps) => {
        this.setState({
            loaded: true,
            map: map,
            mapApi: maps,
        });

        this.handleAddress();
    };


    // Get Current Location Coordinates from user
    setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: [position.coords.latitude, position.coords.longitude],
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }

    componentWillMount(){
        this.setCurrentLocation();
    }

    onMarkerInteraction = (childKey, childProps, mouse) => {
        this.setState({
            draggable: false,
            lat: mouse.lat,
            lng: mouse.lng
        });
    }

    onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
        this.setState({
            draggable: true
        });

        this.handleAddress();
    }

    addPlace = (place) => {
        this.setState({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
        this.handleAddress()
    };

    onChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        });

    }

    onClick = (value) => {
        this.setState({
            lat: value.lat,
            lng: value.lng
        });
    }

    handleAddress() {
        const {
            mapApi
        } = this.state;

        //Load Geocoder endpoint
        const geocoder = new mapApi.Geocoder();

        geocoder.geocode({ 
            'location': { 
                lat: this.state.lat, 
                lng: this.state.lng 
            } }, 
            
            (results, status) => {
            if (status === 'OK') {

                if (results[0]) {
                    this.zoom = 15;
                    this.setState({ address: results[0].formatted_address });
                } else {
                    window.alert('Sorry! No results came up for that. Try again.');
                }
            } else {
                window.alert('Geocoder errored out because of ' + status);
            }
        });
    }

    render() {
        const { loaded, map, mapApi, center} = this.state;

        const searchbar = loaded ? <div className="map-search-block"> <AutoComplete map={map} mapApi={mapApi} addplace={this.addPlace} /></div> : null 

        return (
            <div className="map-element">
                {searchbar}
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: MAPS_API_KEY,
                        libraries: ['places', 'geometry'],
                    }}
                    onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}

                    center={center}
                    zoom={17}
                    draggable={true}

                    onChange={this.onChange}
                    onClick={this.onClick}
                    onChildClick={() => console.log('child click')}

                    onChildMouseMove={this.onMarkerInteraction}
                    onChildMouseDown={this.onMarkerInteraction}
                    onChildMouseUp={this.onMarkerInteractionMouseUp}

                    yesIWantToUseGoogleMapApiInternals
                >
                    <Marker
                        text={this.state.address}
                        lat={this.state.lat}
                        lng={this.state.lng}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;