import React, { useEffect, useState } from 'react';
import {
    View, Text, KeyboardAvoidingView,
    TextInput, Image,
    TouchableOpacity, StyleSheet
} from 'react-native';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

export default function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '319044518777-uu2cqpvf00kt5tklt22h2medp9bdveek.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            //hostedDomain: '', // specifies a hosted domain restriction
            //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            //accountName: '', // [Android] specifies an account name on the device that should be used
            //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
    }, [])
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //this.setState({ userInfo });
            console.log({ userInfo })
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
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
                    onChangeText={(senha) => {setSenha(senha) }}
                />

                <TouchableOpacity style={styles.btnAcess}>
                    <Text style={styles.btnText}>Acessar</Text>
                </TouchableOpacity>           

                <TouchableOpacity
                    onPress = {() => navigation.navigate('Cadastro')}                >
                    <Text style={styles.btnRegistrar}>Criar uma conta</Text>
                </TouchableOpacity>
                
                <Text style={styles.text}>OU</Text>     

                <GoogleSigninButton style={styles.btnGoogle}
                    style={{ width: 340, height: 50 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                 />
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
    btnRegistrar:{
        fontSize: 21
    },

})