import React, { useEffect, useState } from 'react';
import {
    View, Text, KeyboardAvoidingView,
    TextInput, Image,
    TouchableOpacity, StyleSheet
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const LoginUser = () => {
        auth()
          .signInWithEmailAndPassword(email, senha)
          .then(() => {
            console.log('signed in!');
            navigation.navigate('Main')
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
    
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
    
            console.error(error);
          });
    

       

        function App() {
            // Set an initializing state whilst Firebase connects
            const [initializing, setInitializing] = useState(true);
            const [user, setUser] = useState();

            // Handle user state changes
            function onAuthStateChanged(user) {
                setUser(user);
                if (initializing) setInitializing(false);
            }

            useEffect(() => {
                const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
                return subscriber; // unsubscribe on unmount
            }, []);

            if (initializing) return null;

            if (!user) {
                return (
                    navigation.navigate('Login')
                );
            }

            return (
                navigation.navigate('Main')
            );
        }

    }

    return (

        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.logo}>
                <Image
                    source={require('../assets/logo.png')} />
            </View>

            <View style={[styles.container]}>
                <TextInput style={styles.input}
                    placeholder="Digite seu email"
                    autoCorrect={false}
                    onChangeText={email => setEmail(email)}
                />

                <TextInput style={styles.input}
                    placeholder="Digite sua senha"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={(senha) => { setSenha(senha) }}
                />

                <TouchableOpacity style={styles.btnAcess} onPress={LoginUser}>
                    <Text style={styles.btnText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    <Text style={styles.btnRegistrar}>Criar uma conta</Text>

                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#28639f'
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%'
    },
    input: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
    },
    btnAcess: {
        backgroundColor: '#35AAFF',
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