import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png";
import CustomInput from '../components/CustomInput';
import CustomBtn from '../components/CustomBtn';

const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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

    const onSignedInPressed = () => {
        console.warn("sign In");
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
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    root:{
        alignItems: "center",
        paddingHorizontal: 20, 
    },
    logo: {
        width: "70%",
        maxWidth: 300,
        maxHeight: 300,
        resizeMode: "contain",
    },
});
