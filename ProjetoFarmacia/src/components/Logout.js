import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';



export default function Logout({ navigation }) {
    const signOut = () => {
        auth()
            .signOut()
            .then(() => navigation.navigate('Login'));
    }
    return (
        <TouchableOpacity style={styles.btnAcess} onPress={signOut}>
            <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btnAcess: {
        backgroundColor: '#e74c3c',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    btnText: {
        color: '#FFF',
        fontSize: 18,
    },
    btnRegistrar: {
        fontSize: 21
    },

})