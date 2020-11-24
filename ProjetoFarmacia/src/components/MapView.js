import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { View } from "react-native";
import geolocation from '@react-native-community/geolocation';

//Styles
import styles from "./style";
class MapScreen extends Component {
  //Set the HeaderTitle screen
  static navigationOptions = props => {
    const placeName = 'Pharmacy';
    return { headerTitle: placeName.toUpperCase() };
  };
  constructor(props) {
    super(props);
    //Initial State
    this.state = {
      lat: -23.0994,
      long: -45.7030,
      places: [],
      isLoading: false,
      placeType: "pharmacy",
      region: {
          latitudeDelta: 1,
      }
    };
  }
  componentDidMount() {
    console.log(this.props);
    const placeType = "pharmacy";
    this.setState({ placeType: placeType });

    this.getCurrentLocation();
  }
  /**
   * Get current user's position
   */
  getCurrentLocation() {
    geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      this.setState({ lat: lat, long: long });
      this.getPlaces();
    }, 
    error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  }

  /**
   * Get the Place URL
   */
  getPlacesUrl(lat, long, radius, type, apiKey) {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&types=${type}`;
    const api = `&key=${apiKey}`;
    return `${baseUrl}${location}${typeData}${api}`;
  }

  async getPlaces() {
    const { lat, long, placeType } = this.state;
    const markers = [];
    const url = this.getPlacesUrl(lat, long, 1000, placeType, "AIzaSyC-QXL0JO9-ancQG8xFKAGP7WC4Ru7cFqg");
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        res.results.map((element, index) => {
          const marketObj = {};
          marketObj.id = element.id;
          marketObj.name = element.name;
          marketObj.photos = element.photos;
          marketObj.rating = element.rating;
          marketObj.vicinity = element.vicinity;
          marketObj.marker = {
            latitude: element.geometry.location.lat,
            longitude: element.geometry.location.lng
          };

          markers.push(marketObj);
        });
        //update our places array
        this.setState({ places: markers });
      });
  }

  render() {
    const { lat, long, places } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mapView}>
          <MapView
            style={{
              flex: 1
            }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.0043,
              longitudeDelta: 0.0421
            }}
          >
            {places.map((marker, i) => (
              <MapView.Marker
                key={i}
                coordinate={{
                  latitude: marker.marker.latitude,
                  longitude: marker.marker.longitude
                }}
                title={marker.name}
              />
            ))}
          </MapView>
        </View>
      </View>
    );
  }
}

export default MapScreen;
