import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png";
import CustomInput from '../components/CustomInput';
import CustomBtn from '../components/CustomBtn';

const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rPassword, setRPassword] = useState("");
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
        
        navigation.navigate("Sign In");
    };
 
    const onSignedUpPressed = () => {
        console.warn("sign Up");
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
            <CustomInput placeholder="repeat password" value={rPassword} setValue={setRPassword} />
            <CustomBtn text="Sign Up" onPressed={onSignedUpPressed} type="main"/>
            <CustomBtn text="Already have an account?" onPressed={onSignedInPressed} type="secondary"/>
        </View>
    );
};

export default RegisterScreen;

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
