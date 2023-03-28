import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const value = await AsyncStorage.getItem('UserInfo')

        if (value !== null) {
          const user = await JSON.parse(value)
          const config = {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${user?.token}`,
            },
          }
          const { data } = await axios.get(
            'http://127.0.0.1:8000/api/users/refresh/',
            config
          )
          setUserInfo(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserInfo()
  }, [])

  return (
    <View style={{padding: 20}}>
      {userInfo && (
        <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
          <Image
            style={styles.avatar}
            source={{ uri: `http://127.0.0.1:8000${userInfo.profile.avatar }` }}
          />
          <Text style={styles.username}>{userInfo?.profile.full_username}</Text>
        </View>
      )}
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 500,
  },
  username: {
    fontWeight: 700, 
    fontSize: 20,
  }
})
