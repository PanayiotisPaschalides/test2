import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
export class MapContainer extends Component {
    static propTypes = {
        lat: PropTypes.string,
        long: PropTypes.string
    }
    constructor(props){
        super(props);
        this.state={
            lat: this.props.lat,
            long: this.props.long,
            
            

        }
    }
  render() {
    return (
      <Map google={this.props.google} zoom={16}
      style={{width: '400px',height: '400px'}}
      initialCenter={{
        lat: this.state.lat,
        lng: this.state.long
      }}
      >
        
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyDDzkcHMNPwBQcJAMTet_kFkpO75zCxNJI")
})(MapContainer)