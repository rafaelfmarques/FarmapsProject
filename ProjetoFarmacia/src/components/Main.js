
import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';
import {PermissionsAndroid, Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import geolocation from '@react-native-community/geolocation';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps



export default function Main () {
 

  const [latitude, setLatitude] = useState(-23.5489)
  const [longitude, setLongitude] = useState(-46.638823)
 
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
        setLatitude(JSON.stringify(position.coords.latitude)),
        setLongitude(JSON.stringify(position.coords.longitude))
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

    
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
            onPress={requestLocation}
            zoomEnabled={true}
            pitchEnabled={true}
            showsUserLocation={true}
            followsUserLocation={true}
            showsCompass={true}
            showsBuildings={true}
            showsIndoors={true}
        >
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
