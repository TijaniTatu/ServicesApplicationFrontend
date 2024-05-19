import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, Switch, HelperText, Menu, Divider } from 'react-native-paper';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);

  const handleRegister = async () => {
    //Call /api/register
    //Email verify 
    //Login user by placing user tokens in AsyncStorage


    setAccountCreated(!accountCreated);
    console.log(accountCreated);
    if (accountCreated) {

    } else {

      axios.post('http://192.168.100.140:3000/api/register', { email, password })
        .then(response => {
          //tell user to approve account via email
          //try to logIn

          console.log(response);


        }).catch(err => {
          //somehow alert the user there's an error
          console.error(err);
        })

    }


  }

  const hangeleRegisterNext = async () => {
    //try to logIn
    axios.post('http://192.168.100.140:3000/api/login', { email, password })
      .then(response => {
        //go to build profile
        //store details in async storage
        AsyncStorage.setItem('UserDetails',JSON.stringify(response));
        navigation.push('BuildProfileScreen')
      }).catch(err => {
        //somehow alert the user there's an error
        console.error(err);
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>
          Create An account
        </Text>
      </View>
      <TextInput
        style={{ ...styles.input, backgroundColor: "white" }}
        value={email}
        label='email'
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={{ ...styles.input, backgroundColor: "white" }}
        value={password}
        label='password'
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <Button mode='contained' style={styles.input} onPress={() => handleRegister()} > Send Verification </Button>
      <Button style={styles.input} onPress={() => navigation.push('LoginScreen')}> Login </Button>
      {accountCreated ? <Button style={styles.input} mode='elevated' onPress={() => doLogin()}> Next </Button> : <></>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", marginHorizontal: 30 },
  input: { marginVertical: 5, borderRadius: 0 },
  row: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  textContainer: { alignContent: 'center', alignItems: 'center' }

});