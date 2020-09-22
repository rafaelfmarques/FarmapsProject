import React, { useRef } from 'react';
import { Form } from '@unform/mobile';
import { Scope } from '@unform/core';
import { 
  StyleSheet, 
  Text, 
  Image, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Platform, 
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Input from './InputForm';

export default function App() {
  const formRef = useRef(null);

  function handleSubmit(data, { reset }) {
    console.log(data);

    reset();
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
      <View>
        <StatusBar barStyle="dark-content" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Image 
            style={styles.logo} 
            source={require('../assets/logo.png')}
          />

          <Input name="name" label="Nome completo" placeholder="Digite seu nome" style={styles.input}  />
          <Input style={styles.input}
            name="email" 
            label="E-mail" 
            autoCorrect={false}
            placeholder="Digite seu e-mail"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Scope path="address">
            <Input name="street" label="Senha" placeholder="Digite sua senha" style={styles.input} />
          </Scope>

          <TouchableOpacity style={styles.submitButton} onPress={() => formRef.current.submitForm()}>
            <Text style={styles.submitButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </Form>
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
    padding: 16,
    alignItems: 'center'
  },

  submitButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15,
  },
});
