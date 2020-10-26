
import React, { useState, useEffect } from 'react';

import auth from '@react-native-firebase/auth';
import {PermissionsAndroid, Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import geolocation from '@react-native-community/geolocation';


import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Component } from 'react/cjs/react.production.min';



export default function Main () {
 

  const [latitude, setLatitude] = useState(-23.5489)
  const [longitude, setLongitude] = useState(-46.638823)
  const [places, setPlaces] = useState([]);
 
  const requestLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Farmaps',
          'message': 'quer acesso a sua localização '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        findCoordinates()
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

    
   const findCoordinates = () => {
    geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLatitude(lat),
        setLongitude(long)
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const getPlacesUrl = (lat, long, radius, type, apiKey) => {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&types=${type}`;
    const api = `&key=${apiKey}`;
    return `${baseUrl}${location}${typeData}${api}`;
  }

  const getPlaces = () => {
    const markers = [];
    const url = getPlacesUrl(latitude, longitude, 1500, "pharmacy", "pega-sua-chave-kk");
    fetch(url)
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
        setPlaces(markers);
      });
  }

  useEffect(() => {
    requestLocation()
    getPlaces();
    // alert("lat = " +latitude + " long = " + longitude);
//    alert(places[1].name);
  }, []);

    
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{ width: 400, height: 570 }}
          region={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
          }}
            zoomEnabled={true}
            pitchEnabled={true}
            showsUserLocation={true}
            followsUserLocation={true}
            showsCompass={true}
            showsBuildings={true}
            showsIndoors={true}
        >
          {places.map((marker, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: marker.marker.latitude,
                  longitude: marker.marker.longitude
                }}
                title={marker.name}
              />
            ))}
        </MapView>

        {/*<TouchableOpacity style={styles.welcome} onPress={signOut}>
          <Text style={styles.btnRegistrar}>LOGOUT</Text>
        </TouchableOpacity>*/}

      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  map: {
    height: 200,
    width: 600
  },
  btnRegistrar: {
      fontSize: 21
  },
})
