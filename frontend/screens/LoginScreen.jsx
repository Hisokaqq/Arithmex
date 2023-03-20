import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png";
import CustomInput from '../components/CustomInput';
import CustomBtn from '../components/CustomBtn';
import axios from "axios"
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errord, setErrorD] = useState(null)
    const [loading,  setLoading] = useState(false)
    const [animation] = useState(new Animated.Value(-2));

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

    const onSignedInPressed = async () => {
        setLoading(true)

        const Inputdata = {username: username, password: password}

        try {

        
        const {data} = await axios.post("http://127.0.0.1:8000/api/users/login/", Inputdata)
        }catch(error) {
          // console.log(error.response.data)
          const {detail} = error.response.data
          console.log(detail)
          setErrorD(detail)
        }
        setLoading(false)
    };
    const onForgotPassword = () => {
        console.warn("Forgot Password");
    };
    const onSignedUpPressed = () => {
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
            <CustomBtn text="Sign In" onPressed={onSignedInPressed} type="main"/>
            <CustomBtn text="Forgot Password?" onPressed={onForgotPassword} type="secondary"/>
            <CustomBtn text="Dont have an account?" onPressed={onSignedUpPressed} type="secondary"/>
            
            </View>
            {
              loading &&
              <Loader/>
            }
            <ErrorMessage message={errord}/>
        </View>
    );
};

export default LoginScreen;

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
