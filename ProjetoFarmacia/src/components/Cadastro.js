import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';


export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, senha)
      .then(() => {
        console.log('User account created & signed in!');
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
  }



  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>

        <Image
          style={styles.logo}
          source={require('../assets/logo.png')}
        />

        <TextInput style={styles.input}
          placeholder="Digite seu e-mail"
          autoCorrect={false}
          onChangeText={(email) => { setEmail(email) }}
        />

        <TextInput style={styles.input}
          placeholder="Digite sua senha"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={(senha) => { setSenha(senha) }}
        />

        <TouchableOpacity style={styles.submitButton} onPress={createUser}>
          <Text style={styles.submitButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
    backgroundColor: '#28639f'
  },

  logo: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    width: '95%',
    marginBottom: 15,
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },

  submitButton: {
    backgroundColor: '#111',
    borderRadius: 4,
    width: 350,
    padding: 16,
    alignItems: 'center'
  },

  submitButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15,
  },
});

