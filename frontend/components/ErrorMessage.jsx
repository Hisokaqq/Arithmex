import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ErrorMessage = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

export default ErrorMessage

const styles = StyleSheet.create({
    container:{
        paddingVertical: 30,
        alignItems: "center",
    },
    text:{
        color: "red"
    }
})