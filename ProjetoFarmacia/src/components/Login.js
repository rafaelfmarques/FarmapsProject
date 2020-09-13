import React from 'react';
import { View, Text, KeyboardAvoidingView, 
        TextInput, Image, 
        TouchableOpacity, StyleSheet, Animated } from 'react-native';


export default function Login() {
    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.logo}>
                <Image 
                source={require('../assets/logo.png')}/>
            </View>

            <Animated.View style={[styles.container]}>
                <TextInput style={styles.input}
                    placeholder="Digite seu email"
                    autoCorrect={false}
                    onChangeText={() => {}}
                />

                <TextInput style={styles.input} 
                    placeholder="Digite sua senha"
                    autoCorrect={false}
                    onChangeText={()=>{}}
                />
                <TouchableOpacity style={styles.btnAcess}>
                    <Text style={styles.btnText}>Acessar</Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>  
    );
}

const styles = StyleSheet.create ({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c3c3c3'
    },
    logo:{
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%'    
    },
    input:{
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        fontSize: 17,
        borderRadius: 7,
        padding: 10, 
    },
    btnAcess:{
        backgroundColor: '#35AAFF',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    btnText:{
        color: '#FFF',
        fontSize: 18,
    }
})