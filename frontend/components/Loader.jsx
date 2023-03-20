import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3b71f3" />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
})
