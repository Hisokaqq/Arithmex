import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomBtn = ({onPressed, text, type}) => {
  return (
    <TouchableOpacity onPress={onPressed} style={[styles.container, type=="main" ? styles.container_main : styles.container_secondary]}>
      <Text  style={type=="main" ? styles.text : styles.text_secondary}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomBtn

const styles = StyleSheet.create({
    container:{
        width: "100%",
        padding: 15,
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 5,
    },
    container_main: {
        backgroundColor: "#000",
    },
    container_secondary: {
    },
    text:{
        fontWeight: "bold",
        color: "#fff"
    },
    text_secondary: {
        color: "gray",
    }
})