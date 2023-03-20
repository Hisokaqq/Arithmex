import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({value, setValue, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder={placeholder} value={value} onChangeText={setValue} style={styles.input} secureTextEntry={placeholder.includes("password")}></TextInput>
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    input: {
        
    }
})