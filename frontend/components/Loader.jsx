import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MotiView } from '@motify/components'
const Loader = ({size}) => {
  return (
    <MotiView 
        style={{
            width: size,
            height: size,
            borderRadius: size/2,
            borderWidth: size/10,
            borderColor: "red",

        }}
    >
    </MotiView>
  )
}

export default Loader

const styles = StyleSheet.create({})