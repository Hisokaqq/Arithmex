import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import logo from "../images/logo.png";
import CustomInput from '../components/CustomInput';
import CustomBtn from '../components/CustomBtn';
import axios from "axios"
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordR, setPasswordR] = useState("");
    const [errord, setErrorD] = useState(null)
    const [loading,  setLoading] = useState(false)
    const [animation] = useState(new Animated.Value(-2));
    useLayoutEffect(()=>{
      navigation.setOptions({
    
       
        headerLeft: () => (
          <View style={{ marginLeft: 6 }}>
            <Ionicons
              name="arrow-back"   
              size={24}
              color="#000"
              onPress={() => navigation.goBack()}
            />
          </View>
        ),
      });
    }, [navigation]);
useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: -2,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, [animation]);

const onSignedUpPressed = async () => {
  if(username!="" && password!="" && passwordR!=""){;
  if(password !== passwordR) setErrorD("passwords do not match")
  else{
  const inputData = { username: username, password: password };

  const config = {
    headers: {
        "Content-type": "application/json"
    }
}
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/users/register/",
      inputData,
      config
    );

    AsyncStorage.setItem("UserInfo", JSON.stringify(data));
    await navigation.replace("Home")

  } catch (error) {
    const { detail } = await error.response.data;
    setErrorD(detail);
  }
}
  setLoading(false);
}
};


    const onSignedInPressed = () => {
        navigation.navigate("Sign Up");
    };

    const animatedStyle = {
        transform: [{ scale: animation }],
    };

    return (
        <View style={styles.root}>
          <View style={{width: "100%", alignItems: "center", flex: 1}}>
            <Animated.Image
      source={logo}
      alt="logo"
      style={[styles.logo, { transform: [{ translateY: animation.interpolate({        inputRange: [0, 1],
        outputRange: [0, 10],
      }) }]}]}
    />
            <CustomInput placeholder="username" value={username} setValue={setUsername}/>
            <CustomInput placeholder="password" value={password} setValue={setPassword} />
            <CustomInput placeholder="repeat password" value={passwordR} setValue={setPasswordR} />
            <CustomBtn text="Sign Up" onPressed={onSignedUpPressed} type="main"/>
            <CustomBtn text="Already have an account?" onPressed={onSignedInPressed} type="secondary"/>
            
            </View>
            {
              loading &&
              <Loader/>
            }
            <ErrorMessage message={errord}/>


        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    root:{
        paddingHorizontal: 20, 
        flex: 1
    },
    logo: {
        width: "70%",
        maxWidth: 300,
        maxHeight: 300,
        resizeMode: "contain",
    },
});
