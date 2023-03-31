import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'

const Loader = () => {
    const screenHeight = Dimensions.get('window').height;
  return (
    <View style={[styles.container, {height: screenHeight-200}]}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
})
